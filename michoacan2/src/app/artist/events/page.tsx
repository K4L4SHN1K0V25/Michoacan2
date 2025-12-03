'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { getArtistEvents, Event as ApiEvent } from '@/lib/api';

interface EventWithStats {
  id: string;
  title: string;
  date: string;
  venue: string;
  status: 'published' | 'draft' | 'completed';
  ticketsSold: number;
  totalCapacity: number;
  revenue: number;
}

export default function ArtistEvents() {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'completed'>('all');
  const [events, setEvents] = useState<EventWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with actual logged-in artist ID from auth context
  const ARTIST_ID = 1;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getArtistEvents(ARTIST_ID);
        if (response.success && response.data) {
          const mappedEvents: EventWithStats[] = response.data.map((event: ApiEvent) => {
            const totalCapacity = (event.ticket_types || []).reduce((sum, tt) => sum + (tt.quota || 0), 0);
            const revenue = (event.ticket_types || []).reduce((sum, tt) => sum + ((tt.quota || 0) * tt.price), 0);

            return {
              id: event.event_id.toString(),
              title: event.name,
              date: event.start_dt,
              venue: event.venue?.name || 'TBA',
              status: event.status as 'published' | 'draft' | 'completed',
              ticketsSold: 0, // TODO: Calculate from orders
              totalCapacity,
              revenue: 0, // TODO: Calculate from actual sales
            };
          });
          setEvents(mappedEvents);
        } else {
          setError(response.error || 'Failed to load events');
          setEvents([]);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar userRole="artist" isLoggedIn={true} />

      <div className="flex flex-1">
        <Sidebar role="artist" />

        <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-7xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">My Events</h1>
              <p className="text-xl md:text-2xl text-slate-600">Manage and monitor all your events</p>
            </div>
            <Link href="/artist/create">
              <Button variant="primary">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </span>
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mb-8">
            {(['all', 'published', 'draft', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {loading ? (
              <Card className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading events...</p>
              </Card>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const soldPercentage = (event.ticketsSold / event.totalCapacity) * 100;
                return (
                  <Card key={event.id} padding="none" className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        {/* Event Info */}
                        <div className="flex-1 mb-4 lg:mb-0">
                          <div className="flex items-center mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 mr-3">
                              {event.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                event.status
                              )}`}
                            >
                              {event.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
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
                              {new Date(event.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                              </svg>
                              {event.venue}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Tickets Sold</span>
                              <span className="font-semibold text-gray-900">
                                {event.ticketsSold} / {event.totalCapacity}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-purple-600 h-3 rounded-full transition-all"
                                style={{ width: `${soldPercentage}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex flex-col items-end space-y-4 lg:ml-8">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-3xl font-bold text-green-600">
                              ${event.revenue.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex space-x-2">
                            <Link href={`/artist/events/${event.id}/edit`}>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </Link>
                            <Link href={`/artist/events/${event.id}`}>
                              <Button variant="primary" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600 mb-6">
                  {filter === 'all'
                    ? "You haven't created any events yet."
                    : `No ${filter} events found.`}
                </p>
                <Link href="/artist/create">
                  <Button variant="primary">Create Your First Event</Button>
                </Link>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
