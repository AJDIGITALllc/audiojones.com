// Server-side MailerLite integration helper
// This module handles subscriber management via MailerLite API v2

interface UpsertSubscriberParams {
  email: string;
  tag?: string;
  name?: string;
}

interface MailerLiteSubscriber {
  id: string;
  email: string;
  name?: string;
  status: string;
}

/**
 * Creates or updates a MailerLite subscriber and optionally adds a tag
 */
export async function upsertMailerLiteSubscriber(params: UpsertSubscriberParams): Promise<void> {
  const { email, tag, name } = params;

  // Early return if no email
  if (!email) {
    console.log('[mailerlite] No email provided, skipping');
    return;
  }

  const token = process.env.MAILERLITE_TOKEN;
  if (!token) {
    console.error('[mailerlite] MAILERLITE_TOKEN not configured');
    return;
  }

  try {
    // Step 1: Create or update subscriber
    const subscriberResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: {
          name: name ?? ""
        },
        status: "active"
      }),
    });

    const subscriberData = await subscriberResponse.json().catch(() => null);
    
    if (!subscriberResponse.ok) {
      console.error('[mailerlite] Subscriber upsert failed:', subscriberResponse.status, subscriberData);
      return;
    }

    console.log('[mailerlite] Subscriber upserted:', email);

    // Step 2: Add tag if provided and we have subscriber ID
    if (tag && subscriberData?.data?.id) {
      const subscriberId = subscriberData.data.id;
      
      const tagResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}/tags`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: tag
        }),
      });

      if (tagResponse.ok) {
        console.log('[mailerlite] Tag added:', tag, 'to subscriber:', email);
      } else {
        console.error('[mailerlite] Tag addition failed:', tagResponse.status);
      }
    } else if (tag) {
      console.log('[mailerlite] No subscriber ID returned, skipping tag:', tag);
    }

  } catch (error) {
    console.error('[mailerlite] Request failed:', error);
  }
}