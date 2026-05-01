import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

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
  Utils
================================ */
const getFallbackText = (value, fallback = "정보 없음") => {
  if (!value) return fallback;
  return value;
};

const toTextList = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return String(value)
    .split(/\n|(?<=\.)\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const formatPermitDate = (date) => {
  if (!date || String(date).length !== 8) return date || "정보 없음";

  const value = String(date);

  return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`;
};

/**
 * scanAndFetchMedicines 결과를 화면에서 쓰기 좋은 형태로 변환
 *
 * 예상 데이터:
 * {
 *   rawText,
 *   candidates,
 *   medicineResults: [
 *     {
 *       keyword: "맥페란정",
 *       medicines: [{ ... }]
 *     }
 *   ]
 * }
 */

/* ==============================
  Common Component
================================ */
const CardHeader = ({ icon, title, description, count, iconClassName = "" }) => (
  <div className={styles.cardHeader}>
    <span className={`${styles.iconBox} ${iconClassName}`}>{icon}</span>

    <div>
      <strong className={styles.cardTitle}>{title}</strong>

      {description && <p className={styles.cardDescription}>{description}</p>}
    </div>

    {count && <span className={styles.countText}>{count}</span>}
  </div>
);

/* ==============================
  Text List
================================ */
const TextList = ({ items }) => {
  const list = toTextList(items);

  if (list.length === 0) {
    return <p className={styles.bodyText}>정보 없음</p>;
  }

  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

/* ==============================
  Medicine List
================================ */
const MedicineList = ({ medicines, selectedId, onSelect }) => (
  <aside className={styles.sidePanel}>
    <Card>
      <CardHeader
        icon={<FiActivity />}
        title="추출된 약 목록"
        description="OCR과 Gemini 분석으로 추출된 약품입니다."
        count={`${medicines.length}개`}
      />

      <div className={styles.medicineList}>
        {medicines.map((medicine) => {
          const isActive = selectedId === medicine.id;

          return (
            <button
              key={medicine.id}
              type="button"
              className={`${styles.medicineItem} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => onSelect(medicine.id)}
            >
              <span className={styles.medicineInitial}>
                {medicine.name.slice(0, 1)}
              </span>

              <span className={styles.medicineText}>
                <strong>{medicine.name}</strong>
                <span>
                  {medicine.source === "easyDrug" && "e약은요 정보"}
                  {medicine.source === "permit" && "제품 허가정보"}
                  {medicine.source === "notFound" && "조회 결과 없음"}
                  {medicine.source === "unknown" && "출처 미확인"}
                </span>
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
================================ */
const MedicineSummary = ({ medicine }) => {
  const isEasyDrug = medicine.source === "easyDrug";
  const isPermit = medicine.source === "permit";
  const isNotFound = medicine.source === "notFound";

  return (
    <Card>
      <div className={styles.medicineHeader}>
        <div className={styles.largeInitial}>{medicine.name.slice(0, 1)}</div>

        <div className={styles.medicineInfo}>
          <h2 className={styles.medicineName}>{medicine.name}</h2>

          <p className={styles.ingredient}>
            {isPermit
              ? getFallbackText(medicine.ingredient, "성분 정보 없음")
              : getFallbackText(medicine.ingredient, "성분 정보 없음")}
          </p>

          <div className={styles.badgeGroup}>
            <Badge variant="gray">OCR 분석 결과</Badge>

            {isEasyDrug && <Badge variant="primary">e약은요 정보</Badge>}
            {isPermit && <Badge variant="primary">제품 허가정보</Badge>}
            {isNotFound && <Badge variant="gray">조회 결과 없음</Badge>}
          </div>
        </div>
      </div>
    </Card>
  );
};

/* ==============================
  Detail Cards
================================ */
const EasyDrugDetailCards = ({ medicine }) => {
  const detailCards = [
    {
      title: "효능 및 효과",
      icon: <FiInfo />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.effect)}
        </p>
      ),
    },
    {
      title: "복용 안내",
      icon: <FiClock />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.usage)}
        </p>
      ),
    },
    {
      title: "보관 방법",
      icon: <FiArchive />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.storageMethod)}
        </p>
      ),
    },
    {
      title: "유효기간",
      icon: <FiCalendar />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.validTerm)}
        </p>
      ),
    },
    {
      title: "주요 부작용",
      icon: <FiAlertTriangle />,
      iconClassName: styles.warningIcon,
      content: <TextList items={medicine.sideEffect} />,
    },
    {
      title: "주의사항",
      icon: <FiZap />,
      content: <TextList items={medicine.caution} />,
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

const PermitDetailCards = ({ medicine }) => {
  const detailCards = [
    {
      title: "제품 분류",
      icon: <FiInfo />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.productType || medicine.effect)}
        </p>
      ),
    },
    {
      title: "제조사",
      icon: <FiArchive />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.company)}
        </p>
      ),
    },
    {
      title: "주성분",
      icon: <FiZap />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.ingredient)}
        </p>
      ),
    },
    {
      title: "허가일자",
      icon: <FiCalendar />,
      content: (
        <p className={styles.bodyText}>
          {formatPermitDate(medicine.permitDate)}
        </p>
      ),
    },
    {
      title: "전문/일반 구분",
      icon: <FiShield />,
      content: (
        <p className={styles.bodyText}>
          {getFallbackText(medicine.className)}
        </p>
      ),
    },
    {
      title: "상태 및 보험코드",
      icon: <FiAlertTriangle />,
      content: (
        <>
          <div className={styles.infoBox}>
            <span>상태</span>
            <strong>{getFallbackText(medicine.status)}</strong>
          </div>

          <div className={styles.infoBox}>
            <span>보험코드</span>
            <strong>{getFallbackText(medicine.ediCode)}</strong>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className={styles.infoGrid}>
      {detailCards.map((card) => (
        <Card key={card.title}>
          <CardHeader icon={card.icon} title={card.title} />
          {card.content}
        </Card>
      ))}
    </div>
  );
};

