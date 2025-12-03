'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';

export default function AdminSettings() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'platform' | 'security'>('general');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-900">Configuración del Sistema</h1>
              <p className="text-slate-600 mt-1">Administra los ajustes de la plataforma</p>
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'general'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('platform')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'platform'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Plataforma
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Seguridad
            </button>
          </div>
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Configuración General</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Nombre de la Plataforma
                </label>
                <input
                  type="text"
                  defaultValue="TicketFlow"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email de Soporte
                </label>
                <input
                  type="email"
                  defaultValue="soporte@ticketflow.com"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Teléfono de Soporte
                </label>
                <input
                  type="tel"
                  defaultValue="+52 443 000 0000"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Zona Horaria
                </label>
                <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>America/Mexico_City (GMT-6)</option>
                  <option>America/Monterrey (GMT-6)</option>
                  <option>America/Cancun (GMT-5)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Idioma por Defecto
                </label>
                <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Español (MX)</option>
                  <option>English (US)</option>
                </select>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Guardar Cambios
                </button>
                <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Platform Tab */}
        {activeTab === 'platform' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Configuración de Plataforma</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Comisión de Plataforma (%)
                </label>
                <input
                  type="number"
                  defaultValue="10"
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-slate-600 mt-2">
                  Porcentaje que se cobra a los artistas por cada venta
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Límite de Tickets por Compra
                </label>
                <input
                  type="number"
                  defaultValue="10"
                  min="1"
                  max="50"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-slate-600 mt-2">
                  Número máximo de tickets por transacción
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Días antes de Cancelación Automática
                </label>
                <input
                  type="number"
                  defaultValue="7"
                  min="1"
                  max="30"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-slate-600 mt-2">
                  Días antes del evento para permitir cancelaciones
                </p>
              </div>

              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="font-bold text-slate-900 mb-4">Métodos de Pago Habilitados</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">Tarjetas de Crédito</span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">Tarjetas de Débito</span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">PayPal</span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">Transferencia Bancaria</span>
                    <input type="checkbox" className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="font-bold text-slate-900 mb-4">Funcionalidades</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        Registro de Nuevos Artistas
                      </span>
                      <span className="text-sm text-slate-600">
                        Permitir que nuevos artistas se registren
                      </span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-slate-900 block">Modo Mantenimiento</span>
                      <span className="text-sm text-slate-600">
                        Deshabilitar acceso temporal a la plataforma
                      </span>
                    </div>
                    <input type="checkbox" className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Guardar Configuración
                </button>
                <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                  Restaurar Valores
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Configuración de Seguridad</h2>
            <div className="space-y-6">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <p className="font-bold text-yellow-900 mb-1">Zona de Configuración Crítica</p>
                    <p className="text-sm text-yellow-800">
                      Los cambios en esta sección afectan la seguridad de toda la plataforma. Procede
                      con precaución.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Intentos de Login Fallidos Permitidos
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  min="3"
                  max="10"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-slate-600 mt-2">
                  Número de intentos antes de bloquear la cuenta temporalmente
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Duración de Sesión (minutos)
                </label>
                <input
                  type="number"
                  defaultValue="60"
                  min="15"
                  max="480"
                  step="15"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-slate-600 mt-2">
                  Tiempo de inactividad antes de cerrar sesión automáticamente
                </p>
              </div>

              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="font-bold text-slate-900 mb-4">Políticas de Contraseña</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">
                      Requerir letras mayúsculas y minúsculas
                    </span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">Requerir números</span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">
                      Requerir caracteres especiales
                    </span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900">
                      Longitud mínima de 8 caracteres
                    </span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="font-bold text-slate-900 mb-4">Autenticación de Dos Factores</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        Requerir 2FA para Admins
                      </span>
                      <span className="text-sm text-slate-600">Obligatorio para administradores</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        Requerir 2FA para Artistas
                      </span>
                      <span className="text-sm text-slate-600">Opcional para artistas</span>
                    </div>
                    <input type="checkbox" className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Guardar Configuración de Seguridad
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
