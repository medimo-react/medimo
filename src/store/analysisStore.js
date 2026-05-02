import {create} from 'zustand';
import {fetchAnalysisList, deleteAnalysisRecord} from "../api/analysisApi.js";
import {toggleAnalysisPin} from "../api/toggleAnalysisPin.js";

// set: 상태 바꿀때
// get: 다른 함수 호출
export const useAnalysisStore = create ((set,get) => ({
  records : [],
  // 목록 불러오기
  fetchRecords: async () => {
    // API 호출 → records에 저장
    const data = await fetchAnalysisList();
    set({records: data})
  },
  // 고정 토글
  pinRecords: async (id) => {
    await toggleAnalysisPin({ id });
    await get().fetchRecords();
  },
  // 기록 삭제
  deleteRecord: async (id) => {
    await deleteAnalysisRecord(id);
    await get().fetchRecords();
  },
}))