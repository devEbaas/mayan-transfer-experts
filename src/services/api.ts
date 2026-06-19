import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const routesApi = {
  getAll: () => api.get('/routes'),
};

export const vehiclesApi = {
  getByRoute: (originId: number, destinationId: number) =>
    api.get('/vehicles', { params: { originId, destinationId } }),
};

export const bookingsApi = {
  create: (data: unknown) => api.post('/bookings', data),
  getById: (id: string) => api.get(`/bookings/${id}`),
};

export const paymentsApi = {
  createStripeIntent: (bookingId: string) =>
    api.post('/payments/stripe/intent', { bookingId }),
  createPaypalOrder: (bookingId: string) =>
    api.post('/payments/paypal/order', { bookingId }),
};
