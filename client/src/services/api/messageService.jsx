import httpClient from '@/services/api/httpClient';

const messageService = {
  getUsers: () => httpClient.get('/message/users'),
  getGlobalMessages: () => httpClient.get('/message/'), 
  getMessages: (id) => httpClient.get(`/message/${id}`), 
  sendGlobalMessage: (messageData) => httpClient.post('/message/send', messageData),
  sendMessage: (id, messageData) => httpClient.post(`/message/send/${id}`, messageData),
};

export default messageService;