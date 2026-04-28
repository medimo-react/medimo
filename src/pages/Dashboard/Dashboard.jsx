import Container from "../../components/Container/Container.jsx";
import AiAnalysisHistorySection
  from "../../components/AiAnalysisHistory/AiAnalysisHistorySection.jsx";
import UploadCard from "../../components/UploadCard/UploadCard.jsx";

// 메인 홈
const Dashboard = () => {
  return (
      <Container>
        {/* AI 분석 내용 목록 */}
        <AiAnalysisHistorySection />
        {/* 처방전 업로드 */}
        <UploadCard/>
      </Container>
  );
};

export default Dashboard;