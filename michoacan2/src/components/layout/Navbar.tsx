'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';

interface NavbarProps {
  userRole?: 'admin' | 'artist' | 'customer';
  isLoggedIn?: boolean;
}

export default function Navbar({ userRole: propUserRole, isLoggedIn: propIsLoggedIn }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  // Use auth context if available, otherwise use props
  const isLoggedIn = user ? true : (propIsLoggedIn ?? false);
  const userRole = user?.role || propUserRole;

  const getNavLinks = () => {
    if (!isLoggedIn) {
      return [
        { href: '/customer', label: 'Events' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ];
    }

    switch (userRole) {
      case 'admin':
        return [
          { href: '/admin', label: 'Dashboard' },
          { href: '/admin/events', label: 'All Events' },
          { href: '/admin/users', label: 'Users' },
          { href: '/admin/reports', label: 'Reports' },
        ];
      case 'artist':
        return [
          { href: '/artist', label: 'Dashboard' },
          { href: '/artist/events', label: 'My Events' },
          { href: '/artist/create', label: 'Create Event' },
          { href: '/artist/analytics', label: 'Analytics' },
        ];
      case 'customer':
        return [
          { href: '/customer', label: 'Events' },
          { href: '/customer/my-tickets', label: 'My Tickets' },
          { href: '/customer/profile', label: 'Profile' },
          { href: '/contact', label: 'Contact' },
          { href: '/about', label: 'About' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0" style={{ width: '200px' }}>
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-2xl">T</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 hidden sm:block">TicketFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3 flex-shrink-0 justify-end" style={{ width: '200px' }}>
            {/* Shopping Cart (for customers) */}
            {(!isLoggedIn || userRole === 'customer') && (
              <button className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* User Menu or Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
                >
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl py-2 border border-slate-100">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-semibold text-slate-900">{user?.name || 'User'}</p>
                      <p className="text-sm text-slate-600">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
                        {userRole?.toUpperCase()}
                      </span>
                    </div>
                    <Link
                      href={`/${userRole}/profile`}
                      className="block px-4 py-3 text-slate-800 hover:bg-blue-50 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href={`/${userRole}/settings`}
                      className="block px-4 py-3 text-slate-800 hover:bg-blue-50 transition-colors"
                    >
                      Settings
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link href="/login">
                  <button className="px-5 py-2.5 text-blue-600 font-medium hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="pt-4 space-y-2 sm:hidden">
                <Link href="/login" className="block">
                  <button className="w-full px-4 py-3 text-blue-600 font-medium hover:bg-blue-50 transition-colors rounded-lg border border-blue-200">
                    Login
                  </button>
                </Link>
                <Link href="/register" className="block">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
