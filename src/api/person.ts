import axios from "axios";

export const personAPI = {
  getPerson: () => {
    console.log(import.meta.env.VITE_API_URL);
    return axios.get(import.meta.env.VITE_API_URL + "/person");
  },
  getPersonById: (id: string) => {
    return axios.get(import.meta.env.VITE_API_URL + "/person/" + id);
  },
  addPerson: (data: any) => {
    return axios.post(import.meta.env.VITE_API_URL + "/person", data);
  },
  updatePerson: (id: string, data: any) => {
    return axios.put(import.meta.env.VITE_API_URL + "/person/" + id, data);
  },
  deletePerson: (id: string) => {
    return axios.delete(import.meta.env.VITE_API_URL + "/person/" + id);
  },
  getPersonByDate: (date: string) => {
    return axios.get(import.meta.env.VITE_API_URL + "/person/date/" + date);
  },
};