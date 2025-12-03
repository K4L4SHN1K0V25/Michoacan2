import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';
import FeaturedEvents from '@/components/events/FeaturedEvents';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isLoggedIn={false} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-10">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.1] tracking-tight">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Discover Events
              </span>
              <span className="block mt-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                That Inspire
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
              Connect with unforgettable experiences. Book tickets instantly or create your own events.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
              <Link href="/customer" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 !text-white hover:!from-blue-700 hover:!to-indigo-700 w-full !shadow-2xl !shadow-blue-500/50">
                  Explore Events
                </Button>
              </Link>
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="!border-3 !border-blue-400 !text-blue-100 hover:!bg-blue-500 hover:!text-white w-full !shadow-xl">
                  Create an Event
                </Button>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <FeaturedEvents />

      {/* Features Section */}
      <section className="py-28 md:py-40 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900">
              Everything You Need
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed for modern event management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {/* Feature 1 */}
            <div className="text-center p-10 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Instant Booking</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Reserve your spot in seconds with our streamlined checkout process
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-10 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Bank-Level Security</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Your data is encrypted and protected with industry-leading security
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-10 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">24/7 Support</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our dedicated team is always here to help you succeed
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-28 md:py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20"></div>
        <div className="relative w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Trusted by Thousands
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center p-8 bg-slate-800/50 rounded-3xl backdrop-blur-sm border border-slate-700 hover:border-blue-500 hover:bg-slate-800/70 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <p className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">10K+</p>
              <p className="text-lg md:text-xl text-slate-300 font-semibold">Events</p>
            </div>
            <div className="text-center p-8 bg-slate-800/50 rounded-3xl backdrop-blur-sm border border-slate-700 hover:border-blue-500 hover:bg-slate-800/70 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <p className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">500K+</p>
              <p className="text-lg md:text-xl text-slate-300 font-semibold">Customers</p>
            </div>
            <div className="text-center p-8 bg-slate-800/50 rounded-3xl backdrop-blur-sm border border-slate-700 hover:border-blue-500 hover:bg-slate-800/70 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <p className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">1.5M+</p>
              <p className="text-lg md:text-xl text-slate-300 font-semibold">Tickets</p>
            </div>
            <div className="text-center p-8 bg-slate-800/50 rounded-3xl backdrop-blur-sm border border-slate-700 hover:border-blue-500 hover:bg-slate-800/70 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <p className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">99.9%</p>
              <p className="text-lg md:text-xl text-slate-300 font-semibold">Uptime</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* For Artists Section */}
      <section className="py-28 md:py-40 bg-white">
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6">
              Built for Creators
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Powerful tools to create, manage, and grow your events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Simple Event Setup</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Create and customize events in minutes with our intuitive dashboard
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-indigo-200 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-Time Analytics</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Track ticket sales, revenue, and attendance with live insights
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Flexible Pricing</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Set custom prices, early bird discounts, and multiple ticket tiers
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-indigo-200 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Marketing Tools</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Promote your events with built-in email campaigns and social sharing
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/register">
              <Button variant="primary" size="lg" className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 !text-white hover:!from-blue-700 hover:!to-indigo-700 !shadow-2xl !shadow-blue-500/30">
                Start Creating Events
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="relative w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Join thousands discovering amazing events every day
          </p>
          <div className="pt-6">
            <Link href="/customer">
              <Button variant="primary" size="lg" className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 !text-white hover:!from-blue-700 hover:!to-indigo-700 !shadow-2xl !shadow-blue-500/50">
                Browse Events
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
