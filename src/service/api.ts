import axios from 'axios';
const { VITE_API_BASE_URL } = import.meta.env;

export const api = axios.create({
  baseURL: 'https://personal-finance-api.azurewebsites.net/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
