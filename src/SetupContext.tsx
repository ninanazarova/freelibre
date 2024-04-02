import React, { createContext, useContext, useState } from 'react';
import client, { Client } from './api';

interface AuthContextProps {
  isAuthenticated: boolean;
  client: Client | null;
  loginUser: (token: string, url: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('access_token') !== null && localStorage.getItem('base_url') !== null
  );

  const loginUser = async (accessToken: string, baseUrl: string) => {
    client.setAuth({ accessToken, baseUrl });
    try {
      const authToken = await client.authorize();
      if (authToken) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      throw new Error('Authorisation failed');
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ client, isAuthenticated, loginUser, logoutUser }}>
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
