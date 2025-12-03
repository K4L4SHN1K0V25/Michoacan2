'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { getArtistStats } from '@/lib/api';

export default function ArtistAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with actual logged-in artist ID from auth context
  const ARTIST_ID = 1;

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await getArtistStats(ARTIST_ID);
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Sidebar role="artist" />

      <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-7xl w-full">
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">
            Estadísticas
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            Analiza el rendimiento de tus eventos
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando estadísticas...</p>
          </div>
        ) : stats ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 mb-2 font-semibold">Capacidad Total</p>
              <p className="text-4xl font-black text-slate-900">
                {stats.totalCapacity.toLocaleString('es-MX')}
              </p>
              <p className="text-sm text-slate-500 font-semibold mt-2">Todos los eventos</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 mb-2 font-semibold">Tickets Vendidos</p>
              <p className="text-4xl font-black text-slate-900">{stats.ticketsSold}</p>
              <p className="text-sm text-blue-600 font-semibold mt-2">Próximamente con órdenes</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 mb-2 font-semibold">Eventos Activos</p>
              <p className="text-4xl font-black text-slate-900">{stats.activeEvents}</p>
              <p className="text-sm text-purple-600 font-semibold mt-2">En venta ahora</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 mb-2 font-semibold">Total Eventos</p>
              <p className="text-4xl font-black text-slate-900">
                {stats.totalEvents}
              </p>
              <p className="text-sm text-orange-600 font-semibold mt-2">Creados</p>
            </div>
          </div>
        ) : null}

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-12 text-white text-center">
          <svg className="w-20 h-20 mx-auto mb-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-4xl font-black mb-4">Análisis Avanzado Próximamente</h2>
          <p className="text-xl mb-6 opacity-90">
            Gráficos de ventas por mes, eventos destacados y demografía de audiencia estarán disponibles cuando se implementen las órdenes y compras.
          </p>
          <p className="text-lg opacity-75">
            Por ahora, puedes ver tus estadísticas básicas arriba basadas en tus eventos y tipos de tickets.
          </p>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
}
