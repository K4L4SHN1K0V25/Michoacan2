-- ============================================================
-- Script de Seed para Base de Datos Michoacán
-- 1. Vacía todas las tablas (TRUNCATE)
-- 2. Inserta datos de prueba
-- ============================================================

-- Desactivar foreign key checks temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- PARTE 1: VACIAR TODAS LAS TABLAS
-- ============================================================

TRUNCATE TABLE seat_assignment;
TRUNCATE TABLE playlist_track;
TRUNCATE TABLE ticket_reservation;
TRUNCATE TABLE ticket;
TRUNCATE TABLE payment;
TRUNCATE TABLE `order`;
TRUNCATE TABLE purchase_items;
TRUNCATE TABLE purchases;
TRUNCATE TABLE ticket_type;
TRUNCATE TABLE ticket_types;
TRUNCATE TABLE seat;
TRUNCATE TABLE schedule;
TRUNCATE TABLE playlist;
TRUNCATE TABLE track;
TRUNCATE TABLE inventory_movement;
TRUNCATE TABLE inventory_item;
TRUNCATE TABLE staff_assignment;
TRUNCATE TABLE security_zone;
TRUNCATE TABLE event_sponsor;
TRUNCATE TABLE event_organizer;
TRUNCATE TABLE event_artist;
TRUNCATE TABLE event_artists;
TRUNCATE TABLE notification;
TRUNCATE TABLE stage;
TRUNCATE TABLE event;
TRUNCATE TABLE events;
TRUNCATE TABLE sponsor;
TRUNCATE TABLE artist;
TRUNCATE TABLE artists;
TRUNCATE TABLE venue;
TRUNCATE TABLE venues;
TRUNCATE TABLE user_role;
TRUNCATE TABLE user_roles;
TRUNCATE TABLE role;
TRUNCATE TABLE roles;
TRUNCATE TABLE `user`;
TRUNCATE TABLE users;
TRUNCATE TABLE audit_log;

-- Reactivar foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- PARTE 2: INSERTAR DATOS DE PRUEBA
-- ============================================================

-- ------------------------------------------------------------
-- 1. ROLES
-- ------------------------------------------------------------
INSERT INTO role (role_id, name) VALUES
(1, 'admin'),
(2, 'artist'),
(3, 'customer'),
(4, 'staff');

INSERT INTO roles (role_id, role_name, description) VALUES
(1, 'admin', 'Administrador del sistema'),
(2, 'artist', 'Artista/Organizador de eventos'),
(3, 'customer', 'Cliente comprador de boletos'),
(4, 'staff', 'Personal de eventos');

