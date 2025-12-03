'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import EventForm from '@/components/artist/EventForm';
import { createEvent } from '@/lib/api';

export default function CreateEvent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // TODO: Replace with actual logged-in artist ID from auth context
  const ARTIST_ID = 1;

  const handleSubmit = async (eventData: any, isDraft: boolean) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createEvent({
        ...eventData,
        artist_id: ARTIST_ID,
        status: isDraft ? 'draft' : 'active',
      });

      if (response.success) {
        setSuccess(true);
        // Redirect to events page after 1.5 seconds
        setTimeout(() => {
          router.push('/artist/events');
        }, 1500);
      } else {
        setError(response.error || 'Failed to create event');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar userRole="artist" isLoggedIn={true} />

      <div className="flex flex-1">
        <Sidebar role="artist" />

        <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-7xl w-full">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">Create New Event</h1>
            <p className="text-xl md:text-2xl text-slate-600">
              Fill out the details below to create and publish your event.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-100 border-2 border-green-400 text-green-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Event created successfully! Redirecting...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {/* Form */}
          <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </main>
      </div>
    </div>
  );
}
