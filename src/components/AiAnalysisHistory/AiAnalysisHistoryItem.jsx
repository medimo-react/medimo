import styles from "./AiAnalysisHistoryItem.module.css";
import HistoryItemActionMenu
  from "./HistoryItemActionMenu.jsx";
import {useNavigate} from "react-router-dom";

const AiAnalysisHistoryItem = ({item}) => {
  const navigate = useNavigate();

  return (
     <li className={styles.item}>
        <button type={'button'} className={styles.content} onClick={() => navigate('/ai-summary')}>{item.content}</button>
        <HistoryItemActionMenu/>
     </li>
  )
}

export default AiAnalysisHistoryItem;