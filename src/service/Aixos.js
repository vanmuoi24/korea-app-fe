import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response.data, // 👉 trả về trực tiếp data thay vì cả response
  (error) => {
    console.error("❌ API Error:", error.response?.status, error.message);

    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
