import httpClient from '@/services/api/httpClient';

const accountService = {
  changeAvatar: (formData) => httpClient.post('/account/change-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }),
  deleteAvatar: () => httpClient.post('/account/delete-avatar'),
  changePassword: (data) => httpClient.post('/account/change-password', data),
  updateProfile: (data) => httpClient.post('/account/update-profile', data),
};

export default accountService;