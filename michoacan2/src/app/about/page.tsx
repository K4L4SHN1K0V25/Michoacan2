import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Hero Section */}
        <section className="py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
                Sobre TicketFlow
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
                Somos la plataforma líder en México para la venta de boletos de eventos en vivo.
                Conectamos a artistas con sus fans de manera simple, segura y eficiente.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white rounded-2xl shadow-xl p-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">Nuestra Misión</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Democratizar el acceso a eventos culturales y de entretenimiento en todo México,
                    facilitando que cualquier artista pueda compartir su talento y que cualquier
                    persona pueda disfrutar de experiencias inolvidables.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">Nuestra Visión</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Ser la plataforma número uno en América Latina para la gestión de eventos,
                    reconocida por nuestra innovación tecnológica, seguridad y excelente servicio
                    al cliente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-black text-slate-900 mb-12 text-center">
                Nuestros Valores
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">Seguridad</h3>
                  <p className="text-slate-600">
                    Protegemos tus datos y transacciones con la más alta tecnología de seguridad.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">Innovación</h3>
                  <p className="text-slate-600">
                    Mejoramos constantemente nuestra plataforma con las últimas tecnologías.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">Comunidad</h3>
                  <p className="text-slate-600">
                    Fomentamos conexiones auténticas entre artistas y sus seguidores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-12 text-center">
                  TicketFlow en Números
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <p className="text-6xl font-black text-white mb-2">125K+</p>
                    <p className="text-xl text-blue-100 font-semibold">Tickets Vendidos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-6xl font-black text-white mb-2">890+</p>
                    <p className="text-xl text-blue-100 font-semibold">Usuarios Activos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-6xl font-black text-white mb-2">45+</p>
                    <p className="text-xl text-blue-100 font-semibold">Eventos Realizados</p>
                  </div>
                  <div className="text-center">
                    <p className="text-6xl font-black text-white mb-2">99%</p>
                    <p className="text-xl text-blue-100 font-semibold">Satisfacción</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-black text-slate-900 mb-12 text-center">
                Nuestro Equipo
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {['CEO', 'CTO', 'CMO'].map((role, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="h-64 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Equipo TicketFlow</h3>
                      <p className="text-blue-600 font-bold mb-3">{role}</p>
                      <p className="text-slate-600">
                        Comprometidos con ofrecer la mejor experiencia en eventos.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                ¿Listo para unirte a nosotros?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Descubre eventos increíbles o empieza a vender tus propios boletos hoy mismo.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg"
                >
                  Crear Cuenta
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-lg"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
