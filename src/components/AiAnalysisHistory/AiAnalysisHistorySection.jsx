import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import styles from './AiAnalysisHistorySection.module.css';
import AiAnalysisHistoryList from './AiAnalysisHistoryList.jsx';
import HistoryEmpty from './HistoryEmpty.jsx';
import {useAnalysisStore} from "../../store/analysisStore.js";

const AiAnalysisHistorySection = ({ limit = 3, showMore = false }) => {
  const records = useAnalysisStore((s) => s.records);
  const fetchRecords = useAnalysisStore((s) => s.fetchRecords);
  const navigate = useNavigate();

  const displayRecords = limit ? records.slice(0, limit) : records;

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Card radius="sm">
      <div className={styles.header}>
        <p className={styles.title}>AI 분석 기록</p>
        {showMore && (
          <button className={styles.more_button} onClick={() => navigate('/history')}>
            더보기
          </button>
        )}
      </div>
      {records.length === 0
        ? <HistoryEmpty />
        : <AiAnalysisHistoryList data={displayRecords} />
      }
    </Card>
  );
};

export default AiAnalysisHistorySection;
