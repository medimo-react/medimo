import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import styles from './AiAnalysisHistorySection.module.css';
import AiAnalysisHistoryList from './AiAnalysisHistoryList.jsx';
import HistoryEmpty from './HistoryEmpty.jsx';
import { fetchAnalysisList } from '../../api/analysisApi.js';

const AiAnalysisHistorySection = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAnalysisList()
      .then(setRecords)
      .catch(console.error);
  }, []);

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
