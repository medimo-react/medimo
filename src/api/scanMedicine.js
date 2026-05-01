import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

const getErrorInfo = (error) => ({
  message: error.message,
  status: error.response?.status,
  data: error.response?.data,
  url: error.config?.url,
  params: error.config?.params,
});

export const scanMedicineImage = async (file) => {
  if (!file) {
    throw new Error("이미지 파일이 없습니다.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${API_BASE}/api/scan`, formData, {
    timeout: 60000,
  });

  return response.data;
};

export const fetchMedicineByName = async (name) => {
  if (!name) return [];

  try {
    const response = await axios.get(`${API_BASE}/api/medicine`, {
      params: { q: name },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error(`[의약품 조회 실패] ${name}`, getErrorInfo(error));
    return [];
  }
};

export const fetchDurByProductName = async (name) => {
  if (!name) return [];

  try {
    const response = await axios.get(`${API_BASE}/api/dur/product`, {
      params: { name },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error(`[DUR 조회 실패] ${name}`, getErrorInfo(error));
    return [];
  }
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

      // const medicine = medicines?.[0];

      // const summary = medicine
      //   ? await fetchMedicineSummary({ medicine, durList })
      //   : "";
      const summary = "";

      return {
        keyword: name,
        medicines,
        durList,
        summary,
      };
    })
  );

  return {
    rawText,
    candidates,
    medicineResults,
  };
};

export const fetchMedicineSummary = async ({ medicine, durList }) => {
  if (!medicine) return "";

  try {
    const response = await axios.post(`${API_BASE}/api/summary/medicine`, {
      medicine,
      durList,
    });

    return response.data.summary || "";
  } catch (error) {
    console.error("[요약 조회 실패]", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return "";
  }
};