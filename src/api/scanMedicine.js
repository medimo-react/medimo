import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

/**
 * 이미지 파일을 서버로 보내 OCR + Gemini 약품명 추출을 실행
 * @param {File} imageFile
 * @returns {Promise<{ rawText: string, candidates: string[] }>}
 */
export const scanMedicineImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("이미지 파일이 없습니다.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post(`${API_BASE}/api/scan`, formData);

  return response.data;
};

/**
 * 약품명으로 의약품 정보 조회
 * @param {string} medicineName
 * @returns {Promise<Array>}
 */
export const fetchMedicineByName = async (medicineName) => {
  if (!medicineName) {
    return [];
  }

  const response = await axios.get(`${API_BASE}/api/medicine`, {
    params: {
      q: medicineName,
    },
  });

  return response.data;
};

/**
 * 이미지 스캔 후 추출된 약품명 후보로 의약품 정보까지 한번에 조회
 * @param {File} imageFile
 * @returns {Promise<{
 *   rawText: string,
 *   candidates: string[],
 *   medicineResults: Array<{ keyword: string, medicines: Array }>
 * }>}
 */
export const scanAndFetchMedicines = async (imageFile) => {
  const scanResult = await scanMedicineImage(imageFile);

  const { rawText, candidates = [] } = scanResult;

  if (candidates.length === 0) {
    return {
      rawText,
      candidates: [],
      medicineResults: [],
    };
  }

  const medicineResults = await Promise.all(
    candidates.map(async (name) => {
      const medicines = await fetchMedicineByName(name);

      return {
        keyword: name,
        medicines,
      };
    })
  );

  return {
    rawText,
    candidates,
    medicineResults,
  };
};