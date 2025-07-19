
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://share-bite-server-phi.vercel.app",
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;
