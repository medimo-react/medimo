import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// AI 분석 내역 리스트 핀 고정
export const toggleAnalysisPin = async ({id}) => {
  const response = await axios.patch(`${API_BASE}/analysis/${id}/pin`, {

  }, {headers: authHeader()});
  return response.data;
};