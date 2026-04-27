import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;
const getToken = () => localStorage.getItem('token');

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getBookmarks = () => api.get('/bookmarks').then(r => r.data);

export const addBookmark = (id, folder) =>
  api.post('/bookmarks', { id, folder }).then(r => r.data);

export const updateBookmark = (id, patch) =>
  api.patch(`/bookmarks/${id}`, patch).then(r => r.data);

export const deleteBookmark = (id) =>
  api.delete(`/bookmarks/${id}`).then(r => r.data);