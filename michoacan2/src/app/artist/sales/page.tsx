'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';

export default function ArtistSales() {
  const [dateFilter, setDateFilter] = useState('all');

  // Sales data removed - will be implemented when orders/tickets tables are ready
  const sales: any[] = [];
  const totalSales = 0;
  const totalCommissions = 0;
  const totalNetRevenue = 0;

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Sidebar role="artist" />

      <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-7xl w-full">
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">
            Ventas
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            Administra tus ingresos y transacciones
          </p>
        </div>

        {/* Revenue Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
            <p className="text-sm text-slate-600 mb-2 font-semibold">Ventas Brutas</p>
            <p className="text-4xl font-black text-slate-900 mb-2">
              ${totalSales.toLocaleString('es-MX')}
            </p>
            <p className="text-sm text-slate-500">Total antes de comisiones</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-600">
            <p className="text-sm text-slate-600 mb-2 font-semibold">Comisiones (10%)</p>
            <p className="text-4xl font-black text-red-600 mb-2">
              -${totalCommissions.toLocaleString('es-MX')}
            </p>
            <p className="text-sm text-slate-500">Tarifa de plataforma</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
            <p className="text-sm text-slate-600 mb-2 font-semibold">Ingresos Netos</p>
            <p className="text-4xl font-black text-green-600 mb-2">
              ${totalNetRevenue.toLocaleString('es-MX')}
            </p>
            <p className="text-sm text-slate-500">Total a recibir</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={() => setDateFilter('all')}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  dateFilter === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setDateFilter('today')}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  dateFilter === 'today'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Hoy
              </button>
              <button
                onClick={() => setDateFilter('week')}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  dateFilter === 'week'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Esta Semana
              </button>
              <button
                onClick={() => setDateFilter('month')}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  dateFilter === 'month'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Este Mes
              </button>
            </div>
            <Button variant="outline">
              Exportar Reporte
            </Button>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-12 text-center">
          <svg className="w-24 h-24 mx-auto mb-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Sistema de Ventas Próximamente</h2>
          <p className="text-xl text-slate-600 mb-6">
            La tabla de ventas detalladas estará disponible cuando se implementen las órdenes y el sistema de compras.
          </p>
          <p className="text-lg text-slate-500">
            Esto incluirá información de transacciones, clientes, comisiones y pagos programados.
          </p>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
}
