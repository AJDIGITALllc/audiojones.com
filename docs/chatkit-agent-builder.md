---
title: "ChatKit + Agent Builder Integration Pack"
description: "End-to-end implementation guide for Next.js + Vercel + Firebase + Whop using ChatKit and Agent Builder."
version: "v1.0.0"
maintainer: "AJ DIGITAL LLC"
created: "2025-10-28"
last_updated: "2025-10-28"
tags: ["chatkit", "agent-builder", "nextjs", "vercel", "firebase", "whop", "cal.com", "stripe", "n8n", "google-sheets"]
status: "stable"
---


# ChatKit + Agent Builder Integration Pack

**Target stack:** Next.js (Vercel) + Firebase Functions + Whop portal + Cal.com + Stripe + Google Sheets + n8n.  
**Goal:** Build once in Agent Builder. Embed everywhere with ChatKit. Log data to Sheets. Automate with n8n.

---

## 0. Prerequisites

- Node 18+ and npm
- Next.js App Router project deployed on Vercel
- OpenAI account with access to **Agent Builder** and **ChatKit**
- Google account for Sheets
- n8n instance (cloud or self-hosted)
- Optional: Firebase Functions (Node 22 + TypeScript)
- Whop portal access for embedded widgets
- Cal.com and Stripe accounts

---

## 1. Repo layout

```text
/audiojones.com/
 ├─ /app/                      # Next.js App Router
 │   └─ /api/
 │       └─ /chatkit/
 │           ├─ /session/route.ts
 │           └─ /refresh/route.ts
 ├─ /components/
 │   └─ ChatWidget.tsx
 ├─ /public/
 ├─ /styles/ or /app/globals.css
 ├─ /docs/
 │   └─ chatkit-agent-builder.md   # this file
 ├─ /functions/                 # optional Firebase Functions
 ├─ .env.local
 ├─ package.json
 └─ README.md
```

---

## 2. Environment variables

Create `.env.local`:

```env
OPENAI_API_KEY=sk-...
CHATKIT_WORKFLOW_ID=wf-...
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

Add in Vercel Project Settings → Environment Variables for production.

---

## 3. Install dependencies

```bash
npm i @openai/chatkit-react
```

If you plan to call external tools via Functions: initialize Firebase Functions and add needed SDKs.

---

## 4. Backend: ChatKit session endpoints (Next.js App Router)

**`/app/api/chatkit/session/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { deviceId, userId, workflowId, traits } = await req.json().catch(() => ({}));

    const workflow = workflowId || process.env.CHATKIT_WORKFLOW_ID;
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 });
    if (!workflow) return NextResponse.json({ error: 'Missing CHATKIT_WORKFLOW_ID' }, { status: 500 });

    const uid = (deviceId || userId || 'anon').toString().slice(0, 64);

    const resp = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        workflow: { id: workflow },
        user: uid,
        traits: traits || {},
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: text }, { status: resp.status });
    }

    const data = await resp.json();
    return NextResponse.json({ client_secret: data.client_secret });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
```

**`/app/api/chatkit/refresh/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { currentClientSecret, deviceId, workflowId } = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/chatkit/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, workflowId }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
```

---

## 5. Frontend: ChatKit wrapper + theme

Install: `npm i @openai/chatkit-react`

**`/components/ChatWidget.tsx`**

```tsx
'use client';
import { useEffect } from 'react';
import { ChatKit, useChatKit } from '@openai/chatkit-react';

function getOrCreateDeviceId(key = 'aj_device_id') {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function ChatWidget() {
  const deviceId = getOrCreateDeviceId();

  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        const res = await fetch('/api/chatkit/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId }),
        });
        const { client_secret } = await res.json();
        return client_secret;
      },
    },
  });

  useEffect(() => {
    // TODO: optionally re-issue with UTMs or page context
  }, []);

  return (
    <div className="aj-chat-container">
      <ChatKit control={control} className="aj-chat" />
    </div>
  );
}
```

**Theme tokens** (add to `/app/globals.css`):

```css
:root {
  --aj-primary: #FF4500; /* Orange Red */
  --aj-accent: #FFD700;  /* Gold */
  --aj-teal:   #008080;  /* Teal */
  --aj-bg:     #ffffff;
  --aj-text:   #111111;
}
.dark:root {
  --aj-bg:   #0a0a0a;
  --aj-text: #f2f2f2;
}

.aj-chat-container {
  position: fixed; bottom: 16px; right: 16px;
  width: 360px; height: 640px;
  border-radius: 16px; overflow: hidden;
  background: var(--aj-bg); color: var(--aj-text);
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  border: 1px solid rgba(0,0,0,0.08);
}

