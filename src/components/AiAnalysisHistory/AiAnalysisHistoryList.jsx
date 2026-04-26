import AiAnalysisHistoryItem from "./AiAnalysisHistoryItem.jsx";
import styles from './AiAnalysisHistoryList.module.css';

const AiAnalysisHistoryList = ({data}) => {
  return (
      <ul className={styles.list}>
        {data.map((item) => (
            <AiAnalysisHistoryItem item={item}/>
        ))}
      </ul>
  )
}

export default AiAnalysisHistoryList;