import axios from "axios";

export const planAPI = {
  getPlan: () => {
    return axios.get(import.meta.env.VITE_API_URL + "/plan");
  },
  getPlanById: (id: string) => {
    return axios.get(import.meta.env.VITE_API_URL + "/plan/" + id);
  },
  addPlan: (data: any) => {
    return axios.post(import.meta.env.VITE_API_URL + "/plan", data);
  },
  updatePlan: (id: string, data: any) => {
    return axios.put(import.meta.env.VITE_API_URL + "/plan/" + id, data);
  },
  deletePlan: (id: string) => {
    return axios.delete(import.meta.env.VITE_API_URL + "/plan/" + id);
  },
  getPlanByDate: (date: string) => {
    return axios.get(import.meta.env.VITE_API_URL + "/plan/date/" + date);
  },
};