const MedicineDetailCards = ({ medicine }) => {
  if (medicine.source === "easyDrug") {
    return <EasyDrugDetailCards medicine={medicine} />;
  }

  if (medicine.source === "permit") {
    return <PermitDetailCards medicine={medicine} />;
  }

  return (
    <Card>
      <CardHeader
        icon={<FiAlertTriangle />}
        title="의약품 정보 없음"
        iconClassName={styles.warningIcon}
      />
      <p className={styles.bodyText}>
        해당 약품명으로 조회된 의약품 정보가 없습니다.
      </p>
    </Card>
  );
};

const normalizeMedicines = (analysisData) => {
  const medicineResults = analysisData?.medicineResults || [];

  return medicineResults.map(({ keyword, medicines, durList }, index) => {
    const medicine = medicines?.[0];

    if (!medicine) {
      return {
        id: `${keyword}-${index}`,
        keyword,
        name: keyword,
        source: "notFound",
        durList: durList || [],
      };
    }

    return {
      id: medicine._id || `${medicine.name}-${index}`,
      keyword,
      name: medicine.name || keyword,
      source: medicine.source || "unknown",

      effect: medicine.effect || "",
      usage: medicine.usage || "",
      caution: medicine.caution || "",
      sideEffect: medicine.sideEffect || "",
      image: medicine.image || "",

      company: medicine.company || "",
      ingredient: medicine.ingredient || "",
      storageMethod: medicine.storageMethod || "",
      validTerm: medicine.validTerm || "",
      permitDate: medicine.permitDate || "",
      className: medicine.className || "",
      productType: medicine.productType || medicine.effect || "",
      status: medicine.status || "",
      ediCode: medicine.ediCode || "",

      durList: durList || [],
    };
  });
};

const DurWarningCard = ({ medicine }) => {
  const durList = medicine.durList || [];

  if (durList.length === 0) {
    return (
      <Card>
        <CardHeader icon={<FiShield />} title="함께 복용 주의 성분" />

        <p className={styles.bodyText}>
          현재 확인된 병용금기 정보가 없습니다.
        </p>
      </Card>
    );
  }

  return (
    <Card className={styles.cautionCard}>
      <CardHeader
        icon={<FiShield />}
        title="함께 복용 주의 성분"
        iconClassName={styles.dangerIcon}
        count={`${durList.length}건`}
      />

      <div className={styles.cautionList}>
        {durList.map((item) => (
          <div
            key={`${item.relatedIngredientKor}-${item.relatedIngredientEng}`}
            className={styles.cautionItem}
          >
            <FiAlertTriangle />

            <span>
              <strong>
                {item.relatedIngredientKor ||
                  item.relatedIngredientEng ||
                  "성분명 정보 없음"}
              </strong>
              과 함께 복용 주의
              <br />
              {item.content || "병용금기 정보가 확인되었습니다."}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* ==============================
  Caution Card
================================ */
const CautionCard = ({ medicine }) => {
  if (medicine.source === "permit") {
    return (
      <Card className={styles.cautionCard}>
        <CardHeader
          icon={<FiShield />}
          title="확인 필요"
          iconClassName={styles.dangerIcon}
        />

        <div className={styles.cautionList}>
          <div className={styles.cautionItem}>
            <FiAlertTriangle />
            <span>
              제품 허가정보 기준으로 조회된 약품입니다. 복용법과 부작용 정보는
              처방전 또는 약사 안내를 기준으로 확인하세요.
            </span>
          </div>
        </div>
      </Card>
    );
  }

  const cautions = toTextList(medicine.caution);

  if (cautions.length === 0) return null;

  return (
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
};

/* ==============================
  Page
================================ */
const AISummary = () => {
  const location = useLocation();
  const analysisData = location.state;

  const medicines = useMemo(
    () => normalizeMedicines(analysisData),
    [analysisData]
  );

  const [selectedId, setSelectedId] = useState(null);

  const selectedMedicine =
    medicines.find((medicine) => medicine.id === selectedId) || medicines[0];

  if (!analysisData || medicines.length === 0) {
    return (
      <Container>
        <PageHeader
          title="AI 처방전 분석"
          description="처방전 이미지를 먼저 업로드하고 분석을 진행해 주세요."
        />

        <Card>
          <p className={styles.bodyText}>
            분석 결과가 없습니다. 처방전 이미지를 먼저 업로드해 주세요.
          </p>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        title="AI 처방전 분석"
        description="처방전에서 추출된 약 정보를 바탕으로 효능, 복용법, 주의사항을 확인합니다."
      />

      <div className={styles.layout}>
        <MedicineList
          medicines={medicines}
          selectedId={selectedMedicine.id}
          onSelect={setSelectedId}
        />

        <main className={styles.detailPanel}>
          <MedicineSummary medicine={selectedMedicine} />
          <MedicineDetailCards medicine={selectedMedicine} />
          <DurWarningCard medicine={selectedMedicine} />
          <CautionCard medicine={selectedMedicine} />
        </main>
      </div>
    </Container>
  );
};

export default AISummary;