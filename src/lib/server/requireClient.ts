import { NextRequest } from 'next/server';
import { adminAuth } from './firebaseAdmin';

/**
 * Client Authentication Helper
 * 
 * Verifies Firebase Auth JWT from Authorization Bearer header.
 * Returns the decoded email on success, throws on failure.
 * 
 * This follows the same pattern as admin authentication but without
 * requiring custom claims - any authenticated Firebase user can access
 * client endpoints.
 */
export async function requireClient(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AuthError('Authorization header required', 401);
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    throw new AuthError('Bearer token required', 401);
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await adminAuth().verifyIdToken(token, true);
    
    if (!decodedToken.email) {
      throw new AuthError('Email not found in token', 401);
    }

    return decodedToken.email;
    
  } catch (error) {
    console.error('Client auth verification failed:', error);
    
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Firebase verification errors
    if (error instanceof Error) {
      if (error.message.includes('Firebase ID token')) {
        throw new AuthError('Invalid authentication token', 401);
      }
      if (error.message.includes('expired')) {
        throw new AuthError('Authentication token expired', 401);
      }
    }
    
    throw new AuthError('Authentication failed', 401);
  }
}

/**
 * Custom authentication error class for proper error handling
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Helper function to create standardized auth error responses
 */
export function createAuthErrorResponse(error: AuthError) {
  return Response.json(
    { 
      ok: false, 
      error: error.message === 'Authentication failed' 
        ? 'unauthorized' 
        : error.message.toLowerCase().replace(/\s+/g, '_')
    },
    { status: error.statusCode }
  );
}