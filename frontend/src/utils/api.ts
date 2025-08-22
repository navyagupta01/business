const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

export const get = (endpoint: string) => apiCall(endpoint);

export const post = (endpoint: string, data: any) =>
  apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const put = (endpoint: string, data: any) =>
  apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const del = (endpoint: string) =>
  apiCall(endpoint, { method: 'DELETE' });
