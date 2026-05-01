import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const getToken = () => {
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
};

const authHeaders = () => {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

// 분석 내역 저장
export const createAnalysisHistory = async (analysisResult) => {
  const response = await axios.post(
    `${API_BASE}/api/analysis`,
    analysisResult,
    {
      headers: authHeaders(),
    }
  );

  return response.data;
};

// 분석 내역 목록 조회
export const getAnalysisHistories = async () => {
  const response = await axios.get(`${API_BASE}/api/analysis`, {
    headers: authHeaders(),
  });

  return response.data;
};

// 분석 내역 상세 조회
export const getAnalysisHistoryById = async (id) => {
  const response = await axios.get(`${API_BASE}/api/analysis/${id}`, {
    headers: authHeaders(),
  });

  return response.data;
};