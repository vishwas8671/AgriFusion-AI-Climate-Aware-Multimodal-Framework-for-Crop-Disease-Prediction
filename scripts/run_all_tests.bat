@echo off
echo =======================================================
echo   AGRIFUSION AI - RUNNING COMPREHENSIVE TEST SUITE
echo =======================================================
echo.

echo [1/3] Running Python PyTorch ML Service Tests (pytest)...
python -m pytest ml-service/tests/test_ml.py -v
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python ML tests failed.
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Running Express API Backend Tests (node --test)...
cd backend
cmd /c npm.cmd test
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Backend API tests failed.
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo [3/3] Validating Frontend Production Build (vite build)...
cd frontend
cmd /c npm.cmd run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Frontend build failed.
    exit /b %ERRORLEVEL%
)
cd ..

echo.
echo =======================================================
echo   ALL SUITES PASSED CLEANLY (Zero Failures)!
echo =======================================================
