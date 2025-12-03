import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  try {
    // Verify token and get user data
    const userData = await verifyRequest(request);

    if (!userData) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.users.findUnique({
      where: { user_id: userData.userId },
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
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user role
    const userRole = user.user_roles[0]?.roles?.role_name || 'customer';

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email,
          role: userRole,
          artistId: userData.artistId,
          status: user.status,
          createdAt: user.created_at,
          lastLoginAt: user.last_login_at,
        },
      },
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener usuario' },
      { status: 500 }
    );
  }
}
