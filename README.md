<<<<<<< HEAD
# 🐟 AquaScan – AI Fish Identifier

AquaScan uses TensorFlow.js + MobileNet to identify fish species directly in your browser — no server required. Point your camera at a fish or upload a photo, and instantly get species info, habitat, conservation status, and fun facts.

## ✨ Features

- 📷 **Live camera scanning** – real-time fish identification via webcam/phone camera
- 📂 **Image upload** – scan any fish photo from your device
- 🧠 **On-device AI** – TensorFlow.js + MobileNet runs entirely in the browser (no data sent to servers)
- 🐠 **Rich species info** – family, habitat, size, lifespan, conservation status, fun facts
- 📤 **Social sharing** – share to Twitter/X, Facebook, copy info, or download a shareable card
- 🌊 **Beautiful oceanic UI** – bioluminescent design with animated particles

## 🚀 Quick Start (Local)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/aquascan.git
cd aquascan

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:5173 in your browser.

## 📦 Deploy to Vercel

### Option 1: One-click Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/aquascan)

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 3: GitHub Actions (CI/CD)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → select your repo
3. Get your Vercel credentials:
   - `VERCEL_TOKEN`: Settings → Tokens → Create
   - `VERCEL_ORG_ID`: Settings → General → Team ID
   - `VERCEL_PROJECT_ID`: Project Settings → General → Project ID
4. Add these as **GitHub Secrets** (Repo → Settings → Secrets → Actions)
5. Every push to `main` auto-deploys to production!

## 🐙 Deploy to GitHub Pages

```bash
npm run build
# Copy contents of /dist to your gh-pages branch
```

Or use the `gh-pages` package:

```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
npm run deploy
```

## 🧠 How the AI Works

AquaScan uses:
- **TensorFlow.js** – runs ML models in the browser via WebGL acceleration
- **MobileNet v2** – a lightweight image classification model pre-trained on ImageNet
- **Fish keyword matching** – maps MobileNet labels to a curated fish species database

The model identifies 10+ fish species: goldfish, shark, clownfish, tuna, salmon, trout, tilapia, carp, angelfish, bass, and more.

## 🗂 Project Structure

```
aquascan/
├── index.html          # Main app (all-in-one)
├── src/
│   └── fishData.js     # Fish species database
├── package.json
├── vite.config.js
├── vercel.json
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD pipeline
```

## 📱 Browser Support

- Chrome / Edge 88+ ✅
- Firefox 85+ ✅
- Safari 15+ ✅
- Mobile browsers (iOS Safari, Chrome Android) ✅

**Requires HTTPS for camera access** (Vercel provides this automatically).

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| TensorFlow.js | In-browser ML inference |
| MobileNet v2 | Image classification model |
| Vite | Build tool & dev server |
| Vanilla JS | App logic (no framework needed) |
| CSS3 | Animations & glassmorphism UI |

## 📄 License

MIT — free to use, modify, and distribute.
=======
# 🐟 AquaScan — Deployment Guide

AI-powered fish identification app. Uses Claude Vision to identify fish species from camera or uploaded photos.

---

## Project Structure

```
aquascan/
├── public/
│   └── index.html          # HTML shell
├── src/
│   └── App.js              # React frontend
├── api/
│   └── identify.js         # Vercel serverless proxy
├── netlify/
│   └── functions/
│       └── identify.js     # Netlify serverless proxy
├── package.json
├── vercel.json             # Vercel config
└── netlify.toml            # Netlify config
```

---

## Prerequisites

1. **Node.js** (v18+) — download from https://nodejs.org
2. **Anthropic API Key** — get one free at https://console.anthropic.com
3. A **Vercel** or **Netlify** account (both free)

---

## ▲ Deploy to Vercel (Recommended)

### Step 1 — Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Deploy
```bash
vercel
```
Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (select your account)
- Link to existing project? **N**
- Project name: **aquascan**
- Directory: **./** (press Enter)
- Override settings? **N**

### Step 4 — Add your API key
Go to: https://vercel.com/dashboard → Your Project → **Settings** → **Environment Variables**

Add:
| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-xxxxxxxxxxxxxxxx` |

### Step 5 — Redeploy to apply the env var
```bash
vercel --prod
```

✅ Your app is live at `https://aquascan-yourname.vercel.app`

---

## ◆ Deploy to Netlify

### Step 1 — Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Build the app
```bash
npm run build
```

### Step 4 — Deploy
```bash
netlify deploy --prod
```
- Publish directory: **build**

### Step 5 — Add your API key
Go to: https://app.netlify.com → Your Site → **Site Configuration** → **Environment Variables**

Add:
| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-xxxxxxxxxxxxxxxx` |

Then redeploy:
```bash
netlify deploy --prod
```

✅ Your app is live at `https://aquascan-yourname.netlify.app`

---

## 🚂 Deploy to Railway

### Step 1 — Add a start script
In `package.json`, the `start` script already runs `react-scripts start`.
Railway will auto-detect it as a Node.js app.

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial AquaScan deploy"
git remote add origin https://github.com/YOUR_USERNAME/aquascan.git
git push -u origin main
```

### Step 3 — Connect to Railway
1. Go to https://railway.app
2. New Project → Deploy from GitHub repo → select `aquascan`
3. Add environment variable: `ANTHROPIC_API_KEY = sk-ant-...`
4. Railway auto-builds and deploys

> **Note for Railway:** The `/api/identify` proxy uses Vercel's function format.
> For Railway, you'll need to add a small Express server. Ask for the Railway-specific
> version if needed.

---

## Running Locally

```bash
npm install
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
npm start
```

Open http://localhost:3000

> The local dev server proxies `/api/*` requests automatically via `react-scripts`.

---

## Cost Estimate

Each fish scan uses ~800 tokens (image + text). At Anthropic's current pricing:
- ~$0.002–0.004 per scan
- 1,000 scans ≈ $2–4

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "ANTHROPIC_API_KEY not set" | Add env var in your platform dashboard and redeploy |
| Camera not working | Make sure your site uses HTTPS (required for camera access) |
| "No fish detected" | Use a clearer, well-lit photo with the fish filling the frame |
| Build fails | Make sure you're on Node.js 18+ (`node --version`) |
>>>>>>> 75a0e14820129ac34c2f2a272dbccb81391e60fe
