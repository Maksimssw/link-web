import axios from "axios";

const options = {
  baseURL: 'http://localhost:4000',
  withCredentials: true,
  timeout: 10000,
};

export type ResultBoolean = { result: boolean };

const API = axios.create(options);

export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;

    if (status === 401)
      window.location.href = "/auth";

    return Promise.reject({
      ...data,
    });
  }
);

export default API;
