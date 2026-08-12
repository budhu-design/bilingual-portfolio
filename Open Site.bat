@echo off
cd /d "%~dp0"

echo Checking for an existing dev server on port 3000...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo Stopping stale process %%p to avoid a corrupted build cache...
    taskkill /PID %%p /F >nul 2>&1
)

if exist ".next" (
    echo Clearing stale build cache...
    rmdir /s /q ".next"
)

echo Starting dev server...
start "WEBSITEEEEE dev server" cmd /k npm run dev
timeout /t 5 /nobreak > nul
start "" http://localhost:3000/

echo.
echo Other pages once it's running:
echo   http://localhost:3000/animations-demo   (animation kit showcase)
echo   http://localhost:3000/contact           (shakha locator map)
echo   http://localhost:3000/portal/signup     (member signup)
echo   http://localhost:3000/portal/login      (member login)
echo   http://localhost:3000/admin             (admin tools, requires an admin account)
