[CmdletBinding()]
param(
    [switch]$Serve
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot

function Write-Step([string]$Message) {
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Refresh-ProcessPath {
    $machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $env:Path = "$machinePath;$userPath"
}

function Test-Command([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

Set-Location -LiteralPath $projectRoot

Write-Step 'Checking Windows tools'
if (-not (Test-Command 'ruby')) {
    if (-not (Test-Command 'winget')) {
        throw @'
Ruby is not installed, and Windows Package Manager (winget) is unavailable.
Install "App Installer" from Microsoft Store, reopen this file, and run it again:
https://apps.microsoft.com/detail/9nblggh4nns1
'@
    }

    Write-Step 'Installing Ruby with DevKit'
    & winget install --id RubyInstallerTeam.RubyWithDevKit.3.3 --exact `
        --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0) {
        throw "Ruby installation failed (winget exit code $LASTEXITCODE)."
    }
    Refresh-ProcessPath
}

if (-not (Test-Command 'ruby')) {
    throw 'Ruby was installed but is not visible yet. Close this window and run __JEKYLL_SETUP.bat again.'
}

Write-Host ("Ruby: " + (& ruby --version))

if (Test-Command 'ridk') {
    Write-Step 'Checking the Ruby native build toolchain'
    & ridk enable
    & ridk install 3
    if ($LASTEXITCODE -ne 0) {
        throw "Ruby DevKit setup failed (ridk exit code $LASTEXITCODE)."
    }
}

if (-not (Test-Command 'bundle')) {
    Write-Step 'Installing Bundler'
    & gem install bundler --no-document
    if ($LASTEXITCODE -ne 0) {
        throw "Bundler installation failed (gem exit code $LASTEXITCODE)."
    }
    Refresh-ProcessPath
}

if (-not (Test-Command 'bundle')) {
    throw 'Bundler was installed but is not visible yet. Close this window and run __JEKYLL_SETUP.bat again.'
}

Write-Host ("Bundler: " + (& bundle --version))

Write-Step 'Installing this wiki dependency set'
& bundle install
if ($LASTEXITCODE -ne 0) {
    throw "Wiki dependency installation failed (bundle exit code $LASTEXITCODE)."
}

Write-Step 'Verifying the Jekyll site build'
& bundle exec jekyll build
if ($LASTEXITCODE -ne 0) {
    throw "Jekyll build failed (exit code $LASTEXITCODE)."
}

Write-Step 'Verifying the local server runtime'
& bundle exec ruby -e "require 'webrick'; puts 'WEBrick: ' + WEBrick::VERSION"
if ($LASTEXITCODE -ne 0) {
    throw "Jekyll server dependency verification failed (exit code $LASTEXITCODE)."
}

Write-Host "`nSetup complete." -ForegroundColor Green
Write-Host 'Run __JEKYLL_LOCAL.bat to open the local wiki at http://127.0.0.1:4000/'

if ($Serve) {
    Write-Step 'Starting the local Jekyll server'
    & bundle exec jekyll serve --incremental --trace
    exit $LASTEXITCODE
}
