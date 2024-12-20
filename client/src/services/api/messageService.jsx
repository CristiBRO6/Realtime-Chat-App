import httpClient from '@/services/api/httpClient';

const messageService = {
  getUsers: () => httpClient.get('/message/users'),
  getUser: (id) => httpClient.get(`/message/users${id}`),
  getGlobalMessages: () => httpClient.get('/message/'), 
  getMessages: (id) => httpClient.get(`/message/${id}`), 
  sendGlobalMessage: (messageData) => httpClient.post('/message/send', messageData),
  sendMessage: (id, messageData) => httpClient.post(`/message/send/${id}`, messageData),
};

export default messageService;