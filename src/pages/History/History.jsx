import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../components/Container/Container.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import AiAnalysisHistoryList from "../../components/AiAnalysisHistory/AiAnalysisHistoryList.jsx";
import Card from "../../components/Card/Card.jsx";

import {
  getAnalysisHistories,
  getAnalysisHistoryById,
} from "../../api/analysis.js";

import { useOcrStore } from "../../store/ocrStore.js";

const History = () => {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const setOcrText = useOcrStore((s) => s.setOcrText);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setIsLoading(true);

        const data = await getAnalysisHistories();
        setHistories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("분석 내역 조회 실패:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });

        setHistories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const handleClickHistory = async (historyId) => {
    if (!historyId) return;

    try {
      const history = await getAnalysisHistoryById(historyId);

      setOcrText({
        rawText: history.rawText || "",
        candidates: history.candidates || [],
        medicineResults: history.medicineResults || [],
        historyId: history._id,
      });

      navigate("/ai-summary");
    } catch (err) {
      console.error("분석 상세 조회 실패:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  };

  return (
    <Container>
      <PageHeader
        title="AI 분석 기록"
        description="분석했던 내용을 언제든 다시 확인하세요"
      />

      <Card radius="sm">
        {isLoading && <p>분석 내역을 불러오는 중입니다...</p>}

        {!isLoading && histories.length === 0 && (
          <p>아직 저장된 분석 내역이 없습니다.</p>
        )}

        {!isLoading && histories.length > 0 && (
          <AiAnalysisHistoryList
            data={histories}
            onClickItem={handleClickHistory}
          />
        )}
      </Card>
    </Container>
  );
};

export default History;