import axios from 'axios';
import { getToken, clearToken, storeToken} from '../pages/Auth/auth'; // Adjust the import path as necessary

const API_BASE_URL = 'http://localhost:8000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});