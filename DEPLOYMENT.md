# XYZ Games.site — Deployment & Domain Guide

## 1. Run Locally

```bash
cd xyz-games-site
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview the production build locally
```

---

## 2. Deploy to Vercel (Main Domain)

### Option A — Vercel CLI

```bash
npm install -g vercel
cd xyz-games-site
vercel --prod
```

### Option B — Vercel Dashboard

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Go to https://vercel.com/new and import the repository.
3. Settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**.

### Add Custom Domain (xyzgames.site)

1. In Vercel Dashboard → your project → **Settings → Domains**.
2. Add `xyzgames.site` and `www.xyzgames.site`.
3. Vercel will give you DNS records. Add them at your domain registrar:
   - **A record:** `@` → `76.76.21.21`
   - **CNAME:** `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48h, usually minutes).

---

## 3. Add Branded Game Subdomains

Each game is on its **own existing Vercel project**. To give it a branded subdomain:

### Step-by-step for each game

1. Open the **game's Vercel project** (not the portal project).
2. Go to **Settings → Domains**.
3. Add `game1.xyzgames.site` (replace `game1` with your chosen slug).
4. At your DNS registrar, add:
   - **CNAME:** `game1` → `cname.vercel-dns.com`
5. Verify in Vercel — it will auto-provision an SSL certificate.

Repeat for each game:
```
game2.xyzgames.site → game2's Vercel project
game3.xyzgames.site → game3's Vercel project
...
```

### Then update src/data/games.ts

```ts
{
  id:           "game-001",
  name:         "My Game",
  slug:         "my-game",
  originalUrl:  "https://my-game.vercel.app",   // keep as fallback
  customDomain: "https://game1.xyzgames.site",  // branded subdomain
  launchMode:   "subdomain",                     // or "direct"
  published:    true,
}
```

---

## 4. SPA Routing

`vercel.json` already includes the rewrite rule that makes React Router work:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

All routes (`/discover`, `/game/:slug`, etc.) will serve `index.html` and React Router handles navigation.

---

## 5. Adding a Game (Quick Reference)

Edit `src/data/games.ts`:

```ts
export const games: Game[] = [
  {
    id:          "game-001",
    name:        "Space Blaster",
    slug:        "space-blaster",
    description: "Destroy enemy ships in this fast-paced space shooter.",
    thumbnail:   "/games/space-blaster-thumb.webp",   // 480×270px
    banner:      "/games/space-blaster-banner.webp",  // 1280×720px
    category:    "action",          // must match id in categories.ts
    tags:        ["shooter", "space", "arcade"],
    originalUrl: "https://space-blaster.vercel.app",
    customDomain: "https://game1.xyzgames.site",
    launchMode:  "direct",          // or "subdomain" or "embed"
    featured:    true,
    published:   true,              // ← must be true to appear on site
    instructions: "Move with arrow keys, shoot with Space.",
    controls:    ["← → Arrow keys: move", "Space: shoot", "P: pause"],
    releaseDate: "2024-06-01",
    developer:   "XYZ Games",
  },
];
```

Place images in `public/games/` before deploying.

---

## 6. AdSense Setup

The AdSense integration is disabled by default. Live ads require an approved AdSense account, a real publisher ID, and ad unit IDs.

1. Create ad units in AdSense. For local development, `.env.example` can be copied to `.env.local`; keep ads disabled locally.
2. Set `VITE_ADSENSE_CLIENT_ID` to your `ca-pub-...` publisher ID and populate the slot IDs for the placements you want to use.
3. Set `VITE_ADSENSE_ENABLED=true` only after approval. Ads are loaded only in production builds, only for slots with valid IDs. The official AdSense script is added once when the first configured slot appears.
4. In Vercel, add the variables under **Project Settings → Environment Variables** for Production only, then redeploy. Do not enable ads in Preview or Development to avoid test impressions.
5. Update `public/ads.txt` with your real publisher record and remove its instructional comments before deploying. Do not publish a placeholder publisher ID.

Before enabling ads for users in the EEA, UK, or Switzerland, configure a Google-certified consent management platform in AdSense **Privacy & messaging**. This site does not provide its own consent-management UI.

The site includes ad placements on the home page, game listings, discovery, game details, and around the standalone game player. Missing slot IDs leave the development placeholder in place; no live ad request is made for those slots.

---

## 7. In-Game H5 Ads SDK

Each game is an independent Vercel project. To add Google H5 Games Ads to a game:

1. Apply for the [H5 Games Ads programme](https://support.google.com/adsense/answer/9839882).
2. Once approved, add the H5 SDK script **to that game's own codebase**:
   ```html
   <script async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"
     crossorigin="anonymous">
   </script>
   ```
3. Implement interstitial or rewarded ad placements inside the game.
4. The portal (`xyzgames.site`) does **not** inject any scripts into games — the portal and game advertising are always independent.

---

## 8. Environment Variables (Optional)

For CI/CD you may want:

```bash
# .env.local (not committed)
VITE_SITE_URL=https://xyzgames.site
```

Currently all config is in `src/data/siteConfig.ts` — no env vars required.
