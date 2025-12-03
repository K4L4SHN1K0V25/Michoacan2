import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';

// PATCH /api/admin/users/[id] - Update user
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin access
    const userData = await verifyRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, password, role, status } = body;

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
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
        { success: false, error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Prevent admins from modifying their own account
    if (userId === userData.userId) {
      return NextResponse.json(
        { success: false, error: 'No puedes modificar tu propia cuenta' },
        { status: 400 }
      );
    }

    // Update user basic info
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (status) updateData.status = status;
    if (password) {
      updateData.password_hash = await hashPassword(password);
    }

    await prisma.users.update({
      where: { user_id: userId },
      data: updateData,
    });

    // Update role if provided
    if (role && role !== user.user_roles[0]?.roles?.role_name) {
      // Get new role
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

      // Delete old role assignment
      await prisma.user_roles.deleteMany({
        where: { user_id: userId },
      });

      // Create new role assignment
      await prisma.user_roles.create({
        data: {
          user_id: userId,
          role_id: roleRecord.role_id,
        },
      });

      // If changing to artist, create artist record if it doesn't exist
      if (role === 'artist') {
        const existingArtist = await prisma.artists.findFirst({
          where: { contact_email: email || user.email },
        });

        if (!existingArtist) {
          await prisma.artists.create({
            data: {
              name: name || user.name,
              contact_email: email || user.email,
              bio: '',
            },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin access
    const userData = await verifyRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: 'ID de usuario inválido' },
        { status: 400 }
      );
    }

    // Prevent admins from deleting their own account
    if (userId === userData.userId) {
      return NextResponse.json(
        { success: false, error: 'No puedes eliminar tu propia cuenta' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Delete user role assignments first (foreign key constraint)
    await prisma.user_roles.deleteMany({
      where: { user_id: userId },
    });

    // Delete the user
    await prisma.users.delete({
      where: { user_id: userId },
    });

    return NextResponse.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
}
