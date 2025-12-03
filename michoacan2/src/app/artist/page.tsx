'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import StatsCard from '@/components/artist/StatsCard';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { getArtistEvents, getArtistStats, Event as ApiEvent } from '@/lib/api';

interface EventWithStats {
  id: string;
  title: string;
  date: string;
  venue: string;
  ticketsSold: number;
  totalCapacity: number;
  revenue: number;
}

interface ArtistStats {
  revenue: number;
  ticketsSold: number;
  activeEvents: number;
  totalEvents: number;
  totalCapacity: number;
  customers: number;
}

export default function ArtistDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithStats[]>([]);
  const [stats, setStats] = useState<ArtistStats | null>(null);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with actual logged-in artist ID from auth context
  const ARTIST_ID = 1;

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch both events and stats in parallel
        const [eventsResponse, statsResponse] = await Promise.all([
          getArtistEvents(ARTIST_ID, { status: 'active' }),
          getArtistStats(ARTIST_ID),
        ]);

        // Process events
        if (eventsResponse.success && eventsResponse.data) {
          const mappedEvents: EventWithStats[] = eventsResponse.data
            .slice(0, 2) // Only take first 2 for dashboard
            .map((event: ApiEvent) => {
              const totalCapacity = (event.ticket_types || []).reduce((sum, tt) => sum + (tt.quota || 0), 0);
              const revenue = (event.ticket_types || []).reduce((sum, tt) => sum + ((tt.quota || 0) * tt.price), 0);

              return {
                id: event.event_id.toString(),
                title: event.name,
                date: event.start_dt,
                venue: event.venue?.name || 'TBA',
                ticketsSold: 0, // TODO: Calculate from orders
                totalCapacity,
                revenue: 0, // TODO: Calculate from actual sales
              };
            });
          setUpcomingEvents(mappedEvents);
        }

        // Process stats
        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar userRole="artist" isLoggedIn={true} />

      <div className="flex flex-1">
        <Sidebar role="artist" />

        <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-7xl w-full">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">Dashboard</h1>
            <p className="text-xl md:text-2xl text-slate-600">Welcome back! Here's what's happening with your events.</p>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
              <StatsCard
                title="Total Revenue"
                value={`$${stats?.revenue.toLocaleString() || '0'}`}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                color="green"
              />

              <StatsCard
                title="Tickets Sold"
                value={stats?.ticketsSold.toString() || '0'}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                }
                color="purple"
              />

              <StatsCard
                title="Active Events"
                value={stats?.activeEvents.toString() || '0'}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                color="blue"
              />

              <StatsCard
                title="Total Capacity"
                value={stats?.totalCapacity.toString() || '0'}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                }
                color="orange"
              />
            </div>
          )}

          {!loading && (
            <div className="mb-12 md:mb-16">
              {/* Upcoming Events */}
              <Card>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Upcoming Events</h2>
                  <Link href="/artist/events">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-6">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => {
                      const soldPercentage = event.totalCapacity > 0 ? (event.ticketsSold / event.totalCapacity) * 100 : 0;
                      return (
                        <div
                          key={event.id}
                          className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-start justify-between mb-5">
                            <div>
                              <h3 className="font-bold text-gray-900 text-xl md:text-2xl mb-2">{event.title}</h3>
                              <p className="text-base md:text-lg text-gray-600">{event.venue}</p>
                              <p className="text-base md:text-lg text-blue-600 font-bold mt-2">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl md:text-4xl font-extrabold text-green-600">${event.revenue.toLocaleString()}</p>
                              <p className="text-sm text-gray-500 mt-1">Potential Revenue</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between text-base md:text-lg">
                              <span className="text-gray-600 font-medium">Tickets Sold</span>
                              <span className="font-bold text-gray-900">
                                {event.ticketsSold} / {event.totalCapacity}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-md"
                                style={{ width: `${soldPercentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming events</h3>
                      <p className="text-gray-600 mb-6">Create your first event to get started.</p>
                      <Link href="/artist/create">
                        <Button variant="primary">Create Event</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <Card>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <Link href="/artist/create">
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 md:p-10 text-center hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all cursor-pointer hover:shadow-2xl hover:scale-105 group">
                  <svg
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-400 group-hover:text-blue-600 mb-5 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="font-bold text-gray-900 text-lg md:text-xl group-hover:text-blue-700 transition-colors">Create New Event</p>
                </div>
              </Link>

              <Link href="/artist/analytics">
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 md:p-10 text-center hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all cursor-pointer hover:shadow-2xl hover:scale-105 group">
                  <svg
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-400 group-hover:text-blue-600 mb-5 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="font-bold text-gray-900 text-lg md:text-xl group-hover:text-blue-700 transition-colors">View Analytics</p>
                </div>
              </Link>

              <Link href="/artist/profile">
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-8 md:p-10 text-center hover:border-green-500 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all cursor-pointer hover:shadow-2xl hover:scale-105 group">
                  <svg
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-400 group-hover:text-green-600 mb-5 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="font-bold text-gray-900 text-lg md:text-xl group-hover:text-green-700 transition-colors">Update Profile</p>
                </div>
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
