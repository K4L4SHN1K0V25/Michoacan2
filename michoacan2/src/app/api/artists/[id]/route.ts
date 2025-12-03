import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/artists/[id] - Obtener artista por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const artistId = parseInt(resolvedParams.id);

    const artist = await prisma.artists.findUnique({
      where: {
        artist_id: artistId,
      },
    });

    if (!artist) {
      return NextResponse.json(
        { success: false, error: 'Artista no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener artista' },
      { status: 500 }
    );
  }
}

// PATCH /api/artists/[id] - Actualizar artista
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const artistId = parseInt(resolvedParams.id);
    const body = await request.json();

    const artist = await prisma.artists.update({
      where: {
        artist_id: artistId,
      },
      data: body,
    });

    return NextResponse.json({
      success: true,
      data: artist,
    });
  } catch (error) {
    console.error('Error updating artist:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar artista' },
      { status: 500 }
    );
  }
}
