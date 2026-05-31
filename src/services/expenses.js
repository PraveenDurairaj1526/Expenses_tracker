import axios from "axios";
import { API_BASE_URL, PAGINATION_COUNT } from "../siteConfig";

const API = axios.create({
    baseURL: `${API_BASE_URL}/expenses`,
    headers: {
        "Content-Type": "application/json"
    }
})

export const fetchExpenses = (page, search) => API.get(`/?q=${search}&_page=${page}&_limit=${PAGINATION_COUNT}`)
export const fetchAllExpenses = () => API.get('/')
export const getExpenses = (id) => API.get(`/${id}`)
export const postExpenses = (data) => API.post(`/`, data)
export const deleteExpenses = (id) => API.delete(`/${id}`)
export const updateExpenses = (id, data) => API.put(`/${id}`, data)