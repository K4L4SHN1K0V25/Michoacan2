# Scripts de Base de Datos

## Reset and Seed Database

Script para limpiar y poblar la base de datos con datos de prueba.

### Uso

```bash
node scripts/reset-and-seed.js
```

### ⚠️ ADVERTENCIA

Este script **elimina TODOS los datos** de la base de datos antes de insertar los datos de prueba.

### Datos incluidos

El script inserta:

- **5 Usuarios** (1 admin, 2 artistas, 2 clientes)
- **4 Venues** (Auditorio Morelia, Teatro Ocampo, etc.)
- **5 Artistas** (diferentes géneros musicales)
- **5 Eventos** (3 activos, 1 draft, 1 cancelado)
- **10 Tipos de boletos** (diferentes categorías y precios)
- **4 Roles** (admin, artist, customer, staff)

### Credenciales de prueba

Todos los usuarios tienen la contraseña: `password123`

#### Admin
- Email: `admin@ticketflow.com`
- Password: `password123`

#### Artistas
- Email: `juan@example.com` (Artista 1)
- Email: `maria@example.com` (Artista 2)
- Password: `password123`

#### Clientes
- Email: `carlos@example.com`
- Email: `ana@example.com`
- Password: `password123`

### Eventos de prueba

1. **Festival de Rock 2025** (Activo)
   - Fecha: 15-16 Marzo 2025
   - Venue: Auditorio Morelia
   - Boletos: General ($500), VIP ($1,200), Platinum ($2,000)

2. **Concierto Sinfónico** (Activo)
   - Fecha: 20 Febrero 2025
   - Venue: Teatro Ocampo
   - Boletos: Platea ($350), Palco ($800)

3. **Noche Electrónica** (Activo)
   - Fecha: 10-11 Abril 2025
   - Venue: Centro de Convenciones
   - Boletos: Early Bird ($400), General ($600), VIP ($1,000)

4. **Feria Regional** (Draft)
   - Fecha: 5 Mayo 2025
   - Venue: Plaza de Armas

5. **Stand Up Comedy Night** (Activo)
   - Fecha: 28 Febrero 2025
   - Venue: Centro de Convenciones
   - Boletos: General ($300), Premium ($500)

### Estructura de las tablas pobladas

```
users (5) ─┬─ user_roles (5)
           │
artists (5) ─┬─ event_artists (5) ─── events (5)
             │                            │
venues (4) ──┴──────────────────────────┘
                                          │
                               ticket_types (10)
```

### Probar después del seed

```bash
# Verificar conexión
curl http://localhost:3000/api/test

# Ver eventos activos
curl http://localhost:3000/api/events?status=active

# Ver artistas
curl http://localhost:3000/api/artists

# Ver venues
curl http://localhost:3000/api/venues
```
