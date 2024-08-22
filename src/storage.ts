import dayjs from 'dayjs';

export const storage = {
  getToken: (): string | null => {
    return getCookie('jwt_token');
  },
  setToken: (token: string): void => {
    setCookie('jwt_token', token, 7);
  },
  removeToken: (): void => {
    deleteCookie('jwt_token');
  },
  getBaseUrl: (): string | null => {
    return localStorage.getItem('base_url');
  },
  setBaseUrl: (baseUrl: string): void => {
    localStorage.setItem('base_url', baseUrl);
  },
  removeBaseUrl: (): void => {
    localStorage.removeItem('base_url');
  },
  clear: (): void => {
    storage.removeBaseUrl();
    storage.removeToken();

    localStorage.removeItem('entries');
  },
};

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  const expires = dayjs().add(days, 'day').toDate().toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Strict;Secure;`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=${dayjs().subtract(1, 'day').toDate().toUTCString()};path=/`;
}
