# ========================================
# AUDIO JONES ENV SYNC SCRIPT
# Copies / Validates .env.master across environments
# ========================================

Write-Host "`n=== SYNCING ENV FILES ===`n"

# 1. Define paths
$root = (Get-Location).Path
$envDir = Join-Path $root "env"
$masterPath = Join-Path $envDir ".env.master"
$localPath  = Join-Path $root ".env.local"
$examplePath = Join-Path $envDir ".env.example"

# 2. Safety check
if (!(Test-Path $masterPath)) {
    Write-Host "❌ Missing $masterPath"
    exit 1
}

# 3. Copy master -> local
Copy-Item $masterPath $localPath -Force
Write-Host "✅ Copied .env.master → .env.local"

# 4. Create/update .env.example (strip values)
(Get-Content $masterPath) |
ForEach-Object {
    if ($_ -match "^[A-Za-z_0-9]+=") {
        $key = ($_ -split "=",2)[0]
        "$key="
    } else { $_ }
} | Set-Content $examplePath -Encoding UTF8
Write-Host "✅ Created / Updated .env.example"

# 5. Basic validation
$lines = Get-Content $localPath | Where-Object {$_ -match "=" -and $_ -notmatch "^#"}
$bad = @()
foreach ($line in $lines) {
    if ($line -notmatch "^[A-Z0-9_]+=") { $bad += $line }
}
if ($bad.Count -gt 0) {
    Write-Host "`n⚠️ Found malformed lines:"
    $bad | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "`n✅ Basic syntax validation passed."
}

# 6. Show preview
Write-Host "`n=== Preview (.env.local first 10 lines) ===`n"
Get-Content $localPath -TotalCount 10 | ForEach-Object { Write-Host $_ }

Write-Host "`n=== SYNC COMPLETE ===`n"