import styles from "./AiAnalysisHistoryItem.module.css";
import HistoryItemActionMenu from "./HistoryItemActionMenu.jsx";
import { useNavigate } from "react-router-dom";
import { TiPin } from "react-icons/ti";
import {useState} from "react";
import {useAnalysisStore} from "../../store/analysisStore.js";
import Input from "../Input/Input.jsx";
import Badge from "../Badge/Badge.jsx";

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
  const [isRenamed, setIsRenamed] = useState(false);
  const [value, setValue] = useState("");
  const renameRecord = useAnalysisStore((s) => s.renameRecord);
  const navigate = useNavigate();
  const title = item.title ?? formatTitle(item.candidates);
  
  const handleRenameClick = async () => {
    setIsRenamed(true);
    setValue(item.title ?? formatTitle(item.candidates))
  }

  const handleRenameSubmit = async (e) => {
    if (e.key === 'Enter') {
      await renameRecord(item._id, value);
      setIsRenamed(false);
    }
    if (e.key === 'Escape') {
      setIsRenamed(false);
    }
  }

  return (
    <li className={`${styles.item} ${item.isPinned ? styles.pinned : ''}`}>
      <button
        type="button"
        className={styles.content}
        onClick={() => navigate(`/ai-summary/${item._id}`)}
      >
        <span className={styles.title}>
          {item.isPinned && <TiPin className={styles.pin_icon} />}
          {
            !isRenamed ?  <span className={styles.title_text}>{title}</span> :
                <Input value={value} className={styles.title_input} onChange={(e) =>setValue(e.target.value)} onClick={(e) => e.stopPropagation()} onKeyDown={handleRenameSubmit}/>
          }
        </span>
        <div className={styles.meta}>
          <div className={styles.tag}>
            <Badge size={'sm'}>약품 {item.medicineCount}개</Badge>
            {item.cautionCount > 0 && <Badge size={'sm'} variant={'warning'}>주의 {item.cautionCount}개</Badge>}
          </div>
          <p>{formatDate(item.createdAt)}</p>
        </div>
      </button>
      <HistoryItemActionMenu recordId={item._id} onClick={() => handleRenameClick()} />
    </li>
  );
};

export default AiAnalysisHistoryItem;
