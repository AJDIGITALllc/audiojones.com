# Automation MailerLite-Whop Integration Tasks

**Project:** audiojones.com  
**Module:** Automation - Whop ↔ MailerLite  
**Status:** In Progress  
**Created:** November 6, 2025

## Task List

### Core Integration Tasks

- [x] FR08 — create Whop → MailerLite sync API stub at /api/integrations/whop
  - ✅ Created POST endpoint with WHOP_API_KEY validation
  - ✅ Accepts JSON payload with event, email, productId
  - ✅ Logs payload to server console
  - ✅ Returns { ok: true, received: payload }

- [x] FR09 — create MailerLite webhook receiver at /api/integrations/mailerlite  
  - ✅ Created POST endpoint with MAILERLITE_TOKEN validation
  - ✅ Webhook secret verification via MAILERLITE_WEBHOOK_SECRET
  - ✅ Logs raw body as JSON
  - ✅ Returns { ok: true }

- [x] FR10 — create admin view at /portal/admin/automation to display mappings and env status
  - ✅ Server component with proper layout
  - ✅ Shows expected environment variables
  - ✅ Displays automation mappings from config file
  - ✅ Lists POST-only endpoints for testing

- [x] FR11 — add src/config/automation-mappings.json with sample mappings
  - ✅ Array format with whopProductId, mailerliteTag, epmStage
  - ✅ Three sample mappings: artist-studio, mix-master, epm-early-access
  - ✅ Aligned with EPM stages: sense, optimize, predict

- [ ] FR12 — connect to Firestore/Data Connect later for logging (placeholder)
  - 🔄 TODO: Add database schema for automation events
  - 🔄 TODO: Implement event logging in API routes
  - 🔄 TODO: Add event history display in admin panel

### Environment Configuration

Required environment variables:
- `WHOP_API_KEY` - API key for Whop integration
- `MAILERLITE_TOKEN` - API token for MailerLite
- `MAILERLITE_WEBHOOK_SECRET` - Secret for webhook verification

### Implementation Status

**Completed:**
- ✅ API route stubs created and tested
- ✅ Admin dashboard with mapping display
- ✅ Environment type declarations
- ✅ Configuration file structure

**Next Steps:**
1. Add actual Whop API integration for product sync
2. Implement MailerLite subscriber management
3. Add database logging for audit trail
4. Connect mappings to live webhook processing
5. Add environment variable validation UI

### Testing

**Endpoints Ready for Testing:**
- `POST /api/integrations/whop` - Whop webhook receiver
- `POST /api/integrations/mailerlite` - MailerLite webhook receiver
- `GET /portal/admin/automation` - Admin dashboard

**Required for Full Testing:**
- Environment variables configured in deployment
- Webhook URLs registered with Whop and MailerLite
- Test payloads for both integrations

---

**Last Updated:** November 6, 2025  
**Next Review:** When implementing FR12 database logging