import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

const getErrorInfo = (error) => ({
  message: error.message,
  status: error.response?.status,
  data: error.response?.data,
  url: error.config?.url,
  params: error.config?.params,
});

const getShortMedicineName = (name = "") => {
  return String(name).split("(")[0].trim();
};

const shortenText = (text = "", maxLength = 100) => {
  const value = String(text || "")
    .replace(/\s+/g, " ")
    .trim();

  if (value.length <= maxLength) return value;

  return `${value.slice(0, maxLength)}...`;
};

const createFallbackCautionSummary = (item) => {
  const medicine = item.medicines?.[0];
  const name = getShortMedicineName(medicine?.name || item.keyword);

  if (!medicine) {
    return `${name}의 의약품 정보를 확인하지 못했습니다.`;
  }

  const firstDur = item.durList?.[0];
  const relatedIngredient =
    firstDur?.relatedIngredientKor || firstDur?.relatedIngredientEng;

  if (relatedIngredient) {
    return `${name}은 ${relatedIngredient} 성분과 함께 복용 주의가 필요합니다.`;
  }

  if (medicine.source === "permit") {
    return `${name}은 제품 허가정보 기준으로 조회되었습니다. 복용법과 부작용은 처방전 또는 약사 안내를 확인하세요.`;
  }

  if (medicine.caution) {
    return shortenText(medicine.caution, 120);
  }

  return `${name}의 복용 전 주의사항을 확인해 주세요.`;
};

const createCompactCautionPayload = (medicineResults = []) => {
  return medicineResults
    .map((item, index) => {
      const medicine = item.medicines?.[0];

      if (!medicine) return null;

      const durWarnings = [
        ...new Map(
          (item.durList || []).map((dur) => {
            const relatedIngredient =
              dur.relatedIngredientKor ||
              dur.relatedIngredientEng ||
              "성분명 정보 없음";

            const reason = dur.content || "병용금기 정보가 확인되었습니다.";
            const key = `${relatedIngredient}-${reason}`;

            return [
              key,
              {
                relatedIngredient,
                reason: shortenText(reason, 80),
              },
            ];
          }),
        ).values(),
      ].slice(0, 2);

      return {
        id: String(index),
        keyword: item.keyword,
        name: getShortMedicineName(medicine.name || item.keyword),
        source: medicine.source || "",
        ingredient: shortenText(medicine.ingredient, 60),
        effect: shortenText(medicine.effect, 80),
        usage: shortenText(medicine.usage, 80),
        caution: shortenText(medicine.caution, 100),
        sideEffect: shortenText(medicine.sideEffect, 80),
        storageMethod: shortenText(medicine.storageMethod, 80),
        durWarnings,
      };
    })
    .filter(Boolean)
    .slice(0, 8);
};

export const scanMedicineImage = async (file) => {
  if (!file) {
    throw new Error("이미지 파일이 없습니다.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${API_BASE}/scan`, formData, {
    timeout: 60000,
  });

  return response.data;
};

export const fetchMedicineByName = async (name) => {
  if (!name) return [];

  try {
    const response = await axios.get(`${API_BASE}/medicine`, {
      params: { q: name },
      timeout: 30000,
    });

    console.log("[의약품 조회 성공]", name, response.data);

    return response.data;
  } catch (error) {
    console.error(`[의약품 조회 실패] ${name}`, getErrorInfo(error));
    return [];
  }
};

export const fetchDurByProductName = async (name) => {
  if (!name) return [];

  try {
    const response = await axios.get(`${API_BASE}/dur/product`, {
      params: { name },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error(`[DUR 조회 실패] ${name}`, getErrorInfo(error));

    // DUR 실패해도 전체 분석 막지 않음
    return [];
  }
};

export const fetchMedicineSummaries = async (medicineResults) => {
  if (!medicineResults?.length) return [];

  const medicines = createCompactCautionPayload(medicineResults);

  if (!medicines.length) return [];

  try {
    const response = await axios.post(
      `${API_BASE}/summary/medicines`,
      { medicines },
      {
        timeout: 30000,
      },
    );

    return response.data.summaries || [];
  } catch (error) {
    console.error("[약별 주의사항 요약 실패]", getErrorInfo(error));
    return [];
  }
};

export const scanAndFetchMedicines = async (file) => {
  const scanResult = await scanMedicineImage(file);

  const { rawText, candidates = [] } = scanResult;

  const medicineResults = [];

  for (const name of candidates) {
    const medicines = await fetchMedicineByName(name);

    // 실제 의약품 검색 결과가 없으면 제외
    if (!medicines?.length) {
      console.warn("[약품 아님 - 제외]", name);
      continue;
    }

    const medicineName = medicines[0]?.name || name;
    const durList = await fetchDurByProductName(medicineName);

    medicineResults.push({
      id: String(medicineResults.length),
      keyword: name,
      medicines,
      durList,
      summary: "",
    });
  }

  const summaries = await fetchMedicineSummaries(medicineResults);

  const summaryMap = new Map(
    summaries.map((item) => [String(item.id), item.summary]),
  );

  const medicineResultsWithSummary = medicineResults.map((item) => ({
    ...item,
    summary:
      summaryMap.get(String(item.id)) || createFallbackCautionSummary(item),
  }));

  return {
    rawText,
    candidates,
    medicineResults: medicineResultsWithSummary,
  };
};

export const fetchMedicineSummary = async ({ medicine, durList }) => {
  if (!medicine) return "";

  try {
    const response = await axios.post(`${API_BASE}/summary/medicine`, {
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
