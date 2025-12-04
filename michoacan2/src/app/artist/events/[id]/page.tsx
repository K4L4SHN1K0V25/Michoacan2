'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';
import { getEvent } from '@/lib/api';

interface EventDetailProps {
  params: Promise<{ id: string }>;
}

export default function EventDetail({ params }: EventDetailProps) {
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setEventId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!eventId) return;

    async function fetchEvent() {
      try {
        const response = await getEvent(parseInt(eventId!));
        if (response.success && response.data) {
          setEvent(response.data);
        } else {
          setError(response.error || 'Event not found');
        }
      } catch (err) {
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <Sidebar role="artist" />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando evento...</p>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <Sidebar role="artist" />
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
                {error || 'Event not found'}
              </div>
              <Button onClick={() => router.push('/artist/events')}>
                Volver a Eventos
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  const totalCapacity = event.ticket_types?.reduce((sum: number, tt: any) => sum + (tt.quota || 0), 0) || 0;
  const totalRevenue = event.ticket_types?.reduce((sum: number, tt: any) => sum + ((tt.quota || 0) * parseFloat(tt.price)), 0) || 0;

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Sidebar role="artist" />

        <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-7xl w-full">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <button
                onClick={() => router.push('/artist/events')}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
              >
                ← Volver a eventos
              </button>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                {event.name}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${
                    event.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : event.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {event.status === 'active' ? 'Activo' : event.status === 'draft' ? 'Borrador' : event.status}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push(`/artist/events/${eventId}/edit`)}
                variant="outline"
              >
                Editar Evento
              </Button>
            </div>
          </div>

          {/* Cover Image */}
          {event.cover_url && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={event.cover_url}
                alt={event.name}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Descripción</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{event.description || 'Sin descripción'}</p>
              </div>

              {/* Ticket Types */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Tipos de Tickets</h2>
                <div className="space-y-4">
                  {event.ticket_types?.map((ticket: any) => (
                    <div
                      key={ticket.ticket_type_id}
                      className="border-2 border-gray-200 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{ticket.name}</h3>
                        <p className="text-slate-600">Cantidad: {ticket.quota}</p>
                        {ticket.max_per_user && (
                          <p className="text-sm text-slate-500">Máx. por usuario: {ticket.max_per_user}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-blue-600">
                          ${parseFloat(ticket.price).toLocaleString('es-MX')} {ticket.currency}
                        </p>
                        <p className="text-sm text-slate-500">{ticket.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Event Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Detalles del Evento</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Fecha de inicio</p>
                    <p className="font-bold text-slate-900">{formatDate(event.start_dt)}</p>
                    <p className="text-slate-700">{formatTime(event.start_dt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Fecha de fin</p>
                    <p className="font-bold text-slate-900">{formatDate(event.end_dt)}</p>
                    <p className="text-slate-700">{formatTime(event.end_dt)}</p>
                  </div>
                  {event.venue && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Venue</p>
                      <p className="font-bold text-slate-900">{event.venue.name}</p>
                      <p className="text-slate-700 text-sm">{event.venue.address}</p>
                      <p className="text-slate-700 text-sm">
                        {event.venue.city}, {event.venue.state}
                      </p>
                      {event.venue.capacity && (
                        <p className="text-sm text-slate-500">Capacidad: {event.venue.capacity}</p>
                      )}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Tipo de evento</p>
                    <p className="font-bold text-slate-900">{event.seated ? 'Con asientos' : 'General'}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Estadísticas</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Capacidad Total</p>
                    <p className="text-3xl font-black text-slate-900">{totalCapacity.toLocaleString('es-MX')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Revenue Potencial</p>
                    <p className="text-3xl font-black text-green-600">${totalRevenue.toLocaleString('es-MX')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Tickets Vendidos</p>
                    <p className="text-3xl font-black text-blue-600">0</p>
                    <p className="text-sm text-slate-500">Próximamente con órdenes</p>
                  </div>
                </div>
              </div>

              {/* Artists */}
              {event.artists && event.artists.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Artistas</h2>
                  <div className="space-y-3">
                    {event.artists.map((artist: any) => (
                      <div key={artist.artist_id} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {artist.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{artist.name}</p>
                          <p className="text-sm text-slate-600">{artist.genre}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
