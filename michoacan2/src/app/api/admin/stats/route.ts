import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';

// GET /api/admin/stats - Get dashboard statistics
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

    // Get total users count
    const totalUsers = await prisma.users.count();

    // Get users by role
    const artistRoleId = await prisma.roles.findFirst({
      where: { role_name: 'artist' },
      select: { role_id: true },
    });

    const customerRoleId = await prisma.roles.findFirst({
      where: { role_name: 'customer' },
      select: { role_id: true },
    });

    const staffRoleId = await prisma.roles.findFirst({
      where: { role_name: 'staff' },
      select: { role_id: true },
    });

    const totalArtists = artistRoleId
      ? await prisma.user_roles.count({
          where: { role_id: artistRoleId.role_id },
        })
      : 0;

    const totalCustomers = customerRoleId
      ? await prisma.user_roles.count({
          where: { role_id: customerRoleId.role_id },
        })
      : 0;

    const totalStaff = staffRoleId
      ? await prisma.user_roles.count({
          where: { role_id: staffRoleId.role_id },
        })
      : 0;

    // Get total events count
    const totalEvents = await prisma.events.count();

    // Get events by status
    const activeEvents = await prisma.events.count({
      where: { status: 'active' },
    });

    const cancelledEvents = await prisma.events.count({
      where: { status: 'cancelled' },
    });

    const completedEvents = await prisma.events.count({
      where: { status: 'completed' },
    });

    // Get total tickets sold
    const totalTickets = await prisma.tickets.count();

    // Get total revenue
    const revenueResult = await prisma.tickets.aggregate({
      _sum: {
        final_price: true,
      },
      where: {
        status: 'confirmed',
      },
    });

    const totalRevenue = revenueResult._sum.final_price || 0;

    // Get recent users (last 5)
    const recentUsers = await prisma.users.findMany({
      take: 5,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user_roles: {
          include: {
            roles: true,
          },
        },
      },
    });

    const formattedRecentUsers = recentUsers.map(user => ({
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.user_roles[0]?.roles?.role_name || 'customer',
      createdAt: user.created_at,
    }));

    // Get recent events (last 5)
    const recentEvents = await prisma.events.findMany({
      take: 5,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        artists: true,
      },
    });

    const formattedRecentEvents = recentEvents.map(event => ({
      id: event.event_id,
      name: event.event_name,
      artistName: event.artists?.name || 'Unknown',
      date: event.event_date,
      status: event.status,
      createdAt: event.created_at,
    }));

    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          artists: totalArtists,
          customers: totalCustomers,
          staff: totalStaff,
        },
        events: {
          total: totalEvents,
          active: activeEvents,
          cancelled: cancelledEvents,
          completed: completedEvents,
        },
        tickets: {
          total: totalTickets,
        },
        revenue: {
          total: totalRevenue,
        },
        recent: {
          users: formattedRecentUsers,
          events: formattedRecentEvents,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}
