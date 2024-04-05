import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  hasCredentials: boolean;
  setToLocalStorage: (url: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasCredentials] = useState(
    localStorage.getItem('base_url') !== null && localStorage.getItem('refresh_token') !== null
  );

  const setToLocalStorage = (url: string, token: string) => {
    localStorage.setItem('base_url', url);
    localStorage.setItem('refresh_token', token);
  };

  const logout = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('base_url');
  };

  return (
    <AuthContext.Provider value={{ hasCredentials, setToLocalStorage, logout }}>
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
