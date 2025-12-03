// Mock authentication system with test users

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'artist' | 'customer';
  avatar?: string;
}

// Test users - hardcoded for demo purposes
export const TEST_USERS: { [key: string]: AuthUser & { password: string } } = {
  'customer@test.com': {
    id: 'customer-1',
    name: 'John Customer',
    email: 'customer@test.com',
    password: 'customer123',
    role: 'customer',
  },
  'artist@test.com': {
    id: 'artist-1',
    name: 'Maria Artist',
    email: 'artist@test.com',
    password: 'artist123',
    role: 'artist',
  },
  'admin@test.com': {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
  },
};

export function authenticateUser(email: string, password: string): AuthUser | null {
  const user = TEST_USERS[email];

  if (!user) {
    return null;
  }

  if (user.password !== password) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function getUserFromStorage(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  const userJson = localStorage.getItem('ticketflow_user');
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function saveUserToStorage(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ticketflow_user', JSON.stringify(user));
}

export function clearUserFromStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('ticketflow_user');
}
