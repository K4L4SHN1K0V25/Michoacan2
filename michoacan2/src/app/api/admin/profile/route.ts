import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, email, phone } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'ID de usuario requerido' },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.users.findFirst({
        where: {
          email,
          NOT: {
            user_id: userId
          }
        }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'El email ya est  en uso por otro usuario' },
          { status: 409 }
        );
      }
    }

    // Update user profile
    const updatedUser = await prisma.users.update({
      where: { user_id: userId },
      data: {
        name,
        email,
        // Note: phone is not in the schema, so we'll skip it
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        status: true,
        created_at: true,
      }
    });

    return NextResponse.json({
      message: 'Perfil actualizado exitosamente',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el perfil' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}