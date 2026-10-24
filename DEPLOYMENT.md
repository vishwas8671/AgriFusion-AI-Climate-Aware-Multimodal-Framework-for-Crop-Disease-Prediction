# 🚀 STEP-BY-STEP CLOUD DEPLOYMENT MANUAL
## AgriFusion AI: Climate-Aware Multimodal Crop Disease Prediction & Early Warning System

Your repository is completely initialized, tested, committed to Git (`branch: main`), and configured with Infrastructure-as-Code blueprints (`render.yaml`, `frontend/vercel.json`, `docker-compose.yml`, `.github/workflows/ci.yml`).

Follow this 4-step deployment to bring AgriFusion AI live on the public web.

---

### STEP 1: Push Code to Your GitHub Account

1. Go to **[github.com/new](https://github.com/new)** and create a new repository:
   - Repository name: `agrifusion-ai`
   - Privacy: **Public** or **Private**
   - **Do NOT** initialize with README or .gitignore (we already have clean versions).

2. In your terminal, run the following two commands (replace with your GitHub username):
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/agrifusion-ai.git
git push -u origin main
```

Your automated GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`) will immediately trigger and verify the ML tests, backend tests, and frontend build on GitHub.

---

### STEP 2: Deploy Backend & ML Service on Render (1-Click Blueprint)

We have created [`render.yaml`](./render.yaml) which automatically sets up both the **FastAPI Python ML Worker** and the **Express API Gateway** on Render's free tier.

1. Go to **[dashboard.render.com](https://dashboard.render.com/)** and sign in with GitHub.
2. Click **"New +"** in the top right and select **"Blueprint"**.
3. Connect your `agrifusion-ai` GitHub repository.
4. Render will read `render.yaml` and show:
   - `agrifusion-ml` (Python 3.13 / FastAPI / PyTorch CPU)
   - `agrifusion-backend` (Node.js 20 / Express API Gateway)
5. Click **"Apply"**.
6. Render will automatically build and deploy both microservices with SSL (`https://agrifusion-backend.onrender.com` and `https://agrifusion-ml.onrender.com`).

> **Tip**: If you wish to use cloud MongoDB instead of the built-in in-memory fallback, go to `agrifusion-backend` in Render -> **Environment** -> Add `MONGODB_URI` with your MongoDB Atlas connection string.

---

### STEP 3: Deploy Frontend on Vercel

1. Go to **[vercel.com](https://vercel.com/)** and sign in with GitHub.
2. Click **"Add New Project"** -> Select your `agrifusion-ai` repository.
3. Configure project settings:
   - **Root Directory**: Click "Edit" and choose `frontend`.
   - **Framework Preset**: `Vite` (automatically detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **"Environment Variables"** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://agrifusion-backend.onrender.com/api` *(Your Render backend URL from Step 2)*
5. Click **"Deploy"**.

Within 45 seconds, your frontend will be live on a custom global CDN URL (e.g., `https://agrifusion-ai.vercel.app`) with automatic HTTPS and SPA routing enabled via [`frontend/vercel.json`](./frontend/vercel.json).

---

### STEP 4: Live URL Verification Checklist

Once deployed, verify the public endpoints:
- [ ] **Frontend**: `https://<your-app>.vercel.app/`
- [ ] **Backend Health**: `https://<your-backend>.onrender.com/api/health`
- [ ] **ML Service Docs**: `https://<your-ml>.onrender.com/docs`
- [ ] **Diagnostic Inference**: Upload a leaf image on `/analyze` and confirm real-time Grad-CAM heatmap generation on the cloud!

---

### Summary of Deployment Artifacts in this Repository

| File | Purpose |
| :--- | :--- |
| [`render.yaml`](./render.yaml) | Render Infrastructure as Code (FastAPI + Express microservices) |
| [`frontend/vercel.json`](./frontend/vercel.json) | Vercel SPA routing rewrites and asset caching rules |
| [`netlify.toml`](./netlify.toml) | Alternative Netlify single-click configuration |
| [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | GitHub Actions CI/CD running tests on push |
| [`docker-compose.yml`](./docker-compose.yml) | Docker multi-container orchestration for self-hosted servers |
| [`docs/deployment_guide.md`](./docs/deployment_guide.md) | Comprehensive deployment architecture specifications |
