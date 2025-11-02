# Audio Jones API Documentation

> **Complete API Reference** for the Audio Jones / AJ DIGITAL LLC Platform

---

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [API Standards](#api-standards)
- [Admin Management APIs](#admin-management-apis)
- [Blog Automation APIs](#blog-automation-apis)
- [Payment APIs](#payment-apis)
- [Integration APIs](#integration-apis)
- [Media & Files APIs](#media--files-apis)
- [Contract APIs](#contract-apis)
- [Portal APIs](#portal-apis)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Overview

The Audio Jones platform exposes **28 RESTful API endpoints** across 13 categories. All APIs follow consistent patterns for authentication, request/response formats, and error handling.

### Base URL

```
Production: https://audiojones.com/api
Development: http://localhost:3000/api
```

### API Categories

| Category | Endpoint Prefix | Description |
|----------|----------------|-------------|
| Admin Management | `/api/admin/*` | User management, system monitoring |
| Blog Automation | `/api/blog/*` | Blog drafts, publishing, analytics |
| Payments | `/api/stripe/*` | Stripe integration |
| Whop Integration | `/api/whop/*` | Membership platform |
| Newsletter | `/api/newsletter/*` | Email subscriptions |
| Automation | `/api/n8n/*` | Workflow automation |
| Media | `/api/imagekit-*` | Image management |
| Contracts | `/api/contracts/*` | Contract generation |
| Portal | `/api/portal/*` | User dashboard |

---

## Authentication

### Authentication Methods

**1. Bearer Token (API Routes)**

```bash
curl -H "Authorization: Bearer YOUR_ID_TOKEN" \
  https://audiojones.com/api/endpoint
```

**2. Session Cookie (Browser)**

```javascript
// Set after login
document.cookie = `idToken=${token}; path=/; secure; samesite=strict`;
```

### Getting an ID Token

**Client-Side (Firebase)**

```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
const userCredential = await signInWithEmailAndPassword(auth, email, password);
const idToken = await userCredential.user.getIdToken();
```

**Using the Token**

```bash
curl -X GET https://audiojones.com/api/admin/users \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2N..."
```

### Authorization Levels

| Level | Required | Description |
|-------|----------|-------------|
| Public | None | No authentication required |
| User | Valid ID Token | Authenticated user |
| Admin | Valid ID Token + `admin: true` claim | Admin privileges |

---

## API Standards

### Request Format

**Headers**

```
Content-Type: application/json
Authorization: Bearer YOUR_ID_TOKEN (if required)
```

**Body (JSON)**

```json
{
  "field1": "value1",
  "field2": "value2"
}
```

### Response Format

**Success Response**

```json
{
  "success": true,
  "data": {
    // Response payload
  }
}
```

**Error Response**

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error information"
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input or missing required fields |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side error |

---

## Admin Management APIs

### List Users

Retrieve a paginated list of all users in the system.

**Endpoint:** `GET /api/admin/users`

**Auth:** Admin required

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Maximum number of users to return (default: 50) |
| `offset` | number | No | Number of users to skip (default: 0) |

**Request:**

```bash
curl -X GET "https://audiojones.com/api/admin/users?limit=20&offset=0" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "uid": "abc123",
        "email": "user@example.com",
        "disabled": false,
        "customClaims": {
          "admin": true,
          "role": "super-admin"
        },
        "createdAt": "2025-01-15T10:30:00Z",
        "lastSignIn": "2025-01-20T14:22:00Z"
      }
    ],
    "count": 1,
    "total": 150
  }
}
```

---

### Lookup User

Find a specific user by email or UID.

**Endpoint:** `POST /api/admin/users`

**Auth:** Admin required

**Request Body:**

```json
{
  "email": "user@example.com"
}
// OR
{
  "uid": "abc123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "uid": "abc123",
      "email": "user@example.com",
      "disabled": false,
      "customClaims": {},
      "createdAt": "2025-01-15T10:30:00Z",
      "lastSignIn": "2025-01-20T14:22:00Z"
    }
  }
}
```

---

### Set Admin Claims

Grant or revoke admin privileges for a user.

**Endpoint:** `PATCH /api/admin/users/:uid/admin`

**Auth:** Admin required

**Request Body:**

```json
{
  "admin": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Admin claim set successfully",
    "uid": "abc123",
    "admin": true
  }
}
```

---

### Dashboard Statistics

Get key metrics for the admin dashboard.

**Endpoint:** `GET /api/admin/dashboard`

**Auth:** Admin required

**Response:**

```json
{
  "success": true,
  "data": {
    "totalUsers": 1523,
    "activeUsers": 892,
    "totalBlogs": 45,
    "publishedBlogs": 32,
    "draftBlogs": 8,
    "scheduledBlogs": 5,
    "totalRevenue": 125000.50,
    "activeSubscriptions": 234
  }
}
```

---

### System Health Check

Check the health status of the API.

**Endpoint:** `GET /api/admin/ping`

**Auth:** Admin required

**Response:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-01-20T15:30:00Z",
    "version": "1.0.0",
    "uptime": 86400
  }
}
```

---

## Blog Automation APIs

### List Blog Drafts

Retrieve blog drafts with optional filtering.

**Endpoint:** `GET /api/blog/draft`

**Auth:** Admin required

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status: `draft`, `needs_review`, `approved`, `scheduled`, `published` |
| `pillar` | string | No | Filter by pillar: `ai`, `marketing`, `podcast-news`, `tech-business-trends`, `personal-brand` |
| `source` | string | No | Filter by source: `perplexity`, `internal`, `mixed` |
| `limit` | number | No | Max results (default: 50) |
| `offset` | number | No | Skip results (default: 0) |

**Request:**

```bash
curl -X GET "https://audiojones.com/api/blog/draft?status=needs_review&pillar=ai&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "drafts": [
      {
        "id": "draft_1234567890",
        "title": "AI Marketing Automation for Creators",
        "slug": "ai-marketing-automation-creators",
        "pillar": "ai",
        "source": "perplexity",
        "status": "needs_review",
        "seoDescription": "Discover how creators can leverage AI marketing automation...",
        "readingTime": 7,
        "createdAt": "2025-01-20T10:00:00Z",
        "updatedAt": "2025-01-20T10:00:00Z",
        "publishedAt": null,
        "contentPerformance": null
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

---

### Generate Blog Draft

Create a new blog draft using AI automation.

**Endpoint:** `POST /api/blog/draft`

**Auth:** Admin required

**Request Body:**

```json
{
  "pillar": "ai",
  "topic": "How AI is transforming marketing automation for small businesses",
  "persona": "entrepreneur",
  "intent": "educate",
  "ctaType": "newsletter",
  "framework": "EPM"
}
```

**Field Descriptions:**

| Field | Type | Required | Options | Description |
|-------|------|----------|---------|-------------|
| `pillar` | string | Yes | `ai`, `marketing`, `podcast-news`, `tech-business-trends`, `personal-brand` | Strategic pillar |
| `topic` | string | Yes | - | Blog topic/title |
| `persona` | string | No | `creator`, `entrepreneur`, `smb`, `agency` | Target audience (default: `entrepreneur`) |
| `intent` | string | No | `news`, `educate`, `authority`, `trend`, `how-to`, `opinion` | Content intent (default: `educate`) |
| `ctaType` | string | No | `newsletter`, `podcast`, `services`, `lead_magnet` | Call-to-action type (default: `newsletter`) |
| `framework` | string | No | `EPM`, `ASI`, `PR`, `AOF` | Audio Jones framework to reference |

**Response:**

```json
{
  "success": true,
  "data": {
    "draft": {
      "id": "draft_1234567890",
      "pillar": "ai",
      "source": "perplexity",
      "status": "needs_review",
      "title": "How AI Marketing Automation Drives Predictable Growth for Entrepreneurs",
      "slug": "ai-marketing-automation-predictable-growth-entrepreneurs",
      "content": "# How AI Marketing Automation Drives Predictable Growth...",
      "seoTitle": "AI Marketing Automation for Entrepreneurs | Audio Jones",
      "seoDescription": "Learn how entrepreneurs leverage AI marketing automation...",
      "seoKeywords": ["AI marketing", "automation", "entrepreneurs"],
      "ogImage": null,
      "faqs": "[{\"q\":\"What is AI marketing automation?\",\"a\":\"...\"}]",
      "keyTakeaways": [
        "AI automation reduces manual marketing tasks by 70%",
        "Predictable growth requires systematic frameworks"
      ],
      "structuredData": "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",...}",
      "ctaType": "newsletter",
      "ctaHeadline": "Get Audio Jones Weekly Growth Insights",
      "ctaDescription": "Join 5,000+ operators getting weekly insights...",
      "ctaLink": "/newsletter",
      "researchPayload": "{\"topic\":\"...\",\"summary\":\"...\"}",
      "frameworkUsed": "EPM",
      "readingTime": 8,
      "createdAt": "2025-01-20T15:30:00Z",
      "updatedAt": "2025-01-20T15:30:00Z"
    },
    "voiceValidation": {
      "isValid": true,
      "feedback": []
    },
    "aeoScore": 85,
    "researchUsed": {
      "topic": "How AI is transforming marketing automation for small businesses",
      "summary": "AI marketing automation is revolutionizing how small businesses...",
      "keyPoints": [
        "70% reduction in manual marketing tasks",
        "Predictive analytics improve targeting by 45%"
      ]
    }
  }
}
```

---

### Update Blog Draft

Update an existing blog draft.

**Endpoint:** `PUT /api/blog/draft/:id`

**Auth:** Admin required

**Request Body:**

```json
{
  "title": "Updated Title",
  "content": "Updated markdown content...",
  "status": "approved",
  "seoTitle": "Updated SEO Title"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "draft": {
      "id": "draft_1234567890",
      "title": "Updated Title",
      "updatedAt": "2025-01-20T16:00:00Z"
    }
  }
}
```

---

### Delete Blog Draft

Delete a blog draft.

**Endpoint:** `DELETE /api/blog/draft/:id`

**Auth:** Admin required

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Draft deleted successfully"
  }
}
```

---

### Publish Blog Draft

Publish an approved blog draft.

**Endpoint:** `POST /api/blog/publish`

**Auth:** Admin required

**Request Body:**

```json
{
  "draftId": "draft_1234567890",
  "scheduledFor": "2025-01-25T10:00:00Z", // Optional
  "distributionChannels": ["website", "substack", "linkedin"] // Optional
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "draftId": "draft_1234567890",
    "status": "published",
    "publishedAt": "2025-01-20T16:30:00Z",
    "slug": "ai-marketing-automation-predictable-growth-entrepreneurs",
    "url": "https://audiojones.com/blog/ai-marketing-automation-predictable-growth-entrepreneurs"
  }
}
```

---

### Track Content Performance

Track analytics for published blog content.

**Endpoint:** `POST /api/content/track`

**Auth:** Public (no authentication required)

**Request Body:**

```json
{
  "slug": "ai-marketing-automation-predictable-growth-entrepreneurs",
  "event": "view", // or "engagement", "conversion", "share"
  "metadata": {
    "engagementTime": 180, // seconds (for engagement events)
    "platform": "linkedin" // (for share events)
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "slug": "ai-marketing-automation-predictable-growth-entrepreneurs",
    "event": "view",
    "timestamp": "2025-01-20T17:00:00Z"
  }
}
```

---

## Payment APIs

### Create Checkout Session

Create a Stripe checkout session for a product or subscription.

**Endpoint:** `POST /api/stripe/checkout`

**Auth:** User required

**Request Body:**

```json
{
  "priceId": "price_1234567890",
  "mode": "subscription", // or "payment"
  "successUrl": "https://audiojones.com/portal/success",
  "cancelUrl": "https://audiojones.com/portal/cancel"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_1234567890",
    "url": "https://checkout.stripe.com/pay/cs_test_1234567890"
  }
}
```

---

### Customer Portal

Get Stripe customer portal URL for subscription management.

**Endpoint:** `POST /api/stripe/portal`

**Auth:** User required

**Request Body:**

```json
{
  "returnUrl": "https://audiojones.com/portal/billing"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "url": "https://billing.stripe.com/session/live_1234567890"
  }
}
```

---

## Integration APIs

### Subscribe to Newsletter

Subscribe an email to the MailerLite newsletter.

**Endpoint:** `POST /api/newsletter/subscribe`

**Auth:** Public

**Request Body:**

```json
{
  "email": "user@example.com",
  "firstName": "John", // Optional
  "lastName": "Doe" // Optional
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "status": "subscribed",
    "subscriberId": "12345678"
  }
}
```

---

### List Whop Products

Get available Whop products/memberships.

**Endpoint:** `GET /api/whop/products`

**Auth:** User required

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_123",
        "name": "Audio Jones Creator Membership",
        "description": "Monthly membership for creators...",
        "price": 99.00,
        "currency": "USD",
        "interval": "month"
      }
    ]
  }
}
```

---

### Execute N8N Workflow

Trigger an N8N automation workflow.

**Endpoint:** `POST /api/n8n/execute`

**Auth:** User required

**Request Body:**

```json
{
  "workflowId": "workflow_123",
  "data": {
    "field1": "value1",
    "field2": "value2"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "executionId": "exec_1234567890",
    "status": "running",
    "startedAt": "2025-01-20T18:00:00Z"
  }
}
```

---

## Media & Files APIs

### Get ImageKit Auth Token

Get authentication parameters for ImageKit uploads.

**Endpoint:** `POST /api/imagekit-auth`

**Auth:** User required

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "your_imagekit_token",
    "expire": 1737400000,
    "signature": "abc123def456"
  }
}
```

---

### List ImageKit Files

List files in ImageKit storage.

**Endpoint:** `GET /api/imagekit-files`

**Auth:** User required

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | No | Folder path (default: `/`) |
| `limit` | number | No | Max files (default: 50) |
| `skip` | number | No | Skip files (default: 0) |

**Response:**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "fileId": "file_123",
        "name": "hero-image.jpg",
        "url": "https://ik.imagekit.io/audiojones/hero-image.jpg",
        "size": 102400,
        "type": "image/jpeg"
      }
    ]
  }
}
```

