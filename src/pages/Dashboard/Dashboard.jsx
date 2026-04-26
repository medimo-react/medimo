import Container from "../../components/Container/Container.jsx";
import AiAnalysisHistorySection
  from "../../components/AiAnalysisHistory/AiAnalysisHistorySection.jsx";

// 메인 홈
const Dashboard = () => {
  return (
      <Container>
        {/* AI 분석 내용 목록 */}
        <AiAnalysisHistorySection />
      </Container>
  );
};

export default Dashboard;