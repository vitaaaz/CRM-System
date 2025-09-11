import axios from 'axios';

const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  timeout: 5000,
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Ошибка загрузки данных:", error);
    throw error;
  }
);

export default api;