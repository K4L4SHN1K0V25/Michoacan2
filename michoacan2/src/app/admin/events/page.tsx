'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';

interface Event {
  id: number;
  name: string;
  artistName: string;
  artistId: number;
  date: string;
  location: string;
  venue: string;
  status: string;
  totalTickets: number;
  availableTickets: number;
  createdAt: string;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [targetStatus, setTargetStatus] = useState<string>('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchEvents();
    }
  }, [user]);

  async function fetchEvents() {
    try {
      const response = await fetch('/api/admin/events');
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelEvent() {
    if (!selectedEvent) return;

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/events/${selectedEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Evento cancelado exitosamente');
        setShowCancelModal(false);
        setSelectedEvent(null);
        fetchEvents();
      } else {
        setError(data.error || 'Error al cancelar evento');
      }
    } catch (error) {
      setError('Error de red');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleStatus() {
    if (!selectedEvent || !targetStatus) return;

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/events/${selectedEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Evento ${targetStatus === 'active' ? 'activado' : 'desactivado'} exitosamente`);
        setShowToggleModal(false);
        setSelectedEvent(null);
        setTargetStatus('');
        fetchEvents();
      } else {
        setError(data.error || 'Error al actualizar evento');
      }
    } catch (error) {
      setError('Error de red');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteEvent() {
    if (!selectedEvent) return;

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/events/${selectedEvent.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Evento eliminado exitosamente');
        setShowDeleteModal(false);
        setSelectedEvent(null);
        fetchEvents();
      } else {
        setError(data.error || 'Error al eliminar evento');
      }
    } catch (error) {
      setError('Error de red');
    } finally {
      setIsSubmitting(false);
    }
  }

  function openCancelModal(event: Event) {
    setSelectedEvent(event);
    setShowCancelModal(true);
    setError('');
  }

  function openDeleteModal(event: Event) {
    setSelectedEvent(event);
    setShowDeleteModal(true);
    setError('');
  }

  function openToggleModal(event: Event, newStatus: string) {
    setSelectedEvent(event);
    setTargetStatus(newStatus);
    setShowToggleModal(true);
    setError('');
  }

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (authLoading || loading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-900">Gestionar Eventos</h1>
              <p className="text-slate-600 mt-1">Ver, editar y cancelar eventos</p>
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
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}
        {error && !showCancelModal && !showDeleteModal && !showToggleModal && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                placeholder="Buscar por nombre, artista, venue o ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'cancelled', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {status === 'all' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Evento
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Artista
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tickets
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredEvents.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{e.name}</p>
                      <p className="text-sm text-slate-600">
                        {e.venue} • {e.location}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {e.artistName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {new Date(e.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        e.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : e.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {e.totalTickets - e.availableTickets} / {e.totalTickets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/events/${e.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Ver
                    </Link>
                    {e.status === 'active' && (
                      <>
                        <button
                          onClick={() => openToggleModal(e, 'inactive')}
                          className="text-yellow-600 hover:text-yellow-900 mr-3"
                        >
                          Desactivar
                        </button>
                        <button
                          onClick={() => openCancelModal(e)}
                          className="text-orange-600 hover:text-orange-900 mr-3"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {e.status === 'inactive' && (
                      <button
                        onClick={() => openToggleModal(e, 'active')}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Activar
                      </button>
                    )}
                    <button
                      onClick={() => openDeleteModal(e)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No se encontraron eventos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Cancel Event Modal */}
      {showCancelModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
                <svg className="h-10 w-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Cancelar Evento</h3>
              <p className="text-slate-600 mb-2">
                ¿Estás seguro de que deseas cancelar <strong>{selectedEvent.name}</strong>?
              </p>
              <p className="text-sm text-orange-600 mb-6">
                Los clientes serán notificados de la cancelación.
              </p>

              {error && (
                <div className="mb-4 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedEvent(null);
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                  No, mantener
                </button>
                <button
                  onClick={handleCancelEvent}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Cancelando...' : 'Sí, cancelar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Status Modal */}
      {showToggleModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${
                targetStatus === 'active' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <svg className={`h-10 w-10 ${targetStatus === 'active' ? 'text-green-600' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {targetStatus === 'active' ? 'Activar Evento' : 'Desactivar Evento'}
              </h3>
              <p className="text-slate-600 mb-6">
                ¿Estás seguro de que deseas {targetStatus === 'active' ? 'activar' : 'desactivar'}{' '}
                <strong>{selectedEvent.name}</strong>?
              </p>

              {error && (
                <div className="mb-4 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowToggleModal(false);
                    setSelectedEvent(null);
                    setTargetStatus('');
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleToggleStatus}
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                    targetStatus === 'active'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Eliminar Evento</h3>
              <p className="text-slate-600 mb-2">
                ¿Estás seguro de que deseas eliminar <strong>{selectedEvent.name}</strong>?
              </p>
              <p className="text-sm text-red-600 mb-6">
                Esta acción no se puede deshacer. Solo se pueden eliminar eventos sin tickets vendidos.
              </p>

              {error && (
                <div className="mb-4 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedEvent(null);
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteEvent}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
