'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/customer/EventCard';
import { Event } from '@/types';
import { getEvents, Event as ApiEvent } from '@/lib/api';

// Convert API event to UI event format
function mapApiEventToUiEvent(apiEvent: ApiEvent): Event {
  return {
    id: apiEvent.event_id.toString(),
    title: apiEvent.name,
    description: apiEvent.description || '',
    artistId: apiEvent.artists?.[0]?.artist_id.toString() || '',
    artistName: apiEvent.artists?.[0]?.name || 'Unknown Artist',
    date: new Date(apiEvent.start_dt),
    venue: apiEvent.venue?.name || 'TBA',
    address: apiEvent.venue ? `${apiEvent.venue.address}, ${apiEvent.venue.city}` : '',
    images: {
      flyer: apiEvent.cover_url || '',
      artistIcon: apiEvent.artists?.[0]?.photo_url || '',
    },
    ticketTypes: (apiEvent.ticket_types || []).map(tt => ({
      id: tt.ticket_type_id.toString(),
      name: tt.name,
      price: tt.price,
      quantity: tt.quota || 0,
      available: tt.quota || 0, // We don't have sold count yet
      color: tt.category === 'vip' ? '#f59e0b' : tt.category === 'premium' ? '#8b5cf6' : '#10b981',
    })),
    totalCapacity: (apiEvent.ticket_types || []).reduce((sum, tt) => sum + (tt.quota || 0), 0),
    soldTickets: 0, // We'll need to calculate this from the database later
    status: apiEvent.status as 'published' | 'draft' | 'cancelled',
    createdAt: new Date(apiEvent.created_at),
  };
}

// Mock data removed - using real API data only

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['all', 'music', 'sports', 'arts', 'comedy', 'family'];

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents({ status: 'active' });
        if (response.success && response.data) {
          const mappedEvents = response.data.map(mapApiEventToUiEvent);
          setEvents(mappedEvents);
        } else {
          setError(response.error || 'Failed to load events');
          setEvents([]); // No fallback - show empty state
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setEvents([]); // No fallback - show empty state
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isLoggedIn={false} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 sm:px-10 lg:px-16">
          <div className="text-center space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
              Discover Amazing Events
            </h1>
            <p className="text-2xl md:text-3xl mb-10 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Find and book tickets to the best events in your city
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search events, artists, venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-8 py-5 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-2xl"
                  />
                  <svg
                    className="absolute right-6 top-6 w-7 h-7 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button className="px-10 py-5 bg-white text-blue-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:scale-105">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b sticky top-20 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-16 py-6">
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-xl font-bold whitespace-nowrap transition-all shadow-md hover:shadow-lg ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-8 sm:px-10 lg:px-16 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">Upcoming Events</h2>
          <select className="px-6 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold text-gray-700 shadow-md">
            <option>Sort by Date</option>
            <option>Sort by Price</option>
            <option>Sort by Popularity</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-7 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No events available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
            Load More Events
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
