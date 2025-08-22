import {jwtDecode} from 'jwt-decode';

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getTokenData = (token: string) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};
