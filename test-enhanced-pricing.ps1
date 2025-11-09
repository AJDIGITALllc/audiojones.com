# Enhanced Pricing Integration Test
# This script tests the integration between Firestore pricing_skus and webhook processing

$adminKey = "gGho3TE8ztiSAMvORfyCDem62Fk0xpW1"
$baseUrl = "http://localhost:3000"

Write-Host "🔍 Testing Enhanced Pricing Integration" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# 1. Create a test SKU
Write-Host "`n1. Creating test SKU in Firestore..." -ForegroundColor Yellow

$testSku = @{
    billing_sku = "test-enhanced-sku-$(Get-Date -Format 'yyyyMMddHHmmss')"
    service_id = "ai-automation"
    tier_id = "enterprise"
    active = $true
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/admin/pricing" -Method POST -Body $testSku -ContentType "application/json" -Headers @{"admin-key" = $adminKey}
    Write-Host "✅ Test SKU created successfully" -ForegroundColor Green
    
    # Parse the billing_sku from the response or from our test data
    $createdSku = ($testSku | ConvertFrom-Json).billing_sku
    Write-Host "📦 SKU: $createdSku" -ForegroundColor Gray
    
    # 2. Test webhook with the new SKU
    Write-Host "`n2. Testing webhook integration..." -ForegroundColor Yellow
    
    $webhookPayload = @{
        event_type = "subscription.created"
        user = @{
            email = "test-enhanced@example.com"
        }
        billing_sku = $createdSku
        timestamp = [int][double]::Parse((Get-Date -UFormat %s))
    } | ConvertTo-Json
    
    # For testing, we'll skip HMAC signature and just check the API endpoint
    Write-Host "📤 Sending webhook payload..." -ForegroundColor Gray
    
    $webhookResponse = Invoke-RestMethod -Uri "$baseUrl/api/whop" -Method POST -Body $webhookPayload -ContentType "application/json" -Headers @{
        "x-whop-timestamp" = [int][double]::Parse((Get-Date -UFormat %s))
    }
    
    Write-Host "✅ Webhook processed successfully" -ForegroundColor Green
    
    # 3. Verify the data
    Write-Host "`n3. Verifying customer data..." -ForegroundColor Yellow
    
    Start-Sleep -Seconds 2  # Give it a moment to process
    
    $customerResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/customers/test-enhanced@example.com" -Headers @{"admin-key" = $adminKey}
    
    Write-Host "📊 Customer tier: $($customerResponse.tier)" -ForegroundColor Gray
    Write-Host "📊 Customer service: $($customerResponse.service_name)" -ForegroundColor Gray
    
    if ($customerResponse.tier -eq "enterprise" -and $customerResponse.service_name -eq "ai-automation") {
        Write-Host "✅ Enhanced pricing integration working correctly!" -ForegroundColor Green
        Write-Host "🎯 Firestore SKU was successfully used instead of hardcoded fallback" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Unexpected customer data - check integration" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
}

Write-Host "`nTest completed" -ForegroundColor Cyan