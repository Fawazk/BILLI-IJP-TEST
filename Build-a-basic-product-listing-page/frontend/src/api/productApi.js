// /src/api/productApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/products/';

export const fetchProducts = (params) => axios.get(BASE_URL, { params });
export const createProduct = (data) => axios.post(BASE_URL, data);
export const updateProduct = (id, data) => axios.put(`${BASE_URL}${id}/`, data);
export const deleteProduct = (id) => axios.delete(`${BASE_URL}${id}/`);