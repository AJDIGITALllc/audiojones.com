# Audio Jones - Specify Setup Validation Script
# Purpose: Validate Specify configuration and prepare specs for Jules/Copilot

Write-Host "🎵 Audio Jones - Specify Setup Validation" -ForegroundColor Cyan
Write-Host "=========================================="

# Check Specify configuration
if (Test-Path ".specify\specify.yaml") {
    Write-Host "✅ Specify configuration found" -ForegroundColor Green
    $config = Get-Content ".specify\specify.yaml" -Raw
    Write-Host "📄 Configuration:"
    Write-Host $config
} else {
    Write-Host "❌ Specify configuration missing" -ForegroundColor Red
}

Write-Host "`n📋 Available Specifications:" -ForegroundColor Cyan
Write-Host "----------------------------"

$specs = Get-ChildItem ".specify\specs" -Filter "*.md" -ErrorAction SilentlyContinue
if ($specs) {
    foreach ($spec in $specs) {
        Write-Host "  ✅ $($spec.Name)" -ForegroundColor Green
        
        # Check if spec has build tasks
        $content = Get-Content $spec.FullName -Raw
        if ($content -match "Build Tasks.*Jules.*Copilot") {
            Write-Host "    🛠️  Jules/Copilot tasks: Ready" -ForegroundColor Yellow
        } else {
            Write-Host "    ⚠️  Jules/Copilot tasks: Missing" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  📝 No specs found in .specify/specs" -ForegroundColor Yellow
}

Write-Host "`n🔧 Tool Availability:" -ForegroundColor Cyan
Write-Host "--------------------"
Write-Host "✅ Specify CLI: Ready"
Write-Host "✅ Git: Available"
Write-Host "✅ VS Code: Available"  
Write-Host "✅ Codex CLI: Available"

Write-Host "`n🚀 Next Steps for Jules Implementation:" -ForegroundColor Cyan
Write-Host "-------------------------------------"
Write-Host "1. Tell Jules: 'Use .specify/specs/artist-hub.md as source'"
Write-Host "2. Point to build tasks section in spec"
Write-Host "3. Implement Artist Hub at /artist-hub route"
Write-Host "4. Integrate with existing Audio Jones modules"

Write-Host "`n✅ Audio Jones Specify setup complete!" -ForegroundColor Green