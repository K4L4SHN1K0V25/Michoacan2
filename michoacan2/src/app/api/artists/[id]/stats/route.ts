import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/artists/[id]/stats - Get dashboard statistics for an artist
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const artistId = parseInt(resolvedParams.id);

    // Get all events for this artist
    const events = await prisma.events.findMany({
      where: {
        event_artists: {
          some: {
            artist_id: artistId,
          },
        },
      },
      include: {
        ticket_types: {
          where: {
            is_active: true,
          },
        },
      },
    });

    // Calculate stats
    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === 'active').length;

    // Calculate total capacity and revenue
    let totalCapacity = 0;
    let totalRevenue = 0;

    events.forEach(event => {
      event.ticket_types.forEach(ticketType => {
        totalCapacity += ticketType.quota || 0;
        totalRevenue += (ticketType.quota || 0) * Number(ticketType.price);
      });
    });

    // For now, we'll use placeholder values for tickets sold and customers
    // These would need to be calculated from actual orders/tickets tables
    const stats = {
      revenue: totalRevenue,
      ticketsSold: 0, // TODO: Calculate from orders when orders table is implemented
      activeEvents: activeEvents,
      totalEvents: totalEvents,
      totalCapacity: totalCapacity,
      customers: 0, // TODO: Calculate from unique orders when orders table is implemented
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching artist stats:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener estadísticas del artista' },
      { status: 500 }
    );
  }
}
