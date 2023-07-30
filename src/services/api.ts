import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001/',
  //baseURL: 'https://personal-finance-api.azurewebsites.net/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const _error = error as AxiosError;
    console.error(_error.response?.data ?? _error.code);

    return Promise.reject(_error);
  }
);
