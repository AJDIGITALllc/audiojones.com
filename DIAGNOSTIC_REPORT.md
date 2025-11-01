# Vercel Deployment Diagnostic Report

This report outlines the health of your Git repository, provides scripts for you to investigate Vercel and GitHub, and offers concrete steps to resolve the issue of your latest changes not appearing on `audiojones.com`.

**Note:** As an AI assistant, I cannot access your secret tokens for the Vercel and GitHub APIs. Therefore, I have generated the necessary PowerShell scripts for you to run securely in your own environment to complete the diagnosis.

## 1. Current Git Branch & Status

*   **Current Branch**: `main`
*   **Status**: Your local `main` branch is up-to-date with `origin/main`. There are no unpushed local changes.
*   **Conclusion**: The issue is not caused by editing on a feature branch or having local commits that haven't been pushed to GitHub.

## 2. Latest Vercel Deployments

Run the following PowerShell script from your project root to see the last 25 deployments on Vercel. This will help match Git commits to Vercel builds.

**Important:** Replace the placeholder values for `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` with your actual credentials.

```powershell
$env:VERCEL_ORG_ID = "ajdigital-llc"
$env:VERCEL_PROJECT_ID = "audiojones-com"
$env:VERCEL_TOKEN = "vercel.tk_xxxxxx"

$headers = @{
"Authorization" = "Bearer $($env:VERCEL_TOKEN)"
}

$deploymentsUrl = "https://api.vercel.com/v6/deployments?projectId=$($env:VERCEL_PROJECT_ID)&limit=25"

$response = Invoke-RestMethod -Uri $deploymentsUrl -Headers $headers -Method GET

$response.deployments |
Sort-Object -Property createdAt -Descending |
Select-Object createdAt, url, state, @{Name="branch";Expression={$_.meta.githubCommitRef}}, @{Name="sha";Expression={$_.meta.githubCommitSha}}, @{Name="message";Expression={$_.meta.githubCommitMessage}} |
Format-Table -AutoSize
```

**Analysis:**
*   If your last deployments are **not from `main`**, that’s why the site didn’t change.
*   If your last deployment is `READY` but points to a preview URL (e.g., `something.vercel.app`) and not your production domain, it needs to be promoted.
*   If your last deployment `state` is not `READY` (e.g., `FAILED`), the build must be fixed.

## 3. Vercel Build Log Analysis

If a deployment failed, use this PowerShell script to fetch its logs. Replace `$DeploymentId` with the actual ID from the previous step's output.

```powershell
param(
[Parameter(Mandatory=$true)]
[string]$DeploymentId
)

$env:VERCEL_TOKEN = "vercel.tk_xxxxxx"

$headers = @{
"Authorization" = "Bearer $($env:VERCEL_TOKEN)"
}

$logsUrl = "https://api.vercel.com/v2/deployments/$DeploymentId/events"

$response = Invoke-RestMethod -Uri $logsUrl -Headers $headers -Method GET

$response |
ForEach-Object {
"$($_.date) [$($_.type)] $($_.payload?.text)"
}
```

This script will help you identify the root cause of build failures, such as Next.js errors, environment variable issues, or other common problems.

## 4. GitHub Commit Alignment

To verify that your latest commits on `main` are the ones being deployed, run this PowerShell script. It will fetch the last 20 commits from your GitHub repository.

**Important:** You may need a GitHub Personal Access Token (PAT) if the repository is private.

```powershell
$owner = "AJDIGITALllc"
$repo = "audiojones.com"
$branch = "main"
$token = "ghp_xxxxxx" # (PAT if needed)

$headers = @{
"Accept" = "application/vnd.github+json"
"Authorization" = "Bearer $token"
"X-GitHub-Api-Version" = "2022-11-28"
}

$commitsUrl = "https://api.github.com/repos/$owner/$repo/commits?sha=$branch&per_page=20"
$commits = Invoke-RestMethod -Uri $commitsUrl -Headers $headers -Method GET
$commits | Select-Object sha, @{Name="date";Expression={$_.commit.author.date}}, @{Name="msg";Expression={$_.commit.message}} | Format-Table -AutoSize
```

Compare the `sha` values from this script with the `sha` values from the Vercel deployments script. If the latest commit SHAs from GitHub do not appear in your Vercel deployments, you have found the mismatch.

## 5. Detected Mismatch & Recommended Fixes

Based on the Git health check, the problem is not due to being on the wrong branch. After you run the scripts above, one of the following is the most likely cause:

*   **[D] Build failed silently:** Vercel automatically rolled back to the last successful deployment. The deployment logs will confirm this.
*   **[B] Build succeeded but was not aliased:** The latest changes are on a preview URL, not the production domain.
*   **[C] Build succeeded but used a stale cache:** The build completed but did not include your latest changes due to caching.
*   **[F] Static asset caching:** Your browser or a CDN is serving an old version of a file.

**Exact CLI/Dashboard Actions:**

*   **To fix a failed build:** Analyze the logs using the script in section 3 and address the root cause.
*   **To force a rebuild and redeploy to production:**
    ```powershell
    vercel --prod --confirm
    ```
*   **To alias a successful deployment to production:**
    ```powershell
    vercel alias set <deployment-url> audiojones.com
    ```
*   **To fix the production branch in Vercel:** In your Vercel dashboard, navigate to **Project → Git → Production Branch** and ensure it is set to `main`.
*   **To fix caching issues:** Redeploying with `vercel --prod --confirm` often resolves this. For persistent browser cache, try a hard refresh (Ctrl+F5).

## 6. NOTE FOR FUTURE: CI/CD Guardrail

A GitHub Actions workflow has been added at `.github/workflows/vercel-preflight.yml`. This workflow will automatically run `npm run build` on every push to `main`, catching build errors before they are sent to Vercel, which will save you time and prevent failed deployments.
