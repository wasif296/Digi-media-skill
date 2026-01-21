import axios from "axios";

export interface RecordData {
  _id?: string; 
  title: string;
  category: string;
  result: string;
  imageUrl: string;
  link: string;
}

export interface AdminCredentials {
  email: string;
  password?: string;
}
//test//

const API_URL = "https://digi-media-skill-backend.vercel.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const loginAdminApi = (credentials: AdminCredentials) => 
  api.post("/auth/login", credentials);

export const getProjects = () => api.get<RecordData[]>("/portfolio");

export const addProject = (data: RecordData) => 
  api.post("/portfolio", data);

export const updateProject = (id: string, data: RecordData) =>
  api.put(`/portfolio/${id}`, data);

export const deleteProject = (id: string) => 
  api.delete(`/portfolio/${id}`);

export const sendInquiryApi = (data: any) => api.post("/contact/send", data);


export default api;