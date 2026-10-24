@echo off
echo =======================================================
echo   STARTING AGRIFUSION AI FULL-STACK APPLICATION
echo =======================================================
echo.

echo Starting Python FastAPI ML Service on port 8000...
start "AgriFusion - ML Service" cmd /k "cd ml-service && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo Starting Express API Backend on port 5000...
start "AgriFusion - Express Backend" cmd /k "cd backend && npm.cmd start"

echo Starting Vite React Frontend on port 5173...
start "AgriFusion - React Frontend" cmd /k "cd frontend && npm.cmd run dev"

echo.
echo All microservices launched!
echo - Frontend UI:        http://localhost:5173
echo - Express Gateway:    http://localhost:5000/api
echo - ML Inference API:   http://localhost:8000/docs
echo =======================================================
