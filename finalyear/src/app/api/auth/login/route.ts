import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database - in production, this would be your actual database
const users = [
  {
    id: 1,
    email: 'admin@sprodeta.org',
    password: 'admin123', // In production, this would be hashed
    role: 'admin',
  },
  {
    id: 2,
    email: 'manager@sprodeta.org',
    password: 'manager123',
    role: 'senior-manager',
  },
  {
    id: 3,
    email: 'officer@sprodeta.org',
    password: 'officer123',
    role: 'field-officer',
  },
  {
    id: 4,
    email: 'accountant@sprodeta.org',
    password: 'accountant123',
    role: 'accountant',
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set HTTP-only cookie
    const response = NextResponse.json(
      {
        message: 'Login successful',
        role: user.role,
      },
      { status: 200 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}