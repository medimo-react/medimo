const API_BASE = import.meta.env.VITE_API_BASE;
const getToken = () => localStorage.getItem('token');

const apiFetch = (path, options = {}) =>
  fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      // Authorization: `Bearer ${getToken()}`,
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWU4Nzg0NGUwMzg4NmE0M2U2ZjEyZjgiLCJpYXQiOjE3NzY4NDkxNTYsImV4cCI6MTc3NzQ1Mzk1Nn0.o7ZDEJT_C8usp58HuuVFNQoP8Ip9k1WQx0SPF9bP5FA',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).then(r => r.json());

export const getBookmarks = () => apiFetch('/bookmarks');

export const addBookmark = (id, folder) =>
  apiFetch('/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ id, folder }),
  });

export const updateBookmark = (id, patch) =>
  apiFetch(`/bookmarks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });

export const deleteBookmark = (id) =>
  apiFetch(`/bookmarks/${id}`, { method: 'DELETE' });
