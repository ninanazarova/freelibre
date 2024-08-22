import { jwtDecode } from 'jwt-decode';
import { storage } from './storage';
import { createClient, setGlobalClient } from './api';
import {
  LoaderFunctionArgs,
  LoaderFunction as RouterLoaderFunction,
  redirect,
} from 'react-router-dom';

interface AuthProvider {
  isAuthenticated: boolean;
  baseUrl: string | null;
  demoLogin(): Promise<void>;
  login(baseUrl: string, password: string): Promise<void>;
  logout(): void;
  isTokenExpired(token: string): boolean;
  checkAuth(): Promise<boolean>;
  refreshToken(password: string): Promise<string | null>;
  decodeToken(token: string): JwtPayload;
}
type JwtPayload = { accessToken: string; iat: number; exp: number };

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  baseUrl: null,

  async demoLogin() {
    const client = createClient('demo', true);
    const response = await client.authorize('demo');
    storage.setToken(response.tokenString);
    storage.setBaseUrl('demo');
    this.isAuthenticated = true;
    this.baseUrl = 'demo';
    setGlobalClient(client);
  },

  async login(baseUrl: string, password: string) {
    const client = createClient(baseUrl);
    const response = await client.authorize(password);
    storage.setToken(response.tokenString);
    storage.setBaseUrl(baseUrl);
    this.isAuthenticated = true;
    this.baseUrl = baseUrl;
    setGlobalClient(client);
  },
  logout() {
    storage.clear();
    this.isAuthenticated = false;
    this.baseUrl = null;
    setGlobalClient(null);
  },
  async checkAuth() {
    const token = storage.getToken();
    this.baseUrl = storage.getBaseUrl();

    if (this.baseUrl == 'demo') {
      this.isAuthenticated = true;
      setGlobalClient(createClient(this.baseUrl, true));
      return true;
    }

    if (!token || !this.baseUrl) {
      this.isAuthenticated = false;
      return false;
    }

    if (this.isTokenExpired(token)) {
      const { accessToken: password } = this.decodeToken(token);
      const newToken = await this.refreshToken(password);
      if (!newToken) {
        this.isAuthenticated = false;
        return false;
      }
    }

    this.isAuthenticated = true;
    setGlobalClient(createClient(this.baseUrl));
    return true;
  },

  async refreshToken(password) {
    if (!this.baseUrl) {
      this.isAuthenticated = false;
      return null;
    }

    const client = createClient(this.baseUrl);
    try {
      const response = await client.authorize(password);
      storage.setToken(response.tokenString);
      return response.tokenString;
    } catch (error) {
      storage.clear();
      this.isAuthenticated = false;
      return null;
    }
  },

  isTokenExpired(token: string): boolean {
    const decodedToken: { exp: number } = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  },

  decodeToken(token: string): JwtPayload {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  },
};

type LoaderFunction = RouterLoaderFunction | (() => Promise<any>);

export function protectedLoader(loader?: LoaderFunction): RouterLoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    const isAuthenticated = await authProvider.checkAuth();
    if (!isAuthenticated) {
      return redirect('/login');
    }

    if (loader) {
      // Check if the loader is a function that expects arguments
      if (loader.length > 0) {
        return (loader as RouterLoaderFunction)(args);
      } else {
        // If the loader doesn't expect arguments, call it without args
        return (loader as () => Promise<any>)();
      }
    }

    return null;
  };
}
