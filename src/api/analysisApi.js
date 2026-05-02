import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000/api';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveAnalysisRecord = async (result) => {
  const response = await axios.post(`${API_BASE}/analysis`, result, {
    headers: authHeader(),
  });
  return response.data.recordId;
};

export const fetchAnalysisList = async () => {
  const response = await axios.get(`${API_BASE}/analysis`, {
    headers: authHeader(),
  });
  return response.data;
};

export const fetchAnalysisDetail = async (id) => {
  const response = await axios.get(`${API_BASE}/analysis/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const deleteAnalysisRecord = async (id) => {
  const response = await axios.delete(`${API_BASE}/analysis/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};
