import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  hasCredentials: boolean;
  getBaseUrl: () => string | null;
  setBaseUrl: (url: string) => void;
  getRefreshToken: () => string | null;
  setRefreshToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasCredentials] = useState(
    localStorage.getItem('base_url') !== null && localStorage.getItem('refresh_token') !== null
  );

  const getBaseUrl = () => {
    return localStorage.getItem('base_url');
  };
  const setBaseUrl = (url: string) => {
    localStorage.setItem('base_url', url);
  };

  const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
  };
  const setRefreshToken = (token: string) => {
    localStorage.setItem('refresh_token', token);
  };

  const logout = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('base_url');
  };

  return (
    <AuthContext.Provider
      value={{ hasCredentials, getBaseUrl, setBaseUrl, getRefreshToken, setRefreshToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
