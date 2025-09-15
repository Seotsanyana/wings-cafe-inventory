# deploy.ps1 - Automated Deployment Script
Write-Host "🚀 Starting Wings Cafe Deployment Process..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in project root directory!" -ForegroundColor Red
    Write-Host "💡 Please run this script from your project root" -ForegroundColor Yellow
    exit 1
}

# Function to check if command exists
function Test-Command {
    param($command)
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    return $exists
}

# Check for Git
if (-not (Test-Command "git")) {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check for Node.js (if project uses it)
if (Test-Path "package.json") {
    if (-not (Test-Command "node")) {
        Write-Host "❌ Node.js is not installed" -ForegroundColor Red
        exit 1
    }
    if (-not (Test-Command "npm")) {
        Write-Host "❌ npm is not installed" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Environment checks passed" -ForegroundColor Green

# Install dependencies if package.json exists
if (Test-Path "package.json") {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    npm ci
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Dependency installation failed!" -ForegroundColor Red
        exit 1
    }
}

# Run tests if available
if (Test-Path "package.json" -and (Test-Path "package.json")) {
    $packageContent = Get-Content "package.json" | ConvertFrom-Json
    if ($packageContent.scripts -and $packageContent.scripts.test) {
        Write-Host "🧪 Running tests..." -ForegroundColor Cyan
        npm test
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Tests failed! Aborting deployment." -ForegroundColor Red
            exit 1
        }
    }
}

# Build step if build script exists
if (Test-Path "package.json") {
    $packageContent = Get-Content "package.json" | ConvertFrom-Json
    if ($packageContent.scripts -and $packageContent.scripts.build) {
        Write-Host "🔨 Building project..." -ForegroundColor Cyan
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Build failed!" -ForegroundColor Red
            exit 1
        }
    }
}

# Git operations
Write-Host "📝 Committing changes..." -ForegroundColor Cyan

# Check if there are changes to commit
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "📭 No changes to commit" -ForegroundColor Yellow
    exit 0
}

# Add all files
git add .

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "deploy: automatic deployment $timestamp"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Commit failed!" -ForegroundColor Red
    exit 1
}

# Push to main branch
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌐 Your site should be live shortly on GitHub Pages" -ForegroundColor Magenta
