import { useState } from "react";
import Container from "../../components/Container/Container";
import PageHeader from "../../components/PageHeader/PageHeader";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";

import {
  FiActivity,
  FiAlertTriangle,
  FiClock,
  FiInfo,
  FiShield,
  FiZap,
  FiArchive,
  FiCalendar,
} from "react-icons/fi";

import styles from "./AISummary.module.css";

/* ==============================
  Mock Data
  - 백엔드 연결 전 디자인 확인용 데이터
================================ */
const mockAnalysis = {
  medicines: [
    {
      id: 1,
      name: "타이레놀 500mg",
      ingredient: "아세트아미노펜",
      effect: "해열, 진통(두통, 치통, 근육통, 생리통 등)",
      dose: "1회 1~2정, 1일 3~4회",
      interval: "4~6시간 간격",
      storage: "실온 보관, 습기와 직사광선을 피하세요.",
      validTerm: "제품 포장에 표기된 사용기한을 확인하세요.",
      sideEffects: ["간 손상", "피부 발진", "구역질", "알레르기 반응"],
      interactions: ["와파린과 병용 시 출혈 위험 증가", "간 독성 약물과 병용 주의"],
      cautions: [
        "1일 최대 4g을 초과하지 마세요.",
        "음주 시 복용을 피하세요.",
        "간 질환이 있는 경우 의사와 상담하세요.",
      ],
    },
    {
      id: 2,
      name: "오메프라졸 20mg",
      ingredient: "오메프라졸",
      effect: "위산 분비 억제, 위염 및 역류성 식도염 증상 완화",
      dose: "1일 1회, 1정",
      interval: "보통 아침 식전 복용",
      storage: "밀폐용기, 실온 보관",
      validTerm: "제품 포장에 표기된 사용기한을 확인하세요.",
      sideEffects: ["복통", "설사", "두통", "메스꺼움"],
      interactions: ["일부 항응고제와 병용 시 주의", "다른 위장약과 중복 복용 주의"],
      cautions: [
        "장기간 복용 시 의사와 상담하세요.",
        "증상이 지속되면 복용을 중단하고 상담하세요.",
      ],
    },
  ],
};

/* ==============================
  Common Component
  - 카드 제목 + 아이콘 반복 제거
================================ */
const CardHeader = ({ icon, title, description, count, iconClassName = "" }) => (
  <div className={styles.cardHeader}>
    <span className={`${styles.iconBox} ${iconClassName}`}>
      {icon}
    </span>

    <div>
      <strong className={styles.cardTitle}>{title}</strong>

      {description && (
        <p className={styles.cardDescription}>{description}</p>
      )}
    </div>

    {count && (
      <span className={styles.countText}>{count}</span>
    )}
  </div>
);

