const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Limpiando base de datos...\n');

  try {
    // Eliminar en orden inverso de dependencias
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;

    await prisma.seat_assignment.deleteMany();
    await prisma.playlist_track.deleteMany();
    await prisma.ticket_reservation.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.order.deleteMany();
    await prisma.purchase_items.deleteMany();
    await prisma.purchases.deleteMany();
    await prisma.ticket_type.deleteMany();
    await prisma.ticket_types.deleteMany();
    await prisma.seat.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.playlist.deleteMany();
    await prisma.track.deleteMany();
    await prisma.inventory_movement.deleteMany();
    await prisma.inventory_item.deleteMany();
    await prisma.staff_assignment.deleteMany();
    await prisma.security_zone.deleteMany();
    await prisma.event_sponsor.deleteMany();
    await prisma.event_organizer.deleteMany();
    await prisma.event_artist.deleteMany();
    await prisma.event_artists.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.stage.deleteMany();
    await prisma.event.deleteMany();
    await prisma.events.deleteMany();
    await prisma.sponsor.deleteMany();
    await prisma.artist.deleteMany();
    await prisma.artists.deleteMany();
    await prisma.venue.deleteMany();
    await prisma.venues.deleteMany();
    await prisma.user_role.deleteMany();
    await prisma.user_roles.deleteMany();
    await prisma.role.deleteMany();
    await prisma.roles.deleteMany();
    await prisma.user.deleteMany();
    await prisma.users.deleteMany();
    await prisma.audit_log.deleteMany();

    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;

    console.log('✅ Base de datos limpiada\n');
    console.log('🌱 Insertando datos de prueba...\n');

    // ROLES
    await prisma.roles.createMany({
      data: [
        { role_id: 1, role_name: 'admin', description: 'Administrador del sistema' },
        { role_id: 2, role_name: 'artist', description: 'Artista/Organizador de eventos' },
        { role_id: 3, role_name: 'customer', description: 'Cliente comprador de boletos' },
        { role_id: 4, role_name: 'staff', description: 'Personal de eventos' },
      ],
    });

    // USUARIOS (password: password123)
    await prisma.users.createMany({
      data: [
        {
          user_id: 1,
          name: 'Admin TicketFlow',
          email: 'admin@ticketflow.com',
          password_hash: '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.',
          status: 'active',
        },
        {
          user_id: 2,
          name: 'Juan Pérez',
          email: 'juan@example.com',
          password_hash: '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.',
          status: 'active',
        },
        {
          user_id: 3,
          name: 'María García',
          email: 'maria@example.com',
          password_hash: '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.',
          status: 'active',
        },
        {
          user_id: 4,
          name: 'Carlos López',
          email: 'carlos@example.com',
          password_hash: '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.',
          status: 'active',
        },
        {
          user_id: 5,
          name: 'Ana Martínez',
          email: 'ana@example.com',
          password_hash: '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.',
          status: 'active',
        },
      ],
    });

    // USER ROLES
    await prisma.user_roles.createMany({
      data: [
        { user_id: 1, role_id: 1 },
        { user_id: 2, role_id: 2 },
        { user_id: 3, role_id: 2 },
        { user_id: 4, role_id: 3 },
        { user_id: 5, role_id: 3 },
      ],
    });

    // VENUES
    await prisma.venues.createMany({
      data: [
        {
          venue_id: 1,
          name: 'Auditorio Morelia',
          address: 'Av. Ventura Puente 901',
          city: 'Morelia',
          state: 'Michoacán',
          capacity: 5000,
        },
        {
          venue_id: 2,
          name: 'Teatro Ocampo',
          address: 'Av. Madero Pte 365',
          city: 'Morelia',
          state: 'Michoacán',
          capacity: 1200,
        },
        {
          venue_id: 3,
          name: 'Centro de Convenciones',
          address: 'Blvd. García de León 1901',
          city: 'Morelia',
          state: 'Michoacán',
          capacity: 3000,
        },
        {
          venue_id: 4,
          name: 'Plaza de Armas',
          address: 'Centro Histórico',
          city: 'Morelia',
          state: 'Michoacán',
          capacity: 10000,
        },
      ],
    });

    // ARTISTS
    await prisma.artists.createMany({
      data: [
        {
          artist_id: 1,
          name: 'Los Rockers de Morelia',
          genre: 'Rock',
          contact_email: 'rockers@example.com',
          bio: 'Banda de rock con 15 años de trayectoria en Michoacán',
          photo_url: 'https://picsum.photos/seed/artist1/400/400',
        },
        {
          artist_id: 2,
          name: 'María Sinfónica',
          genre: 'Clásica',
          contact_email: 'maria@example.com',
          bio: 'Violinista reconocida internacionalmente',
          photo_url: 'https://picsum.photos/seed/artist2/400/400',
        },
        {
          artist_id: 3,
          name: 'DJ Electrónico MX',
          genre: 'Electrónica',
          contact_email: 'dj@example.com',
          bio: 'Productor y DJ de música electrónica',
          photo_url: 'https://picsum.photos/seed/artist3/400/400',
        },
        {
          artist_id: 4,
          name: 'Banda Regional Michoacana',
          genre: 'Regional',
          contact_email: 'banda@example.com',
          bio: 'Música regional mexicana tradicional',
          photo_url: 'https://picsum.photos/seed/artist4/400/400',
        },
        {
          artist_id: 5,
          name: 'Los Comediantes',
          genre: 'Stand-Up',
          contact_email: 'comedia@example.com',
          bio: 'Grupo de comediantes profesionales',
          photo_url: 'https://picsum.photos/seed/artist5/400/400',
        },
      ],
    });

    // EVENTS
    await prisma.events.createMany({
      data: [
        {
          event_id: 1,
          name: 'Festival de Rock 2025',
          description: 'El festival de rock más grande de Michoacán',
          start_dt: new Date('2025-03-15T20:00:00'),
          end_dt: new Date('2025-03-16T02:00:00'),
          venue_id: 1,
          status: 'active',
          cover_url: 'https://picsum.photos/seed/event1/800/400',
          seated: false,
        },
        {
          event_id: 2,
          name: 'Concierto Sinfónico',
          description: 'Noche de música clásica con María Sinfónica',
          start_dt: new Date('2025-02-20T19:00:00'),
          end_dt: new Date('2025-02-20T22:00:00'),
          venue_id: 2,
          status: 'active',
          cover_url: 'https://picsum.photos/seed/event2/800/400',
          seated: true,
        },
        {
          event_id: 3,
          name: 'Noche Electrónica',
          description: 'Festival de música electrónica',
          start_dt: new Date('2025-04-10T21:00:00'),
          end_dt: new Date('2025-04-11T04:00:00'),
          venue_id: 3,
          status: 'active',
          cover_url: 'https://picsum.photos/seed/event3/800/400',
          seated: false,
        },
        {
          event_id: 4,
          name: 'Feria Regional',
          description: 'Celebración de música regional mexicana',
          start_dt: new Date('2025-05-05T18:00:00'),
          end_dt: new Date('2025-05-05T23:00:00'),
          venue_id: 4,
          status: 'draft',
          cover_url: 'https://picsum.photos/seed/event4/800/400',
          seated: false,
        },
        {
          event_id: 5,
          name: 'Stand Up Comedy Night',
          description: 'Noche de risas con Los Comediantes',
          start_dt: new Date('2025-02-28T21:00:00'),
          end_dt: new Date('2025-02-28T23:30:00'),
          venue_id: 3,
          status: 'active',
          cover_url: 'https://picsum.photos/seed/event5/800/400',
          seated: true,
        },
      ],
    });

    // EVENT_ARTISTS
    await prisma.event_artists.createMany({
      data: [
        { event_id: 1, artist_id: 1 },
        { event_id: 2, artist_id: 2 },
        { event_id: 3, artist_id: 3 },
        { event_id: 4, artist_id: 4 },
        { event_id: 5, artist_id: 5 },
      ],
    });

    // TICKET_TYPES
    await prisma.ticket_types.createMany({
      data: [
        // Festival de Rock
        {
          ticket_type_id: 1,
          event_id: 1,
          name: 'General',
          category: 'standard',
          price: 500.0,
          currency: 'MXN',
          quota: 3000,
          max_per_user: 10,
          is_active: true,
        },
        {
          ticket_type_id: 2,
          event_id: 1,
          name: 'VIP',
          category: 'vip',
          price: 1200.0,
          currency: 'MXN',
          quota: 500,
          max_per_user: 5,
          is_active: true,
        },
        {
          ticket_type_id: 3,
          event_id: 1,
          name: 'Platinum',
          category: 'premium',
          price: 2000.0,
          currency: 'MXN',
          quota: 100,
          max_per_user: 2,
          is_active: true,
        },
        // Concierto Sinfónico
        {
          ticket_type_id: 4,
          event_id: 2,
          name: 'Platea',
          category: 'standard',
          price: 350.0,
          currency: 'MXN',
          quota: 800,
          max_per_user: 8,
          is_active: true,
        },
        {
          ticket_type_id: 5,
          event_id: 2,
          name: 'Palco',
          category: 'premium',
          price: 800.0,
          currency: 'MXN',
          quota: 200,
          max_per_user: 4,
          is_active: true,
        },
        // Noche Electrónica
        {
          ticket_type_id: 6,
          event_id: 3,
          name: 'Early Bird',
          category: 'early',
          price: 400.0,
          currency: 'MXN',
          quota: 1000,
          max_per_user: 10,
          is_active: true,
        },
        {
          ticket_type_id: 7,
          event_id: 3,
          name: 'General',
          category: 'standard',
          price: 600.0,
          currency: 'MXN',
          quota: 1500,
          max_per_user: 10,
          is_active: true,
        },
        {
          ticket_type_id: 8,
          event_id: 3,
          name: 'VIP',
          category: 'vip',
          price: 1000.0,
          currency: 'MXN',
          quota: 300,
          max_per_user: 5,
          is_active: true,
        },
        // Comedy Night
        {
          ticket_type_id: 9,
          event_id: 5,
          name: 'General',
          category: 'standard',
          price: 300.0,
          currency: 'MXN',
          quota: 1200,
          max_per_user: 6,
          is_active: true,
        },
        {
          ticket_type_id: 10,
          event_id: 5,
          name: 'Premium',
          category: 'premium',
          price: 500.0,
          currency: 'MXN',
          quota: 300,
          max_per_user: 4,
          is_active: true,
        },
      ],
    });

    console.log('✅ Datos insertados exitosamente!\n');

    // Verificar
    console.log('📊 Resumen de datos:\n');
    const counts = await Promise.all([
      prisma.users.count(),
      prisma.artists.count(),
      prisma.venues.count(),
      prisma.events.count(),
      prisma.ticket_types.count(),
      prisma.event_artists.count(),
    ]);

    console.log(`   - Usuarios: ${counts[0]}`);
    console.log(`   - Artistas: ${counts[1]}`);
    console.log(`   - Venues: ${counts[2]}`);
    console.log(`   - Eventos: ${counts[3]}`);
    console.log(`   - Tipos de boletos: ${counts[4]}`);
    console.log(`   - Relaciones evento-artista: ${counts[5]}`);

    console.log('\n🎉 ¡Base de datos lista para usar!\n');
    console.log('📝 Credenciales de prueba:');
    console.log('   - Admin: admin@ticketflow.com / password123');
    console.log('   - Artista: juan@example.com / password123');
    console.log('   - Cliente: carlos@example.com / password123\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
