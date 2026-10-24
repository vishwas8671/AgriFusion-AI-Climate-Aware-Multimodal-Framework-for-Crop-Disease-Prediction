# CLOUD DEPLOYMENT & PRODUCTION HOSTING GUIDE
## AgriFusion AI: Climate-Aware Multimodal Crop Disease Prediction and Early Warning System

This guide outlines deployment of AgriFusion AI to production cloud hosting platforms (Vercel, Render, and MongoDB Atlas).

---

### 1. Database Deployment: MongoDB Atlas

1. **Create Free M0 Cluster**:
   - Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a free shared cluster (AWS / GCP free tier).
2. **Database Access**:
   - Create a database user (e.g. `agrifusion_admin`) with strong password.
3. **Network Access**:
   - In IP Access List, add `0.0.0.0/0` (Allow Access from Anywhere) to permit connections from Render cloud instances.
4. **Connection String**:
   - Copy URI: `mongodb+srv://<username>:<password>@cluster0.agrifusion.mongodb.net/agrifusion_ai?retryWrites=true&w=majority`.

---

### 2. Machine Learning Microservice Deployment: Render

Deploy Python FastAPI worker as a Web Service on Render:
- **Build Command**: `pip install -r ml-service/requirements.txt`
- **Start Command**: `python -m uvicorn ml-service.app.main:app --host 0.0.0.0 --port $PORT`
- **Root Directory**: `.` (or `ml-service`)
- **Environment Variables**:
  - `PORT`: `8000`
  - `MODEL_BACKBONE`: `efficientnet_b0`
  - `DEVICE`: `cpu`
- **Free Tier Considerations**:
  - Render free tier provides 512 MB RAM. EfficientNet-B0 requires ~120 MB RAM, running comfortably within Render's free quota.
  - Instances sleep after 15 minutes of inactivity; allow ~40s cold-start on first wakeup.

---

### 3. Application Backend Gateway Deployment: Render

Deploy Express API server as a Web Service on Render:
- **Build Command**: `npm install --production`
- **Start Command**: `node src/server.js`
- **Root Directory**: `backend`
- **Environment Variables**:
  - `PORT`: `5000`
  - `NODE_ENV`: `production`
  - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
  - `JWT_SECRET`: `<A secure 64-character random string>`
  - `ML_SERVICE_URL`: `https://agrifusion-ml.onrender.com`
- **CORS Configuration**:
  - Set `CORS` origin to match your frontend domain (e.g. `https://agrifusion-ai.vercel.app`).

---

### 4. Frontend Web Application Deployment: Vercel

Deploy React + Vite client on Vercel:
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://agrifusion-backend.onrender.com/api`
- **Rewrite Rules (`vercel.json`)**:
  Create `frontend/vercel.json` to handle client-side routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### 5. Local Production-Mode Verification

To run and verify the entire stack locally without cloud accounts:
```bash
# 1. Run all tests
scripts/run_all_tests.bat

# 2. Launch all services simultaneously
scripts/start_all.bat
```
Visit `http://localhost:5173` to test live inference.
