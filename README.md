# XIYU SKIP SHORTLINK

Next.js app with three resolver options. Responses are shown in the XIYU result panel (status, platform, destination, metadata, duration, errors, and Copy/Open actions).

## Resolver options

- **Safelinku / SFL** — uses the existing XIYU Safelinku API through `POST /api/bypass`.
- **Linkvertise** — parses Linkvertise link identifiers and queries the public Publisher GraphQL endpoint for the fields used by the supplied resolver (`target_host`, `title`, and `is_premium_only`). `direct-link.net` is handled by reading its redirect location and validating that it leads to a Linkvertise host.
- **LootLabs** — accepts the `https://loot-reward.com/t?cc=...` format from the supplied code, decodes the `cc` payload (base64url, with a second base64 decode when needed), and extracts its `link` field. It does not download files or crawl directory listings.

All resolver results use the same UI shape. The backend never sends the browser to a resolver site; the result card only offers Copy and an optional user-clicked Open for the returned destination.

## API

`POST /api/bypass`

```json
{
  "platform": "Linkvertise",
  "url": "https://linkvertise.com/123/example"
}
```

Supported `platform` values: `Safelinku / SFL`, `Linkvertise`, and `LootLabs`. For backwards compatibility, omitting `platform` defaults to Safelinku / SFL.

### Output fields

- `success`, `platform`, `input_url`
- `url` / `destination`
- optional `title`, `author`, `duration`, `elapsed_ms`, `is_premium_only`, `metadata`
- `error` on failures

## SFL upstream

`https://xiyu-safelinku-api.vercel.app/bypass?url=<encoded-url>`

The proxy forwards the upstream JSON and normalizes `destination` to `url` when necessary.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Build:

```bash
npm run build
npm start
```

## Project files

- `app/page.tsx` — selector, form, loading/result states.
- `app/api/bypass/route.ts` — server-side resolver dispatch.
- `app/globals.css` — styles.
- `public/hero.jpg` — hero image.
