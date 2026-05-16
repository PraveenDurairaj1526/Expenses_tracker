import axios from "axios";
import { PAGINATION_COUNT } from "../siteConfig";
const API = axios.create({
    baseURL: 'http://localhost:4000/category',
    headers: {
        "Content-Type": 'application/json'
    }
})

export const fetchTableCategory = (page = 1, search = '') => API.get(`/?q=${search}&_page=${page}&_limit=${PAGINATION_COUNT}`);
export const fetchAllCategory = () => API.get('/');
export const fetchCategory = (id) => API.get(`/${id}`);
export const postCategory = (data) => API.post('/', data);
export const updateCategory = (id, data) => API.put(`/${id}`, data);
export const deleteCategory = (id) => API.delete(`/${id}`);