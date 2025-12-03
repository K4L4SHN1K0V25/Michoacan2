import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/venues - Obtener todos los venues
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit') || '20');

    const venues = await prisma.venues.findMany({
      where: city ? { city } : {},
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: venues,
      count: venues.length,
    });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener venues' },
      { status: 500 }
    );
  }
}

// POST /api/venues - Crear nuevo venue
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, city, state, capacity } = body;

    const venue = await prisma.venues.create({
      data: {
        name,
        address,
        city,
        state,
        capacity,
      },
    });

    return NextResponse.json({
      success: true,
      data: venue,
    });
  } catch (error) {
    console.error('Error creating venue:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear venue' },
      { status: 500 }
    );
  }
}
