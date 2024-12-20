import axios from 'axios';

const httpClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

httpClient.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err)
);

export default httpClient;
