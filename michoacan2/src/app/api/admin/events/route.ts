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

    // Get all events with artist and venue info
    const events = await prisma.events.findMany({
      include: {
        event_artists: {
          include: {
            artists: true,
          },
        },
        venues: true,
        ticket_types: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Format the response
    const formattedEvents = events.map(event => {
      const totalTickets = event.ticket_types.reduce((sum, tt) => sum + tt.quota, 0);
      const soldTickets = 0; // This would need a more complex query to calculate actual sold tickets

      return {
        id: event.event_id,
        name: event.name,
        artistName: event.event_artists[0]?.artists?.name || 'Sin artista',
        artistId: event.event_artists[0]?.artist_id || 0,
        date: event.start_dt.toISOString(),
        location: event.venues?.city || 'Sin ubicación',
        venue: event.venues?.name || 'Sin venue',
        status: event.status,
        totalTickets: totalTickets,
        availableTickets: totalTickets - soldTickets,
        createdAt: event.created_at?.toISOString() || new Date().toISOString(),
      };
    });

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
