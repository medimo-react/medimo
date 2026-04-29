import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;
const getToken = () => localStorage.getItem('token');

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(config => {
  // config.headers.Authorization = `Bearer ${getToken()}`;
  config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWU4Nzg0NGUwMzg4NmE0M2U2ZjEyZjgiLCJpYXQiOjE3Nzc0NTY4MTMsImV4cCI6MTc3ODA2MTYxM30.Bu32xSqqrato1sT-SvvoHvsMZ5uk3-5huCAne0swbfo'
  return config;
});

export const getBookmarks = () => api.get('/bookmarks').then(r => r.data);

export const addBookmark = (id, folder) =>
  api.post('/bookmarks', { id, folder }).then(r => r.data);

export const updateBookmark = (id, patch) =>
  api.patch(`/bookmarks/${id}`, patch).then(r => r.data);

export const deleteBookmark = (id) =>
  api.delete(`/bookmarks/${id}`).then(r => r.data);