---

## Contract APIs

### Generate Contract

Generate a PDF contract from a template.

**Endpoint:** `POST /api/contracts/generate`

**Auth:** User required

**Request Body:**

```json
{
  "templateId": "service-agreement-v1",
  "data": {
    "clientName": "John Doe",
    "projectName": "Brand Identity Package",
    "totalAmount": 5000,
    "paymentTerms": "50% upfront, 50% on completion",
    "deliveryDate": "2025-02-15"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "contractId": "contract_1234567890",
    "pdfUrl": "https://storage.googleapis.com/audiojones/contracts/contract_1234567890.pdf",
    "createdAt": "2025-01-20T19:00:00Z"
  }
}
```

---

### Sign Contract

Add a digital signature to a contract.

**Endpoint:** `POST /api/contracts/sign`

**Auth:** User required

**Request Body:**

```json
{
  "contractId": "contract_1234567890",
  "signatureName": "John Doe",
  "signatureDate": "2025-01-20"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "contractId": "contract_1234567890",
    "status": "signed",
    "signedAt": "2025-01-20T19:30:00Z",
    "signedPdfUrl": "https://storage.googleapis.com/audiojones/contracts/contract_1234567890_signed.pdf"
  }
}
```

---

## Portal APIs

### Get Dashboard Data