.aj-chat { width: 100%; height: 100%; }
.aj-chat-container * { accent-color: var(--aj-primary); }
```

**Usage** (e.g., `/app/page.tsx`):

```tsx
import dynamic from 'next/dynamic';
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* content */}
      <ChatWidget />
    </main>
  );
}
```

---

## 6. Agent Builder: workflows

Create and publish three workflows, then copy their `workflow_id`s:

1. **Lead Concierge** (site)  
   - Tools: Google Sheets (contacts/leads), Cal.com, Stripe Checkout link, UTM ingestion.
   - Outcomes: `qualified | booked | learn_more`

2. **Client Portal Assistant** (Whop)  
   - Tools: Whop API (subscription, license), Google Drive/Notion links, Google Sheets (subscriptions/payments).
   - Outcomes: `support | deliverables | renewal_interest`

3. **Ops Copilot** (internal)  
   - Tools: Google Sheets read across tabs, Slack/Email notifier, anomaly detection thresholds.
   - Outcomes: `weekly_summary | anomaly_found`

Start with one `workflow_id` in `.env.local` for testing. Swap per page if needed.

---

## 7. Data Intelligence: Google Sheets schema

Create a single spreadsheet with tabs and exact headers.

**`contacts`**  
| id | created_at | email | phone | first_name | last_name | company | source | utm_source | utm_medium | utm_campaign | tags |

**`leads`**  
| id | contact_id | created_at | intent | budget_range | timeframe | notes | score | owner | status | last_touch |

**`engagements`**  
| id | contact_id | occurred_at | channel | page | message | outcome | workflow_id | session_id |

**`bookings`**  
| id | contact_id | created_at | event_start | event_end | cal_provider | cal_event_id | meeting_type | status |

**`subscriptions`**  
| id | contact_id | provider | product | plan | status | started_at | renews_at | canceled_at | mrr |

**`payments`**  
| id | contact_id | provider | amount | currency | paid_at | method | status | invoice_id | metadata |

**`chat_events`**  
| id | session_id | occurred_at | type | payload_json |

---

## 8. n8n glue

Create webhook: `POST /webhooks/ajd/chat-events`  
Sample payloads:

```json
{"type":"chat.turn","session_id":"ck_123","occurred_at":"2025-10-28T16:20:00Z","page":"/services","message":"I need a marketing automation package","intent":"buy_inquiry","score":0.72,"traits":{"utm_source":"yt","utm_campaign":"oct_launch"}}
```

```json
{"type":"calendar.booked","contact_id":"c_456","event_start":"2025-11-01T18:00:00Z","meeting_type":"Consult 30","cal_provider":"cal.com"}
```

Map to Google Sheets nodes to append rows in the tabs above.

---

## 9. Whop integration

- Embed the ChatWidget in Whop pages via iframe or custom HTML block.
- Provide JWT or API key to your server to fetch Whop subscription info server-side for the agent tools.
- Display quick actions: **View Contract**, **Download Files**, **Open Support Ticket**, **Upgrade Plan**.

---

## 10. Booking and payments

- Cal.com: include booking links in chat actions. On success, log to `bookings`.
- Stripe: for paid consults or deposits, send user to Stripe Checkout URL. Record success in `payments` via webhook or n8n.

---

## 11. Security

- Never expose `OPENAI_API_KEY` on the client.
- Short TTL for sessions. Refresh via `/api/chatkit/refresh` if needed.
- Rate-limit `/api/chatkit/session` per device/IP.
- Store only necessary PII. Keep Sheets access limited.

---

## 12. Validation checklist

- [ ] `/api/chatkit/session` returns `{{ client_secret }}`
- [ ] Widget renders on `/` and `/services`
- [ ] Lead Concierge writes to `contacts`, `leads`, `engagements`
- [ ] Booking writes to `bookings`
- [ ] Whop portal assistant reads subscription status
- [ ] Ops Copilot appends `weekly_summary` to `engagements`
- [ ] n8n receives and logs `chat.turn` events
- [ ] Vercel env vars set in Production

---

## 13. Commands

```bash
# dev
npm run dev

# lint and typecheck
npm run lint
npm run typecheck

# deploy (Vercel)
git add . && git commit -m "feat: chatkit integration v1" && git push
```

---

## 14. Notes

- Use one workflow per page if intents differ. Or one global with routing node.
- Version workflows in Agent Builder. Update `.env.local` on publish if IDs change.
- For advanced hosting, see “custom-chatkit” docs and Agents SDK.
