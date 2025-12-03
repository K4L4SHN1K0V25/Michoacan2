'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/shared/Button';
import { getArtistProfile, updateArtistProfile } from '@/lib/api';

export default function ArtistProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact_email: '',
    bio: '',
    genre: '',
    photo_url: '',
  });

  // TODO: Replace with actual logged-in artist ID from auth context
  const ARTIST_ID = 1;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getArtistProfile(ARTIST_ID);
        if (response.success && response.data) {
          setFormData({
            name: response.data.name || '',
            contact_email: response.data.contact_email || '',
            bio: response.data.bio || '',
            genre: response.data.genre || '',
            photo_url: response.data.photo_url || '',
          });
        } else {
          setError(response.error || 'Failed to load profile');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const response = await updateArtistProfile(ARTIST_ID, formData);
      if (response.success) {
        setIsEditing(false);
      } else {
        setError(response.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Sidebar role="artist" />

        <main className="flex-1 p-8 md:p-12 lg:p-16 mx-auto max-w-5xl w-full">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4">
              Mi Perfil
            </h1>
            <p className="text-xl md:text-2xl text-slate-600">
              Administra tu información de artista
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Avatar Section */}
            {loading ? (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Cargando perfil...</p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
                <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-5xl font-black text-blue-600">
                    {formData.name.charAt(0) || 'A'}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">
                  {formData.name || 'Artist Name'}
                </h2>
                <p className="text-blue-100 text-lg">{formData.contact_email || 'No email'}</p>
              </div>
            )}

            {/* Form Section */}
            <div className="p-8 md:p-12">
              {error && (
                <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Nombre Artístico
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
                      {formData.name || 'No name set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email de Contacto
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                      {formData.contact_email || 'No email set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Biografía
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                      {formData.bio}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Género Musical
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Rock</option>
                      <option>Pop</option>
                      <option>Jazz</option>
                      <option>Clásica</option>
                      <option>Electrónica</option>
                      <option>Regional</option>
                      <option>Otro</option>
                    </select>
                  ) : (
                    <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                      {formData.genre}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    URL de Foto
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.photo_url}
                      onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-lg text-slate-900 px-4 py-3 bg-slate-50 rounded-lg">
                      {formData.photo_url || 'No photo URL set'}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 justify-center">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="lg" disabled={saving}>
                      {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      size="lg"
                      disabled={saving}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} size="lg" disabled={loading}>
                    Editar Perfil
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
