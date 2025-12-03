'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PurchaseHistory() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  const purchases = [
    {
      id: 'PUR-001',
      date: '2025-01-10',
      eventName: 'Festival de Rock 2025',
      quantity: 2,
      unitPrice: 600,
      total: 1200,
      status: 'completed',
      paymentMethod: 'Tarjeta Crédito',
    },
    {
      id: 'PUR-002',
      date: '2025-01-05',
      eventName: 'Concierto Sinfónico',
      quantity: 1,
      unitPrice: 350,
      total: 350,
      status: 'completed',
      paymentMethod: 'PayPal',
    },
    {
      id: 'PUR-003',
      date: '2024-12-28',
      eventName: 'Festival Navideño',
      quantity: 4,
      unitPrice: 250,
      total: 1000,
      status: 'cancelled',
      paymentMethod: 'Tarjeta Débito',
    },
    {
      id: 'PUR-004',
      date: '2024-11-20',
      eventName: 'Stand Up Comedy',
      quantity: 2,
      unitPrice: 400,
      total: 800,
      status: 'completed',
      paymentMethod: 'Tarjeta Crédito',
    },
  ];

  const filteredPurchases = purchases.filter((purchase) => {
    if (filter === 'all') return true;
    return purchase.status === filter;
  });

  const totalSpent = purchases
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.total, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Historial de Compras
              </h1>
              <p className="text-xl text-slate-600">
                Revisa todas tus transacciones
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <p className="text-sm text-slate-600 mb-2 font-semibold">Total Gastado</p>
                <p className="text-4xl font-black text-blue-600">
                  ${totalSpent.toLocaleString('es-MX')}
                </p>
                <p className="text-sm text-slate-500 mt-1">MXN</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <p className="text-sm text-slate-600 mb-2 font-semibold">Compras Totales</p>
                <p className="text-4xl font-black text-indigo-600">{purchases.length}</p>
                <p className="text-sm text-slate-500 mt-1">Transacciones</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <p className="text-sm text-slate-600 mb-2 font-semibold">Tickets Comprados</p>
                <p className="text-4xl font-black text-slate-900">
                  {purchases.reduce((sum, p) => sum + p.quantity, 0)}
                </p>
                <p className="text-sm text-slate-500 mt-1">Boletos</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    filter === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    filter === 'completed'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Completadas
                </button>
                <button
                  onClick={() => setFilter('cancelled')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    filter === 'cancelled'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Canceladas
                </button>
              </div>
            </div>

            {/* Purchases Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-black">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-black">Fecha</th>
                      <th className="px-6 py-4 text-left text-sm font-black">Evento</th>
                      <th className="px-6 py-4 text-center text-sm font-black">Cantidad</th>
                      <th className="px-6 py-4 text-right text-sm font-black">Precio Unit.</th>
                      <th className="px-6 py-4 text-right text-sm font-black">Total</th>
                      <th className="px-6 py-4 text-center text-sm font-black">Estado</th>
                      <th className="px-6 py-4 text-left text-sm font-black">Pago</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredPurchases.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">
                          {purchase.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(purchase.date).toLocaleDateString('es-MX')}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                          {purchase.eventName}
                        </td>
                        <td className="px-6 py-4 text-sm text-center font-semibold text-slate-900">
                          {purchase.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-slate-600">
                          ${purchase.unitPrice.toLocaleString('es-MX')}
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-bold text-slate-900">
                          ${purchase.total.toLocaleString('es-MX')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              purchase.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {purchase.status === 'completed' ? 'Completada' : 'Cancelada'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {purchase.paymentMethod}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Empty State */}
            {filteredPurchases.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center mt-8">
                <p className="text-xl text-slate-600">
                  No se encontraron compras con este filtro
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
