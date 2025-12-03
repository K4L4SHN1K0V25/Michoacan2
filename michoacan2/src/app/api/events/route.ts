import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/events - Obtener todos los eventos activos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const limit = parseInt(searchParams.get('limit') || '10');

    const events = await prisma.events.findMany({
      where: {
        status: status as any,
      },
      take: limit,
      orderBy: {
        start_dt: 'asc',
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
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener eventos' },
      { status: 500 }
    );
  }
}

// POST /api/events - Crear nuevo evento (solo para artistas/admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      start_dt,
      end_dt,
      venue_id,
      cover_url,
      seated,
      artist_id,
      ticket_types,
      status
    } = body;

    // Create event with ticket types and artist relationship in a transaction
    const event = await prisma.events.create({
      data: {
        name,
        description,
        start_dt: new Date(start_dt),
        end_dt: new Date(end_dt),
        venue_id: venue_id || null,
        cover_url: cover_url || null,
        seated: seated || false,
        status: status || 'draft',
        // Create ticket types
        ticket_types: ticket_types ? {
          create: ticket_types.map((tt: any) => ({
            name: tt.name,
            category: tt.category || 'general',
            price: tt.price,
            currency: tt.currency || 'MXN',
            quota: tt.quantity,
            max_per_user: tt.max_per_user || null,
            is_active: true,
          })),
        } : undefined,
        // Create artist relationship
        event_artists: artist_id ? {
          create: {
            artist_id: artist_id,
          },
        } : undefined,
      },
      include: {
        ticket_types: true,
        event_artists: {
          include: {
            artists: true,
          },
        },
        venues: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: event,
      message: 'Event created successfully',
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear evento' },
      { status: 500 }
    );
  }
}
