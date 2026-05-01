import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;
const api = axios.create({ baseURL: API_BASE });

export const loginApi = (email, password) =>
  api.post('/auth/login', { email, password }).then(r => r.data);

export const signupApi = ({ email, name, phone, password }) =>
  api.post('/auth/register', { email, name, phone, password }).then(r => r.data);
