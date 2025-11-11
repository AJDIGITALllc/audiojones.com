# Slack Integration Setup Guide

## 🔧 Audio Jones Slack Integration

This guide helps you configure Slack notifications for the Audio Jones alert system.

### 📋 Slack Workspace Information
- **Workspace**: AjDigital
- **Integration Type**: Slack App with Bot Token
- **Default Channel**: #alerts

### 🔑 Token Configuration

You have been provided with the following tokens:

1. **Access Token** (SLACK_BOT_TOKEN): `xoxe.xoxp-1-[CONTACT_ADMIN_FOR_TOKEN]`
2. **Refresh Token** (SLACK_REFRESH_TOKEN): `xoxe-1-[CONTACT_ADMIN_FOR_TOKEN]`

**Note**: The actual tokens have been provided separately for security reasons.

### ⚙️ Environment Variable Setup

#### Production (Vercel/Deployment Platform)
Add these environment variables to your deployment platform:

```bash
SLACK_BOT_TOKEN=[CONTACT_ADMIN_FOR_ACCESS_TOKEN]
SLACK_REFRESH_TOKEN=[CONTACT_ADMIN_FOR_REFRESH_TOKEN]
SLACK_CHANNEL=#alerts
```

#### Local Development (.env.local)
Add these to your `.env.local` file (already configured locally):

```bash
SLACK_BOT_TOKEN=[CONTACT_ADMIN_FOR_ACCESS_TOKEN]
SLACK_REFRESH_TOKEN=[CONTACT_ADMIN_FOR_REFRESH_TOKEN]
SLACK_CHANNEL=#alerts
```

### 📝 Setup Steps

1. **Create #alerts channel** in your AjDigital Slack workspace
2. **Add environment variables** to your deployment platform
3. **Test notifications** using: `POST /api/admin/alerts/test`
4. **Monitor capacity alerts** from the forecast system

### 🔧 Testing Commands

```powershell
# Test alert notification
$body = @{ message = "Slack integration test"; severity = "warning" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://audiojones.com/api/admin/alerts/test" -Method POST -Body $body -ContentType "application/json" -Headers @{"admin-key" = "YOUR_ADMIN_KEY"}

# Trigger capacity forecast (may create alert if utilization is high)
Invoke-RestMethod -Uri "https://audiojones.com/api/capacity/forecast" -Method GET
```

### 🚀 Notification Types

The system will send Slack notifications for:

1. **Capacity Alerts**: When utilization exceeds 90%
2. **Billing Requests**: Customer upgrade/downgrade requests
3. **Test Alerts**: Admin-triggered test notifications
4. **System Alerts**: Infrastructure and maintenance notifications

### 🔒 Security Notes

- ✅ Tokens are configured locally for testing
- ✅ Tokens removed from git repository (GitHub push protection)
- ⚠️ Remember to add tokens to production environment
- 🔄 Consider rotating tokens periodically for security

### ✅ Integration Status

- **Local Setup**: Complete ✅
- **Production Setup**: Requires environment variable configuration
- **Slack Workspace**: AjDigital workspace ready
- **Bot Permissions**: Configured for chat.postMessage API

---

**Next Steps**: Add the environment variables to your production deployment platform to enable Slack notifications.