import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// Función para iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await api.post("/login/", { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener el token de acceso
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

// Función para obtener el token de refresco
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

// Función para refrescar el token de acceso
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) throw new Error("No refresh token available");
    const response = await api.post("/token/refresh/", { refresh: refreshToken });
    const { access } = response.data;
    localStorage.setItem(ACCESS_TOKEN, access);
    return access;
  } catch (error) {
    throw error;
  }
};

// Interceptor para añadir el token de acceso a las solicitudes
api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
