import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const scanMedicineImage = async (file) => {
  if (!file) {
    throw new Error("이미지 파일이 없습니다.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${API_BASE}/api/scan`, formData);

  return response.data;
};

export const fetchMedicineByName = async (name) => {
  if (!name) return [];

  const response = await axios.get(`${API_BASE}/api/medicine`, {
    params: { q: name },
  });

  return response.data;
};

export const fetchDurByProductName = async (name) => {
  if (!name) return [];

  const response = await axios.get(`${API_BASE}/api/dur/product`, {
    params: { name },
  });

  return response.data;
};

export const scanAndFetchMedicines = async (file) => {
  const scanResult = await scanMedicineImage(file);

  const { rawText, candidates = [] } = scanResult;

  const medicineResults = await Promise.all(
    candidates.map(async (name) => {
      const [medicines, durList] = await Promise.all([
        fetchMedicineByName(name),
        fetchDurByProductName(name),
      ]);

      return {
        keyword: name,
        medicines,
        durList,
      };
    })
  );

  return {
    rawText,
    candidates,
    medicineResults,
  };
};