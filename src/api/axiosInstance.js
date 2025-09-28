import axios from 'axios';
import {tokenStorage} from "@/tokenStorage/tokenStorage";
import {getTokens} from "@/api/api";

const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  timeout: 5000,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // тут обновляем accessToken через refreshToken или разлогиниваем пользователя
      if (localStorage.getItem('refreshToken') !== null) {
        const response = await getTokens(localStorage.getItem('refreshToken'));
        tokenStorage.setToken(response.data.accessToken);
      } else {
        localStorage.removeItem("refreshToken");
        tokenStorage.clearToken();
      }
      console.log(error)
      console.log("Я словил 401!");
    }
    return Promise.reject(error);
  }
);

//добавление заголовка в каждый запрос
api.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;

