# PowerShell script to update Firebase db imports to use getDb() lazy loading

$files = @(
    "src\app\api\webhooks\whop\route.ts",
    "src\app\api\whop-base64\route.ts",
    "src\app\api\whop\route.ts",
    "src\app\api\admin\stats\route.ts",
    "src\app\api\admin\customers\[email]\route.ts",
    "src\app\api\admin\customers\[email]\note\route.ts",
    "src\app\api\admin\alerts\route.ts",
    "src\app\api\admin\alerts\[id]\route.ts",
    "src\app\api\admin\pricing\route.ts",
    "src\app\api\admin\webhooks\replay\route.ts",
    "src\app\api\admin\webhooks\route.ts",
    "src\app\api\admin\audit\route.ts",
    "src\app\api\admin\reports\summary\route.ts",
    "src\app\api\admin\export\[type]\route.ts",
    "src\app\api\admin\reports\export\route.ts",
    "src\app\api\test-data\route.ts",
    "src\app\api\admin\health\route.ts",
    "src\app\api\capacity\forecast\route.ts",
    "src\app\api\admin\alerts\test\route.ts",
    "src\app\api\admin\alerts\process\route.ts",
    "src\app\api\discord\webhook\route.ts",
    "src\app\api\admin\alerts\auto\route.ts",
    "src\app\api\admin\runbooks\route.ts",
    "src\app\api\admin\slo\route.ts",
    "src\app\api\incidents\route.ts",
    "src\app\api\public\incidents\route.ts",
    "src\app\api\public\incidents\rss\route.ts",
    "src\app\api\public\status\route.ts",
    "src\app\api\integrations\aj-webhook\route.ts",
    "src\app\api\capacity\waitlist\route.ts",
    "src\app\api\capacity\route.ts",
    "src\lib\server\predictiveScheduler.ts",
    "src\lib\server\incidents.ts",
    "src\lib\server\slo.ts",
    "src\lib\server\digest.ts",
    "src\lib\server\statusEvents.ts",
    "src\lib\server\eventBus.ts",
    "src\lib\server\statusWebhookStore.ts",
    "src\lib\server\statusWebhookTargets.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating $file..."
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Replace the import statement
        $content = $content -replace "import \{ db \} from ['""`"][^'""`"]*firebaseAdmin['""`"];?", "import { getDb } from `$1firebaseAdmin`$2;"
        $content = $content -replace "import \{ db \} from '@/lib/server/firebaseAdmin';", "import { getDb } from '@/lib/server/firebaseAdmin';"
        $content = $content -replace "import \{ db \} from ['""`"]@/lib/server/firebaseAdmin['""`"];", "import { getDb } from '@/lib/server/firebaseAdmin';"
        $content = $content -replace "import \{ db \} from './firebaseAdmin';", "import { getDb } from './firebaseAdmin';"
        
        # Replace db usage with getDb() calls - be careful with variable usage
        $content = $content -replace '\bdb\.', 'getDb().'
        $content = $content -replace '\bdb\b(?!\()', 'getDb()'
        
        # Write the updated content back
        Set-Content $file $content -NoNewline
        
        Write-Host "Updated $file successfully"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All files updated!"