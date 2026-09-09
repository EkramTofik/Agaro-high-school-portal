import axios from "axios";

// Change this if your backend runs on a different port/host.
// In production, set this via an environment variable instead.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach the JWT to every request automatically, if the user is logged in.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If a token expires or is invalid, the backend returns 401.
// Clear stale credentials so the UI doesn't stay "logged in" incorrectly.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";
    if (
      status === 401 ||
      /jwt|token|log in again/i.test(message)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  },
);

export default api;

