import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/artists/[id]/events - Get events for a specific artist
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const artistId = parseInt(resolvedParams.id);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Build where clause
    const whereClause: any = {
      event_artists: {
        some: {
          artist_id: artistId,
        },
      },
    };

    if (status) {
      whereClause.status = status;
    }

    const events = await prisma.events.findMany({
      where: whereClause,
      orderBy: {
        start_dt: 'desc',
      },
      include: {
        venues: true,
        ticket_types: {
          where: {
            is_active: true,
          },
        },
        event_artists: {
          include: {
            artists: true,
          },
        },
      },
    });

    // Transform the data to include artists at the top level
    const eventsWithArtists = events.map(event => ({
      ...event,
      venue: event.venues,
      artists: event.event_artists.map(ea => ea.artists),
      ticket_types: event.ticket_types,
    }));

    return NextResponse.json({
      success: true,
      data: eventsWithArtists,
      count: eventsWithArtists.length,
    });
  } catch (error) {
    console.error('Error fetching artist events:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener eventos del artista' },
      { status: 500 }
    );
  }
}
