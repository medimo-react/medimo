import Badge from "../Badge/Badge.jsx";
import styles from "./AiAnalysisHistoryList.module.css";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getHistoryTitle = (history) => {
  const names = history.medicineNames || [];

  if (history.title) return history.title;
  if (names.length === 0) return "처방전 분석 결과";
  if (names.length === 1) return `${names[0]} 분석 결과`;

  return `${names[0]} 외 ${names.length - 1}종 분석 결과`;
};

const AiAnalysisHistoryList = ({ data = [], onClickItem }) => {
  return (
    <div className={styles.list}>
      {data.map((history) => (
        <button
          key={history._id}
          type="button"
          className={styles.item}
          onClick={() => onClickItem?.(history._id)}
        >
          <div className={styles.text}>
            <strong>{getHistoryTitle(history)}</strong>

            <p>{formatDate(history.createdAt)} 분석</p>

            {(history.medicineNames || []).length > 0 && (
              <span className={styles.medicineNames}>
                {(history.medicineNames || []).slice(0, 3).join(", ")}
              </span>
            )}
          </div>

          <div className={styles.badges}>
            <Badge variant="gray" size="sm">
              {(history.medicineNames || []).length}개
            </Badge>

            {history.cautionCount > 0 && (
              <Badge variant="warning" size="sm">
                주의 {history.cautionCount}
              </Badge>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default AiAnalysisHistoryList;