-- ------------------------------------------------------------
-- 2. USUARIOS
-- password para todos: "password123" (hash bcrypt)
-- ------------------------------------------------------------
INSERT INTO `user` (user_id, name, email, password_hash, status, mfa_enabled, failed_attempts) VALUES
(1, 'Admin TicketFlow', 'admin@ticketflow.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(2, 'Juan Pérez', 'juan@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(3, 'María García', 'maria@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(4, 'Carlos López', 'carlos@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(5, 'Ana Martínez', 'ana@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0);

INSERT INTO users (user_id, name, email, password_hash, status, mfa_enabled, failed_attempts) VALUES
(1, 'Admin TicketFlow', 'admin@ticketflow.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(2, 'Juan Pérez', 'juan@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(3, 'María García', 'maria@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(4, 'Carlos López', 'carlos@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0),
(5, 'Ana Martínez', 'ana@example.com', '$2a$10$rZ5Z9YxqZ4WxZ4WxZ4WxZeYxZ4WxZ4WxZ4WxZ4WxZ4WxZ4Wx.', 'active', 0, 0);

-- ------------------------------------------------------------
-- 3. ASIGNAR ROLES A USUARIOS
-- ------------------------------------------------------------
INSERT INTO user_role (user_id, role_id) VALUES
(1, 1), -- Admin es admin
(2, 2), -- Juan es artist
(3, 2), -- María es artist
(4, 3), -- Carlos es customer
(5, 3); -- Ana es customer

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 3),
(5, 3);

-- ------------------------------------------------------------
-- 4. VENUES (Lugares)
-- ------------------------------------------------------------
INSERT INTO venue (venue_id, name, address, city, state, capacity) VALUES
(1, 'Auditorio Morelia', 'Av. Ventura Puente 901', 'Morelia', 'Michoacán', 5000),
(2, 'Teatro Ocampo', 'Av. Madero Pte 365', 'Morelia', 'Michoacán', 1200),
(3, 'Centro de Convenciones', 'Blvd. García de León 1901', 'Morelia', 'Michoacán', 3000),
(4, 'Plaza de Armas', 'Centro Histórico', 'Morelia', 'Michoacán', 10000);

INSERT INTO venues (venue_id, name, address, city, state, capacity) VALUES
(1, 'Auditorio Morelia', 'Av. Ventura Puente 901', 'Morelia', 'Michoacán', 5000),
(2, 'Teatro Ocampo', 'Av. Madero Pte 365', 'Morelia', 'Michoacán', 1200),
(3, 'Centro de Convenciones', 'Blvd. García de León 1901', 'Morelia', 'Michoacán', 3000),
(4, 'Plaza de Armas', 'Centro Histórico', 'Morelia', 'Michoacán', 10000);

-- ------------------------------------------------------------
-- 5. STAGES (Escenarios)
-- ------------------------------------------------------------
INSERT INTO stage (stage_id, venue_id, name, capacity) VALUES
(1, 1, 'Escenario Principal', 5000),
(2, 1, 'Escenario Secundario', 2000),
(3, 2, 'Escenario Único', 1200),
(4, 3, 'Sala A', 1500),
(5, 3, 'Sala B', 1500),
(6, 4, 'Escenario Abierto', 10000);

-- ------------------------------------------------------------
-- 6. ARTISTS (Artistas)
-- ------------------------------------------------------------
INSERT INTO artist (artist_id, name, genre, contact_email, bio, photo_url) VALUES
(1, 'Los Rockers de Morelia', 'Rock', 'rockers@example.com', 'Banda de rock con 15 años de trayectoria en Michoacán', 'https://picsum.photos/seed/artist1/400/400'),
(2, 'María Sinfónica', 'Clásica', 'maria@example.com', 'Violinista reconocida internacionalmente', 'https://picsum.photos/seed/artist2/400/400'),
(3, 'DJ Electrónico MX', 'Electrónica', 'dj@example.com', 'Productor y DJ de música electrónica', 'https://picsum.photos/seed/artist3/400/400'),
(4, 'Banda Regional Michoacana', 'Regional', 'banda@example.com', 'Música regional mexicana tradicional', 'https://picsum.photos/seed/artist4/400/400'),
(5, 'Los Comediantes', 'Stand-Up', 'comedia@example.com', 'Grupo de comediantes profesionales', 'https://picsum.photos/seed/artist5/400/400');

INSERT INTO artists (artist_id, name, genre, contact_email, bio, photo_url) VALUES
(1, 'Los Rockers de Morelia', 'Rock', 'rockers@example.com', 'Banda de rock con 15 años de trayectoria en Michoacán', 'https://picsum.photos/seed/artist1/400/400'),
(2, 'María Sinfónica', 'Clásica', 'maria@example.com', 'Violinista reconocida internacionalmente', 'https://picsum.photos/seed/artist2/400/400'),
(3, 'DJ Electrónico MX', 'Electrónica', 'dj@example.com', 'Productor y DJ de música electrónica', 'https://picsum.photos/seed/artist3/400/400'),
(4, 'Banda Regional Michoacana', 'Regional', 'banda@example.com', 'Música regional mexicana tradicional', 'https://picsum.photos/seed/artist4/400/400'),
(5, 'Los Comediantes', 'Stand-Up', 'comedia@example.com', 'Grupo de comediantes profesionales', 'https://picsum.photos/seed/artist5/400/400');

-- ------------------------------------------------------------
-- 7. EVENTS (Eventos)
-- ------------------------------------------------------------
INSERT INTO event (event_id, name, description, start_dt, end_dt, venue_id, status, cover_url, seated) VALUES
(1, 'Festival de Rock 2025', 'El festival de rock más grande de Michoacán', '2025-03-15 20:00:00', '2025-03-16 02:00:00', 1, 'active', 'https://picsum.photos/seed/event1/800/400', 0),
(2, 'Concierto Sinfónico', 'Noche de música clásica con María Sinfónica', '2025-02-20 19:00:00', '2025-02-20 22:00:00', 2, 'active', 'https://picsum.photos/seed/event2/800/400', 1),
(3, 'Noche Electrónica', 'Festival de música electrónica', '2025-04-10 21:00:00', '2025-04-11 04:00:00', 3, 'active', 'https://picsum.photos/seed/event3/800/400', 0),
(4, 'Feria Regional', 'Celebración de música regional mexicana', '2025-05-05 18:00:00', '2025-05-05 23:00:00', 4, 'draft', 'https://picsum.photos/seed/event4/800/400', 0),
(5, 'Stand Up Comedy Night', 'Noche de risas con Los Comediantes', '2025-02-28 21:00:00', '2025-02-28 23:30:00', 3, 'active', 'https://picsum.photos/seed/event5/800/400', 1);

INSERT INTO events (event_id, name, description, start_dt, end_dt, venue_id, status, cover_url, seated) VALUES
(1, 'Festival de Rock 2025', 'El festival de rock más grande de Michoacán', '2025-03-15 20:00:00', '2025-03-16 02:00:00', 1, 'active', 'https://picsum.photos/seed/event1/800/400', 0),
(2, 'Concierto Sinfónico', 'Noche de música clásica con María Sinfónica', '2025-02-20 19:00:00', '2025-02-20 22:00:00', 2, 'active', 'https://picsum.photos/seed/event2/800/400', 1),
(3, 'Noche Electrónica', 'Festival de música electrónica', '2025-04-10 21:00:00', '2025-04-11 04:00:00', 3, 'active', 'https://picsum.photos/seed/event3/800/400', 0),
(4, 'Feria Regional', 'Celebración de música regional mexicana', '2025-05-05 18:00:00', '2025-05-05 23:00:00', 4, 'draft', 'https://picsum.photos/seed/event4/800/400', 0),
(5, 'Stand Up Comedy Night', 'Noche de risas con Los Comediantes', '2025-02-28 21:00:00', '2025-02-28 23:30:00', 3, 'active', 'https://picsum.photos/seed/event5/800/400', 1);

-- ------------------------------------------------------------
-- 8. EVENT_ARTIST (Relación eventos-artistas)
-- ------------------------------------------------------------
INSERT INTO event_artist (event_id, artist_id) VALUES
(1, 1), -- Festival Rock -> Los Rockers
(2, 2), -- Concierto Sinfónico -> María
(3, 3), -- Noche Electrónica -> DJ
(4, 4), -- Feria Regional -> Banda Regional
(5, 5); -- Comedy Night -> Comediantes

INSERT INTO event_artists (event_id, artist_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- ------------------------------------------------------------
-- 9. EVENT_ORGANIZER (Organizadores de eventos)
-- ------------------------------------------------------------
INSERT INTO event_organizer (event_id, user_id, role_label) VALUES
(1, 2, 'Organizador Principal'),
(2, 3, 'Organizador Principal'),
(3, 2, 'Organizador Principal'),
(4, 3, 'Organizador Principal'),
(5, 2, 'Organizador Principal');

-- ------------------------------------------------------------
-- 10. TICKET_TYPE (Tipos de boletos)
-- ------------------------------------------------------------
INSERT INTO ticket_type (ticket_type_id, event_id, name, category, price, currency, quota, max_per_user, is_active) VALUES
-- Festival de Rock
(1, 1, 'General', 'standard', 500.00, 'MXN', 3000, 10, 1),
(2, 1, 'VIP', 'vip', 1200.00, 'MXN', 500, 5, 1),
(3, 1, 'Platinum', 'premium', 2000.00, 'MXN', 100, 2, 1),
-- Concierto Sinfónico
(4, 2, 'Platea', 'standard', 350.00, 'MXN', 800, 8, 1),
(5, 2, 'Palco', 'premium', 800.00, 'MXN', 200, 4, 1),
-- Noche Electrónica
(6, 3, 'Early Bird', 'early', 400.00, 'MXN', 1000, 10, 1),
(7, 3, 'General', 'standard', 600.00, 'MXN', 1500, 10, 1),
(8, 3, 'VIP', 'vip', 1000.00, 'MXN', 300, 5, 1),
-- Comedy Night
(9, 5, 'General', 'standard', 300.00, 'MXN', 1200, 6, 1),
(10, 5, 'Premium', 'premium', 500.00, 'MXN', 300, 4, 1);

INSERT INTO ticket_types (ticket_type_id, event_id, name, category, price, currency, quota, max_per_user, is_active) VALUES
(1, 1, 'General', 'standard', 500.00, 'MXN', 3000, 10, 1),
(2, 1, 'VIP', 'vip', 1200.00, 'MXN', 500, 5, 1),
(3, 1, 'Platinum', 'premium', 2000.00, 'MXN', 100, 2, 1),
(4, 2, 'Platea', 'standard', 350.00, 'MXN', 800, 8, 1),
(5, 2, 'Palco', 'premium', 800.00, 'MXN', 200, 4, 1),
(6, 3, 'Early Bird', 'early', 400.00, 'MXN', 1000, 10, 1),
(7, 3, 'General', 'standard', 600.00, 'MXN', 1500, 10, 1),
(8, 3, 'VIP', 'vip', 1000.00, 'MXN', 300, 5, 1),
(9, 5, 'General', 'standard', 300.00, 'MXN', 1200, 6, 1),
(10, 5, 'Premium', 'premium', 500.00, 'MXN', 300, 4, 1);

-- ------------------------------------------------------------
-- 11. ORDERS (Órdenes de compra)
-- ------------------------------------------------------------
INSERT INTO `order` (order_id, user_id, total_amount, currency, payment_status) VALUES
(1, 4, 1200.00, 'MXN', 'completed'),
(2, 5, 700.00, 'MXN', 'completed'),
(3, 4, 600.00, 'MXN', 'pending');

-- ------------------------------------------------------------
-- 12. PAYMENTS (Pagos)
-- ------------------------------------------------------------
INSERT INTO payment (payment_id, order_id, provider, provider_txn_id, amount, currency, method, status, paid_at) VALUES
(1, 1, 'Stripe', 'txn_1234567890', 1200.00, 'MXN', 'card', 'completed', '2025-01-10 14:30:00'),
(2, 2, 'PayPal', 'txn_0987654321', 700.00, 'MXN', 'paypal', 'completed', '2025-01-12 16:45:00');

-- ------------------------------------------------------------
-- 13. TICKETS (Boletos emitidos)
-- ------------------------------------------------------------
INSERT INTO ticket (ticket_id, order_id, ticket_type_id, attendee_name, qr_code, status) VALUES
(1, 1, 2, 'Carlos López', 'QR_FEST_ROCK_VIP_001', 'valid'),
(2, 1, 2, 'Laura López', 'QR_FEST_ROCK_VIP_002', 'valid'),
(3, 2, 4, 'Ana Martínez', 'QR_SINFONICO_001', 'valid'),
(4, 2, 4, 'Pedro Martínez', 'QR_SINFONICO_002', 'valid');

-- ------------------------------------------------------------
-- 14. SPONSORS (Patrocinadores)
-- ------------------------------------------------------------
INSERT INTO sponsor (sponsor_id, name, type, contact, contract_url) VALUES
(1, 'Coca-Cola México', 'Bebidas', 'contacto@coca-cola.mx', 'https://example.com/contracts/cocacola.pdf'),
(2, 'Telcel', 'Telecomunicaciones', 'eventos@telcel.com', 'https://example.com/contracts/telcel.pdf'),
(3, 'Cerveza Victoria', 'Bebidas Alcohólicas', 'marketing@victoria.mx', 'https://example.com/contracts/victoria.pdf');

-- ------------------------------------------------------------
-- 15. EVENT_SPONSOR (Patrocinios por evento)
-- ------------------------------------------------------------
INSERT INTO event_sponsor (event_id, sponsor_id, contribution_type, amount, notes) VALUES
(1, 1, 'Monetario', 50000.00, 'Patrocinador principal del Festival de Rock'),
(1, 2, 'Monetario', 30000.00, 'Patrocinador de conectividad'),
(3, 3, 'Producto', 15000.00, 'Proveedor oficial de bebidas');

-- ------------------------------------------------------------
-- 16. SCHEDULE (Programación)
-- ------------------------------------------------------------
INSERT INTO schedule (schedule_id, event_id, stage_id, artist_id, start_dt, end_dt) VALUES
(1, 1, 1, 1, '2025-03-15 21:00:00', '2025-03-15 23:00:00'),
(2, 2, 3, 2, '2025-02-20 19:30:00', '2025-02-20 21:30:00'),
(3, 3, 4, 3, '2025-04-10 22:00:00', '2025-04-11 02:00:00'),
(4, 5, 4, 5, '2025-02-28 21:30:00', '2025-02-28 23:00:00');

-- ------------------------------------------------------------
-- 17. SEATS (Asientos para eventos con numeración)
-- ------------------------------------------------------------
-- Concierto Sinfónico (evento 2)
INSERT INTO seat (event_id, section, `row`, `number`, status) VALUES
(2, 'Platea A', '1', '1', 'sold'),
(2, 'Platea A', '1', '2', 'sold'),
(2, 'Platea A', '1', '3', 'available'),
(2, 'Platea A', '1', '4', 'available'),
(2, 'Platea B', '1', '1', 'available'),
(2, 'Platea B', '1', '2', 'available'),
(2, 'Palco 1', '1', '1', 'reserved'),
(2, 'Palco 1', '1', '2', 'reserved');

-- Comedy Night (evento 5)
INSERT INTO seat (event_id, section, `row`, `number`, status) VALUES
(5, 'Sala A', '1', '1', 'available'),
(5, 'Sala A', '1', '2', 'available'),
(5, 'Sala A', '2', '1', 'available'),
(5, 'Sala A', '2', '2', 'available');

-- Mensaje final
SELECT 'Base de datos limpiada y poblada con datos de prueba exitosamente!' AS mensaje;
