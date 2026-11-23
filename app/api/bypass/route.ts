import { NextResponse } from "next/server";

const SFL_API_BASE = "https://xiyu-safelinku-api.vercel.app";
export const dynamic = "force-dynamic";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

type ResolverResult = {
  success: boolean;
  platform: string;
  input_url: string;
  url?: string;
  destination?: string;
  title?: string | null;
  author?: string;
  duration?: string;
  elapsed_ms?: number;
  is_premium_only?: boolean;
  error?: string;
  metadata?: Record<string, unknown>;
};

function validHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function jsonError(platform: string, inputUrl: string, message: string, elapsed: number, status = 400) {
  return NextResponse.json(
    {
      success: false,
      platform,
      input_url: inputUrl,
      error: message,
      elapsed_ms: elapsed,
      duration: `${(elapsed / 1000).toFixed(2)}s`,
    } satisfies ResolverResult,
    { status }
  );
}

async function resolveSafelinku(inputUrl: string, started: number) {
  const apiUrl = new URL("/bypass", SFL_API_BASE);
  apiUrl.searchParams.set("url", inputUrl);
  const response = await fetch(apiUrl, {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(20_000),
  });
  const text = await response.text();
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    return jsonError("Safelinku / SFL", inputUrl, "API SFL mengembalikan response yang tidak valid.", Date.now() - started, 502);
  }
  const normalized = {
    ...data,
    success: data.success ?? response.ok,
    platform: data.platform ?? "Safelinku / SFL",
    input_url: data.input_url ?? inputUrl,
    url: data.url ?? data.destination ?? data.result ?? undefined,
    elapsed_ms: data.elapsed_ms ?? Date.now() - started,
    duration: data.duration ?? `${((Date.now() - started) / 1000).toFixed(2)}s`,
  };
  return NextResponse.json(normalized, { status: response.status });
}

function parseLinkvertiseParts(url: URL) {
  const parts = url.pathname.split("/").filter(Boolean);
  // Standard: /{publisher}/{link-id}; Access form: /access/{publisher}/{link-id}
  const publisher = parts[0] === "access" ? parts[1] : parts[0];
  const identifier = parts[0] === "access" ? parts[2] : parts[1];
  if (!publisher || !identifier) throw new Error("Format URL Linkvertise tidak valid.");
  return { publisher, identifier };
}

