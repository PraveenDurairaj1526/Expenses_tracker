import axios from "axios";
import { API_BASE_URL, PAGINATION_COUNT } from "../siteConfig";
const API = axios.create({
    baseURL: `${API_BASE_URL}/income`
})

export const fetchAllIncome = () => API.get('/')
export const fetchIncome = (page,search) => API.get(`/?q=${search}&_page=${page}&_limit=${PAGINATION_COUNT}`)
export const addIncome = (data) => API.post('/', data)