param(
    [Parameter(Mandatory=$true)]
    [string]$VercelToken,
    
    [string]$ProjectName = "audiojones.com",
    [string]$TeamId = "",
    [int]$Limit = 100
)

$outputDir = "vercel-failed-logs"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    Write-Host "Created directory: $outputDir"
}

$deploymentsUrl = "https://api.vercel.com/v6/deployments?project=$ProjectName&limit=$Limit"
if ($TeamId) {
    $deploymentsUrl += "&teamId=$TeamId"
}

Write-Host "Fetching deployments from: $deploymentsUrl"

$headers = @{
    "Authorization" = "Bearer $VercelToken"
    "Content-Type" = "application/json"
}

try {
    Write-Host "Fetching last $Limit deployments..."
    $response = Invoke-RestMethod -Uri $deploymentsUrl -Headers $headers -Method Get
    
    $response | ConvertTo-Json -Depth 10 | Out-File "deployments.json" -Encoding UTF8
    Write-Host "Saved full deployment data to deployments.json"
    
    $failedDeployments = $response.deployments | Where-Object { $_.state -eq "ERROR" }
    
    if ($failedDeployments.Count -eq 0) {
        Write-Host "No failed deployments found in the last $Limit deployments." -ForegroundColor Green
        return
    }
    
    Write-Host "Found $($failedDeployments.Count) failed deployments:" -ForegroundColor Yellow
    
    $failedIds = $failedDeployments | ForEach-Object { $_.uid }
    $failedIds | Out-File "failed.txt" -Encoding UTF8
    
    $failedDeployments | ForEach-Object {
        $createdAt = [DateTime]::Parse($_.createdAt).ToString("yyyy-MM-dd HH:mm:ss")
        $commitMsg = if ($_.meta.githubCommitMessage) { ($_.meta.githubCommitMessage -split "`n")[0] } else { "No message" }
        Write-Host "  - $($_.uid) | $createdAt | $commitMsg" -ForegroundColor Red
    }
    
    Write-Host "`nDownloading logs for failed deployments..."
    
    $count = 0
    foreach ($deployment in $failedDeployments) {
        $deployId = $deployment.uid
        $count++
        
        Write-Host "[$count/$($failedDeployments.Count)] Downloading logs for $deployId..."
        
        $eventsUrl = "https://api.vercel.com/v2/deployments/$deployId/events"
        if ($TeamId) {
            $eventsUrl += "?teamId=$TeamId"
        }
        
        try {
            $events = Invoke-RestMethod -Uri $eventsUrl -Headers $headers -Method Get
            $events | ConvertTo-Json -Depth 10 | Out-File "$outputDir\$deployId.json" -Encoding UTF8
            
            $buildLogs = @()
            foreach ($logEvent in $events.events) {
                if ($logEvent.type -eq "stdout" -or $logEvent.type -eq "stderr") {
                    $timestamp = [DateTime]::Parse($logEvent.created).ToString("HH:mm:ss.fff")
                    $buildLogs += "$timestamp [$($logEvent.type.ToUpper())] $($logEvent.payload.text)"
                }
            }
            
            if ($buildLogs.Count -gt 0) {
                $buildLogs | Out-File "$outputDir\$deployId-build.log" -Encoding UTF8
                Write-Host "  ✓ Saved $($buildLogs.Count) log entries" -ForegroundColor Green
            } else {
                Write-Host "  ⚠ No build logs found" -ForegroundColor Yellow
            }
            
        } catch {
            Write-Host "  ✗ Failed to download logs: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        Start-Sleep -Milliseconds 100
    }
    
    Write-Host "`n✅ Log download complete!" -ForegroundColor Green
    Write-Host "Files created:"
    Write-Host "  - deployments.json (full deployment data)"
    Write-Host "  - failed.txt (failed deployment IDs)"
    Write-Host "  - $outputDir\*.json (raw event data)"
    Write-Host "  - $outputDir\*-build.log (readable build logs)"
    
} catch {
    Write-Host "Error fetching deployments: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check your VERCEL_TOKEN and PROJECT_NAME" -ForegroundColor Yellow
}