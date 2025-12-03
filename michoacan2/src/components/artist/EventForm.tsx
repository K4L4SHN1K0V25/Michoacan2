'use client';

import React, { useState } from 'react';
import Input from '@/components/shared/Input';
import Textarea from '@/components/shared/Textarea';
import Button from '@/components/shared/Button';

interface TicketTypeForm {
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
}

interface EventFormProps {
  initialData?: any;
  onSubmit: (data: any, isDraft: boolean) => void;
  isSubmitting?: boolean;
}

export default function EventForm({ initialData, onSubmit, isSubmitting }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    venueName: initialData?.venueName || '',
    venueAddress: initialData?.venueAddress || '',
    eventDate: initialData?.eventDate || '',
    eventTime: initialData?.eventTime || '',
    coverUrl: initialData?.coverUrl || '',
  });

  const [ticketTypes, setTicketTypes] = useState<TicketTypeForm[]>(
    initialData?.ticketTypes || [
      { name: '', description: '', price: 0, quantity: 0, color: '#9333ea' },
    ]
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        color: '#9333ea',
      },
    ]);
  };

  const removeTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  const updateTicketType = (index: number, field: keyof TicketTypeForm, value: any) => {
    const updated = [...ticketTypes];
    updated[index] = { ...updated[index], [field]: value };
    setTicketTypes(updated);
  };

  const handleSubmit = (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();

    // Combine date and time into ISO string
    const startDateTime = `${formData.eventDate}T${formData.eventTime}:00`;
    const endDateTime = `${formData.eventDate}T23:59:59`; // Default end time

    const eventData = {
      name: formData.title,
      description: formData.description,
      start_dt: startDateTime,
      end_dt: endDateTime,
      cover_url: formData.coverUrl || null,
      venue_id: null, // TODO: Implement venue selection or creation
      seated: false,
      ticket_types: ticketTypes.map(tt => ({
        name: tt.name,
        category: 'general',
        price: tt.price,
        quantity: tt.quantity,
      })),
    };

    onSubmit(eventData, isDraft);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
        <div className="space-y-4">
          <Input
            label="Event Title"
            placeholder="Summer Music Festival 2025"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
          <Textarea
            label="Description"
            placeholder="Describe your event..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={6}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Venue Name"
              placeholder="Central Park Amphitheater"
              value={formData.venueName}
              onChange={(e) => handleInputChange('venueName', e.target.value)}
              required
            />
            <Input
              label="Full Address"
              placeholder="123 Park Ave, New York, NY"
              value={formData.venueAddress}
              onChange={(e) => handleInputChange('venueAddress', e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Event Date"
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              required
            />
            <Input
              label="Event Time"
              type="time"
              value={formData.eventTime}
              onChange={(e) => handleInputChange('eventTime', e.target.value)}
              required
            />
          </div>
          <Input
            label="Cover Image URL (Optional)"
            placeholder="https://example.com/event-cover.jpg"
            value={formData.coverUrl}
            onChange={(e) => handleInputChange('coverUrl', e.target.value)}
          />
        </div>
      </div>

      {/* Ticket Types */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Ticket Types</h3>
          <Button type="button" onClick={addTicketType} variant="outline">
            + Add Ticket Type
          </Button>
        </div>

        <div className="space-y-6">
          {ticketTypes.map((ticket, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Ticket Type {index + 1}
                </h4>
                {ticketTypes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicketType(index)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Ticket Name"
                    placeholder="General Admission"
                    value={ticket.name}
                    onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ticket Color
                    </label>
                    <input
                      type="color"
                      value={ticket.color}
                      onChange={(e) => updateTicketType(index, 'color', e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <Textarea
                  label="Description (Optional)"
                  placeholder="What's included with this ticket..."
                  value={ticket.description}
                  onChange={(e) => updateTicketType(index, 'description', e.target.value)}
                  rows={2}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Price"
                    type="number"
                    step="0.01"
                    placeholder="75.00"
                    value={ticket.price || ''}
                    onChange={(e) => updateTicketType(index, 'price', parseFloat(e.target.value) || 0)}
                    required
                  />
                  <Input
                    label="Quantity"
                    type="number"
                    placeholder="500"
                    value={ticket.quantity || ''}
                    onChange={(e) => updateTicketType(index, 'quantity', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={(e: any) => handleSubmit(e, true)}
          disabled={isSubmitting}
        >
          Save as Draft
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Publish Event'}
        </Button>
      </div>
    </form>
  );
}
