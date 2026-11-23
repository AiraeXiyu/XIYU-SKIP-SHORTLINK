"use client";

import { FormEvent, useEffect, useState } from "react";

type BypassResponse = {
  success?: boolean;
  slug?: string;
  url?: string;
  destination?: string;
  title?: string;
  platform?: string;
  author?: string;
  duration?: string;
  elapsed_ms?: number;
  is_premium_only?: boolean;
  metadata?: Record<string, unknown>;
  error?: string;
};

const shortlinkOptions = [
  "Safelinku / SFL",
  "Linkvertise",
  "LootLabs",
];

const loadingSteps = [
  "Memvalidasi tautan",
  "Menyiapkan resolver",
  "Memproses tautan",
  "Menyiapkan hasil",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [selectedShortlink, setSelectedShortlink] = useState("Safelinku / SFL");
  const [shortlinkMenuOpen, setShortlinkMenuOpen] = useState(false);
  const [result, setResult] = useState<BypassResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading) return;

    setLoadingStep(0);

    const timer1 = setTimeout(() => {
      setLoadingStep(1);
    }, 850);

    const timer2 = setTimeout(() => {
      setLoadingStep(2);
    }, 1800);

    const timer3 = setTimeout(() => {
      setLoadingStep(3);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [loading]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputUrl = url.trim();

    if (!inputUrl || loading) return;

    setLoading(true);
    setResult(null);
    setCopied(false);

    try {
      const response = await fetch("/api/bypass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputUrl,
          platform: selectedShortlink,
        }),
      });

      const text = await response.text();

      let data: BypassResponse;

      try {
        data = JSON.parse(text);
      } catch {
        data = {
          success: false,
          error: "Server mengembalikan response yang tidak valid.",
        };
      }

      const normalized: BypassResponse = {
        ...data,
        url: data.url || data.destination || undefined,
        platform: data.platform || selectedShortlink,
        success: Boolean(data.success && (data.url || data.destination)),
      };
      setResult(normalized);
    } catch {
      setResult({
        success: false,
        error: "Gagal menghubungi server. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    const destination = result?.url;

    if (!destination) return;

    try {
      await navigator.clipboard.writeText(destination);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  function clearInput() {
    if (loading) return;

    setUrl("");
    setResult(null);
    setCopied(false);
  }

  const destinationUrl = result?.url;

  return (
    <main className="site-shell">
      {/* BACKGROUND */}
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-image-wrap">
          <img
            src="/hero.jpg"
            alt="XIYU Skip Shortlink"
            className="hero-image"
          />

          <div className="hero-image-overlay" />

          <div className="hero-badge">
            <span className="status-dot" />
            <span>ONLINE</span>
          </div>
        </div>

        <div className="hero-content">
          <div className="eyebrow">
            <span>✦</span>
            <span>XIYU LINK TOOL</span>
          </div>

          <h1>
            XIYU SKIP
            <br />
            <span>SHORTLINK.</span>
          </h1>

          <p className="hero-description">
            Pilih platform, tempel tautannya, dan lihat status serta hasil proses di halaman XIYU.
          </p>
        </div>
      </section>

      {/* INPUT CARD */}
      <section className="tool-card">
        <div className="card-header">
          <div>
            <p className="card-label">
              SHORTLINK BYPASS
            </p>

            <h2>Masukkan link kamu</h2>
          </div>

          <div className="sparkle">✦</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="shortlink-picker">
            <span className="picker-label">PILIH SHORTLINK</span>
            <button
              type="button"
              className={`shortlink-trigger ${shortlinkMenuOpen ? "is-open" : ""}`}
              onClick={() => setShortlinkMenuOpen((open) => !open)}
              aria-expanded={shortlinkMenuOpen}
              disabled={loading}
            >
              <span>{selectedShortlink}</span>
              <span className="picker-chevron">⌄</span>
            </button>
            {shortlinkMenuOpen && (
              <div className="shortlink-options">
                {shortlinkOptions.map((option, index) => (
                  <button
                    type="button"
                    key={option}
                    className={`shortlink-option ${selectedShortlink === option ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedShortlink(option);
                      setShortlinkMenuOpen(false);
                      setResult(null);
                    }}
                  >
                    <span className="option-index">{String(index + 1).padStart(2, "0")}</span>
                    <span>{option}</span>
                    {selectedShortlink === option && <span className="option-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div
            className={`input-wrap ${
              loading ? "is-loading" : ""
            }`}
          >
            <span className="input-icon">⌁</span>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                selectedShortlink === "Safelinku / SFL"
                  ? "https://sfl.gl/example"
                  : selectedShortlink === "Linkvertise"
                    ? "https://linkvertise.com/..."
                    : "https://loot-reward.com/t?cc=..."
              }
              autoComplete="off"
              spellCheck={false}
              disabled={loading}
              required
            />

            {url && !loading && (
              <button
                type="button"
                className="clear-button"
                onClick={clearInput}
                aria-label="Clear URL"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bypass-button"
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <>
                <span className="loader" />
                <span>MEMPROSES LINK</span>
              </>
            ) : (
              <>
                <span>RESOLVE LINK</span>
                <span className="button-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="supported">
          <span className="check">✓</span>
          <span>{selectedShortlink} dipilih</span>
        </div>
      </section>

      {/* PROCESSING */}
      {loading && (
        <section className="processing-card">
          <div className="processing-header">
            <div className="processing-spinner">
              <span />
            </div>

            <div>
              <p className="processing-label">
                PLEASE WAIT
              </p>

              <h3>Memproses tautan</h3>
            </div>
          </div>

          <div className="processing-line" />

          <div className="processing-steps">
            {loadingSteps.map((step, index) => {
              const completed = index < loadingStep;
              const active = index === loadingStep;

              return (
                <div
                  key={step}
                  className={`processing-step ${
                    completed ? "completed" : ""
                  } ${active ? "active" : ""}`}
                >
                  <div className="step-icon">
                    {completed ? (
                      "✓"
                    ) : active ? (
                      <span className="mini-spinner" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="step-text">
                    <span>{step}</span>

                    {active && (
                      <small>
                        Sedang berlangsung
                        <span className="dots">
                          ...
                        </span>
                      </small>
                    )}

                    {completed && (
                      <small>Selesai</small>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="processing-note">
            Jangan tutup halaman selama proses berlangsung.
          </div>
        </section>
      )}

      {/* RESULT */}
      {!loading && result && (
        <section
          className={`result-card ${
            result.success ? "success" : "error"
          }`}
        >
          {result.success && destinationUrl ? (
            <>
              <div className="result-top">
                <div className="result-icon success-icon">
                  ✓
                </div>

                <div>
                  <p className="result-label">
                    RESOLVE BERHASIL
                  </p>

                  <h3>
                    Destination URL ditemukan
                  </h3>
                </div>
              </div>

              {result.slug && (
                <div className="result-meta">
                  <span>
                    Slug: {result.slug}
                  </span>

                  <span>✓ Success</span>
                </div>
              )}

              {(result.title || result.platform || result.duration || result.author || typeof result.is_premium_only === "boolean") && (
                <div className="result-meta">
                  {result.platform && <span>Platform: {result.platform}</span>}
                  {result.title && <span>Title: {result.title}</span>}
                  {result.author && <span>Author: {result.author}</span>}
                  {result.duration && <span>Durasi: {result.duration}</span>}
                  {typeof result.is_premium_only === "boolean" && <span>Premium only: {result.is_premium_only ? "Ya" : "Tidak"}</span>}
                </div>
              )}

              <div className="result-url">
                {destinationUrl}
              </div>

              <div className="result-actions">
                <button
                  type="button"
                  onClick={copyResult}
                  className="copy-button"
                >
                  {copied
                    ? "✓ Copied"
                    : "Copy URL"}
                </button>

                <a
                  href={destinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="open-button"
                >
                  Buka →
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="result-top">
                <div className="result-icon error-icon">
                  !
                </div>

                <div>
                  <p className="result-label">
                    PROSES GAGAL
                  </p>

                  <h3>
                    Tautan tidak dapat diproses
                  </h3>
                </div>
              </div>

              {result.platform && <div className="result-meta"><span>Platform: {result.platform}</span></div>}
              <p className="error-message">
                {result.error ||
                  "Terjadi kesalahan saat memproses tautan."}
              </p>
            </>
          )}
        </section>
      )}

      {/* API INFORMATION */}
      <section className="tool-card">
        <div className="card-header">
          <div>
            <p className="card-label">
              XIYU SHORTLINK
            </p>

            <h2>API Information</h2>
          </div>

          <div className="sparkle">✦</div>
        </div>

        <div className="result-url">
          https://xiyu-safelinku-api.vercel.app
        </div>

        <div className="supported">
          <span className="check">✓</span>

          <span>
            GET /bypass?url=https://sfl.gl/example
          </span>
        </div>

        <div className="supported">
          <span className="check">✓</span>

          <span>
            GET /bypass?slug=example
          </span>
        </div>

        <div className="supported">
          <span className="check">✓</span>

          <span>
            GET /api/health
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-line" />

        <div className="footer-content">
          <span>XIYU SKIP SHORTLINK</span>
          <span>•</span>
          <span>SKIP SHORTLINK</span>
        </div>
      </footer>
    </main>
  );
}
