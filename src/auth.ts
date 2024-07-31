import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from './tokenStorage';
import { createClient, setGlobalClient } from './api';
import {
  LoaderFunctionArgs,
  LoaderFunction as RouterLoaderFunction,
  redirect,
} from 'react-router-dom';

interface AuthProvider {
  isAuthenticated: boolean;
  baseUrl: string | null;
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

  async login(baseUrl: string, password: string) {
    const client = createClient(baseUrl);
    const response = await client.authorize(password);
    tokenStorage.setToken(response.tokenString);
    tokenStorage.setBaseUrl(baseUrl);
    this.isAuthenticated = true;
    this.baseUrl = baseUrl;
    setGlobalClient(client);
  },
  logout() {
    tokenStorage.clear();
    this.isAuthenticated = false;
    this.baseUrl = null;
    setGlobalClient(null);
  },
  async checkAuth() {
    const token = tokenStorage.getToken();
    this.baseUrl = tokenStorage.getBaseUrl();

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
      tokenStorage.setToken(response.tokenString);
      return response.tokenString;
    } catch (error) {
      tokenStorage.clear();
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

export function protectedLoader(loader: LoaderFunction): RouterLoaderFunction {
  return async (args: LoaderFunctionArgs) => {
    const isAuthenticated = await authProvider.checkAuth();
    if (!isAuthenticated) {
      return redirect('/login');
    }
    return loader.length > 0
      ? (loader as RouterLoaderFunction)(args)
      : (loader as () => Promise<any>)();
  };
}
