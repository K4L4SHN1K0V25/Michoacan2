'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TicketSelector from '@/components/customer/TicketSelector';
import Modal from '@/components/shared/Modal';
import { Event } from '@/types';
import { getEvent, Event as ApiEvent } from '@/lib/api';

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
      available: tt.quota || 0,
      color: tt.category === 'vip' ? '#f59e0b' : tt.category === 'premium' ? '#8b5cf6' : '#10b981',
    })),
    totalCapacity: (apiEvent.ticket_types || []).reduce((sum, tt) => sum + (tt.quota || 0), 0),
    soldTickets: 0,
    status: apiEvent.status as 'published' | 'draft' | 'cancelled',
    createdAt: new Date(apiEvent.created_at),
  };
}

// Mock event data removed - using real API data only

export default function EventDetails() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventId = parseInt(params.id as string);
        const response = await getEvent(eventId);

        if (response.success && response.data) {
          const mappedEvent = mapApiEventToUiEvent(response.data);
          setEvent(mappedEvent);
        } else {
          setError(response.error || 'Failed to load event');
          setEvent(null); // No fallback - show error state
        }
      } catch (err) {
        setError('An unexpected error occurred');
        setEvent(null); // No fallback - show error state
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(date));
  };

  const handleAddToCart = (ticketTypeId: string, quantity: number) => {
    console.log(`Added ${quantity} tickets of type ${ticketTypeId} to cart`);
    // Cart logic will be implemented later
  };

  const openGalleryImage = (image: string) => {
    setSelectedImage(image);
    setShowGalleryModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar isLoggedIn={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading event...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar isLoggedIn={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-gray-600">Event not found</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isLoggedIn={false} />

      {/* Hero Image */}
      <div className="relative h-96 bg-gradient-to-br from-purple-600 to-pink-600">
        {event.images.flyer && (
          <img
            src={event.images.flyer}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

              {/* Artist Info */}
              <div className="flex items-center mb-6">
                {event.images.artistIcon ? (
                  <img
                    src={event.images.artistIcon}
                    alt={event.artistName}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-bold text-xl">
                      {event.artistName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Presented by</p>
                  <p className="text-xl font-semibold text-gray-900">{event.artistName}</p>
                </div>
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                    <p className="text-gray-900 font-semibold">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Venue</p>
                    <p className="text-gray-900 font-semibold">{event.venue}</p>
                    <p className="text-gray-600 text-sm">{event.address}</p>
                    <button
                      onClick={() => setShowMapModal(true)}
                      className="text-purple-600 text-sm font-medium hover:underline mt-1"
                    >
                      View Map
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">About This Event</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Gallery */}
              {event.images.gallery && event.images.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {event.images.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-40 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => openGalleryImage(image)}
                      >
                        <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Ticket Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <TicketSelector
                ticketTypes={event.ticketTypes}
                onAddToCart={handleAddToCart}
              />

              {/* Event Stats */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-semibold text-gray-900">{event.totalCapacity}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tickets Sold</span>
                  <span className="font-semibold text-gray-900">{event.soldTickets}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available</span>
                  <span className="font-semibold text-green-600">
                    {event.totalCapacity - event.soldTickets}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Map Modal */}
      <Modal isOpen={showMapModal} onClose={() => setShowMapModal(false)} title="Venue Location">
        <div className="space-y-4">
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            {event.images.map ? (
              <img src={event.images.map} alt="Venue Map" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Map placeholder
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{event.venue}</h4>
            <p className="text-gray-600">{event.address}</p>
          </div>
        </div>
      </Modal>

      {/* Gallery Modal */}
      <Modal isOpen={showGalleryModal} onClose={() => setShowGalleryModal(false)} size="xl">
        <div className="flex items-center justify-center">
          <img src={selectedImage} alt="Gallery" className="max-w-full max-h-[80vh] object-contain" />
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
