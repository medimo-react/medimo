import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_SCHEDULES = [
  { id: 1, time: '07:00', name: '메트포르민 정 500mg', detail: '1정 · 식후 30분', state: '복용 완료', done: true },
  { id: 2, time: '08:00', name: '암로디핀 정 5mg', detail: '1정', state: '복용 완료', done: true },
  { id: 3, time: '12:00', name: '타이레놀 정 500mg', detail: '1정 · 식후 복용', state: '복용 대기', done: false },
  { id: 4, time: '13:00', name: '오메프라졸 캡슐 20mg', detail: '1캡슐', state: '예정', done: false },
];

const INITIAL_ALARMS = [
  { id: 1, name: '메트포르민 정 500mg', rule: '07:00, 18:00 · 1정씩 · 매일', times: ['07:00', '18:00'], active: true },
  { id: 2, name: '암로디핀 정 5mg', rule: '08:00 · 1정씩 · 매일', times: ['08:00'], active: true },
  { id: 3, name: '타이레놀 정 500mg', rule: '12:00 · 1정씩 · 필요 시', times: ['12:00'], active: true },
  { id: 4, name: '오메프라졸 캡슐 20mg', rule: '13:00 · 1캡슐 · 매일', times: ['13:00'], active: false },
];

export const useInfoStore = create(
  persist(
    (set) => ({
      schedules: INITIAL_SCHEDULES,
      alarms: INITIAL_ALARMS,
      soundEnabled: true,

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      toggleScheduleDone: (id) =>
        set((s) => ({
          schedules: s.schedules.map((item) =>
            item.id === id
              ? { ...item, done: !item.done, state: !item.done ? '복용 완료' : '복용 대기' }
              : item
          ),
        })),

      toggleAlarm: (id) =>
        set((s) => ({
          alarms: s.alarms.map((alarm) =>
            alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
          ),
        })),

      addSchedule: ({ name, detail, time }) =>
        set((s) => ({
          schedules: [
            ...s.schedules,
            { id: Date.now(), time, name, detail, state: '예정', done: false },
          ].sort((a, b) => a.time.localeCompare(b.time)),
        })),

      addAlarm: ({ name, rule, times }) =>
        set((s) => ({
          alarms: [...s.alarms, { id: Date.now(), name, rule, times: times ?? [], active: true }],
        })),

      deleteAlarm: (id) =>
        set((s) => ({ alarms: s.alarms.filter((alarm) => alarm.id !== id) })),

      deleteSchedule: (id) =>
        set((s) => ({ schedules: s.schedules.filter((item) => item.id !== id) })),
    }),
    {
      name: 'medimo-info-store',
      partialize: (state) => ({ schedules: state.schedules, alarms: state.alarms, soundEnabled: state.soundEnabled }),
    }
  )
);
