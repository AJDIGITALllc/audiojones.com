@echo off
REM Vercel Failed Deployment Log Downloader
REM Usage: run-vercel-logs.bat YOUR_VERCEL_TOKEN

if "%1"=="" (
    echo Usage: %0 YOUR_VERCEL_TOKEN
    echo Example: %0 vercel_abcd1234...
    echo.
    echo Get your token from: https://vercel.com/account/tokens
    pause
    exit /b 1
)

set VERCEL_TOKEN=%1
set PROJECT_NAME=audiojones.com

echo Downloading failed deployment logs for %PROJECT_NAME%...
echo Using token: %VERCEL_TOKEN:~0,10%...
echo.

powershell -ExecutionPolicy Bypass -File "scripts\get-vercel-failed-logs.ps1" -VercelToken "%VERCEL_TOKEN%" -ProjectName "%PROJECT_NAME%"

echo.
echo Done! Check the vercel-failed-logs folder for results.
pause