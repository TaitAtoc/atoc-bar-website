#Requires -Version 5.1
param(
  [string]$ProjectRoot  = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [string]$ManifestPath = (Join-Path $ProjectRoot 'public\assets\photos\media-manifest.json')
)

$ErrorActionPreference = 'Stop'

function Write-CheckLog {
  param([string]$Level, [string]$Message)
  $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
  Write-Host "[$stamp] [$Level] $Message"
}

function Convert-ToRelativeAssetPath {
  param([string]$AssetReference)
  $clean = $AssetReference -replace '^\$\{b\}', ''
  $clean = $clean.TrimStart('/')
  return $clean
}

$failures = New-Object System.Collections.Generic.List[string]

Write-Host ""
Write-Host "=== ATOC MEDIA REFERENCE CHECK ===" -ForegroundColor Cyan
Write-Host "Project : $ProjectRoot"
Write-Host ""

Write-CheckLog 'INFO' "Project root: $ProjectRoot"

if (-not (Test-Path -LiteralPath $ProjectRoot)) {
  throw "Project root does not exist: $ProjectRoot"
}

Write-Host ""
Write-Host "  IMPORTANT - FULL WP UPLOADS / MEDIA EXPORT STILL REQUIRED" -ForegroundColor Yellow
Write-Host "  The 48-image public crawl is an INCOMPLETE snapshot of the live WordPress" -ForegroundColor Yellow
Write-Host "  Media Library. Images not visible on the homepage, unpublished media," -ForegroundColor Yellow
Write-Host "  alternate crop sizes, PDFs, and removed-but-needed uploads may be missing." -ForegroundColor Yellow
Write-Host "  Do NOT treat this manifest as the authoritative source library." -ForegroundColor Yellow
Write-Host "  Next required step: copy or export full wp-content/uploads from the host." -ForegroundColor Yellow
Write-Host ""

if (Test-Path -LiteralPath $ManifestPath) {
  Write-CheckLog 'INFO' "Checking manifest: $ManifestPath"
  $manifest = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json

  Write-CheckLog 'INFO' "Manifest status: $($manifest.status)"

  if ($manifest.status -ne 'approved') {
    Write-CheckLog 'WARN' "Manifest is not approved for production use (status: $($manifest.status))"
  }

  foreach ($entry in $manifest.entries) {
    if (-not $entry.local_path) {
      $failures.Add('Manifest entry missing local_path')
      continue
    }
    $localRelative = $entry.local_path -replace '/', '\'
    $candidate = Join-Path $ProjectRoot $localRelative
    if (-not (Test-Path -LiteralPath $candidate)) {
      $failures.Add("Missing manifest media file: $($entry.local_path)")
    }
  }
} else {
  Write-CheckLog 'WARN' "Manifest not found at $ManifestPath"
}

$siteDataPath = Join-Path $ProjectRoot 'src\data\siteData.js'
if (Test-Path -LiteralPath $siteDataPath) {
  Write-CheckLog 'INFO' "Checking siteData asset references: $siteDataPath"
  $source = Get-Content -LiteralPath $siteDataPath -Raw
  $assetMatches = [regex]::Matches($source, 'assets\/(?:brand|legacy|references|photos)\/[^\s''"`)+]+')

  foreach ($m in $assetMatches) {
    $relative  = Convert-ToRelativeAssetPath -AssetReference $m.Value
    $candidate = Join-Path (Join-Path $ProjectRoot 'public') ($relative -replace '/', '\')
    if (-not (Test-Path -LiteralPath $candidate)) {
      $failures.Add("Missing siteData media reference: $relative")
    }
  }
} else {
  Write-CheckLog 'WARN' "siteData.js not found; skipping source reference scan."
}

Write-Host ""

if ($failures.Count -gt 0) {
  Write-CheckLog 'FAIL' "$($failures.Count) media reference issue(s) found."
  foreach ($f in $failures) {
    Write-Host "  x  $f" -ForegroundColor Red
  }
  Write-Host ""
  Write-Host "Resolve missing references before packaging the WordPress theme." -ForegroundColor Red
  exit 1
}

Write-CheckLog 'PASS' "All checked media references resolve to local files."
Write-Host ""
Write-Host "  NOTE: PASS means all LOCAL references are present." -ForegroundColor Yellow
Write-Host "  It does NOT confirm the crawl is complete or image rights are cleared." -ForegroundColor Yellow
Write-Host "  Obtain the full wp-content/uploads export before deployment." -ForegroundColor Yellow
Write-Host ""
exit 0
