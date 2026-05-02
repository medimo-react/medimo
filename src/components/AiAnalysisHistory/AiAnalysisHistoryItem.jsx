import styles from "./AiAnalysisHistoryItem.module.css";
import HistoryItemActionMenu from "./HistoryItemActionMenu.jsx";
import { useNavigate } from "react-router-dom";
import { TiPin } from "react-icons/ti";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const formatTitle = (candidates = []) => {
  if (candidates.length === 0) return '분석결과';
  if (candidates.length === 1) return `${candidates[0]} 분석결과`;
  return `${candidates[0]} 외 ${candidates.length - 1}건 분석결과`;
};

const AiAnalysisHistoryItem = ({ item }) => {
  const navigate = useNavigate();
  const title = formatTitle(item.candidates);

  return (
    <li className={`${styles.item} ${item.isPinned ? styles.pinned : ''}`}>
      <button
        type="button"
        className={styles.content}
        onClick={() => navigate(`/ai-summary/${item._id}`)}
      >
        <span className={styles.title}>
          {item.isPinned && <TiPin className={styles.pin_icon} />}
          <span className={styles.title_text}>{title}</span>
        </span>
        <span className={styles.meta}>
          <span>{formatDate(item.createdAt)}</span>
          <span>약품 {item.medicineCount}개</span>
        </span>
      </button>
      <HistoryItemActionMenu recordId={item._id} />
    </li>
  );
};

export default AiAnalysisHistoryItem;
