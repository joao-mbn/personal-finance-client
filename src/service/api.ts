import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://personal-finance-api.azurewebsites.net/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
