# Documentación de APIs - TicketFlow

## Configuración

### Variables de entorno
```env
DATABASE_URL="mysql://root:K4l4shn1k0v_25@127.0.0.1:3306/Michoacan"
```

### Iniciar servidor
```bash
npm run dev
```

Servidor corriendo en: `http://localhost:3000`

---

## Endpoints Disponibles

### 🧪 Test / Health Check

#### GET /api/test
Verifica conexión a base de datos y cuenta registros.

**Response:**
```json
{
  "success": true,
  "message": "Conexión a base de datos exitosa",
  "data": {
    "events": 5,
    "artists": 12,
    "venues": 8,
    "users": 25
  }
}
```

---

## 🎭 Events (Eventos)

### GET /api/events
Obtiene todos los eventos activos.

**Query Parameters:**
- `status` (optional): `active`, `draft`, `inactive`, `cancelled` (default: `active`)
- `limit` (optional): número de resultados (default: `10`)

**Ejemplo:**
```bash
GET /api/events?status=active&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "event_id": 1,
      "name": "Festival de Rock 2025",
      "description": "El mejor festival de rock",
      "start_dt": "2025-03-15T20:00:00.000Z",
      "end_dt": "2025-03-15T23:00:00.000Z",
      "venue_id": 1,
      "status": "active",
      "cover_url": "https://example.com/cover.jpg",
      "seated": false,
      "created_at": "2025-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### GET /api/events/[id]
Obtiene un evento específico por ID.

**Ejemplo:**
```bash
GET /api/events/1
```

### POST /api/events
Crea un nuevo evento.

**Body:**
```json
{
  "name": "Nuevo Evento",
  "description": "Descripción del evento",
  "start_dt": "2025-06-01T19:00:00",
  "end_dt": "2025-06-01T23:00:00",
  "venue_id": 1,
  "cover_url": "https://example.com/image.jpg",
  "seated": false
}
```

### PATCH /api/events/[id]
Actualiza un evento existente.

### DELETE /api/events/[id]
Elimina un evento.

---

## 🎤 Artists (Artistas)

### GET /api/artists
Obtiene todos los artistas.

**Query Parameters:**
- `genre` (optional): filtrar por género
- `limit` (optional): número de resultados (default: `20`)

**Ejemplo:**
```bash
GET /api/artists?genre=Rock&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "artist_id": 1,
      "name": "Banda de Rock",
      "genre": "Rock",
      "contact_email": "banda@example.com",
      "bio": "Banda profesional con 10 años de experiencia",
      "photo_url": "https://example.com/photo.jpg"
    }
  ],
  "count": 1
}
```

### GET /api/artists/[id]
Obtiene un artista específico.

### POST /api/artists
Crea un nuevo artista.

**Body:**
```json
{
  "name": "Nuevo Artista",
  "genre": "Pop",
  "contact_email": "artista@example.com",
  "bio": "Biografía del artista",
  "photo_url": "https://example.com/photo.jpg"
}
```

### PATCH /api/artists/[id]
Actualiza un artista existente.

---

## 🏛️ Venues (Lugares)

### GET /api/venues
Obtiene todos los venues.

**Query Parameters:**
- `city` (optional): filtrar por ciudad
- `limit` (optional): número de resultados (default: `20`)

**Ejemplo:**
```bash
GET /api/venues?city=Morelia&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "venue_id": 1,
      "name": "Auditorio Morelia",
      "address": "Av. Principal 123",
      "city": "Morelia",
      "state": "Michoacán",
      "capacity": 5000
    }
  ],
  "count": 1
}
```

### POST /api/venues
Crea un nuevo venue.

**Body:**
```json
{
  "name": "Nuevo Venue",
  "address": "Dirección completa",
  "city": "Morelia",
  "state": "Michoacán",
  "capacity": 3000
}
```

---

## 🔐 Authentication (Autenticación)

### POST /api/auth/register
Registra un nuevo usuario.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "status": "active",
    "created_at": "2025-01-15T10:00:00.000Z"
  },
  "message": "Usuario registrado correctamente"
}
```

### POST /api/auth/login
Inicia sesión con email y contraseña.

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "status": "active",
    "mfa_enabled": false,
    "last_login_at": "2025-01-15T15:30:00.000Z",
    "failed_attempts": 0,
    "created_at": "2025-01-15T10:00:00.000Z"
  },
  "message": "Inicio de sesión exitoso"
}
```

---

## Códigos de respuesta HTTP

- `200` - Éxito
- `400` - Bad Request (datos inválidos)
- `401` - Unauthorized (credenciales inválidas)
- `403` - Forbidden (usuario inactivo/suspendido)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error

---

## Ejemplos con fetch (Frontend)

### Obtener eventos
```typescript
const response = await fetch('/api/events?status=active&limit=10');
const { success, data } = await response.json();
```

### Crear evento
```typescript
const response = await fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Mi Evento',
    description: 'Descripción',
    start_dt: '2025-06-01T19:00:00',
    end_dt: '2025-06-01T23:00:00',
    venue_id: 1,
  }),
});
const { success, data } = await response.json();
```

### Login
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    password: 'contraseña123',
  }),
});
const { success, data } = await response.json();
```

---

## Próximos endpoints a implementar

- [ ] `/api/tickets` - Gestión de tickets
- [ ] `/api/purchases` - Compras de boletos
- [ ] `/api/payments` - Procesamiento de pagos
- [ ] `/api/users/[id]` - Perfil de usuario
- [ ] `/api/analytics` - Analytics para artistas
- [ ] `/api/reports` - Reportes para admin
