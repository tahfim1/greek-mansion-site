import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In-memory store for rate limiting: Map<IP_Address, { attempts: number, lockUntil: number }>
// Note: In a real multi-server deployment, this should use Redis. 
// For localhost/single-server, in-memory is perfectly fine.
const rateLimitMap = new Map<string, { attempts: number; lockUntil: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Check rate limit status
    const limitInfo = rateLimitMap.get(ip);
    const now = Date.now();
    
    if (limitInfo && limitInfo.lockUntil > now) {
      const waitSeconds = Math.ceil((limitInfo.lockUntil - now) / 1000);
      return NextResponse.json(
        { 
          message: `Too many failed attempts. Try again in ${waitSeconds} seconds.`,
          lockUntil: limitInfo.lockUntil 
        },
        { status: 429 }
      );
    }

    const { username, password } = await req.json();

    // The secure credentials requested by the user
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = 'greekmansion2026';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Success: Clear rate limit for this IP
      rateLimitMap.delete(ip);

      // Set HTTP-only cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/admin',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    // Failure: Increment attempts and calculate exponential backoff
    let attempts = limitInfo ? limitInfo.attempts + 1 : 1;
    let lockDurationMs = 0;
    
    if (attempts >= 3) {
      // Exponential backoff starting at 3rd failed attempt: 5s, 10s, 20s, 40s...
      lockDurationMs = 5000 * Math.pow(2, attempts - 3);
      // Cap at 15 minutes
      if (lockDurationMs > 900000) lockDurationMs = 900000;
    }

    rateLimitMap.set(ip, {
      attempts,
      lockUntil: now + lockDurationMs,
    });

    return NextResponse.json(
      { message: 'Invalid username or password.' },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
