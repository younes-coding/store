const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = sessionStorage.getItem('lumiere_admin_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      sessionStorage.removeItem('lumiere_admin_token');
      sessionStorage.removeItem('lumiere_admin_user');
      localStorage.removeItem('lumiere_admin_token');
      localStorage.removeItem('lumiere_admin_user');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    throw new Error(data.message || `API Request failed with status ${response.status}`);
  }

  return data;
}
