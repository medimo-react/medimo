import { useEffect } from "react";
import Container from "../../components/Container/Container.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import AiAnalysisHistoryList from "../../components/AiAnalysisHistory/AiAnalysisHistoryList.jsx";
import Card from "../../components/Card/Card.jsx";
import HistoryEmpty from "../../components/AiAnalysisHistory/HistoryEmpty.jsx";
import { useAnalysisStore } from "../../store/analysisStore.js";

const History = () => {
  const records = useAnalysisStore((s) => s.records);
  const fetchRecords = useAnalysisStore((s) => s.fetchRecords);

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Container>
      <PageHeader title="AI 분석 기록" description="분석했던 내용을 언제든 다시 확인하세요" />
      <Card radius="sm">
        {records.length === 0 ? (
          <HistoryEmpty />
        ) : (
          <AiAnalysisHistoryList data={records} />
        )}
      </Card>
    </Container>
  );
};

export default History;
