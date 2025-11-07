import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8000" });

API.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use((res) => res, async (err) => {
  const originalReq = err.config;
  if (err.response && err.response.status === 401 && !originalReq._retry) {
    if (isRefreshing) {
      // queue the request until refresh finished
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalReq.headers.Authorization = 'Bearer ' + token;
        return API(originalReq);
      }).catch((e) => Promise.reject(e));
    }

    originalReq._retry = true;
    isRefreshing = true;

    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      isRefreshing = false;
      return Promise.reject(err);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/token/refresh/', { refresh });
      const newAccess = response.data.access;
      localStorage.setItem('access', newAccess);
      API.defaults.headers.common['Authorization'] = 'Bearer ' + newAccess;
      processQueue(null, newAccess);
      originalReq.headers.Authorization = 'Bearer ' + newAccess;
      return API(originalReq);
    } catch (e) {
      processQueue(e, null);
      // logout user if refresh fails
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      isRefreshing = false;
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
  return Promise.reject(err);
});

export default API;
