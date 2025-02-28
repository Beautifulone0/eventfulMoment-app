import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'https://eventful-moments-api.onrender.com/api/v1',
  });

  nuxtApp.provide('axios', api);
});