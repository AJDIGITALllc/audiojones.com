# Audio Jones — Vercel Environment Validation Script (PowerShell)
# Purpose: Verify all required Vercel environment variables are properly set and authenticated.

Write-Host "🔍 Checking for required environment variables..." -ForegroundColor Cyan
Write-Host "----------------------------------------------"
Write-Host "VERCEL_TEAM_ID: $env:VERCEL_TEAM_ID"
Write-Host "VERCEL_TOKEN: $env:VERCEL_TOKEN"
Write-Host "VERCEL_PROJECT_ID: $env:VERCEL_PROJECT_ID"
Write-Host "----------------------------------------------"

# Check if required variables are set
if (-not $env:VERCEL_TOKEN) {
    Write-Host "❌ VERCEL_TOKEN is not set!" -ForegroundColor Red
    exit 1
}

if (-not $env:VERCEL_TEAM_ID) {
    Write-Host "❌ VERCEL_TEAM_ID is not set!" -ForegroundColor Red
    exit 1
}

# Step 2: Validate token and team ID with the Vercel API
Write-Host "🧪 Validating Vercel API token and team ID..." -ForegroundColor Cyan

try {
    $headers = @{
        "Authorization" = "Bearer $env:VERCEL_TOKEN"
        "Content-Type" = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects?teamId=$env:VERCEL_TEAM_ID" -Headers $headers
    
    if ($response.projects) {
        Write-Host "✅ Successfully authenticated with Vercel API" -ForegroundColor Green
        Write-Host "📋 Found $($response.projects.Count) projects in team" -ForegroundColor Yellow
        
        foreach ($project in $response.projects) {
            $latestState = if ($project.latestDeployments -and $project.latestDeployments.Count -gt 0) { 
                $project.latestDeployments[0].state 
            } else { 
                "No deployments" 
            }
            Write-Host "  - $($project.name) (ID: $($project.id)) - Latest: $latestState"
        }
    }
}
catch {
    Write-Host "⚠️ Unable to fetch projects. Check your token and team ID." -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Verify the Audio Jones project connection
Write-Host "----------------------------------------------"
Write-Host "🎯 Checking for 'audiojones.com' project..." -ForegroundColor Cyan

try {
    $projectResponse = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/audiojones.com?teamId=$env:VERCEL_TEAM_ID" -Headers $headers
    
    Write-Host "✅ Found audiojones.com project!" -ForegroundColor Green
    Write-Host "  Name: $($projectResponse.name)"
    Write-Host "  ID: $($projectResponse.id)"
    Write-Host "  Framework: $($projectResponse.framework)"
    
    if ($projectResponse.targets -and $projectResponse.targets.production) {
        Write-Host "  Production URL: $($projectResponse.targets.production.domain)"
    }
}
catch {
    Write-Host "⚠️ Project 'audiojones.com' not found or not linked to this team." -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 4: List environment variables for current project
Write-Host "----------------------------------------------"
Write-Host "📦 Listing environment variables for audiojones.com..." -ForegroundColor Cyan

try {
    $envResponse = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/audiojones.com/env?teamId=$env:VERCEL_TEAM_ID" -Headers $headers
    
    if ($envResponse.envs) {
        Write-Host "✅ Found $($envResponse.envs.Count) environment variables:" -ForegroundColor Green
        
        foreach ($env_var in $envResponse.envs) {
            $maskedValue = if ($env_var.value.Length -gt 10) { 
                $env_var.value.Substring(0, 4) + "****" + $env_var.value.Substring($env_var.value.Length - 4) 
            } else { 
                "****" 
            }
            Write-Host "  - $($env_var.key): $maskedValue (Target: $($env_var.target -join ', '))"
        }
    }
    else {
        Write-Host "📝 No environment variables found for this project." -ForegroundColor Yellow
    }
}
catch {
    Write-Host "⚠️ Could not list project environment variables." -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "----------------------------------------------"
Write-Host "✅ Validation complete. Review above results for missing or invalid credentials." -ForegroundColor Green

# Optional: Check Vercel CLI installation
Write-Host "🔧 Checking Vercel CLI installation..." -ForegroundColor Cyan
try {
    $vercelVersion = vercel --version 2>$null
    if ($vercelVersion) {
        Write-Host "✅ Vercel CLI installed: $vercelVersion" -ForegroundColor Green
    }
}
catch {
    Write-Host "⚠️ Vercel CLI not found. Install with: npm i -g vercel" -ForegroundColor Yellow
}