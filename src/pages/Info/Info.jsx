import { useState, useEffect, useRef } from 'react';
import { Dialog } from '@radix-ui/themes';
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import Select from '../../components/Select/Select'

import { useInfoStore } from '../../store/infoStore';
import styles from './Info.module.css';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, current: true });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, current: false });
  }
  return days;
}

function formatDateChip() {
  const now = new Date();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  return `${now.getMonth() + 1}월 ${now.getDate()}일 (${dayNames[now.getDay()]})`;
}

const EMPTY_SCHEDULE_FORM = { name: '', detail: '', time: '' };
const EMPTY_ALARM_FORM = { name: '', times: '', dose: '1정', repeat: '매일' };

export default function Info() {
  const {
    schedules, alarms, doneHistory,
    toggleScheduleDone, toggleAlarm,
    addSchedule, addAlarm,
    deleteAlarm, deleteSchedule,
    soundEnabled, toggleSound,
  } = useInfoStore();

  const [addScheduleOpen, setAddScheduleOpen] = useState(false);
  const [addAlarmOpen, setAddAlarmOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedCalDay, setSelectedCalDay] = useState(null);

  const [scheduleForm, setScheduleForm] = useState(EMPTY_SCHEDULE_FORM);
  const [alarmForm, setAlarmForm] = useState(EMPTY_ALARM_FORM);

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const doneCount = schedules.filter((s) => s.done).length;
  const waitCount = schedules.filter((s) => !s.done && s.state === '복용 대기').length;
  const futureCount = schedules.filter((s) => s.state === '예정').length;
  const missCount = schedules.filter((s) => s.state === '미복용').length;
  const rate = schedules.length > 0 ? Math.round((doneCount / schedules.length) * 100) : 0;

  const handleAddSchedule = () => {
    if (!scheduleForm.name.trim() || !scheduleForm.time) return;
    addSchedule(scheduleForm);
    setScheduleForm(EMPTY_SCHEDULE_FORM);
    setAddScheduleOpen(false);
  };

  const handleAddAlarm = () => {
    if (!alarmForm.name.trim() || !alarmForm.times.trim()) return;
    const times = alarmForm.times.split(',').map((t) => t.trim()).filter(Boolean);
    const rule = `${alarmForm.times} · ${alarmForm.dose} · ${alarmForm.repeat}`;
    addAlarm({ name: alarmForm.name.trim(), rule, times, dose: alarmForm.dose });
    setAlarmForm(EMPTY_ALARM_FORM);
    setAddAlarmOpen(false);
  };

  const playAlarmSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99]; // C5 E5 G5 화음
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.22;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.35, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
        osc.start(t);
        osc.stop(t + 0.55);
      });
      setTimeout(() => ctx.close(), 2500);
    } catch (e) {
      console.error('알림 소리 재생 실패:', e);
    }
  };

  // 앱 시작 시 알림 권한 요청
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const showOsNotification = (matchingAlarms, currentTime) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const names = matchingAlarms.map((a) => a.name).join(', ');
    new Notification('메디모 복용 알림', {
      body: `${currentTime} — ${names} 드실 시간입니다`,
      icon: '/logo-icon.png',
      badge: '/logo-icon.png',
      tag: `medimo-${currentTime}`,
    });
  };

  const sentTodayRef = useRef(new Set());
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${hh}:${mm}`;
      const today = now.toDateString();

      if (!sentTodayRef.current.has(`day-${today}`)) {
        sentTodayRef.current = new Set([`day-${today}`]);
      }

      const matchingAlarms = alarms.filter(
        (a) => a.active && a.times?.includes(currentTime)
      );
      if (matchingAlarms.length === 0) return;

      const key = `${today}-${currentTime}`;
      if (sentTodayRef.current.has(key)) return;
      sentTodayRef.current.add(key);

      showOsNotification(matchingAlarms, currentTime);
      if (soundEnabled) playAlarmSound();
    };

    const interval = setInterval(check, 30000);
    check();
    return () => clearInterval(interval);
  }, [alarms, soundEnabled]);

  const prevMonth = () => {
    const d = new Date(calYear, calMonth - 1);
    setCalYear(d.getFullYear());
    setCalMonth(d.getMonth());
    setSelectedCalDay(null);
  };

  const nextMonth = () => {
    const d = new Date(calYear, calMonth + 1);
    setCalYear(d.getFullYear());
    setCalMonth(d.getMonth());
    setSelectedCalDay(null);
  };

  const safeHistory = (doneHistory && !Array.isArray(doneHistory)) ? doneHistory : {};

  const handleCalDayClick = (cell, dateStr) => {
    if (!cell.current) return;
    setSelectedCalDay((prev) => (prev === dateStr ? null : dateStr));
  };

  const formatCalDayLabel = (dateStr) => {
    if (!dateStr) return '';
    const [, m, d] = dateStr.split('-');
    return `${Number(m)}월 ${Number(d)}일`;
  };

  const calendarDays = buildCalendarDays(calYear, calMonth);
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  return (
    <Container>
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>복용 알림</h1>
          <p className={styles.pageSubTitle}>오늘의 복용 일정을 확인하고 관리하세요</p>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant='outline'
            type="button"
            className={styles.outlineBtn}
            onClick={() => setCalendarOpen(true)}
          >
            캘린더 보기
          </Button>
        </div>
      </div>

      {/* 알림 추가 모달 */}
      <Dialog.Root open={addScheduleOpen} onOpenChange={setAddScheduleOpen}>
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.modalTitle}>알림 추가</Dialog.Title>
          <Dialog.Description className={styles.modalDesc}>
            오늘 복용할 약 일정을 추가합니다.
          </Dialog.Description>
          <div className={styles.formGroup}>
            <label className={styles.label}>약 이름</label>
            <input
              className={styles.input}
              placeholder="예: 타이레놀 정 500mg"
              value={scheduleForm.name}
              onChange={(e) => setScheduleForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>복용 방법</label>
            <input
              className={styles.input}
              placeholder="예: 1정 · 식후 30분"
              value={scheduleForm.detail}
              onChange={(e) => setScheduleForm((f) => ({ ...f, detail: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>복용 시간</label>
            <input
              className={styles.input}
              type="time"
              value={scheduleForm.time}
              onChange={(e) => setScheduleForm((f) => ({ ...f, time: e.target.value }))}
            />
          </div>
          <div className={styles.modalFooter}>
            <Dialog.Close asChild>
              <Button variant='outline' type="button" className={styles.cancelBtn}>취소</Button>
            </Dialog.Close>
            <Button type="button" className={styles.confirmBtn} onClick={handleAddSchedule}>
              추가
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      {/* 새 알림설정 모달 */}
      <Dialog.Root open={addAlarmOpen} onOpenChange={setAddAlarmOpen}>
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.modalTitle}>새 알림 설정</Dialog.Title>
          <Dialog.Description className={styles.modalDesc}>
            반복 복용 알림을 설정합니다.
          </Dialog.Description>
          <div className={styles.formGroup}>
            <label className={styles.label}>약 이름</label>
            <input
              className={styles.input}
              placeholder="예: 메트포르민 정 500mg"
              value={alarmForm.name}
              onChange={(e) => setAlarmForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>알림 시간 (쉼표로 여러 개 입력)</label>
            <input
              className={styles.input}
              placeholder="예: 07:00, 18:00"
              value={alarmForm.times}
              onChange={(e) => setAlarmForm((f) => ({ ...f, times: e.target.value }))}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>용량</label>
              <input
                className={styles.input}
                placeholder="예: 1정씩"
                value={alarmForm.dose}
                onChange={(e) => setAlarmForm((f) => ({ ...f, dose: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>반복</label>
              <select
                className={styles.input}
                value={alarmForm.repeat}
                onChange={(e) => setAlarmForm((f) => ({ ...f, repeat: e.target.value }))}
              >
                <option>매일</option>
                <option>필요 시</option>
                <option>주 3회</option>
                <option>주 5회</option>
              </select>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Dialog.Close asChild>
              <button type="button" className={styles.cancelBtn}>취소</button>
            </Dialog.Close>
            <button type="button" className={styles.confirmBtn} onClick={handleAddAlarm}>
              저장
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      {/* 캘린더 모달 */}
      <Dialog.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
        <Dialog.Content className={styles.calendarModal}>
          <Dialog.Title className={styles.modalTitle}>복용 캘린더</Dialog.Title>
          <div className={styles.calNav}>
            <button type="button" className={styles.calNavBtn} onClick={prevMonth}>{'‹'}</button>
            <span className={styles.calMonthLabel}>
              {calYear}년 {MONTH_NAMES[calMonth]}
            </span>
            <button type="button" className={styles.calNavBtn} onClick={nextMonth}>{'›'}</button>
          </div>
          <div className={styles.calGrid}>
            {DAY_NAMES.map((d) => (
              <div key={d} className={styles.calDayName}>{d}</div>
            ))}
            {calendarDays.map((cell, idx) => {
              const isToday =
                cell.current &&
                cell.day === todayDate &&
                calMonth === todayMonth &&
                calYear === todayYear;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
              const hasDone = cell.current && !!safeHistory[dateStr];
              const isSelected = selectedCalDay === dateStr;
              return (
                <div
                  key={idx}
                  className={[
                    styles.calCell,
                    !cell.current ? styles.calCellOther : styles.calCellClickable,
                    isToday ? styles.calCellToday : '',
                    isSelected ? styles.calCellSelected : '',
                  ].join(' ')}
                  onClick={() => handleCalDayClick(cell, dateStr)}
                >
                  {cell.day}
                  {hasDone && <span className={styles.calDot} />}
                </div>
              );
            })}
          </div>

          {selectedCalDay && (
            <div className={styles.calDayDetail}>
              <div className={styles.calDayDetailHeader}>
                <span className={styles.calDayDetailTitle}>
                  {formatCalDayLabel(selectedCalDay)} 복용 기록
                </span>
                <button
                  type="button"
                  className={styles.calDayDetailClose}
                  onClick={() => setSelectedCalDay(null)}
                >
                  ×
                </button>
              </div>
              {(safeHistory[selectedCalDay] ?? []).length > 0 ? (
                <ul className={styles.calDayDetailList}>
                  {safeHistory[selectedCalDay].map((med, i) => (
                    <li key={i} className={styles.calDayDetailItem}>{med}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.calDayDetailEmpty}>복용 기록이 없습니다.</p>
              )}
            </div>
          )}

          <div className={styles.calLegend}>
            <span className={styles.calLegendDot} /> 복용 기록 있음
          </div>
          <div className={styles.modalFooter}>
            <Dialog.Close asChild>
              <button type="button" className={styles.confirmBtn}>닫기</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      <div className={styles.grid}>
        <section className={styles.leftCol}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>오늘의 복용 일정</h2>
              <span className={styles.dateChip}>{formatDateChip()}</span>
            </div>
            <div className={styles.list}>
              {schedules.map((item) => (
                <div key={item.id} className={styles.scheduleItem}>
                  <span className={`${styles.dot} ${item.done ? styles.dotDone : styles.dotWait}`} />
                  <strong className={styles.time}>{item.time}</strong>
                  <div className={styles.scheduleInfo}>
                    <p className={styles.medicine}>{item.name}</p>
                    <p className={styles.detail}>{item.detail}</p>
                  </div>
                  <span className={`${styles.status} ${item.done ? styles.statusDone : styles.statusWait}`}>
                    {item.state}
                  </span>
                  <button
                    type="button"
                    className={`${styles.doneBtn} ${item.done ? styles.doneBtnDone : ''}`}
                    onClick={() => toggleScheduleDone(item.id)}
                    aria-label={item.done ? '복용 취소' : '복용 완료'}
                  >
                    {item.done ? '✓' : '○'}
                  </button>
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => deleteSchedule(item.id)}
                    aria-label="삭제"
                  >
                    ×
                  </button>
                </div>
              ))}
              {schedules.length === 0 && (
                <p className={styles.emptyMsg}>오늘 등록된 복용 일정이 없습니다.</p>
              )}
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>알림 설정 목록</h2>
              <button
                type="button"
                className={styles.outlineBtnSmall}
                onClick={() => setAddAlarmOpen(true)}
              >
                + 새 알림설정
              </button>
            </div>
            <div className={styles.list}>
              {alarms.map((item) => (
                <div key={item.id} className={styles.alarmItem}>
                  <div className={styles.alarmInfo}>
                    <p className={styles.medicine}>{item.name}</p>
                    <p className={styles.detail}>{item.rule}</p>
                  </div>
                  <span className={styles.toggleLabel}>{item.active ? '활성' : '비활성'}</span>
                  <button
                    type="button"
                    className={`${styles.toggle} ${item.active ? styles.toggleOn : ''}`}
                    onClick={() => toggleAlarm(item.id)}
                    aria-label="toggle"
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => deleteAlarm(item.id)}
                    aria-label="삭제"
                  >
                    ×
                  </button>
                </div>
              ))}
              {alarms.length === 0 && (
                <p className={styles.emptyMsg}>등록된 알림 설정이 없습니다.</p>
              )}
            </div>
          </article>
        </section>

        <aside className={styles.rightCol}>
          <article className={styles.card}>
            <h3 className={styles.sideTitle}>오늘의 복용률</h3>
            <div
              className={`${styles.rateCircle} ${rate === 100 ? styles.rateCircleFull : ''}`}
              style={{ '--rate': `${rate}%` }}
            >
              <span>{rate}%</span>
            </div>
            <div className={styles.metrics}>
              <div className={`${styles.metric} ${styles.metricDone}`}>복용 완료 {doneCount}</div>
              <div className={`${styles.metric} ${styles.metricWait}`}>대기 중 {waitCount}</div>
              <div className={`${styles.metric} ${styles.metricFuture}`}>예정 {futureCount}</div>
              <div className={`${styles.metric} ${styles.metricMiss}`}>미복용 {missCount}</div>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.quickSetting}>
              <h4>빠른 설정</h4>
              <button
                type="button"
                className={`${styles.settingBtn} ${soundEnabled ? styles.settingBtnOn : ''}`}
                onClick={toggleSound}
              >
                {soundEnabled ? '🔔 알림 소리 켜짐' : '🔕 알림 소리 꺼짐'}
              </button>
            </div>
          </article>
        </aside>
      </div>
      </div>
    </Container>  
  );
}
