/**
 * API utility functions for making HTTP requests to backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface Event {
  event_id: number;
  name: string;
  description: string | null;
  start_dt: string;
  end_dt: string;
  venue_id: number;
  status: string;
  cover_url: string | null;
  seated: boolean;
  created_at: string;
  venue?: Venue;
  artists?: Artist[];
  ticket_types?: TicketType[];
}

export interface Artist {
  artist_id: number;
  name: string;
  genre: string | null;
  contact_email: string | null;
  bio: string | null;
  photo_url: string | null;
  created_at: string;
}

export interface Venue {
  venue_id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  capacity: number | null;
  created_at: string;
}

export interface TicketType {
  ticket_type_id: number;
  event_id: number;
  name: string;
  category: string | null;
  price: number;
  currency: string;
  quota: number | null;
  max_per_user: number | null;
  is_active: boolean;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP error! status: ${response.status}`,
      };
    }

    return {
      success: true,
      data: data.data || data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

/**
 * Get all events with optional filters
 */
export async function getEvents(params?: {
  status?: string;
  limit?: number;
}): Promise<ApiResponse<Event[]>> {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const queryString = queryParams.toString();
  return apiFetch<Event[]>(`/api/events${queryString ? `?${queryString}` : ''}`);
}

/**
 * Get a single event by ID
 */
export async function getEvent(id: number): Promise<ApiResponse<Event>> {
  return apiFetch<Event>(`/api/events/${id}`);
}

/**
 * Get all artists
 */
export async function getArtists(): Promise<ApiResponse<Artist[]>> {
  return apiFetch<Artist[]>('/api/artists');
}

/**
 * Get a single artist by ID
 */
export async function getArtist(id: number): Promise<ApiResponse<Artist>> {
  return apiFetch<Artist>(`/api/artists/${id}`);
}

/**
 * Get all venues
 */
export async function getVenues(): Promise<ApiResponse<Venue[]>> {
  return apiFetch<Venue[]>('/api/venues');
}

/**
 * Login user
 */
export async function login(email: string, password: string): Promise<ApiResponse<any>> {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Register new user
 */
export async function register(data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<any>> {
  return apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get artist events (for artist dashboard)
 */
export async function getArtistEvents(artistId: number, params?: {
  status?: string;
}): Promise<ApiResponse<Event[]>> {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  return apiFetch<Event[]>(`/api/artists/${artistId}/events${queryString ? `?${queryString}` : ''}`);
}

/**
 * Get artist dashboard stats
 */
export async function getArtistStats(artistId: number): Promise<ApiResponse<any>> {
  return apiFetch(`/api/artists/${artistId}/stats`);
}

/**
 * Get artist profile
 */
export async function getArtistProfile(artistId: number): Promise<ApiResponse<Artist>> {
  return apiFetch<Artist>(`/api/artists/${artistId}`);
}

/**
 * Update artist profile
 */
export async function updateArtistProfile(
  artistId: number,
  data: Partial<Artist>
): Promise<ApiResponse<Artist>> {
  return apiFetch<Artist>(`/api/artists/${artistId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Create new event
 */
export async function createEvent(data: {
  name: string;
  description: string;
  start_dt: string;
  end_dt: string;
  venue_id?: number;
  cover_url?: string;
  seated?: boolean;
  artist_id: number;
  ticket_types: Array<{
    name: string;
    category?: string;
    price: number;
    quantity: number;
    max_per_user?: number;
  }>;
  status?: string;
}): Promise<ApiResponse<Event>> {
  return apiFetch<Event>('/api/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update event
 */
export async function updateEvent(
  eventId: number,
  data: {
    name?: string;
    description?: string;
    start_dt?: string;
    end_dt?: string;
    venue_id?: number;
    cover_url?: string;
    seated?: boolean;
    status?: string;
    ticket_types?: Array<{
      name: string;
      category?: string;
      price: number;
      quantity: number;
      max_per_user?: number;
    }>;
  }
): Promise<ApiResponse<Event>> {
  return apiFetch<Event>(`/api/events/${eventId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
