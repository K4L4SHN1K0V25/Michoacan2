'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Para Clientes',
      questions: [
        {
          q: '¿Cómo compro un ticket?',
          a: 'Navega a la sección de eventos, selecciona el evento de tu interés, elige la cantidad de tickets que deseas y procede al pago. Recibirás tus tickets por email inmediatamente después de completar la compra.',
        },
        {
          q: '¿Qué métodos de pago aceptan?',
          a: 'Aceptamos tarjetas de crédito, tarjetas de débito, PayPal y transferencias bancarias. Todos los pagos son procesados de forma segura a través de plataformas certificadas.',
        },
        {
          q: '¿Puedo cancelar o reembolsar mi compra?',
          a: 'Las cancelaciones están permitidas hasta 7 días antes del evento. Los reembolsos se procesan en un plazo de 5-10 días hábiles a tu método de pago original.',
        },
        {
          q: '¿Cómo accedo a mis tickets?',
          a: 'Tus tickets están disponibles en tu cuenta, sección "Mis Tickets". También los recibirás por email. Puedes descargarlos en formato PDF o mostrar el código QR desde tu dispositivo móvil.',
        },
        {
          q: '¿Qué pasa si pierdo mi ticket?',
          a: 'No te preocupes. Inicia sesión en tu cuenta y descarga nuevamente tus tickets desde la sección "Mis Tickets". Cada ticket tiene un código QR único que no se puede duplicar.',
        },
      ],
    },
    {
      category: 'Para Artistas',
      questions: [
        {
          q: '¿Cómo me registro como artista?',
          a: 'Haz clic en "Crear Cuenta" y selecciona el tipo de usuario "Artista". Completa tu perfil con tu información y documentación necesaria. Nuestro equipo revisará tu solicitud en 24-48 horas.',
        },
        {
          q: '¿Cuánto cobran de comisión?',
          a: 'Nuestra comisión es del 10% sobre el precio de cada ticket vendido. No hay costos ocultos ni cargos mensuales. Solo pagas cuando vendes.',
        },
        {
          q: '¿Cómo y cuándo recibo mis pagos?',
          a: 'Los pagos se procesan mensualmente el día 1 de cada mes. Transferimos directamente a tu cuenta bancaria registrada el monto neto de tus ventas (precio total menos comisión del 10%).',
        },
        {
          q: '¿Puedo crear eventos ilimitados?',
          a: 'Sí, puedes crear tantos eventos como desees sin ningún límite. Cada evento puede tener múltiples tipos de tickets con diferentes precios.',
        },
        {
          q: '¿Qué herramientas de análisis ofrecen?',
          a: 'Tenemos un dashboard completo con estadísticas en tiempo real: ventas totales, tickets vendidos, demografía de audiencia, eventos más populares y mucho más.',
        },
      ],
    },
    {
      category: 'Seguridad y Privacidad',
      questions: [
        {
          q: '¿Mis datos están seguros?',
          a: 'Sí. Utilizamos encriptación SSL de nivel bancario para proteger toda tu información. Cumplimos con los estándares internacionales de seguridad PCI DSS.',
        },
        {
          q: '¿Cómo protegen contra tickets falsos?',
          a: 'Cada ticket tiene un código QR único y encriptado que solo puede usarse una vez. Nuestro sistema valida en tiempo real la autenticidad de cada ticket en el evento.',
        },
        {
          q: '¿Qué hacen con mi información personal?',
          a: 'Solo usamos tu información para procesar tus compras y mejorar tu experiencia. Nunca vendemos ni compartimos tus datos con terceros sin tu consentimiento explícito.',
        },
      ],
    },
    {
      category: 'Problemas Técnicos',
      questions: [
        {
          q: 'No recibí mi email de confirmación',
          a: 'Revisa tu carpeta de spam o correo no deseado. Si aún no lo encuentras, inicia sesión en tu cuenta donde encontrarás todos tus tickets. También puedes contactar a soporte@ticketflow.com.',
        },
        {
          q: 'No puedo iniciar sesión en mi cuenta',
          a: 'Usa la opción "Olvidé mi contraseña" para restablecer tu acceso. Si el problema persiste, contáctanos a soporte@ticketflow.com con tu email registrado.',
        },
        {
          q: 'El código QR no se escanea',
          a: 'Asegúrate de que tu pantalla esté al máximo brillo y sin reflejos. Si usas un PDF impreso, verifica que la impresión sea clara. En caso de problemas, puedes usar tu ID de ticket como alternativa.',
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
                Preguntas Frecuentes
              </h1>
              <p className="text-xl md:text-2xl text-slate-600">
                Encuentra respuestas a las preguntas más comunes
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {faqs.map((category, catIndex) => (
                <div key={catIndex} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                    <h2 className="text-3xl font-black text-white">{category.category}</h2>
                  </div>
                  <div className="p-6">
                    {category.questions.map((faq, qIndex) => {
                      const globalIndex = catIndex * 100 + qIndex;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div key={qIndex} className="border-b-2 border-slate-100 last:border-0">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full py-5 flex justify-between items-center gap-4 text-left hover:bg-slate-50 px-4 rounded-lg transition-colors"
                          >
                            <span className="text-lg font-bold text-slate-900">{faq.q}</span>
                            <svg
                              className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-5">
                              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-12 mt-12 text-center">
              <h2 className="text-4xl font-black text-white mb-4">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Nuestro equipo de soporte está listo para ayudarte
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                >
                  Contáctanos
                </a>
                <a
                  href="mailto:soporte@ticketflow.com"
                  className="px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors"
                >
                  soporte@ticketflow.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
