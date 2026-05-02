import { useEffect } from 'react';
import Card from '../Card/Card';
import styles from './AiAnalysisHistorySection.module.css';
import AiAnalysisHistoryList from './AiAnalysisHistoryList.jsx';
import HistoryEmpty from './HistoryEmpty.jsx';
import {useAnalysisStore} from "../../store/analysisStore.js";

const AiAnalysisHistorySection = () => {
  console.log('section 렌더링');
  const records = useAnalysisStore((s) => s.records);
  const fetchRecords = useAnalysisStore((s) => s.fetchRecords);

  useEffect( ()=>{
    fetchRecords()
  },[])


  return (
    <Card radius="sm">
      <p className={styles.title}>AI 분석 기록</p>
      {records.length === 0
        ? <HistoryEmpty />
        : <AiAnalysisHistoryList data={records} />
      }
    </Card>
  );
};

export default AiAnalysisHistorySection;
