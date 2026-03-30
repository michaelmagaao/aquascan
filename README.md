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
