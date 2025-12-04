'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

interface DashboardStats {
  users: {
    total: number;
    artists: number;
    customers: number;
    staff: number;
  };
  events: {
    total: number;
    active: number;
    cancelled: number;
    completed: number;
  };
  tickets: {
    total: number;
  };
  revenue: {
    total: number;
  };
  recent: {
    users: Array<{
      id: number;
      name: string;
      email: string;
      role: string;
      createdAt: string;
    }>;
    events: Array<{
      id: number;
      name: string;
      artistName: string;
      date: string;
      status: string;
      createdAt: string;
    }>;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando estadísticas...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Usuarios Totales</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  {stats?.users.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              <span className="font-semibold">{stats?.users.artists || 0}</span> Artistas •{' '}
              <span className="font-semibold">{stats?.users.customers || 0}</span> Clientes •{' '}
              <span className="font-semibold">{stats?.users.staff || 0}</span> Staff
            </div>
          </div>

          {/* Total Events */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Eventos Totales</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  {stats?.events.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              <span className="font-semibold text-green-600">{stats?.events.active || 0}</span> Activos •{' '}
              <span className="font-semibold">{stats?.events.completed || 0}</span> Completados
            </div>
          </div>

          {/* Total Tickets */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Tickets Vendidos</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  {stats?.tickets.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Ingresos Totales</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  ${Number(stats?.revenue.total || 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/admin/users"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Gestionar Usuarios</h3>
            <p className="text-sm text-slate-600">Ver, crear, editar y eliminar usuarios</p>
          </Link>

          <Link
            href="/admin/events"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Gestionar Eventos</h3>
            <p className="text-sm text-slate-600">Ver, editar y cancelar eventos</p>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Reportes</h3>
            <p className="text-sm text-slate-600">Ver estadísticas y reportes</p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Configuración</h3>
            <p className="text-sm text-slate-600">Ajustes del sistema</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Usuarios Recientes</h2>
            <div className="space-y-3">
              {stats?.recent.users.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-600">{user.email}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {user.role}
                  </span>
                </div>
              ))}
              {(!stats?.recent.users || stats.recent.users.length === 0) && (
                <p className="text-slate-500 text-sm">No hay usuarios recientes</p>
              )}
            </div>
            <Link
              href="/admin/users"
              className="block mt-4 text-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Ver todos los usuarios →
            </Link>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Eventos Recientes</h2>
            <div className="space-y-3">
              {stats?.recent.events.map((event) => (
                <div key={event.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-semibold text-slate-900">{event.name}</p>
                    <p className="text-sm text-slate-600">{event.artistName}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    event.status === 'active' ? 'bg-green-100 text-green-800' :
                    event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
              {(!stats?.recent.events || stats.recent.events.length === 0) && (
                <p className="text-slate-500 text-sm">No hay eventos recientes</p>
              )}
            </div>
            <Link
              href="/admin/events"
              className="block mt-4 text-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Ver todos los eventos →
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
