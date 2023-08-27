import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001/',
  //baseURL: 'https://personal-finance-api.azurewebsites.net/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
