import axios from 'axios';
import {store} from "@/state/store";
import {clearToken} from "@/state/token/tokenSlice";

const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  timeout: 5000,
});


api.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    console.error("Ошибка загрузки данных:", error);
    throw error;
  }
);

//добавление заголовка в каждый запрос
api.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } /*else {
    store.dispatch(clearToken());
  }*/


  return config;
});

export default api;

/*
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // попробовать обновить токен
      // если не вышло → разлогинить пользователя
    }
    return Promise.reject(error);
  }
);*/
