import { NextResponse } from 'next/server';
import artistHubConfig from '@/config/artistHub.json';

export async function GET() {
  try {
    // Replace environment variable placeholders with actual URLs
    const services = artistHubConfig.services.map(service => ({
      ...service,
      whopProductUrl: getWhopUrl(service.whopProductUrl)
    }));

    return NextResponse.json({
      ...artistHubConfig,
      services
    });
  } catch (error) {
    console.error('Error loading artist hub config:', error);
    return NextResponse.json(
      { error: 'Failed to load artist hub configuration' },
      { status: 500 }
    );
  }
}

function getWhopUrl(envVarName: string): string {
  const envUrls: Record<string, string> = {
    'WHOP_STUDIO_PRODUCT_URL': process.env.WHOP_STUDIO_PRODUCT_URL || '#',
    'WHOP_MIX_PRODUCT_URL': process.env.WHOP_MIX_PRODUCT_URL || '#',
    'WHOP_BEATS_URL': process.env.WHOP_BEATS_URL || '#',
    'WHOP_CONSULT_PRODUCT_URL': process.env.WHOP_CONSULT_PRODUCT_URL || '#'
  };

  return envUrls[envVarName] || '#';
}