import "server-only";

interface GoDaddyRecord {
  type: string;
  name: string;
  data: string;
  ttl: number;
}

/**
 * Updates DNS records for a domain via GoDaddy API
 * @param domain - The domain to update (e.g., "audiojones.com")
 * @param records - Array of DNS records to set
 */
export async function updateGoDaddyDNS(domain: string, records: GoDaddyRecord[]): Promise<any> {
  const apiKey = process.env.GODADDY_API_KEY;
  const apiSecret = process.env.GODADDY_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('GODADDY_API_KEY and GODADDY_API_SECRET environment variables are required');
  }

  if (!domain) {
    throw new Error('Domain is required');
  }

  if (!Array.isArray(records) || records.length === 0) {
    throw new Error('Records array is required and must not be empty');
  }

  try {
    const response = await fetch(`https://api.godaddy.com/v1/domains/${domain}/records`, {
      method: 'PUT',
      headers: {
        'Authorization': `sso-key ${apiKey}:${apiSecret}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(records)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`GoDaddy API error (${response.status}): ${errorText}`);
    }

    // GoDaddy PUT /records typically returns empty body on success
    const responseData = await response.json().catch(() => ({}));
    
    console.log(`[godaddy] DNS records updated for ${domain}:`, records);
    
    return responseData;

  } catch (error) {
    console.error(`[godaddy] Failed to update DNS for ${domain}:`, error);
    throw error;
  }
}