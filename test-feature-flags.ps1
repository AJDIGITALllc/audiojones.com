# Feature Flags System Test Script
# Comprehensive testing for enterprise feature flags system

param(
    [string]$BaseUrl = "https://audiojones.com",
    [string]$AdminToken = $null,
    [switch]$Verbose = $false,
    [switch]$Performance = $false,
    [switch]$SkipAuth = $false
)

Write-Host "🚩 Feature Flags System Test Suite" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

# Environment setup
if (-not $AdminToken) {
    $AdminToken = $env:ADMIN_TEST_TOKEN
}

if (-not $AdminToken -and -not $SkipAuth) {
    Write-Host "❌ Error: Admin token required. Set ADMIN_TEST_TOKEN environment variable or use -AdminToken parameter" -ForegroundColor Red
    Write-Host "   Example: `$env:ADMIN_TEST_TOKEN = 'your-firebase-admin-token'" -ForegroundColor Yellow
    exit 1
}

# Set environment variables for Node.js script
$env:TEST_BASE_URL = $BaseUrl
if ($AdminToken) {
    $env:ADMIN_TEST_TOKEN = $AdminToken
}

Write-Host "🌐 Base URL: $BaseUrl" -ForegroundColor Green
Write-Host "🔐 Admin Token: $($AdminToken ? 'Set' : 'Not Set')" -ForegroundColor $(if($AdminToken) {'Green'} else {'Red'})
Write-Host ""

# Check if Node.js is available
try {
    $nodeVersion = node --version 2>$null
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js not found. Please install Node.js to run the test suite." -ForegroundColor Red
    exit 1
}

# Check if test file exists
$testFile = Join-Path $PSScriptRoot "test-feature-flags.js"
if (-not (Test-Path $testFile)) {
    Write-Host "❌ Error: Test file not found at $testFile" -ForegroundColor Red
    exit 1
}

Write-Host "🧪 Running feature flags integration tests..." -ForegroundColor Yellow
Write-Host ""

# Run the Node.js test suite
try {
    if ($Verbose) {
        $env:DEBUG = "feature-flags:*"
    }
    
    $process = Start-Process -FilePath "node" -ArgumentList $testFile -NoNewWindow -Wait -PassThru -RedirectStandardOutput "test-output.log" -RedirectStandardError "test-errors.log"
    
    # Display output
    if (Test-Path "test-output.log") {
        Get-Content "test-output.log" | ForEach-Object {
            Write-Host $_
        }
        Remove-Item "test-output.log" -ErrorAction SilentlyContinue
    }
    
    if (Test-Path "test-errors.log" -and (Get-Item "test-errors.log").Length -gt 0) {
        Write-Host "`n❌ Errors encountered:" -ForegroundColor Red
        Get-Content "test-errors.log" | ForEach-Object {
            Write-Host $_ -ForegroundColor Red
        }
        Remove-Item "test-errors.log" -ErrorAction SilentlyContinue
    } else {
        Remove-Item "test-errors.log" -ErrorAction SilentlyContinue
    }
    
    $exitCode = $process.ExitCode
    
    Write-Host ""
    if ($exitCode -eq 0) {
        Write-Host "🎉 All feature flags tests completed successfully!" -ForegroundColor Green
        Write-Host "✅ The feature flags system is ready for production." -ForegroundColor Green
    } else {
        Write-Host "⚠️  Some tests failed. Review the output above for details." -ForegroundColor Yellow
        Write-Host "🔧 Fix any issues before deploying to production." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Error running test suite: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📚 Feature Flags Documentation:" -ForegroundColor Cyan
Write-Host "   • Admin UI: $BaseUrl/portal/admin/feature-flags" -ForegroundColor White
Write-Host "   • Client API: $BaseUrl/api/feature-flags/evaluate" -ForegroundColor White
Write-Host "   • Admin API: $BaseUrl/api/admin/feature-flags" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Quick Commands:" -ForegroundColor Cyan
Write-Host "   # Initialize system:" -ForegroundColor Gray
Write-Host "   curl -X POST '$BaseUrl/api/admin/feature-flags' -H 'Authorization: Bearer `$token' -d '{\"action\":\"initialize\"}'" -ForegroundColor White
Write-Host ""
Write-Host "   # Create flag:" -ForegroundColor Gray
Write-Host "   curl -X POST '$BaseUrl/api/admin/feature-flags' -H 'Authorization: Bearer `$token' -d '{\"action\":\"create_flag\",\"name\":\"Test Flag\",\"key\":\"test_flag\"}'" -ForegroundColor White
Write-Host ""
Write-Host "   # Evaluate flag:" -ForegroundColor Gray
Write-Host "   curl '$BaseUrl/api/feature-flags/evaluate?flags=test_flag'" -ForegroundColor White

exit $exitCode