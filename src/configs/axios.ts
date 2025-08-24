import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import env from "../env";
import { ROUTES } from "../constants";

export const Axios = axios.create({
  baseURL: env.API_PREFIX + env.API_URL,
  withCredentials: true,
});

const AxiosWithoutInterceptor = axios.create({
  baseURL: env.API_PREFIX + env.API_URL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestConfig["headers"];
    }
    return config as InternalAxiosRequestConfig;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await AxiosWithoutInterceptor.post(
          env.API_URL + env.API_PREFIX + "/auth/refresh"
        );

        localStorage.setItem("accessToken", response.data.accessToken);

        originalRequest.headers![
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        return Axios(originalRequest);
      } catch (err) {
        window.location.href = ROUTES.LOGIN;
      }
    }

    return Promise.reject(error);
  }
);