async function resolveLinkvertise(inputUrl: string, started: number) {
  let parsed = new URL(inputUrl);
  const allowedHosts = new Set(["linkvertise.com", "www.linkvertise.com", "direct-link.net", "www.direct-link.net"]);
  if (!allowedHosts.has(parsed.hostname.toLowerCase())) throw new Error("URL bukan domain Linkvertise/direct-link.net yang didukung.");

  // direct-link.net links may redirect to a Linkvertise URL. Do not follow redirects;
  // read the Location header once and validate the resulting hostname.
  if (parsed.hostname.toLowerCase().endsWith("direct-link.net")) {
    const response = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "manual",
      headers: { "User-Agent": USER_AGENT },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    const location = response.headers.get("location");
    if (!location) throw new Error("Redirect Linkvertise tidak ditemukan pada direct-link.net.");
    parsed = new URL(location, parsed);
    if (!new Set(["linkvertise.com", "www.linkvertise.com"]).has(parsed.hostname.toLowerCase())) {
      throw new Error("Redirect direct-link.net mengarah ke host yang tidak didukung.");
    }
  }

  const { publisher, identifier } = parseLinkvertiseParts(parsed);
  const query = `query($input: PublicLinkIdentificationInput!) { linkByIdentifier(linkIdentificationInput: $input) { id url target_host title is_premium_only } }`;
  const response = await fetch("https://publisher.linkvertise.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": USER_AGENT, Accept: "application/json" },
    body: JSON.stringify({
      query,
      variables: { input: { userIdAndUrl: { user_id: String(publisher), url: String(identifier) } } },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Linkvertise GraphQL gagal (HTTP ${response.status}).`);
  const payload = await response.json();
  const linkData = payload?.data?.linkByIdentifier;
  if (!linkData) throw new Error(payload?.errors?.[0]?.message || "Data Linkvertise tidak ditemukan.");

  // Follow the supplied resolver's target_host output convention. It can be a host
  // rather than a complete URL, so normalize it for display/copy in XIYU.
  let destination: string | null = linkData.target_host || null;
  if (destination && !/^https?:\/\//i.test(destination)) destination = `https://${destination}`;
  return NextResponse.json({
    success: Boolean(destination),
    platform: "Linkvertise",
    input_url: inputUrl,
    url: destination ?? undefined,
    destination: destination ?? undefined,
    title: linkData.title || null,
    is_premium_only: Boolean(linkData.is_premium_only),
    author: "XIYU",
    elapsed_ms: Date.now() - started,
    duration: `${((Date.now() - started) / 1000).toFixed(2)}s`,
    ...(destination ? {} : { error: "Linkvertise tidak mengembalikan target host." }),
  } satisfies ResolverResult);
}

function decodeBase64Utf8(value: string, urlSafe = false) {
  let normalized = value.trim();
  if (urlSafe) normalized = normalized.replace(/-/g, "+").replace(/_/g, "/");
  normalized += "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function decodeLootLabsCc(cc: string) {
  const normalized = decodeURIComponent(cc).replace(/ /g, "+");
  const first = decodeBase64Utf8(normalized, true);
  if (first.trim().startsWith("{") || first.trim().startsWith("[")) return JSON.parse(first);
  const second = decodeBase64Utf8(first);
  return JSON.parse(second);
}

async function resolveLootLabs(inputUrl: string, started: number) {
  const parsed = new URL(inputUrl);
  if (parsed.hostname.toLowerCase() !== "loot-reward.com" || parsed.pathname !== "/t") {
    throw new Error("Kode yang diberikan mendukung format https://loot-reward.com/t?cc=... saja.");
  }
  const cc = parsed.searchParams.get("cc");
  if (!cc) throw new Error("Parameter cc tidak ditemukan.");
  let data: unknown;
  try {
    data = decodeLootLabsCc(cc);
  } catch {
    throw new Error("Parameter cc gagal didekode atau JSON tidak valid.");
  }
  const destination = (data as { link?: unknown })?.link;
  if (!validHttpUrl(destination)) throw new Error("Data LootLabs tidak berisi URL link yang valid.");
  return NextResponse.json({
    success: true,
    platform: "LootLabs",
    input_url: inputUrl,
    url: destination ?? undefined,
    destination: destination ?? undefined,
    author: "XIYU",
    elapsed_ms: Date.now() - started,
    duration: `${((Date.now() - started) / 1000).toFixed(2)}s`,
    metadata: { extraction: "cc payload", note: "URL link diekstrak dari payload cc; tidak melakukan download file." },
  } satisfies ResolverResult);
}

export async function POST(req: Request) {
  const started = Date.now();
  try {
    const body = await req.json();
    const inputUrl = String(body?.url || "").trim();
    const platform = String(body?.platform || "Safelinku / SFL").trim();

    if (!inputUrl) return jsonError(platform, inputUrl, "URL wajib diisi.", Date.now() - started, 400);
    if (!validHttpUrl(inputUrl)) return jsonError(platform, inputUrl, "URL harus menggunakan http atau https.", Date.now() - started, 400);

    if (platform === "Safelinku / SFL") return await resolveSafelinku(inputUrl, started);
    if (platform === "Linkvertise") return await resolveLinkvertise(inputUrl, started);
    if (platform === "LootLabs") return await resolveLootLabs(inputUrl, started);
    return jsonError(platform, inputUrl, "Platform tidak dikenal.", Date.now() - started, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Terjadi error saat memproses link.";
    console.error("XIYU RESOLVER ERROR:", error);
    const elapsed = Date.now() - started;
    return NextResponse.json({ success: false, error: message, elapsed_ms: elapsed, duration: `${(elapsed / 1000).toFixed(2)}s` }, { status: 400 });
  }
}
