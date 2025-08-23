import axios, { AxiosError } from "axios";
import env from "../env";

const Axios = axios.create({
  baseURL: env.API_PREFIX + env.API_URL,
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response && error.response?.status === 401) {
      try {
        return Axios.post(env.API_URL + env.API_PREFIX + "auth/refresh");
      } catch (err) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
