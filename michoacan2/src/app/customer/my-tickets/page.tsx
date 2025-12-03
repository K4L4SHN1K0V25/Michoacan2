'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';

export default function MyTicketsPage() {
  const tickets = [
    {
      id: '001',
      eventName: 'Festival de Rock 2025',
      eventDate: '2025-03-15',
      eventTime: '20:00',
      venue: 'Auditorio Morelia',
      ticketType: 'VIP',
      quantity: 2,
      totalPrice: 1200,
      purchaseDate: '2025-01-10',
      qrCode: 'QR123456',
      status: 'active',
    },
    {
      id: '002',
      eventName: 'Concierto Sinfónico',
      eventDate: '2025-02-20',
      eventTime: '19:00',
      venue: 'Teatro Ocampo',
      ticketType: 'General',
      quantity: 1,
      totalPrice: 350,
      purchaseDate: '2025-01-05',
      qrCode: 'QR789012',
      status: 'active',
    },
    {
      id: '003',
      eventName: 'Stand Up Comedy',
      eventDate: '2024-12-10',
      eventTime: '21:00',
      venue: 'Centro de Convenciones',
      ticketType: 'Premium',
      quantity: 2,
      totalPrice: 800,
      purchaseDate: '2024-11-20',
      qrCode: 'QR345678',
      status: 'used',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Mis Tickets
              </h1>
              <p className="text-xl text-slate-600">
                Todos tus boletos en un solo lugar
              </p>
            </div>

            {/* Tickets Grid */}
            <div className="grid gap-6 md:gap-8">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left Side - Event Info */}
                    <div className="flex-1 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                            {ticket.eventName}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 mb-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">
                              {new Date(ticket.eventDate).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 mb-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold">{ticket.eventTime} hrs</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-semibold">{ticket.venue}</span>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            ticket.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {ticket.status === 'active' ? 'Activo' : 'Usado'}
                        </span>
                      </div>

                      <div className="border-t-2 border-slate-200 pt-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Tipo de Ticket</p>
                            <p className="font-bold text-slate-900">{ticket.ticketType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Cantidad</p>
                            <p className="font-bold text-slate-900">{ticket.quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Total Pagado</p>
                            <p className="font-bold text-slate-900">
                              ${ticket.totalPrice.toLocaleString('es-MX')} MXN
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Fecha de Compra</p>
                            <p className="font-bold text-slate-900">
                              {new Date(ticket.purchaseDate).toLocaleDateString('es-MX')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - QR Code */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 flex flex-col items-center justify-center md:w-64">
                      <div className="bg-white p-4 rounded-xl mb-4">
                        <div className="w-32 h-32 bg-slate-200 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-slate-500 text-center">
                            QR Code
                            <br />
                            {ticket.qrCode}
                          </span>
                        </div>
                      </div>
                      <p className="text-white text-sm font-semibold mb-4 text-center">
                        Escanea este código en el evento
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-blue-600 hover:bg-blue-50 border-white"
                      >
                        Descargar PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
