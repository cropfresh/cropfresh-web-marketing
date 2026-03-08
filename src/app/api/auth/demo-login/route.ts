import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Helper to create a quick mock JWT
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'hackathon-super-secret-key-123'
);

export async function POST(request: Request) {
  try {
    const { phone, user_type } = await request.json();

    if (!phone || !user_type) {
      return NextResponse.json(
        { error: 'Phone number and user_type are required' },
        { status: 400 }
      );
    }

    // Determine district randomly for mock data or default
    const district = 'Bengaluru Rural';

    // Create the mock JWT payload
    const payload = {
      sub: `mock-user-${phone}`,
      type: user_type,
      phone,
      district,
    };

    // Sign the JWT
    // Valid for 30 days for hackathon convenience
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(SECRET_KEY);

    // Create response
    const response = NextResponse.json({
      success: true,
      data: {
        token,
        user: payload,
      },
    });

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Demo Login Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
