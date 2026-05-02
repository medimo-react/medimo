import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useOcrStore } from "../../store/ocrStore.js";

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
// import { useOcrStore } from "../../store/ocrStore.js";

/* ==============================
  Utils
================================ */
const hasValue = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).length > 0;
  }

  return value !== undefined && value !== null && String(value).trim() !== "";
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
const CardHeader = ({
  icon,
  title,
  description,
  count,
  iconClassName = "",
}) => (
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
    return null;
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

          {hasValue(medicine.ingredient) && (
            <p className={styles.ingredient}>{medicine.ingredient}</p>
          )}

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

const MedicineImageCard = ({ medicine }) => {
  if (!medicine.image) return null;

  return (
    <Card>
      <CardHeader
        icon={<FiInfo />}
        title="의약품 이미지"
        description="식약처 의약품 정보 기준 이미지입니다."
      />

      <div className={styles.imageCardBody}>
        <img
          src={medicine.image}
          alt={`${medicine.name} 이미지`}
          className={styles.medicineImage}
        />
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
      value: medicine.effect,
      content: <p className={styles.bodyText}>{medicine.effect}</p>,
    },
    {
      title: "복용 안내",
      icon: <FiClock />,
      value: medicine.usage,
      content: <p className={styles.bodyText}>{medicine.usage}</p>,
    },
    {
      title: "보관 방법",
      icon: <FiArchive />,
      value: medicine.storageMethod,
      content: <p className={styles.bodyText}>{medicine.storageMethod}</p>,
    },
    {
      title: "유효기간",
      icon: <FiCalendar />,
      value: medicine.validTerm,
      content: <p className={styles.bodyText}>{medicine.validTerm}</p>,
    },
    {
      title: "주요 부작용",
      icon: <FiAlertTriangle />,
      iconClassName: styles.warningIcon,
      value: toTextList(medicine.sideEffect),
      content: <TextList items={medicine.sideEffect} />,
    },
    {
      title: "주의사항",
      icon: <FiZap />,
      value: toTextList(medicine.caution),
      content: <TextList items={medicine.caution} />,
    },
  ];

  const visibleCards = detailCards.filter((card) => hasValue(card.value));

  if (visibleCards.length === 0) return null;

  return (
    <div className={styles.infoGrid}>
      {visibleCards.map((card) => (
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
      value: medicine.productType || medicine.effect,
      content: (
        <p className={styles.bodyText}>
          {medicine.productType || medicine.effect}
        </p>
      ),
    },
    {
      title: "제조사",
      icon: <FiArchive />,
      value: medicine.company,
      content: <p className={styles.bodyText}>{medicine.company}</p>,
    },
    {
      title: "주성분",
      icon: <FiZap />,
      value: medicine.ingredient,
      content: <p className={styles.bodyText}>{medicine.ingredient}</p>,
    },
    {
      title: "전문/일반 구분",
      icon: <FiShield />,
      value: medicine.className,
      content: <p className={styles.bodyText}>{medicine.className}</p>,
    },
    {
      title: "상태 및 보험코드",
      icon: <FiAlertTriangle />,
      value: [medicine.status, medicine.ediCode].filter(Boolean),
      content: (
        <>
          {hasValue(medicine.status) && (
            <div className={styles.infoBox}>
              <span>상태</span>
              <strong>{medicine.status}</strong>
            </div>
          )}

          {hasValue(medicine.ediCode) && (
            <div className={styles.infoBox}>
              <span>보험코드</span>
              <strong>{medicine.ediCode}</strong>
            </div>
          )}
        </>
      ),
    },
  ];

  const visibleCards = detailCards.filter((card) => hasValue(card.value));

  if (visibleCards.length === 0) return null;

  return (
    <div className={styles.infoGrid}>
      {visibleCards.map((card) => (
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

  return medicineResults.map(
    ({ keyword, medicines, durList, summary }, index) => {
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

        summary: summary || "",
      };
    },
  );
};

const DurWarningCard = ({ medicine }) => {
  const durList = medicine.durList || [];

  if (durList.length === 0) {
    return null;
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

const OneLineSummaryCard = ({ medicine }) => {
  if (!medicine.summary) return null;

  return (
    <Card>
      <CardHeader
        icon={<FiInfo />}
        title="복용 전 AI 핵심 요약"
        description="Gemini와 함께 조회된 의약품 정보와 병용금기 정보를 바탕으로 정리했습니다."
      />

      <p className={styles.bodyText}>{medicine.summary}</p>
    </Card>
  );
};

/* ==============================
  Page
================================ */
const AISummary = () => {
  const analysisData = useOcrStore((s) => s.ocrText);

  const medicines = useMemo(
    () => normalizeMedicines(analysisData),
    [analysisData],
  );

  // scan 후 텍스트 추출 데이터
  // const { ocrText } = useOcrStore();
  // console.log(ocrText);

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

      <OneLineSummaryCard medicine={selectedMedicine} />

      <div className={styles.layout}>
        <MedicineList
          medicines={medicines}
          selectedId={selectedMedicine.id}
          onSelect={setSelectedId}
        />

        <main className={styles.detailPanel}>
          <MedicineSummary medicine={selectedMedicine} />
          <MedicineImageCard medicine={selectedMedicine} />
          <MedicineDetailCards medicine={selectedMedicine} />
          <DurWarningCard medicine={selectedMedicine} />
          <CautionCard medicine={selectedMedicine} />
        </main>
      </div>
    </Container>
  );
};

export default AISummary;
