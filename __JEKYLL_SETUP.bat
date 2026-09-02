@echo off
setlocal
cd /d "%~dp0"

echo Checking and installing the tools required for the local Jekyll wiki...
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tool\setup-jekyll-windows.ps1"
set "setup_exit=%ERRORLEVEL%"

if not "%setup_exit%"=="0" (
    echo.
    echo Setup did not finish successfully. Review the message above.
    pause
)

exit /b %setup_exit%
