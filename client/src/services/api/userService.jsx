import httpClient from '@/services/api/httpClient';

const userService = {
  getProfile: () => httpClient.get(`/users/profile`),
  getResetPassword: (id) => httpClient.get(`/users/resetPassword/${id}`),
  getEmailVerification: (id) => httpClient.get(`/users/emailVerification/${id}`),
};

export default userService;