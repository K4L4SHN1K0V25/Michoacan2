import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/auth/jwt';
import { prisma } from '@/lib/prisma';

// PATCH /api/admin/events/[id] - Update event (activate/deactivate/cancel)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin access
    const userData = await verifyRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { success: false, error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, event_name, event_date, location, venue, description } = body;

    // Check if event exists
    const event = await prisma.events.findUnique({
      where: { event_id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: any = {};
    if (status) updateData.status = status;
    if (event_name) updateData.event_name = event_name;
    if (event_date) updateData.event_date = new Date(event_date);
    if (location) updateData.location = location;
    if (venue) updateData.venue = venue;
    if (description !== undefined) updateData.description = description;

    // Update event
    await prisma.events.update({
      where: { event_id: eventId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Evento actualizado exitosamente',
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar evento' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin access
    const userData = await verifyRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { success: false, error: 'ID de evento inválido' },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await prisma.events.findUnique({
      where: { event_id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    // Check if there are any tickets sold through ticket_types
    const ticketTypes = await prisma.ticket_types.findMany({
      where: { event_id: eventId },
      select: { ticket_type_id: true }
    });

    const ticketTypeIds = ticketTypes.map(tt => tt.ticket_type_id);
    const ticketCount = ticketTypeIds.length > 0 ? await prisma.ticket.count({
      where: { ticket_type_id: { in: ticketTypeIds } },
    }) : 0;

    if (ticketCount > 0) {
      return NextResponse.json(
        { success: false, error: 'No se puede eliminar un evento con tickets vendidos. Cancélelo en su lugar.' },
        { status: 400 }
      );
    }

    // Delete ticket types first (foreign key constraint)
    await prisma.ticket_types.deleteMany({
      where: { event_id: eventId },
    });

    // Delete the event
    await prisma.events.delete({
      where: { event_id: eventId },
    });

    return NextResponse.json({
      success: true,
      message: 'Evento eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar evento' },
      { status: 500 }
    );
  }
}
