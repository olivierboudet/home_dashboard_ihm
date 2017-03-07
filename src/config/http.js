import { temperatureResource } from 'src/util/resources';

// Request interceptor
temperatureResource.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.log('RequestError: ', error);
  // Do something with request error
  return Promise.reject(error);
});

// Response interceptor
temperatureResource.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log('ResponseError: ', error);
  // Do something with response error
  return Promise.reject(error);
});
