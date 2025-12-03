'use client';

import React, { useState } from 'react';
import { TicketType } from '@/types';
import Button from '@/components/shared/Button';

interface TicketSelectorProps {
  ticketTypes: TicketType[];
  onAddToCart: (ticketTypeId: string, quantity: number) => void;
}

export default function TicketSelector({ ticketTypes, onAddToCart }: TicketSelectorProps) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (ticketTypeId: string, change: number) => {
    setQuantities(prev => {
      const currentQty = prev[ticketTypeId] || 0;
      const newQty = Math.max(0, currentQty + change);
      const ticketType = ticketTypes.find(t => t.id === ticketTypeId);
      const maxQty = ticketType?.available || 0;

      return {
        ...prev,
        [ticketTypeId]: Math.min(newQty, maxQty),
      };
    });
  };

  const handleAddToCart = (ticketTypeId: string) => {
    const quantity = quantities[ticketTypeId] || 0;
    if (quantity > 0) {
      onAddToCart(ticketTypeId, quantity);
      setQuantities(prev => ({ ...prev, [ticketTypeId]: 0 }));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Tickets</h3>

      {ticketTypes.map((ticketType) => {
        const quantity = quantities[ticketType.id] || 0;
        const total = quantity * ticketType.price;

        return (
          <div
            key={ticketType.id}
            className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* Ticket Info */}
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: ticketType.color || '#9333ea' }}
                  />
                  <h4 className="text-xl font-bold text-gray-900">{ticketType.name}</h4>
                </div>
                {ticketType.description && (
                  <p className="text-gray-600 text-sm mb-2">{ticketType.description}</p>
                )}
                <p className="text-3xl font-bold text-purple-600">${ticketType.price}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {ticketType.available} of {ticketType.quantity} available
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex flex-col items-end space-y-3">
                {ticketType.available > 0 ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleQuantityChange(ticketType.id, -1)}
                        disabled={quantity === 0}
                        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(ticketType.id, 1)}
                        disabled={quantity >= ticketType.available}
                        className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl text-white"
                      >
                        +
                      </button>
                    </div>

                    {quantity > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
                      </div>
                    )}

                    <Button
                      onClick={() => handleAddToCart(ticketType.id)}
                      disabled={quantity === 0}
                      variant="primary"
                    >
                      Add to Cart
                    </Button>
                  </>
                ) : (
                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold">
                    Sold Out
                  </div>
                )}
              </div>
            </div>

            {/* Availability Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    (ticketType.available / ticketType.quantity) > 0.5
                      ? 'bg-green-500'
                      : (ticketType.available / ticketType.quantity) > 0.2
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: `${(ticketType.available / ticketType.quantity) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
