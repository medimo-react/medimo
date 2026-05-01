import Card from '../Card/Card'
import styles from  './AiAnalysisHistorySection.module.css'
import AiAnalysisHistoryList from "./AiAnalysisHistoryList.jsx";

// 임시 데이터
const data = [
  {id: 1, content : '분석 내역1'},
  {id: 2, content : '분석 내역2'},
  {id: 3, content : '분석 내역3'}
]

const AiAnalysisHistorySection = () => {
  return (
      <Card radius={'sm'}>
        <p className={styles.title}>AI 분석 기록</p>
        <AiAnalysisHistoryList data={data}/>
      </Card>
  )
}

export default AiAnalysisHistorySection;