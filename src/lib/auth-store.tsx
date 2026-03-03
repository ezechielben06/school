"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { User, Role } from './types';
import { MOCK_STUDENT, MOCK_PROFESSOR } from './mock-data';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('scholadesk_role') as Role;
    if (savedRole) {
      setUser(savedRole === 'student' ? MOCK_STUDENT : MOCK_PROFESSOR);
      setRole(savedRole);
    }
    setIsLoading(false);
  }, []);

  const login = (newRole: Role) => {
    const newUser = newRole === 'student' ? MOCK_STUDENT : MOCK_PROFESSOR;
    setUser(newUser);
    setRole(newRole);
    localStorage.setItem('scholadesk_role', newRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('scholadesk_role');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
