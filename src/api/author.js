import axios from "axios";

const API_URL = "https://hondana.onrender.com/api/authors";

// CRUD
export const getAuthors = () => axios.get(API_URL).then(res => res.data);
export const getAuthorById = (id) => axios.get(`${API_URL}/${id}`).then(res => res.data);
export const createAuthor = (data) => axios.post(API_URL, data).then(res => res.data);
export const updateAuthor = (id, data) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteAuthor = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
