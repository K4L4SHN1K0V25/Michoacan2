import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/test - Endpoint de prueba para verificar conexión a DB
export async function GET() {
  try {
    // Contar registros en tablas principales
    const [eventsCount, artistsCount, venuesCount, usersCount] = await Promise.all([
      prisma.events.count(),
      prisma.artists.count(),
      prisma.venues.count(),
      prisma.users.count(),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Conexión a base de datos exitosa',
      data: {
        events: eventsCount,
        artists: artistsCount,
        venues: venuesCount,
        users: usersCount,
      },
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al conectar con la base de datos',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
