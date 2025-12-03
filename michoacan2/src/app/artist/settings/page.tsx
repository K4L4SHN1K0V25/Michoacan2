'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';

export default function ArtistSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'payment' | 'notifications'>('profile');

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Sidebar role="artist" />

      <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-5xl w-full">
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">
            Configuración
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            Administra tu cuenta y preferencias
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Perfil de Artista
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'payment'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Información de Pago
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
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Perfil de Artista</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Nombre Artístico
                </label>
                <input
                  type="text"
                  defaultValue="Artista Demo"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="artista@ticketflow.com"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  defaultValue="+52 443 234 5678"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Biografía
                </label>
                <textarea
                  rows={4}
                  defaultValue="Artista profesional con más de 10 años de experiencia en eventos en vivo."
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Género Musical
                </label>
                <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Rock</option>
                  <option>Pop</option>
                  <option>Jazz</option>
                  <option>Clásica</option>
                  <option>Electrónica</option>
                  <option>Regional</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Sitio Web
                </label>
                <input
                  type="url"
                  placeholder="https://tuartista.com"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg">Guardar Cambios</Button>
                <Button variant="outline" size="lg">Cancelar</Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Información de Pago</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <p className="text-sm text-blue-800 font-semibold">
                  Los pagos se realizan mensualmente el día 1 de cada mes. La comisión de la plataforma es del 10%.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Nombre Completo (Titular)
                </label>
                <input
                  type="text"
                  defaultValue="Artista Demo"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Banco
                </label>
                <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>BBVA</option>
                  <option>Santander</option>
                  <option>Banorte</option>
                  <option>Scotiabank</option>
                  <option>HSBC</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  CLABE Interbancaria
                </label>
                <input
                  type="text"
                  placeholder="18 dígitos"
                  maxLength={18}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  RFC
                </label>
                <input
                  type="text"
                  placeholder="13 caracteres"
                  maxLength={13}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg">Guardar Información</Button>
                <Button variant="outline" size="lg">Cancelar</Button>
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
                  <h3 className="font-bold text-slate-900 mb-1">Nuevas Ventas</h3>
                  <p className="text-sm text-slate-600">Recibe notificación cuando se venda un ticket</p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Recordatorios de Eventos</h3>
                  <p className="text-sm text-slate-600">Recordatorios 24 horas antes del evento</p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Confirmación de Pagos</h3>
                  <p className="text-sm text-slate-600">Cuando se procese tu pago mensual</p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Mensajes de Clientes</h3>
                  <p className="text-sm text-slate-600">Cuando recibas mensajes o preguntas</p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Boletín de Noticias</h3>
                  <p className="text-sm text-slate-600">Tips y actualizaciones de la plataforma</p>
                </div>
                <input type="checkbox" className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg">Guardar Preferencias</Button>
              </div>
            </div>
          </div>
        )}
      </main>
      </div>
      <Footer />
    </>
  );
}
