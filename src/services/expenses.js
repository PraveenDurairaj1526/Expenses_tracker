import axios from "axios";
import { PAGINATION_COUNT } from "../siteConfig";

const API = axios.create({
    baseURL: 'http://localhost:4000/expenses',
    headers: {
        "Content-Type": "application/json"
    }
})

export const fetchExpenses = (page) => API.get(`/?_page=${page}&_limit=${PAGINATION_COUNT}`)
export const getExpenses = (id) => API.get(`/${id}`)
export const postExpenses = (data) => API.post(`/`, data)
export const deleteExpenses = (id) => API.delete(`/${id}`)
export const updateExpenses = (id, data) => API.put(`/${id}`, data)