Get user dashboard data.

**Endpoint:** `GET /api/portal/dashboard`

**Auth:** User required

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "uid": "abc123",
      "email": "user@example.com",
      "displayName": "John Doe"
    },
    "stats": {
      "activeProjects": 3,
      "completedProjects": 12,
      "upcomingBookings": 2
    },
    "recentActivity": [
      {
        "type": "project_created",
        "title": "New Brand Identity",
        "date": "2025-01-20"
      }
    ]
  }
}
```

---

### Get Billing Information

Get user billing and subscription information.

**Endpoint:** `GET /api/portal/billing`

**Auth:** User required

**Response:**

```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "sub_123",
      "plan": "Creator Pro",
      "status": "active",
      "currentPeriodEnd": "2025-02-20T00:00:00Z",
      "cancelAtPeriodEnd": false,
      "amount": 99.00,
      "currency": "USD"
    },
    "paymentMethod": {
      "type": "card",
      "last4": "4242",
      "brand": "Visa",
      "expiryMonth": 12,
      "expiryYear": 2026
    }
  }
}
```

---

## Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "error": "Human-readable error message",
  "details": "Additional technical details" // Optional
}
```

### Common Error Codes

| Status | Error | Cause | Solution |
|--------|-------|-------|----------|
| 400 | `Missing required fields` | Request missing required parameters | Check request body |
| 401 | `Unauthorized: missing token/cookie` | No authentication provided | Include Bearer token |
| 401 | `Invalid token` | Token expired or invalid | Get new ID token |
| 403 | `Forbidden: admin claim required` | User lacks admin privileges | Contact admin |
| 404 | `Resource not found` | Resource doesn't exist | Check resource ID |
| 500 | `Internal server error` | Server-side error | Contact support |

