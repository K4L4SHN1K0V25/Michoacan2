import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';

// POST /api/auth/register - Register new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'customer' } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create user
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password_hash,
        status: 'active',
      },
    });

    // Get or create role
    let roleRecord = await prisma.roles.findFirst({
      where: { role_name: role },
    });

    if (!roleRecord) {
      roleRecord = await prisma.roles.create({
        data: {
          role_name: role,
          description: `${role} role`,
        },
      });
    }

    // Assign role to user
    await prisma.user_roles.create({
      data: {
        user_id: user.user_id,
        role_id: roleRecord.role_id,
      },
    });

    // If role is artist, create artist record
    let artistId: number | undefined;
    if (role === 'artist') {
      const artist = await prisma.artists.create({
        data: {
          name: user.name,
          contact_email: user.email,
          bio: '',
        },
      });
      artistId = artist.artist_id;
    }

    // Generate JWT token
    const token = await signToken({
      userId: user.user_id,
      email: user.email,
      role: role,
      artistId,
    });

    // Create response with httpOnly cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: role,
          artistId,
        },
      },
      message: 'User registered successfully',
    });

    // Set httpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { success: false, error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}
