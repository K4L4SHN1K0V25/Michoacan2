import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/events/[id] - Get single event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const eventId = parseInt(resolvedParams.id);

    const event = await prisma.events.findUnique({
      where: {
        event_id: eventId,
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

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Transform data
    const eventWithArtists = {
      ...event,
      venue: event.venues,
      artists: event.event_artists.map(ea => ea.artists),
      ticket_types: event.ticket_types,
    };

    return NextResponse.json({
      success: true,
      data: eventWithArtists,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener evento' },
      { status: 500 }
    );
  }
}

// PATCH /api/events/[id] - Update event
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const eventId = parseInt(resolvedParams.id);
    const body = await request.json();

    const {
      name,
      description,
      start_dt,
      end_dt,
      venue_id,
      cover_url,
      seated,
      status,
      ticket_types,
    } = body;

    // Update event
    const event = await prisma.events.update({
      where: {
        event_id: eventId,
      },
      data: {
        name,
        description,
        start_dt: start_dt ? new Date(start_dt) : undefined,
        end_dt: end_dt ? new Date(end_dt) : undefined,
        venue_id: venue_id || null,
        cover_url: cover_url || null,
        seated: seated !== undefined ? seated : undefined,
        status: status || undefined,
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

    // Update ticket types if provided
    if (ticket_types && Array.isArray(ticket_types)) {
      // Deactivate existing ticket types
      await prisma.ticket_types.updateMany({
        where: {
          event_id: eventId,
        },
        data: {
          is_active: false,
        },
      });

      // Create new ticket types
      await prisma.ticket_types.createMany({
        data: ticket_types.map((tt: any) => ({
          event_id: eventId,
          name: tt.name,
          category: tt.category || 'general',
          price: tt.price,
          currency: tt.currency || 'MXN',
          quota: tt.quantity,
          max_per_user: tt.max_per_user || null,
          is_active: true,
        })),
      });
    }

    // Fetch updated event
    const updatedEvent = await prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
      include: {
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
        venues: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedEvent,
      message: 'Event updated successfully',
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar evento' },
      { status: 500 }
    );
  }
}
