import axios from "axios";

export const bookAPI = {
  getBook: () => {
    console.log(import.meta.env.VITE_API_URL);
    return axios.get(import.meta.env.VITE_API_URL + "/book");
  },
  getBookById: (id: string) => {
    return axios.get(import.meta.env.VITE_API_URL + "/book/" + id);
  },
  addBook: (data: any) => {
    return axios.post(import.meta.env.VITE_API_URL + "/book", data);
  },
  updateBook: (id: string, data: any) => {
    return axios.put(import.meta.env.VITE_API_URL + "/book/" + id, data);
  },
  deleteBook: (id: string) => {
    return axios.delete(import.meta.env.VITE_API_URL + "/book/" + id);
  },
  getBookByDate: (date: string) => {
    return axios.get(import.meta.env.VITE_API_URL + "/book/date/" + date);
  },
};