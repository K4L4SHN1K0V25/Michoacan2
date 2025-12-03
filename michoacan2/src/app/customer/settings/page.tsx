'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';

export default function CustomerSettings() {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy'>('account');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Configuración
              </h1>
              <p className="text-xl text-slate-600">
                Administra tu cuenta y preferencias
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'account'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Cuenta
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'notifications'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Notificaciones
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'privacy'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Privacidad
                </button>
              </div>
            </div>

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Información de Cuenta</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="cliente@ticketflow.com"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Contraseña
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="password"
                        value="••••••••"
                        disabled
                        className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg bg-slate-50"
                      />
                      <Button variant="outline">Cambiar</Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Idioma
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Español (MX)</option>
                      <option>English (US)</option>
                    </select>
                  </div>

                  <div className="flex gap-4 justify-center pt-4">
                    <Button size="lg">Guardar Cambios</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Preferencias de Notificaciones</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Recordatorios de Eventos</h3>
                      <p className="text-sm text-slate-600">Recibe recordatorios 24 horas antes del evento</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Nuevos Eventos</h3>
                      <p className="text-sm text-slate-600">Notificación cuando haya nuevos eventos disponibles</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Confirmación de Compra</h3>
                      <p className="text-sm text-slate-600">Recibe confirmación por email de tus compras</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Ofertas y Promociones</h3>
                      <p className="text-sm text-slate-600">Recibe descuentos exclusivos y ofertas especiales</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex gap-4 justify-center pt-4">
                    <Button size="lg">Guardar Preferencias</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Privacidad y Seguridad</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Perfil Público</h3>
                      <p className="text-sm text-slate-600">Permitir que otros usuarios vean tu perfil</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Mostrar Historial de Eventos</h3>
                      <p className="text-sm text-slate-600">Mostrar qué eventos has asistido</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Autenticación de Dos Factores</h3>
                      <p className="text-sm text-slate-600">Añade una capa extra de seguridad a tu cuenta</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mt-8">
                    <h3 className="font-bold text-red-900 mb-2">Zona de Peligro</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, está seguro.
                    </p>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                      Eliminar Cuenta
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