### Example Error Response

```json
{
  "success": false,
  "error": "Failed to create draft",
  "details": "OpenAI API error: rate limit exceeded"
}
```

---

## Rate Limiting

### Current Limits

| API Category | Rate Limit | Window |
|-------------|------------|--------|
| Admin APIs | 100 requests | per minute |
| Blog APIs | 10 requests | per minute |
| Payment APIs | 20 requests | per minute |
| Public APIs | 60 requests | per minute |

### Rate Limit Headers

Responses include rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1737400000
```

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "details": "Too many requests. Limit: 100/min. Try again in 45 seconds."
}
```

---

## Best Practices

### 1. Token Management

- **Refresh tokens** before they expire (1 hour default)
- **Store securely** — Never expose ID tokens in client-side code
- **Revoke on logout** — Call `signOut()` to invalidate tokens

### 2. Error Handling

```typescript
try {
  const response = await fetch('/api/endpoint', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!result.success) {
    console.error('API Error:', result.error);
    // Handle error
  }

  // Process result.data
} catch (error) {
  console.error('Network Error:', error);
  // Handle network error
}
```

### 3. Pagination

For large datasets, always use pagination:

```bash
# First page
GET /api/blog/draft?limit=20&offset=0

# Second page
GET /api/blog/draft?limit=20&offset=20
```

