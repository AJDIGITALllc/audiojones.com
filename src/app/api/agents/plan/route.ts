/**
 * Agent Plan Generation API
 * Generates validated action plans from natural language prompts
 */

import { NextRequest, NextResponse } from 'next/server';
import { planFromPrompt } from '@aj/agent-core';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, context, constraints } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate plan using agent-core
    const result = await planFromPrompt({
      prompt,
      context,
      constraints,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          validationErrors: result.validationErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      plan: result.plan,
    });
  } catch (error) {
    console.error('[Agent Plan API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
