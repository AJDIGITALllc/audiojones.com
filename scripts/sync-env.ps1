# ========================================
# AUDIO JONES ENV SYNC + VERCEL PULL/PUSH
# ========================================

Write-Host "`n=== AUDIO JONES ENVIRONMENT SYNC ===`n"

# 0. Try to pull current Vercel envs first so we don't overwrite newer values in the cloud
$doPull = Read-Host "Pull current Vercel envs to .env.local first? (recommended) (y/n)"
if ($doPull -eq "y") {
    Write-Host "`n→ Pulling Vercel envs into .env.local ..."
    vercel env pull .env.local
    Write-Host "✅ Vercel envs pulled into .env.local"
} else {
    Write-Host "⏩ Skipped Vercel pull."
}

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

# 3. Copy master -> local (master is our canonical key list)
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
Write-Host "✅ Created / Updated /env/.env.example"

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

# 7. Ask to push to Vercel
Write-Host "`n=== Vercel sync (push) ==="
$doVercel = Read-Host "Do you want to push these env vars to Vercel now? (y/n)"
if ($doVercel -eq "y") {

    # Local-only keys we never want to push
    $ignoreList = @(
        "LOCAL_DEV",
        "LOCAL_GITHUB_TOKEN",
        "LOCAL_PERPLEXITY_TOKEN",
        "LOCAL_JULES_TOKEN"
    )

    $masterLines = Get-Content $masterPath

    foreach ($line in $masterLines) {
        if ([string]::IsNullOrWhiteSpace($line)) { continue }
        if ($line.Trim().StartsWith("#")) { continue }

        $parts = $line -split "=",2
        $key = $parts[0].Trim()

        if ([string]::IsNullOrWhiteSpace($key)) { continue }

        if ($ignoreList -contains $key) {
            Write-Host "⏩ Skipping $key (local-only)"
            continue
        }

        Write-Host "`n---"
        Write-Host "Pushing key: $key"
        Write-Host "You will be prompted by Vercel to enter the value."

        Write-Host "→ development"
        vercel env add $key development

        Write-Host "→ preview"
        vercel env add $key preview

        Write-Host "→ production"
        vercel env add $key production
    }

    Write-Host "`n✅ Vercel env sync complete."
} else {
    Write-Host "⏩ Skipped Vercel push."
}

Write-Host "`n=== ALL DONE ===`n"