'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEvents, Event } from '@/lib/api';
import Button from '@/components/shared/Button';

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents({ status: 'active', limit: 3 });
        if (response.success && response.data) {
          setEvents(response.data);
        } else {
          setError(response.error || 'Failed to load events');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-28 md:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
                Featured Events
              </h2>
              <p className="text-xl md:text-2xl text-slate-600">
                Loading amazing events...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-28 md:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-28 md:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
              Featured Events
            </h2>
            <p className="text-xl text-slate-600">No events available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  return (
    <section className="py-28 md:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900">
              Featured Events
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
              Don't miss out on these upcoming experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {events.map((event) => (
              <div
                key={event.event_id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                  {event.cover_url ? (
                    <img
                      src={event.cover_url}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                      </svg>
                    </div>
                  )}
                  {event.status === 'active' && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Active
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {event.name}
                  </h3>

                  {event.description && (
                    <p className="text-slate-600 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="flex items-center text-slate-600 text-sm">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(event.start_dt)}
                  </div>

                  {event.ticket_types && event.ticket_types.length > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-sm text-slate-600">From</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(Math.min(...event.ticket_types.map(t => t.price)))}
                      </span>
                    </div>
                  )}

                  <Link href={`/customer/events/${event.event_id}`} className="block pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full !bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/customer">
              <Button
                variant="outline"
                size="lg"
                className="!border-2 !border-blue-600 !text-blue-600 hover:!bg-blue-600 hover:!text-white"
              >
                Browse All Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
