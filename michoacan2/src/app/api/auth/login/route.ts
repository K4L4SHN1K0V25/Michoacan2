import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';

// POST /api/auth/login - Login user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        user_roles: {
          include: {
            roles: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (user.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Account is not active' },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      // Increment failed attempts
      await prisma.users.update({
        where: { user_id: user.user_id },
        data: {
          failed_attempts: (user.failed_attempts || 0) + 1,
        },
      });

      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Get user role
    const userRole = user.user_roles[0]?.roles?.role_name || 'customer';

    // Get artist_id if user is an artist
    let artistId: number | undefined;
    if (userRole === 'artist') {
      const artist = await prisma.artists.findFirst({
        where: { contact_email: user.email },
      });
      artistId = artist?.artist_id;
    }

    // Update last login and reset failed attempts
    await prisma.users.update({
      where: { user_id: user.user_id },
      data: {
        last_login_at: new Date(),
        failed_attempts: 0,
      },
    });

    // Generate JWT token
    const token = await signToken({
      userId: user.user_id,
      email: user.email,
      role: userRole,
      artistId,
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: userRole,
          artistId,
        },
      },
      message: 'Login successful',
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
    console.error('Error logging in:', error);
    return NextResponse.json(
      { success: false, error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
}
