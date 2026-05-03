import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchRecentAnalysis } from "../../api/analysisApi.js";

import Container from "../../components/Container/Container.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import Card from "../../components/Card/Card.jsx";
import Badge from "../../components/Badge/Badge.jsx";
import Button from "../../components/Button/Button.jsx";

import AiAnalysisHistorySection from "../../components/AiAnalysisHistory/AiAnalysisHistorySection.jsx";
import UploadCard from "../../components/UploadCard/UploadCard.jsx";

import styles from "./Dashboard.module.css";

function formatTime(time) {
  const [hh, mm] = time.split(":").map(Number);
  const period = hh < 12 ? "오전" : "오후";
  const h = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;

  return `${period} ${h}:${String(mm).padStart(2, "0")}`;
}

function formatDate(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function buildAlertItems(alarms = []) {
  const timeMap = {};

  alarms
    .filter((a) => a.active)
    .forEach((alarm) => {
      (alarm.times ?? []).forEach((time) => {
        if (!timeMap[time]) timeMap[time] = [];
        timeMap[time].push(alarm.name);
      });
    });

  return Object.entries(timeMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([time, names]) => ({
      time: formatTime(time),
      title: "복약 알림",
      desc:
        names.length === 1
          ? `${names[0]} 복용 예정`
          : `${names[0]} 외 ${names.length - 1}종 복용 예정`,
    }));
}

function normalizeRecentAnalysis(record) {
  if (!record) return null;

  const medicineResults = record.medicineResults || [];

  const medicines = medicineResults
    .map((item) =>
      getDisplayMedicineName(item.medicines?.[0]?.name || item.keyword),
    )
    .filter(Boolean)
    .slice(0, 3);

  const savedSummary = medicineResults.find((item) => item.summary)?.summary;

  const summary = savedSummary
    ? savedSummary
    : medicines.length > 0
      ? `${medicines[0]} 등 ${
          record.medicineCount || medicines.length
        }개 약품의 분석 결과입니다.`
      : "최근 처방전 분석 결과를 확인해 주세요.";

  return {
    id: record._id || record.id,
    title: "처방전 분석 결과",
    date: formatDate(record.createdAt),
    medicines,
    cautionCount: record.cautionCount || 0,
    summary,
  };
}

function getDisplayMedicineName(name = "") {
  return String(name).split("(")[0].trim();
}

const Dashboard = ({ rate = 0, alarms = [] }) => {
  const navigate = useNavigate();

  const [recentRecord, setRecentRecord] = useState(null);
  const [isRecentLoading, setIsRecentLoading] = useState(true);

  const alertItems = buildAlertItems(alarms);

  useEffect(() => {
    const loadRecentAnalysis = async () => {
      try {
        const data = await fetchRecentAnalysis();
        setRecentRecord(data);
      } catch (error) {
        console.error("[최근 분석 결과 조회 실패]", error);
      } finally {
        setIsRecentLoading(false);
      }
    };

    loadRecentAnalysis();
  }, []);

  const recentAnalysis = useMemo(
    () => normalizeRecentAnalysis(recentRecord),
    [recentRecord],
  );

  return (
    <Container>
      <PageHeader
        title="대시보드"
        description="내 약 정보와 분석 기록을 간편하게 확인하세요"
      />

      <div className={styles.dashboard}>
        {/* 상단 영역 */}
        <section className={styles.topGrid}>
          {/* 처방전 업로드 */}
          <div className={styles.uploadArea}>
            <UploadCard />
          </div>

          {/* 오늘 상태 요약 */}
          <div className={styles.summaryArea}>
            <Card radius={"sm"}>
              <p className={styles.title}>오늘 복약</p>
              <div
                className={`${styles.rateCircle} ${
                  rate === 100 ? styles.rateCircleFull : ""
                }`}
                style={{ "--rate": `${rate}%` }}
              >
                <span className={styles.rate}>{rate}%</span>
              </div>
            </Card>
          </div>
        </section>

        {/* 최근 분석 결과 요약 */}
        <section>
          <Card radius="sm" className={styles.recentCard}>
            {isRecentLoading ? (
              <p className={styles.recentSummary}>
                최근 분석 결과를 불러오는 중입니다.
              </p>
            ) : !recentAnalysis ? (
              <p className={styles.recentSummary}>
                아직 분석한 처방전이 없습니다.
              </p>
            ) : (
              <>
                <div className={styles.recentHeader}>
                  <div>
                    <div className={styles.cardHeaderInline}>
                      <p className={styles.cardTitle}>최근 분석 결과</p>
                      <Badge variant="primary" size="sm">
                        최신
                      </Badge>
                    </div>

                    <h2 className={styles.recentTitle}>
                      {recentAnalysis.title}
                    </h2>

                    {recentAnalysis.date && (
                      <p className={styles.recentDate}>
                        {recentAnalysis.date} 분석
                      </p>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    type="button"
                    size="small"
                    onClick={() => navigate(`/ai-summary/${recentAnalysis.id}`)}
                  >
                    상세 보기
                  </Button>
                </div>

                <div className={styles.recentBody}>
                  {recentAnalysis.medicines.length > 0 && (
                    <div className={styles.recentMedicineList}>
                      {recentAnalysis.medicines.map((medicine) => (
                        <Badge key={medicine} variant="gray" size="sm">
                          {medicine}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className={styles.recentSummary}>
                    {recentAnalysis.summary}
                  </p>

                  <div className={styles.recentNotice}>
                    <Badge variant="danger" size="sm">
                      주의사항 {recentAnalysis.cautionCount}개
                    </Badge>
                    <span>복용 전 주의사항을 다시 확인해 주세요.</span>
                  </div>
                </div>
              </>
            )}
          </Card>
        </section>

        {/* 하단 영역 */}
        <section className={styles.bottomGrid}>
          {/* AI 분석 내역 */}
          <AiAnalysisHistorySection showMore={true} />

          {/* 다가오는 알림 */}
          <Card radius="sm">
            <p className={styles.title}>오늘 복약</p>

            {alertItems.length === 0 ? (
              <p className={styles.alertEmpty}>등록된 알림이 없습니다.</p>
            ) : (
              <div className={styles.alertList}>
                {alertItems.map((alert) => (
                  <div key={alert.time} className={styles.alertItem}>
                    <div className={styles.alertTime}>{alert.time}</div>
                    <div className={styles.alertText}>
                      <strong>{alert.title}</strong>
                      <p>{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>
      </div>
    </Container>
  );
};

export default Dashboard;
