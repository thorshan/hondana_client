import axios from "axios";

const API_URL = "https://hondana.onrender.com/api/books";

// CRUD
export const getBooks = () => axios.get(API_URL).then(res => res.data);
export const getBookById = (id) => axios.get(`${API_URL}/${id}`).then(res => res.data);
export const createBook = (data) => axios.post(API_URL, data).then(res => res.data);
export const updateBook = (id, data) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
