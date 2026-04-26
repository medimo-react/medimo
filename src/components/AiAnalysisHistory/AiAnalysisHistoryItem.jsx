import styles from "./AiAnalysisHistoryItem.module.css";
import HistoryItemActionMenu
  from "./HistoryItemActionMenu.jsx";

const AiAnalysisHistoryItem = ({item}) => {
  return (
     <li className={styles.item}>
       <button type={'button'} className={styles.content}>{item.content}</button>
        <HistoryItemActionMenu/>
     </li>
  )
}

export default AiAnalysisHistoryItem;