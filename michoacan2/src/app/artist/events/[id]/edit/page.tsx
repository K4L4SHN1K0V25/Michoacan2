'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import EventForm from '@/components/artist/EventForm';
import { getEvent, updateEvent } from '@/lib/api';

interface EditEventProps {
  params: Promise<{ id: string }>;
}

export default function EditEvent({ params }: EditEventProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>(null);
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
        const response = await getEvent(parseInt(eventId));
        if (response.success && response.data) {
          const event = response.data;

          // Extract date and time from start_dt
          const startDate = new Date(event.start_dt);
          const eventDate = startDate.toISOString().split('T')[0];
          const eventTime = startDate.toTimeString().slice(0, 5);

          // Transform data for the form
          setInitialData({
            title: event.name,
            description: event.description || '',
            venueName: event.venue?.name || '',
            venueAddress: event.venue?.address || '',
            eventDate,
            eventTime,
            coverUrl: event.cover_url || '',
            ticketTypes: event.ticket_types?.map((tt: any) => ({
              name: tt.name,
              description: tt.category || '',
              price: parseFloat(tt.price),
              quantity: tt.quota,
              color: '#9333ea',
            })) || [],
          });
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

  const handleSubmit = async (eventData: any, isDraft: boolean) => {
    if (!eventId) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await updateEvent(parseInt(eventId), {
        ...eventData,
        status: isDraft ? 'draft' : 'active',
      });

      if (response.success) {
        setSuccess(true);
        // Redirect to event detail page after 1.5 seconds
        setTimeout(() => {
          router.push(`/artist/events/${eventId}`);
        }, 1500);
      } else {
        setError(response.error || 'Failed to update event');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar userRole="artist" isLoggedIn={true} />
        <div className="flex flex-1">
          <Sidebar role="artist" />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando evento...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar userRole="artist" isLoggedIn={true} />
        <div className="flex flex-1">
          <Sidebar role="artist" />
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
                {error}
              </div>
              <button
                onClick={() => router.push('/artist/events')}
                className="text-blue-600 hover:text-blue-700"
              >
                ← Volver a eventos
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar userRole="artist" isLoggedIn={true} />

      <div className="flex flex-1">
        <Sidebar role="artist" />

        <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-7xl w-full">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <button
              onClick={() => router.push(`/artist/events/${eventId}`)}
              className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
            >
              ← Volver al evento
            </button>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">
              Editar Evento
            </h1>
            <p className="text-xl md:text-2xl text-slate-600">
              Actualiza la información de tu evento.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-100 border-2 border-green-400 text-green-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Evento actualizado exitosamente! Redirigiendo...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {/* Form */}
          {initialData && (
            <EventForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </main>
      </div>
    </div>
  );
}
