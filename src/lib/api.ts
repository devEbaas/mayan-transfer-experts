import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${rawBaseUrl.replace(/\/$/, '')}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

// Backend wraps every success response as { data: T }; unwrap it once here
// so callers can treat `response.data` as T directly.
api.interceptors.response.use((response) => {
  response.data = response.data?.data;
  return response;
});

export interface ApiErrorPayload {
  message: string | string[];
  statusCode: number;
}

export function extractApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiErrorPayload>(error) && error.response?.data?.message) {
    const { message } = error.response.data;
    return Array.isArray(message) ? message.join(' ') : message;
  }
  return fallback;
}
