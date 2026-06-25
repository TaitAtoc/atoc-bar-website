#Requires -Version 5.1
$ErrorActionPreference = 'Stop'

$ScriptDir    = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot  = Split-Path -Parent $ScriptDir
$ThemeDir     = Join-Path $ProjectRoot 'atoc-bar-theme'
$DistDir      = Join-Path $ProjectRoot 'dist'
$PublicAssets = Join-Path $ProjectRoot 'public\assets'
$ThemeAssets  = Join-Path $ThemeDir 'assets'

Write-Host "`n=== BUILD ATOC THEME ===" -ForegroundColor Cyan
Write-Host "Project : $ProjectRoot"
Write-Host "Theme   : $ThemeDir"
Write-Host "Dist    : $DistDir"

# -----------------------------------------------------------------------
# Step 1: Vite production build
# -----------------------------------------------------------------------
Write-Host "`n--- Step 1: npm run build ---" -ForegroundColor Yellow
Push-Location $ProjectRoot
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build exited $LASTEXITCODE" }
} finally {
    Pop-Location
}
Write-Host "Build OK" -ForegroundColor Green

# -----------------------------------------------------------------------
# Step 2: Locate hashed JS and CSS outputs in dist/assets/
# -----------------------------------------------------------------------
Write-Host "`n--- Step 2: Locate compiled assets ---" -ForegroundColor Yellow
$DistAssetsDir = Join-Path $DistDir 'assets'

$JsFiles  = @(Get-ChildItem $DistAssetsDir -Filter 'index-*.js'  -ErrorAction SilentlyContinue)
$CssFiles = @(Get-ChildItem $DistAssetsDir -Filter 'index-*.css' -ErrorAction SilentlyContinue)

if ($JsFiles.Count  -eq 0) { throw "No compiled JS found in $DistAssetsDir" }
if ($CssFiles.Count -eq 0) { throw "No compiled CSS found in $DistAssetsDir" }

$JsFile  = $JsFiles[0]
$CssFile = $CssFiles[0]
Write-Host "JS  : $($JsFile.Name)"  -ForegroundColor Green
Write-Host "CSS : $($CssFile.Name)" -ForegroundColor Green

# -----------------------------------------------------------------------
# Step 3: Copy JS and CSS to stable names in atoc-bar-theme/assets/
# -----------------------------------------------------------------------
Write-Host "`n--- Step 3: Copy compiled assets to theme ---" -ForegroundColor Yellow
$ThemeJsDir  = Join-Path $ThemeAssets 'js'
$ThemeCssDir = Join-Path $ThemeAssets 'css'
New-Item -ItemType Directory -Force -Path $ThemeJsDir  | Out-Null
New-Item -ItemType Directory -Force -Path $ThemeCssDir | Out-Null

Copy-Item $JsFile.FullName  (Join-Path $ThemeJsDir  'app.js')  -Force
Copy-Item $CssFile.FullName (Join-Path $ThemeCssDir 'app.css') -Force
Write-Host "Copied -> atoc-bar-theme/assets/js/app.js"   -ForegroundColor Green
Write-Host "Copied -> atoc-bar-theme/assets/css/app.css" -ForegroundColor Green

# -----------------------------------------------------------------------
# Step 4: Sync static image assets from public/assets/ to theme/assets/
# -----------------------------------------------------------------------
Write-Host "`n--- Step 4: Sync static assets ---" -ForegroundColor Yellow
foreach ($Sub in @('brand', 'legacy', 'photos', 'references')) {
    $Src = Join-Path $PublicAssets $Sub
    $Dst = Join-Path $ThemeAssets  $Sub
    if (Test-Path $Src) {
        New-Item -ItemType Directory -Force -Path $Dst | Out-Null
        $Items = @(Get-ChildItem $Src -File)
        foreach ($Item in $Items) {
            Copy-Item $Item.FullName (Join-Path $Dst $Item.Name) -Force
        }
        Write-Host "Synced $($Items.Count) file(s) -> assets/$Sub" -ForegroundColor Green
    } else {
        Write-Host "Skipped (not found): assets/$Sub" -ForegroundColor Gray
    }
}

Write-Host "`n=== BUILD COMPLETE ===" -ForegroundColor Green
Write-Host "Theme ready at : $ThemeDir"
Write-Host "Run next       : .\tools\Test-ATOC-SafetyScan.ps1"