### 4. Idempotency

For operations that shouldn't be repeated (e.g., payments), use idempotency keys:

```typescript
fetch('/api/stripe/checkout', {
  headers: {
    'Idempotency-Key': 'unique_request_id_123'
  }
});
```

---

## Webhooks

The platform receives webhooks from external services:

### Stripe Webhooks

**Endpoint:** Firebase Cloud Function `stripeWebhook`

**Events Handled:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### Cal.com Webhooks

**Endpoint:** Firebase Cloud Function `calcomWebhook`

**Events Handled:**
- `booking.created`
- `booking.rescheduled`
- `booking.cancelled`

### Whop Webhooks

**Endpoint:** Firebase Cloud Function (configured in `functions/`)

**Events Handled:**
- `membership.created`
- `membership.renewed`
- `membership.cancelled`

---

## Testing

### Using cURL

```bash
# Get admin token first
TOKEN="your_admin_id_token_here"

# Test list users
curl -X GET "https://audiojones.com/api/admin/users" \
  -H "Authorization: Bearer $TOKEN"

# Test create draft
curl -X POST "https://audiojones.com/api/blog/draft" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pillar": "ai",
    "topic": "AI Marketing Trends 2025"
  }'
```

### Using Postman

1. **Import collection** — Create from this documentation
2. **Set environment variable** — `{{baseUrl}}` = `https://audiojones.com/api`
3. **Set authorization** — Bearer Token = `{{idToken}}`
4. **Run tests** — Verify responses

---

## Support

For API support:

- **Email:** support@audiojones.com
- **Documentation:** [https://audiojones.com/docs/api](https://audiojones.com/docs/api)
- **Status Page:** [https://status.audiojones.com](https://status.audiojones.com)

---

**API Version:** 1.0
**Last Updated:** 2025-01-XX
**Maintained By:** AJ DIGITAL LLC Engineering Team
