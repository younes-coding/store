import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api/client';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, admin: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge any persistent localStorage auth so closing tab/browser forces re-login
  if (typeof window !== 'undefined') {
    localStorage.removeItem('lumiere_admin_token');
    localStorage.removeItem('lumiere_admin_user');
  }

  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('lumiere_admin_token'));
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = sessionStorage.getItem('lumiere_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiRequest('/admin/me');
        if (res.success && res.admin) {
          setAdmin(res.admin);
        }
      } catch (err) {
        console.error('Token validation error:', err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();

    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [token]);

  const login = (newToken: string, newAdmin: AdminUser) => {
    setToken(newToken);
    setAdmin(newAdmin);
    sessionStorage.setItem('lumiere_admin_token', newToken);
    sessionStorage.setItem('lumiere_admin_user', JSON.stringify(newAdmin));
    localStorage.removeItem('lumiere_admin_token');
    localStorage.removeItem('lumiere_admin_user');
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    sessionStorage.removeItem('lumiere_admin_token');
    sessionStorage.removeItem('lumiere_admin_user');
    localStorage.removeItem('lumiere_admin_token');
    localStorage.removeItem('lumiere_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
