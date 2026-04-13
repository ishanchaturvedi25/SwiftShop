import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Adjust the base URL as needed
  withCredentials: true
});