'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';

export default function AdminReports() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [reportType, setReportType] = useState<'sales' | 'users' | 'events'>('sales');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const platformStats = {
    totalRevenue: 125000,
    totalTickets: 1450,
    totalUsers: 890,
    totalEvents: 45,
    activeEvents: 12,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-900">Reportes</h1>
              <p className="text-slate-600 mt-1">Análisis completo de la plataforma</p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              ← Volver al panel
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">

        {/* Stats Grid */}
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-semibold">Ingresos Totales</p>
            <p className="text-3xl font-black text-slate-900">
              ${(platformStats.totalRevenue / 1000).toFixed(0)}K
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-semibold">Tickets Vendidos</p>
            <p className="text-3xl font-black text-slate-900">{platformStats.totalTickets}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-semibold">Usuarios</p>
            <p className="text-3xl font-black text-slate-900">{platformStats.totalUsers}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-semibold">Eventos Totales</p>
            <p className="text-3xl font-black text-slate-900">{platformStats.totalEvents}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-slate-600 mb-1 font-semibold">Eventos Activos</p>
            <p className="text-3xl font-black text-slate-900">{platformStats.activeEvents}</p>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => setReportType('sales')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                reportType === 'sales'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Reporte de Ventas
            </button>
            <button
              onClick={() => setReportType('users')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                reportType === 'users'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Reporte de Usuarios
            </button>
            <button
              onClick={() => setReportType('events')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                reportType === 'events'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Reporte de Eventos
            </button>
          </div>
        </div>

        {/* Sales Report */}
        {reportType === 'sales' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-slate-900">Ventas por Mes</h2>
                <Button variant="outline">Exportar PDF</Button>
              </div>
              <div className="space-y-4">
                {[
                  { month: 'Enero 2025', revenue: 45000, tickets: 380, growth: 15 },
                  { month: 'Diciembre 2024', revenue: 39000, tickets: 320, growth: 8 },
                  { month: 'Noviembre 2024', revenue: 36000, tickets: 295, growth: 12 },
                ].map((data, index) => (
                  <div key={index} className="border-b-2 border-slate-100 pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-900 text-lg">{data.month}</span>
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-2xl">
                          ${data.revenue.toLocaleString('es-MX')}
                        </span>
                        <span className="text-green-600 font-semibold text-sm ml-3">
                          +{data.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-4 rounded-full"
                        style={{ width: `${(data.revenue / 50000) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-slate-600">{data.tickets} tickets vendidos</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Top Artistas</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Artista Demo', revenue: 45000, percentage: 36 },
                    { name: 'Banda XYZ', revenue: 38000, percentage: 30 },
                    { name: 'DJ Fusion', revenue: 28000, percentage: 22 },
                  ].map((artist, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-black">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{artist.name}</p>
                        <p className="text-sm text-slate-600">
                          ${artist.revenue.toLocaleString('es-MX')}
                        </p>
                      </div>
                      <span className="text-blue-600 font-bold">{artist.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Métodos de Pago</h3>
                <div className="space-y-4">
                  {[
                    { method: 'Tarjeta de Crédito', percentage: 55, amount: 68750 },
                    { method: 'Tarjeta de Débito', percentage: 30, amount: 37500 },
                    { method: 'PayPal', percentage: 15, amount: 18750 },
                  ].map((payment, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-slate-900">{payment.method}</span>
                        <span className="text-slate-600">
                          ${payment.amount.toLocaleString('es-MX')}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full"
                          style={{ width: `${payment.percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{payment.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Report */}
        {reportType === 'users' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-900">Crecimiento de Usuarios</h2>
              <Button variant="outline">Exportar CSV</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-2 font-semibold">Clientes</p>
                <p className="text-4xl font-black text-blue-600">650</p>
                <p className="text-sm text-green-600 font-semibold mt-2">+18% este mes</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-2 font-semibold">Artistas</p>
                <p className="text-4xl font-black text-indigo-600">230</p>
                <p className="text-sm text-green-600 font-semibold mt-2">+12% este mes</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-2 font-semibold">Admins</p>
                <p className="text-4xl font-black text-purple-600">10</p>
                <p className="text-sm text-slate-600 font-semibold mt-2">Sin cambios</p>
              </div>
            </div>
          </div>
        )}

        {/* Events Report */}
      {reportType === 'events' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black text-slate-900">Estadísticas de Eventos</h2>
            <Button variant="outline">Exportar Excel</Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <p className="text-sm text-slate-600 mb-2 font-semibold">Eventos Completados</p>
              <p className="text-4xl font-black text-green-600">28</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <p className="text-sm text-slate-600 mb-2 font-semibold">Eventos Activos</p>
              <p className="text-4xl font-black text-blue-600">12</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <p className="text-sm text-slate-600 mb-2 font-semibold">Próximos Eventos</p>
              <p className="text-4xl font-black text-orange-600">5</p>
            </div>
          </div>
        </div>
      )}
      </div>
      {/* Cierre de etiquetas principales */}
      </main>
    </div>
  );
}