/* ==============================
  Medicine List
  - 왼쪽 약 목록 영역
================================ */
const MedicineList = ({ medicines, selectedId, onSelect }) => (
  <aside className={styles.sidePanel}>
    <Card>
      <CardHeader
        icon={<FiActivity />}
        title="추출된 약 목록"
        description="OCR과 AI 분석으로 추출된 약품입니다."
        count={`${medicines.length}개`}
      />

      <div className={styles.medicineList}>
        {medicines.map((medicine) => {
          const isActive = selectedId === medicine.id;

          return (
            <button
              key={medicine.id}
              type="button"
              className={`${styles.medicineItem} ${isActive ? styles.active : ""}`}
              onClick={() => onSelect(medicine.id)}
            >
              <span className={styles.medicineInitial}>
                {medicine.name.slice(0, 1)}
              </span>

              <span className={styles.medicineText}>
                <strong>{medicine.name}</strong>
                <span>{medicine.dose}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  </aside>
);

/* ==============================
  Medicine Summary
  - 선택된 약 상단 요약 카드
================================ */
const MedicineSummary = ({ medicine }) => (
  <Card>
    <div className={styles.medicineHeader}>
      <div className={styles.largeInitial}>
        {medicine.name.slice(0, 1)}
      </div>

      <div className={styles.medicineInfo}>
        <h2 className={styles.medicineName}>{medicine.name}</h2>
        <p className={styles.ingredient}>{medicine.ingredient}</p>

        <div className={styles.badgeGroup}>
          <Badge variant="gray">AI 분석 결과</Badge>
          <Badge variant="primary">식약처 정보 기준</Badge>
        </div>
      </div>
    </div>
  </Card>
);

/* ==============================
  Detail Cards
  - 효능 / 복용 / 보관 / 유효기간 / 부작용 / 상호작용
================================ */
const MedicineDetailCards = ({ medicine }) => {
  const detailCards = [
    {
      title: "효능 및 효과",
      icon: <FiInfo />,
      content: <p className={styles.bodyText}>{medicine.effect}</p>,
    },
    {
      title: "복용 안내",
      icon: <FiClock />,
      content: (
        <>
          <div className={styles.infoBox}>
            <span>1회 복용량</span>
            <strong>{medicine.dose}</strong>
          </div>

          <div className={styles.infoBox}>
            <span>복용 간격</span>
            <strong>{medicine.interval}</strong>
          </div>
        </>
      ),
    },
    {
      title: "보관 방법",
      icon: <FiArchive />,
      content: <p className={styles.bodyText}>{medicine.storage}</p>,
    },
    {
      title: "유효기간",
      icon: <FiCalendar />,
      content: <p className={styles.bodyText}>{medicine.validTerm}</p>,
    },
    {
      title: "주요 부작용",
      icon: <FiAlertTriangle />,
      iconClassName: styles.warningIcon,
      content: <TextList items={medicine.sideEffects} />,
    },
    {
      title: "약물 상호작용",
      icon: <FiZap />,
      content: <TextList items={medicine.interactions} />,
    },
  ];

  return (
    <div className={styles.infoGrid}>
      {detailCards.map((card) => (
        <Card key={card.title}>
          <CardHeader
            icon={card.icon}
            title={card.title}
            iconClassName={card.iconClassName}
          />

          {card.content}
        </Card>
      ))}
    </div>
  );
};

/* ==============================
  Text List
  - 부작용 / 상호작용 리스트 공통
================================ */
const TextList = ({ items }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

/* ==============================
  Caution Card
  - 복용 시 주의사항 카드
================================ */
const CautionCard = ({ cautions }) => (
  <Card className={styles.cautionCard}>
    <CardHeader
      icon={<FiShield />}
      title="복용 시 주의사항"
      iconClassName={styles.dangerIcon}
    />

    <div className={styles.cautionList}>
      {cautions.map((item) => (
        <div key={item} className={styles.cautionItem}>
          <FiAlertTriangle />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </Card>
);

/* ==============================
  Page
  - AI 처방전 분석 페이지
================================ */
const AISummary = () => {
  const medicines = mockAnalysis.medicines;
  const [selectedId, setSelectedId] = useState(medicines[0].id);

  const selectedMedicine = medicines.find(
    (medicine) => medicine.id === selectedId
  );

  return (
    <Container>
      {/* 페이지 제목 영역 */}
      <PageHeader
        title="AI 처방전 분석"
        description="처방전에서 추출된 약 정보를 바탕으로 효능, 복용법, 주의사항을 확인합니다."
      />

      <div className={styles.layout}>
        {/* 왼쪽: 추출된 약 목록 */}
        <MedicineList
          medicines={medicines}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        {/* 오른쪽: 선택된 약 상세 정보 */}
        <main className={styles.detailPanel}>
          <MedicineSummary medicine={selectedMedicine} />
          <MedicineDetailCards medicine={selectedMedicine} />
          <CautionCard cautions={selectedMedicine.cautions} />
        </main>
      </div>
    </Container>
  );
};

export default AISummary;