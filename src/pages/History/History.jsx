import { useEffect, useState } from "react";
import Container from "../../components/Container/Container.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import AiAnalysisHistoryList from "../../components/AiAnalysisHistory/AiAnalysisHistoryList.jsx";
import Card from "../../components/Card/Card.jsx";
import HistoryEmpty from "../../components/AiAnalysisHistory/HistoryEmpty.jsx";
import { fetchAnalysisList } from "../../api/analysisApi.js";

const History = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalysisList()
      .then(setRecords)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <PageHeader title="AI 분석 기록" description="분석했던 내용을 언제든 다시 확인하세요" />
      <Card radius="sm">
        {isLoading ? (
          <p>불러오는 중...</p>
        ) : records.length === 0 ? (
          <HistoryEmpty />
        ) : (
          <AiAnalysisHistoryList data={records} />
        )}
      </Card>
    </Container>
  );
};

export default History;
