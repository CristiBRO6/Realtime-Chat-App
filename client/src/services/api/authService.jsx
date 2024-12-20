import httpClient from '@/services/api/httpClient';

const authService = {
  register: (data) => httpClient.post('/auth/register', data),
  login: (data) => httpClient.post('/auth/login', data), 
  forgotPassword: (data) => httpClient.post('/auth/forgot-password', data),
  resendCode: (id) => httpClient.post('/auth/resend-code', id),
  resetPassword: (id, data) => httpClient.post('/auth/reset-password', { id, ...data }),
  emailVerification: (id, data) => httpClient.post('/auth/email-verification', { id, ...data }),
  logout: () => httpClient.get('/auth/logout'),
};

export default authService;