import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * 복용 알림 이메일 전송
 * @param {Object} params
 * @param {string} params.toEmail    - 수신자 이메일
 * @param {string} params.toName     - 수신자 이름
 * @param {Array}  params.medicines  - 해당 시간에 복용할 약 목록 [{ name, rule }]
 * @param {string} [params.time]     - 알람 시각 (자동 발송 시)
 */
export async function sendReminderEmail({ toEmail, toName, medicines, time }) {
  const names = medicines.map((m) => m.name).join(', ');
  const message = `${names} 드실 시간입니다`;

  const medicineList = medicines
    .map((m) => `• ${m.name}\n  ${m.rule}`)
    .join('\n');

  const date = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: toEmail,
      to_name: toName || '사용자',
      message,
      medicine_list: medicineList,
      time: time ?? '',
      date,
    },
    PUBLIC_KEY
  );
}
