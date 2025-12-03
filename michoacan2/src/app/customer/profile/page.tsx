'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';

export default function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Cliente Demo',
    email: 'cliente@ticketflow.com',
    phone: '+52 443 123 4567',
    address: 'Av. Madero 123, Morelia, Michoacán',
    birthdate: '1990-05-15',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar los cambios
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Mi Perfil
              </h1>
              <p className="text-xl text-slate-600">
                Administra tu información personal
              </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Avatar Section */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
                <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-5xl font-black text-blue-600">
                    {formData.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">
                  {formData.name}
                </h2>
                <p className="text-blue-100 text-lg">{formData.email}</p>
              </div>

              {/* Form Section */}
              <div className="p-8 md:p-12">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nombre Completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                        {formData.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                        {formData.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Teléfono
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                        {formData.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Dirección
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                        {formData.address}
                      </p>
                    )}
                  </div>

                  {/* Birthdate */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Fecha de Nacimiento
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={formData.birthdate}
                        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                        {new Date(formData.birthdate).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 justify-center">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="lg">
                        Guardar Cambios
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        size="lg"
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} size="lg">
                      Editar Perfil
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-8">
              <h3 className="text-3xl font-black text-slate-900 mb-6 text-center">
                Seguridad
              </h3>
              <div className="flex justify-center">
                <Button variant="outline" size="lg">
                  Cambiar Contraseña
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
