import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || err.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const contactApi = (data: { name: string; email: string; phone?: string; message: string }) =>
  api.post('/api/contact', data);

export const trialApi = (data: { name: string; email: string; phone: string; goal?: string }) =>
  api.post('/api/trial', data);

export const leadApi = (data: { name: string; email: string; phone: string; goal?: string }) =>
  api.post('/api/leads', data);

export const getPlansApi = () => api.get('/api/plans').then((r) => r.data.data);

export const getTrainersApi = () => api.get('/api/trainers').then((r) => r.data.data);

export const getGalleryApi = () => api.get('/api/gallery').then((r) => r.data.data);

export const getReviewsApi = () => api.get('/api/reviews').then((r) => r.data);

export const getTestimonialsApi = () => api.get('/api/testimonials').then((r) => r.data.data);
