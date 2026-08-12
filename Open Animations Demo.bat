@echo off
cd /d "%~dp0"
echo Starting dev server...
start "WEBSITEEEEE dev server" cmd /k npm run dev
timeout /t 5 /nobreak > nul
start "" http://localhost:3000/animations-demo
