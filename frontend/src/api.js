import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/choreo-apis/awbo/backend/rest-api-be2/v1.0",
  withCredentials: true, // Incluye las credenciales en las solicitudes
});

// Función para establecer una cookie
const setCookie = (name, value, options = {}) => {
let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

// Opciones de configuración de la cookie
if (options.expires) {
  cookieString += `; expires=${options.expires.toUTCString()}`;
}
if (options.path) {
  cookieString += `; path=${options.path}`;
}
if (options.secure) {
  cookieString += `; secure`;
}
if (options.httponly) {
  cookieString += `; HttpOnly`;
}
if (options.samesite) {
  cookieString += `; SameSite=${options.samesite}`;
}

document.cookie = cookieString;
};

// Función para leer una cookie por nombre
const getCookieValue = (name) => {
const nameEQ = `${encodeURIComponent(name)}=`;
const cookies = document.cookie.split(';');
for (let i = 0; i < cookies.length; i++) {
  let cookie = cookies[i];
  while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
  if (cookie.indexOf(nameEQ) === 0) return decodeURIComponent(cookie.substring(nameEQ.length));
}
return null;
};

api.interceptors.request.use(
config => {
  const token = getCookieValue('sigs_cookie');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
},
error => {
  return Promise.reject(error);
}
);


// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = getCookie('refresh_token');
//       console.log('Token de refresco obtenido de las cookies:', refreshToken);
//       if (refreshToken) {
//         try {
//           // Crear una nueva instancia de axios para la solicitud de refresco
//           const refreshApi = axios.create({
//             baseURL: api.defaults.baseURL,
//             withCredentials: true,
//           });

//           // Enviar solo el token de refresco
//           const refreshResponse = await refreshApi.post("/api/token/refresh/", { refresh: refreshToken });
//           console.log('Respuesta de la solicitud de refresco:', refreshResponse.data);

//           // Actualizar el token de acceso y continuar con la solicitud original
//           const newAccessToken = refreshResponse.data.access;
//           document.cookie = `sigs_cookie=${newAccessToken};path=/;secure;httponly;samesite=Strict`;
//           originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           console.error('Error al refrescar el token:', refreshError.response.data);
//           return Promise.reject(refreshError);
//         }
//       } else {
//         console.error('No se encontró el token de refresco en las cookies');
//       }
//     }
//     return Promise.reject(error);
//   }
// );



export const login = async (username, password) => {
  try {
    const response = await api.post("/api/token/", { username, password });
    const user = response.data.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};

// Función para obtener la lista de personas
export const fetchPersonas = async () => {
  try {
    const response = await api.get("/api/personas/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para crear una nueva persona
export const createPersonas = async (newPersonData) => {
  try {
    const formattedData = {
      ...newPersonData,
      id_centro_costo: parseInt(newPersonData.id_centro_costo, 10),
      id_area: parseInt(newPersonData.id_area, 10),
      id_region: parseInt(newPersonData.id_region, 10),
      id_cargo: parseInt(newPersonData.id_cargo, 10),
      id_estado_persona: parseInt(newPersonData.id_estado_persona, 10),
    };

    const response = await api.post("/api/personas/", formattedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;