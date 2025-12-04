'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/components/providers/AuthProvider';

export default function AdminProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || 'Admin TicketFlow',
        email: user.email || 'admin@ticketflow.com',
        phone: user.phone || '+52 443 100 0000',
        role: user.role === 'admin' ? 'Administrador Principal' : user.role || 'Administrador',
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Error al actualizar el perfil');
        return;
      }

      alert('Perfil actualizado exitosamente');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">
              Mi Perfil
            </h1>
            <p className="text-xl md:text-2xl text-slate-600">
              Administra tu información de administrador
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
              <span className="inline-block mt-3 px-4 py-2 bg-white/20 rounded-full text-sm font-bold text-white">
                {formData.role}
              </span>
            </div>

            {/* Form Section */}
            <div className="p-8 md:p-12">
              <div className="space-y-6">
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

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Rol
                  </label>
                  <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                    {formData.role}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    El rol no puede ser modificado. Contacta a otro administrador.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 justify-center">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-all"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    Editar Perfil
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-8">
            <h3 className="text-3xl font-black text-slate-900 mb-6 text-center">
              Seguridad
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-all">
                Cambiar Contraseña
              </button>
              <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition-all">
                Configurar 2FA
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
  );
}
