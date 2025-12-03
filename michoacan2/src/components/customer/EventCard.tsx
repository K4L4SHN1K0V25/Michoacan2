import React from 'react';
import Link from 'next/link';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const lowestPrice = Math.min(...event.ticketTypes.map(t => t.price));
  const availability = ((event.totalCapacity - event.soldTickets) / event.totalCapacity) * 100;

  return (
    <Link href={`/customer/events/${event.id}`}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-300">
        {/* Event Image */}
        <div className="relative h-56 bg-gradient-to-br from-blue-400 to-indigo-400">
          {event.images.flyer ? (
            <img
              src={event.images.flyer}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white text-2xl font-bold">
              {event.title}
            </div>
          )}

          {/* Status Badge */}
          {availability < 20 && availability > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              Almost Sold Out!
            </div>
          )}
          {availability === 0 && (
            <div className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              Sold Out
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-7">
          {/* Date */}
          <div className="flex items-center text-blue-600 text-sm font-bold mb-3">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3 line-clamp-2">
            {event.title}
          </h3>

          {/* Artist */}
          <div className="flex items-center mb-3">
            {event.images.artistIcon ? (
              <img
                src={event.images.artistIcon}
                alt={event.artistName}
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                <span className="text-blue-700 font-semibold text-sm">
                  {event.artistName.charAt(0)}
                </span>
              </div>
            )}
            <span className="text-gray-600 text-sm">{event.artistName}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.venue}
          </div>

          {/* Price & Availability */}
          <div className="flex items-center justify-between pt-5 border-t-2 border-gray-100 mt-4">
            <div>
              <span className="text-gray-500 text-sm font-semibold">From</span>
              <p className="text-3xl font-extrabold text-blue-600">${lowestPrice}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-semibold mb-1">
                {event.totalCapacity - event.soldTickets} tickets left
              </p>
              <div className="w-28 bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    availability > 50 ? 'bg-green-500' : availability > 20 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${availability}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
