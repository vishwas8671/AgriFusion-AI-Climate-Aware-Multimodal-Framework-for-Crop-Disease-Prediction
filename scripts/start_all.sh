#!/usr/bin/env bash
# AgriFusion AI - Master Startup Script

echo "======================================================="
echo "  STARTING AGRIFUSION AI FULL-STACK PLATFORM"
echo "======================================================="

# Start ML Service
echo "Starting FastAPI ML Service on :8000..."
(cd ml-service && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload) &
ML_PID=$!

# Start Backend
echo "Starting Express Backend on :5000..."
(cd backend && npm start) &
BACKEND_PID=$!

# Start Frontend
echo "Starting React Frontend on :5173..."
(cd frontend && npm run dev) &
FRONTEND_PID=$!

echo "All services running:"
echo " - Frontend:   http://localhost:5173"
echo " - Express:    http://localhost:5000/api"
echo " - ML Service: http://localhost:8000/docs"
echo "Press Ctrl+C to terminate all services."

trap "kill $ML_PID $BACKEND_PID $FRONTEND_PID" SIGINT SIGTERM
wait
