import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CustomerAbout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
                Sobre TicketFlow
              </h1>
              <p className="text-xl text-slate-600">
                Tu plataforma de confianza para eventos en vivo
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-xl p-10 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 text-center">Nuestra Misión</h2>
              <p className="text-lg text-slate-600 leading-relaxed text-center">
                Democratizar el acceso a eventos culturales y de entretenimiento en todo México,
                facilitando que cualquier artista pueda compartir su talento y que cualquier
                persona pueda disfrutar de experiencias inolvidables de manera simple y segura.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl shadow-xl p-10 mb-8">
              <h2 className="text-4xl font-black text-slate-900 mb-8 text-center">
                Nuestros Valores
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Seguridad</h3>
                  <p className="text-slate-600">
                    Protegemos tus datos y transacciones
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Innovación</h3>
                  <p className="text-slate-600">
                    Mejoramos constantemente
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Comunidad</h3>
                  <p className="text-slate-600">
                    Conectamos artistas y fans
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-10">
              <h2 className="text-4xl font-black text-white mb-10 text-center">
                TicketFlow en Números
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-5xl font-black text-white mb-2">125K+</p>
                  <p className="text-lg text-blue-100 font-semibold">Tickets Vendidos</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-black text-white mb-2">890+</p>
                  <p className="text-lg text-blue-100 font-semibold">Usuarios</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-black text-white mb-2">45+</p>
                  <p className="text-lg text-blue-100 font-semibold">Eventos</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-black text-white mb-2">99%</p>
                  <p className="text-lg text-blue-100 font-semibold">Satisfacción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
