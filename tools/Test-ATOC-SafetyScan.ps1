#Requires -Version 5.1
$ErrorActionPreference = 'Stop'

$ScriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$ThemeDir    = Join-Path $ProjectRoot 'atoc-bar-theme'
$ThemeAssets = Join-Path $ThemeDir 'assets'

Write-Host ""
Write-Host "=== ATOC THEME SAFETY SCAN ===" -ForegroundColor Cyan
Write-Host "Project : $ProjectRoot"
Write-Host "Scanning: $ThemeDir"
Write-Host ""

# Forbidden strings - any match blocks deployment
$Forbidden = @(
    'Phase B',
    'Local Review Site',
    'review site',
    'legacy copy',
    'confirm before publishing',
    'Beijing',
    'Zhujiang',
    'Tianhe',
    'placeholder address',
    'fake opening hours',
    'unconfirmed schema',
    'Elementor-only layout dependency',
    '[Confirm address]',
    '[Confirm opening hours]',
    '[Confirm phone',
    '[Confirm map',
    '[Confirm event',
    'Internal contact sheet',
    'replace before publish',
    'Review image rights',
    'Confirm current offer',
    'Confirm day, terms',
    'Confirm current menu',
    'Confirm whether offer',
    'pending confirmation',
    'Schedule pending',
    'Needs update',
    'Legacy promo'
)

# Collect files: PHP/CSS in theme root + compiled JS bundle
$ScanFiles = [System.Collections.Generic.List[string]]::new()

if (Test-Path $ThemeDir) {
    Get-ChildItem $ThemeDir -Include '*.php', '*.css' -Recurse -File |
        ForEach-Object { $ScanFiles.Add($_.FullName) }
}

$CompiledJs = Join-Path $ThemeAssets 'js\app.js'
if (Test-Path $CompiledJs) {
    $ScanFiles.Add($CompiledJs)
} else {
    Write-Host "WARNING: $CompiledJs not found. Run Build-ATOC-Theme.ps1 first." -ForegroundColor Yellow
    Write-Host ""
}

if ($ScanFiles.Count -eq 0) {
    Write-Host "No theme files found. Run Build-ATOC-Theme.ps1 first." -ForegroundColor Red
    exit 1
}

Write-Host "Scanning $($ScanFiles.Count) file(s)..."

# Scan each file for each forbidden pattern
$Findings = [System.Collections.Generic.List[PSObject]]::new()

foreach ($FilePath in $ScanFiles) {
    $RelPath = $FilePath.Replace($ProjectRoot + '\', '')
    $Content = [System.IO.File]::ReadAllText($FilePath, [System.Text.Encoding]::UTF8)

    foreach ($Pattern in $Forbidden) {
        $Escaped = [regex]::Escape($Pattern)
        if ([regex]::IsMatch($Content, $Escaped, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
            $Findings.Add([PSCustomObject]@{
                File    = $RelPath
                Pattern = $Pattern
            })
        }
    }
}

Write-Host ""

if ($Findings.Count -eq 0) {
    Write-Host "=== SCAN PASSED - No forbidden strings found ===" -ForegroundColor Green
    Write-Host "Theme is clean for deployment."
    $ExitCode = 0
} else {
    Write-Host "=== SCAN FAILED - $($Findings.Count) issue(s) found ===" -ForegroundColor Red
    Write-Host ""
    $GroupedByFile = $Findings | Group-Object File
    foreach ($Group in $GroupedByFile) {
        Write-Host "  $($Group.Name)" -ForegroundColor Yellow
        foreach ($F in $Group.Group) {
            Write-Host "    x  $($F.Pattern)" -ForegroundColor Red
        }
    }
    Write-Host ""
    Write-Host "Resolve all issues before deploying to the live server." -ForegroundColor Red
    Write-Host "Replace placeholder content with confirmed ATOC data." -ForegroundColor Red
    $ExitCode = 1
}

exit $ExitCode
