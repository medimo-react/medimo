import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({ baseURL: API_BASE });

export const ocrScan = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/api/scan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.rawText ?? '';
};
