
import styles from './Info.module.css';

const todaySchedules = [
  { time: '07:00', name: '메트포르민 정 500mg', detail: '1정 · 식후 30분', state: '복용 완료', done: true },
  { time: '08:00', name: '암로디핀 정 5mg', detail: '1정', state: '복용 완료', done: true },
  { time: '12:00', name: '타이레놀 정 500mg', detail: '1정 · 식후 복용', state: '복용 대기', done: false },
  { time: '13:00', name: '오메프라졸 캡슐 20mg', detail: '1캡슐', state: '예정', done: false },
];

const alarmSettings = [
  { name: '메트포르민 정 500mg', rule: '07:00, 18:00 · 1정씩 · 매일', active: true },
  { name: '암로디핀 정 5mg', rule: '08:00 · 1정씩 · 매일', active: true },
  { name: '타이레놀 정 500mg', rule: '12:00 · 1정씩 · 필요 시', active: true },
  { name: '오메프라졸 캡슐 20mg', rule: '13:00 · 1캡슐 · 매일', active: false },
];

export default function Info() {
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>복용 알림</h1>
          <p className={styles.pageSubTitle}>오늘의 복용 일정을 확인하고 관리하세요</p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.outlineBtn}>캘린더 보기</button>
          <button type="button" className={styles.primaryBtn}>+ 알림 추가</button>
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.leftCol}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>오늘의 복용 일정</h2>
              <span className={styles.dateChip}>4월 22일 (수)</span>
            </div>
            <div className={styles.list}>
              {todaySchedules.map((item) => (
                <div key={`${item.time}-${item.name}`} className={styles.scheduleItem}>
                  <span className={`${styles.dot} ${item.done ? styles.dotDone : styles.dotWait}`} />
                  <strong className={styles.time}>{item.time}</strong>
                  <div className={styles.scheduleInfo}>
                    <p className={styles.medicine}>{item.name}</p>
                    <p className={styles.detail}>{item.detail}</p>
                  </div>
                  <span className={`${styles.status} ${item.done ? styles.statusDone : styles.statusWait}`}>
                    {item.state}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>알림 설정 목록</h2>
              <button type="button" className={styles.outlineBtnSmall}>+ 새 알림설정</button>
            </div>
            <div className={styles.list}>
              {alarmSettings.map((item) => (
                <div key={item.name} className={styles.alarmItem}>
                  <div className={styles.alarmInfo}>
                    <p className={styles.medicine}>{item.name}</p>
                    <p className={styles.detail}>{item.rule}</p>
                  </div>
                  <span className={styles.toggleLabel}>{item.active ? '활성' : '비활성'}</span>
                  <button type="button" className={`${styles.toggle} ${item.active ? styles.toggleOn : ''}`} aria-label="toggle">
                    <span className={styles.toggleThumb} />
                  </button>
                </div>
              ))}
            </div>
          </article>
        </section>

        <aside className={styles.rightCol}>
          <article className={styles.card}>
            <h3 className={styles.sideTitle}>오늘의 복용률</h3>
            <div className={styles.rateCircle}>33%</div>
            <div className={styles.metrics}>
              <div className={`${styles.metric} ${styles.metricDone}`}>복용 완료 2</div>
              <div className={`${styles.metric} ${styles.metricWait}`}>대기 중 1</div>
              <div className={`${styles.metric} ${styles.metricFuture}`}>예정 3</div>
              <div className={`${styles.metric} ${styles.metricMiss}`}>미복용 0</div>
            </div>
          </article>

          <article className={styles.card}>
            <h3 className={styles.sideTitle}>주간 통계</h3>
            <div className={styles.statRow}>
              <span>복용 순응도</span>
              <strong>89%</strong>
            </div>
            <div className={styles.progress}>
              <span />
            </div>
            <div className={styles.quickSetting}>
              <h4>빠른 설정</h4>
              <button type="button" className={styles.settingBtn}>알림 소리</button>
              <button type="button" className={styles.settingBtn}>미리 알림</button>
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}