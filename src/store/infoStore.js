import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_SCHEDULES = [];
const INITIAL_ALARMS = [];

export const useInfoStore = create(
  persist(
    (set) => ({
      schedules: INITIAL_SCHEDULES,
      alarms: INITIAL_ALARMS,
      soundEnabled: true,
      doneHistory: {},

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      toggleScheduleDone: (id) =>
        set((s) => {
          const target = s.schedules.find((i) => i.id === id);
          if (!target) return s;
          const willBeDone = !target.done;
          const updatedSchedules = s.schedules.map((item) =>
            item.id === id
              ? { ...item, done: !item.done, state: !item.done ? '복용 완료' : '복용 대기' }
              : item
          );

          const today = new Date().toISOString().slice(0, 10);
          const base = (s.doneHistory && !Array.isArray(s.doneHistory)) ? s.doneHistory : {};
          const dayMeds = [...(base[today] ?? [])];

          if (willBeDone) {
            if (!dayMeds.includes(target.name)) dayMeds.push(target.name);
          } else {
            const idx = dayMeds.indexOf(target.name);
            if (idx !== -1) dayMeds.splice(idx, 1);
          }

          const newHistory = { ...base };
          if (dayMeds.length > 0) {
            newHistory[today] = dayMeds;
          } else {
            delete newHistory[today];
          }

          return { schedules: updatedSchedules, doneHistory: newHistory };
        }),

      toggleAlarm: (id) =>
        set((s) => {
          const alarm = s.alarms.find((a) => a.id === id);
          if (!alarm) return s;
          const willBeActive = !alarm.active;

          let newSchedules;
          if (!willBeActive) {
            // 비활성화: 연결된 복용 일정 제거 (alarmId 기준, 없으면 이름으로 매칭)
            newSchedules = s.schedules.filter(
              (item) => !(item.alarmId === id || (item.alarmId == null && item.name === alarm.name))
            );
          } else {
            // 활성화: 아직 없는 시간대만 복용 일정에 추가
            const existingTimes = new Set(
              s.schedules
                .filter((item) => item.alarmId === id || (item.alarmId == null && item.name === alarm.name))
                .map((item) => item.time)
            );
            const toAdd = (alarm.times ?? [])
              .filter((time) => !existingTimes.has(time))
              .map((time, i) => ({
                id: Date.now() + i + 1,
                time,
                name: alarm.name,
                detail: alarm.dose || alarm.rule,
                state: '예정',
                done: false,
                alarmId: id,
              }));
            newSchedules = [...s.schedules, ...toAdd].sort((a, b) => a.time.localeCompare(b.time));
          }

          return {
            alarms: s.alarms.map((a) => (a.id === id ? { ...a, active: willBeActive } : a)),
            schedules: newSchedules,
          };
        }),

      addSchedule: ({ name, detail, time }) =>
        set((s) => ({
          schedules: [
            ...s.schedules,
            { id: Date.now(), time, name, detail, state: '예정', done: false },
          ].sort((a, b) => a.time.localeCompare(b.time)),
        })),

      addAlarm: ({ name, rule, times, dose }) =>
        set((s) => {
          const alarmId = Date.now();
          const newSchedules = (times ?? []).map((time, i) => ({
            id: alarmId + i + 1,
            time,
            name,
            detail: dose || rule,
            state: '예정',
            done: false,
            alarmId,
          }));
          return {
            alarms: [...s.alarms, { id: alarmId, name, rule, times: times ?? [], active: true, dose }],
            schedules: [...s.schedules, ...newSchedules].sort((a, b) => a.time.localeCompare(b.time)),
          };
        }),

      deleteAlarm: (id) =>
        set((s) => ({
          alarms: s.alarms.filter((alarm) => alarm.id !== id),
          schedules: s.schedules.filter((item) => item.alarmId !== id),
        })),

      deleteSchedule: (id) =>
        set((s) => ({ schedules: s.schedules.filter((item) => item.id !== id) })),
    }),
    {
      name: 'medimo-info-store',
      version: 1,
      partialize: (state) => ({ schedules: state.schedules, alarms: state.alarms, soundEnabled: state.soundEnabled, doneHistory: state.doneHistory }),
    }
  )
);
