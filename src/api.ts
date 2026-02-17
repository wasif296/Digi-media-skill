import axios from "axios";

export interface RecordData {
  _id?: string;
  title?: string;
  category?: string;
  result?: string;
  imageUrl?: string;
  videoUrl?: string;
  link?: string;
}

export interface AdminCredentials {
  email: string;
  password?: string;
}

const API_URL = "https://digi-media-skill-backend.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60 second timeout for slow Render server
});

// Retry logic for failed requests
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || !config.__retryCount) {
      config.__retryCount = 0;
    }

    config.__retryCount += 1;

    if (config.__retryCount <= 1 && error.response?.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export const loginAdminApi = (credentials: AdminCredentials) =>
  api.post("/auth/login", credentials);

export const getProjects = () => api.get<RecordData[]>("/portfolio");

export const addProject = (data: RecordData) => api.post("/portfolio", data);

export const updateProject = (id: string, data: RecordData) =>
  api.put(`/portfolio/${id}`, data);

export const deleteProject = (id: string) => api.delete(`/portfolio/${id}`);

export const sendInquiryApi = (data: any) => api.post("/contact/send", data);

export default api;
