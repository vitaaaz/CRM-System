import axios from 'axios';

const api = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  timeout: 5000,
});