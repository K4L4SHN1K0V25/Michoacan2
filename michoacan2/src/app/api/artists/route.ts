import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/artists - Obtener todos los artistas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const limit = parseInt(searchParams.get('limit') || '20');

    const artists = await prisma.artists.findMany({
      where: genre ? { genre } : {},
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: artists,
      count: artists.length,
    });
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener artistas' },
      { status: 500 }
    );
  }
}

// POST /api/artists - Crear nuevo artista
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, genre, contact_email, bio, photo_url } = body;

    const artist = await prisma.artists.create({
      data: {
        name,
        genre,
        contact_email,
        bio,
        photo_url,
      },
    });

    return NextResponse.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    console.error('Error creating artist:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear artista' },
      { status: 500 }
    );
  }
}
