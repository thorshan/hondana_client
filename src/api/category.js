import axios from "axios";

const API_URL = "https://hondana.onrender.com/api/categories";

// CRUD
export const getCategories = () => axios.get(API_URL).then(res => res.data);
export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`).then(res => res.data);
export const createCategory = (data) => axios.post(API_URL, data).then(res => res.data);
export const updateCategory = (id, data) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);
export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
