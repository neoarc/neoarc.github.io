@echo off
setlocal
cd /d "%~dp0"

where bundle >nul 2>nul
if errorlevel 1 (
    echo Jekyll tools are not installed yet.
    echo Run __JEKYLL_SETUP.bat first.
    pause
    exit /b 1
)

echo Starting the wiki at http://127.0.0.1:4000/
echo Press Ctrl+C to stop it.
bundle exec jekyll serve --incremental --trace
