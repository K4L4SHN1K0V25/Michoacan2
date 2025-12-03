export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'artist' | 'customer';
  avatar?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  artistId: string;
  artistName: string;
  date: Date;
  venue: string;
  address: string;
  images: {
    flyer?: string;
    map?: string;
    artistIcon?: string;
    gallery?: string[];
  };
  ticketTypes: TicketType[];
  totalCapacity: number;
  soldTickets: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface TicketType {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  available: number;
  color?: string;
}

export interface Order {
  id: string;
  userId: string;
  eventId: string;
  tickets: OrderTicket[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  createdAt: Date;
}

export interface OrderTicket {
  ticketTypeId: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  eventId: string;
  ticketTypeId: string;
  quantity: number;
}
