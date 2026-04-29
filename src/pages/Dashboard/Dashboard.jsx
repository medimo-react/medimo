import { useNavigate } from "react-router-dom";

import Container from "../../components/Container/Container.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import Card from "../../components/Card/Card.jsx";
import Badge from "../../components/Badge/Badge.jsx";
import Button from "../../components/Button/Button.jsx";

import AiAnalysisHistorySection from "../../components/AiAnalysisHistory/AiAnalysisHistorySection.jsx";
import UploadCard from "../../components/UploadCard/UploadCard.jsx";

import styles from "./Dashboard.module.css";

const medicineStatus = [
  {
    label: "오늘 복약",
    value: "0 / 3",
    desc: "아직 완료된 복약 기록이 없습니다.",
    badge: "대기",
    variant: "warning",
  },
  {
    label: "분석 기록",
    value: "3건",
    desc: "최근 처방전 분석 내역입니다.",
    badge: "최근",
    variant: "primary",
  },
];

const recentAnalysis = {
  title: "감기약 처방전",
  date: "2026.04.29",
  medicines: ["타이레놀 500mg", "판콜에이", "뮤코스타정 100mg"],
  cautionCount: 2,
  summary:
    "해열·진통제와 종합감기약이 포함되어 있으며, 성분 중복과 음주 후 복용에 주의가 필요합니다.",
};

const upcomingAlerts = [
  {
    time: "오후 1:00",
    title: "점심 복약 알림",
    desc: "타이레놀 외 2종 복용 예정",
  },
  {
    time: "오후 7:00",
    title: "저녁 복약 알림",
    desc: "타이레놀 외 2종 복용 예정",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {/* 페이지 제목 */}
      <PageHeader title="대시보드" />

      <div className={styles.dashboard}>
        {/* 상단 영역 */}
        <section className={styles.topGrid}>
          {/* 처방전 업로드 */}
          <div className={styles.uploadArea}>
            <UploadCard />
          </div>

          {/* 오늘 상태 요약 */}
          <div className={styles.summaryArea}>
            {medicineStatus.map((item) => (
              <Card key={item.label} radius="sm" className={styles.summaryCard}>
                <div className={styles.summaryHeader}>
                  <span className={styles.summaryLabel}>{item.label}</span>
                  <Badge variant={item.variant} size="sm">
                    {item.badge}
                  </Badge>
                </div>

                <strong className={styles.summaryValue}>{item.value}</strong>
                <p className={styles.summaryDesc}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 최근 분석 결과 요약 */}
        <section>
          <Card radius="sm" className={styles.recentCard}>
            <div className={styles.recentHeader}>
              <div>
                <div className={styles.cardHeaderInline}>
                  <p className={styles.cardTitle}>최근 분석 결과</p>
                  <Badge variant="primary" size="sm">
                    최신
                  </Badge>
                </div>

                <h2 className={styles.recentTitle}>{recentAnalysis.title}</h2>
                <p className={styles.recentDate}>{recentAnalysis.date} 분석</p>
              </div>

              <Button
                type="button"
                size="small"
                onClick={() => navigate("/history")}
              >
                상세 보기
              </Button>
            </div>

            <div className={styles.recentBody}>
              <div className={styles.recentMedicineList}>
                {recentAnalysis.medicines.map((medicine) => (
                  <Badge key={medicine} variant="gray" size="sm">
                    {medicine}
                  </Badge>
                ))}
              </div>

              <p className={styles.recentSummary}>{recentAnalysis.summary}</p>

              <div className={styles.recentNotice}>
                <Badge variant="warning" size="sm">
                  주의사항 {recentAnalysis.cautionCount}개
                </Badge>
                <span>복용 전 주의사항을 다시 확인해 주세요.</span>
              </div>
            </div>
          </Card>
        </section>

        {/* 하단 영역 */}
        <section className={styles.bottomGrid}>
          {/* AI 분석 내역 */}
          <AiAnalysisHistorySection />

          {/* 다가오는 알림 */}
          <Card radius="sm">
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>다가오는 복약 알림</p>
              <Badge variant="primary" size="sm">
                예정
              </Badge>
            </div>

            <div className={styles.alertList}>
              {upcomingAlerts.map((alert) => (
                <div key={alert.time} className={styles.alertItem}>
                  <div className={styles.alertTime}>{alert.time}</div>

                  <div className={styles.alertText}>
                    <strong>{alert.title}</strong>
                    <p>{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
};

export default Dashboard;