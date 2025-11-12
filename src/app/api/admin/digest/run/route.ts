/**
 * Ops Digest Trigger API
 * 
 * POST /api/admin/digest/run - Generates and sends operational digest to Slack
 * 
 * Features:
 * - Admin authentication required
 * - Builds comprehensive ops digest
 * - Sends to Slack with rich formatting
 * - Logs to Firestore for tracking
 * - Safe error handling for schedulers
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/requireAdmin';
import { buildOpsDigest, updateDigestStatus, logDigest } from '@/lib/server/digest';
import { sendOpsDigestToSlack, previewOpsDigestSlack } from '@/lib/server/digestSlack';

export async function POST(req: NextRequest) {
  try {
    // Require admin authentication
    requireAdmin(req);
    
    const { searchParams } = new URL(req.url);
    const previewOnly = searchParams.get('preview') === 'true';
    
    console.log(`🎯 ${previewOnly ? 'Previewing' : 'Generating'} ops digest...`);

    // Build the digest
    const digest = await buildOpsDigest();
    
    let sent = false;
    let slackResult: { success: boolean; error?: string } = { success: false };
    let slackPreview = null;

    if (previewOnly) {
      // Preview mode - format but don't send
      slackPreview = previewOpsDigestSlack(digest);
      console.log('📋 Generated digest preview');
    } else {
      // Production mode - send to Slack
      try {
        slackResult = await sendOpsDigestToSlack(digest);
        sent = slackResult.success;

        if (sent) {
          // Log successful digest
          await logDigest(digest, ['slack']);
          await updateDigestStatus({
            sent_at: new Date().toISOString(),
            success: true,
            digest_summary: digest.summary
          });
          
          console.log('✅ Ops digest sent and logged successfully');
        } else {
          // Log failed attempt
          await updateDigestStatus({
            sent_at: new Date().toISOString(),
            success: false,
            error: slackResult.error,
            digest_summary: digest.summary
          });
          
          console.error('❌ Failed to send digest:', slackResult.error);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        
        await updateDigestStatus({
          sent_at: new Date().toISOString(),
          success: false,
          error: errorMsg,
          digest_summary: digest.summary
        });
        
        console.error('❌ Digest sending failed:', error);
        slackResult = { success: false, error: errorMsg };
      }
    }

    // Return comprehensive response
    const response = {
      ok: true,
      preview_mode: previewOnly,
      sent,
      digest: {
        generated_at: digest.generatedAt,
        summary: digest.summary,
        slo_count: digest.slo.length,
        incident_count: digest.incidents.length,
        has_capacity_data: !!digest.capacity
      },
      slack: {
        success: slackResult.success,
        error: slackResult.error || null
      },
      ...(slackPreview && { preview: slackPreview })
    };

    // Always return 200 for schedulers, even if Slack fails
    return NextResponse.json(response);

  } catch (error) {
    if (error instanceof NextResponse) {
      // Admin auth failure - return as-is
      return error;
    }
    
    console.error('❌ Digest API error:', error);
    
    // For schedulers: return 200 with error details rather than 500
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error',
      sent: false,
      timestamp: new Date().toISOString()
    });
  }
}

// Support GET for health check
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    
    // Check if Slack is configured
    const slackConfigured = !!(
      process.env.SLACK_BOT_TOKEN && 
      process.env.SLACK_WEBHOOK_URL
    );
    
    return NextResponse.json({
      ok: true,
      endpoint: '/api/admin/digest/run',
      methods: ['POST'],
      configuration: {
        slack_configured: slackConfigured,
        supports_preview: true
      },
      usage: {
        send_digest: 'POST /api/admin/digest/run',
        preview_digest: 'POST /api/admin/digest/run?preview=true'
      }
    });
    
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    
    return NextResponse.json(
      { error: 'Failed to check digest endpoint' },
      { status: 500 }
    );
  }
}