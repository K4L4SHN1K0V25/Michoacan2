import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';

// GET /api/admin/users - List all users with their roles
export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    const userData = await verifyRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get all users with their roles
    const users = await prisma.users.findMany({
      include: {
        user_roles: {
          include: {
            roles: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Format the response
    const formattedUsers = users.map(user => ({
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.user_roles[0]?.roles?.role_name || 'customer',
      status: user.status,
      lastLoginAt: user.last_login_at,
      createdAt: user.created_at,
      failedAttempts: user.failed_attempts,
    }));

    return NextResponse.json({
      success: true,
      data: formattedUsers,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create new user (artist or staff)
export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    const userData = await verifyRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Only allow creating artist or staff accounts
    if (role !== 'artist' && role !== 'staff') {
      return NextResponse.json(
        { success: false, error: 'Solo se pueden crear cuentas de Artista o Staff' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'El correo ya está registrado' },
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
    if (role === 'artist') {
      await prisma.artists.create({
        data: {
          name: user.name,
          contact_email: user.email,
          bio: '',
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: role,
      },
      message: 'Usuario creado exitosamente',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
}
