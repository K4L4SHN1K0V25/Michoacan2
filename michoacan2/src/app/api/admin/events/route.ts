import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';

// GET /api/admin/events - List all events
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

    // Get all events with artist info
    const events = await prisma.events.findMany({
      include: {
        event_artists: {
          include: {
            artists: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Format the response
    const formattedEvents = events.map(event => ({
      id: event.event_id,
      name: event.event_name,
      artistName: event.event_artists[0]?.artists?.name || 'Unknown',
      artistId: event.event_artists[0]?.artist_id || 0,
      date: event.event_date,
      location: event.location,
      venue: event.venue,
      status: event.status,
      totalTickets: event.total_tickets,
      availableTickets: event.available_tickets,
      createdAt: event.created_at,
    }));

    return NextResponse.json({
      success: true,
      data: formattedEvents,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener eventos' },
      { status: 500 }
    );
  }
}
