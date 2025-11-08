# Vercel Environment Variables Verification Script
# Run this after setting up environment variables to confirm everything is working

param(
    [switch]$SkipWebhookTest,
    [switch]$Verbose
)

Write-Host "🔍 Vercel Environment Variables Verification" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# 1. Check if Vercel CLI is available
try {
    $vercelVersion = vercel --version 2>$null
    Write-Host "✅ Vercel CLI: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Install with: npm install -g vercel" -ForegroundColor Red
    exit 1
}

# 2. List environment variables
Write-Host "`n📋 Environment Variables Status:" -ForegroundColor Yellow
try {
    $envOutput = vercel env ls production 2>$null
    
    # Check for required variables
    $requiredVars = @("FIREBASE_PRIVATE_KEY", "FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "WHOP_API_KEY", "WHOP_APP_ID")
    $foundVars = @()
    
    foreach ($var in $requiredVars) {
        if ($envOutput -match $var) {
            Write-Host "   ✅ $var" -ForegroundColor Green
            $foundVars += $var
        } else {
            Write-Host "   ❌ $var (MISSING)" -ForegroundColor Red
        }
    }
    
    # Check for Base64 backup
    if ($envOutput -match "FIREBASE_PRIVATE_KEY_BASE64") {
        Write-Host "   ✅ FIREBASE_PRIVATE_KEY_BASE64 (backup)" -ForegroundColor Blue
    }
    
} catch {
    Write-Host "❌ Failed to list environment variables" -ForegroundColor Red
    Write-Host "   Try: vercel login" -ForegroundColor Yellow
}

# 3. Test private key length (if possible)
Write-Host "`n🔑 Private Key Verification:" -ForegroundColor Yellow
try {
    # Create temp file to check key length
    $tempFile = "$env:TEMP\vercel-env-check.tmp"
    vercel env pull $tempFile production 2>$null | Out-Null
    
    if (Test-Path $tempFile) {
        $keyLine = Get-Content $tempFile | Where-Object { $_ -like "FIREBASE_PRIVATE_KEY=*" }
        if ($keyLine) {
            $keyValue = $keyLine -replace "FIREBASE_PRIVATE_KEY=","" -replace '"',''
            $keyLength = $keyValue.Length
            
            if ($keyLength -gt 1600) {
                Write-Host "   [OK] Private key appears complete ($keyLength characters)" -ForegroundColor Green
            } elseif ($keyLength -gt 40) {
                Write-Host "   [WARN] Private key might be truncated ($keyLength characters)" -ForegroundColor Yellow
            } else {
                Write-Host "   [ERROR] Private key is truncated! ($keyLength characters)" -ForegroundColor Red
                Write-Host "      Run: Get-Content .\scripts\firebase-private-key.txt | vercel env add FIREBASE_PRIVATE_KEY production --sensitive --force" -ForegroundColor Yellow
            }
        } else {
            Write-Host "   [ERROR] FIREBASE_PRIVATE_KEY not found in environment" -ForegroundColor Red
        }
        
        Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
    }
} catch {
    Write-Host "   ⚠️  Could not verify private key length" -ForegroundColor Yellow
}

# 4. Test webhook endpoints
if (-not $SkipWebhookTest) {
    Write-Host "`n🌐 Webhook Endpoint Tests:" -ForegroundColor Yellow
    
    # Test main webhook
    try {
        $response = Invoke-RestMethod -Uri "https://audiojones.com/api/whop" -Method GET -TimeoutSec 10
        if ($response.ok -eq $true -and $response.source -eq "whop-webhook") {
            Write-Host "   ✅ Main webhook: https://audiojones.com/api/whop" -ForegroundColor Green
            if ($Verbose) {
                Write-Host "      Response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Gray
            }
        } else {
            Write-Host "   ⚠️  Main webhook responded but with unexpected data" -ForegroundColor Yellow
            if ($Verbose) {
                Write-Host "      Response: $($response | ConvertTo-Json)" -ForegroundColor Gray
            }
        }
    } catch {
        Write-Host "   ❌ Main webhook error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test Base64 webhook (if it exists)  
    try {
        $response = Invoke-RestMethod -Uri "https://audiojones.com/api/whop-base64" -Method GET -TimeoutSec 10
        Write-Host "   ✅ Base64 webhook: https://audiojones.com/api/whop-base64" -ForegroundColor Green
        if ($Verbose) {
            Write-Host "      Response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Gray
        }
    } catch {
        if ($_.Exception.Message -match "404") {
            Write-Host "   ℹ️  Base64 webhook: Not deployed (optional)" -ForegroundColor Blue
        } else {
            Write-Host "   ❌ Base64 webhook error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# 5. Summary
Write-Host "`n📊 Summary:" -ForegroundColor Cyan
$totalRequired = $requiredVars.Count
$foundCount = $foundVars.Count

if ($foundCount -eq $totalRequired) {
    Write-Host "✅ All required environment variables are configured" -ForegroundColor Green
} else {
    Write-Host "❌ Missing $($totalRequired - $foundCount) required environment variables" -ForegroundColor Red
}

Write-Host "`n💡 Quick Setup Commands:" -ForegroundColor Blue
Write-Host "   Get-Content .\scripts\firebase-private-key.txt | vercel env add FIREBASE_PRIVATE_KEY production --sensitive --force" -ForegroundColor White
Write-Host "   vercel env add FIREBASE_PROJECT_ID production" -ForegroundColor White
Write-Host "   vercel env add FIREBASE_CLIENT_EMAIL production" -ForegroundColor White
Write-Host "   vercel env add WHOP_API_KEY production --sensitive" -ForegroundColor White
Write-Host "   vercel env add WHOP_APP_ID production" -ForegroundColor White

Write-Host "`n🔗 Documentation: docs\VERCEL_ENV_SOP.md" -ForegroundColor Cyan