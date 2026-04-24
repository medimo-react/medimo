import { useNavigate, useLocation } from 'react-router-dom';
import { LuScanLine, LuHistory } from 'react-icons/lu';
import { FaPills } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { HiOutlineBellAlert } from "react-icons/hi2";
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { id: 'prescription', label: '처방전 분석', path: '/',            icon: <LuScanLine /> },
  { id: 'medications',  label: '내 약 목록',  path: '/medications', icon: <FaPills /> },
  { id: 'bookmark', label: '북마크', path: '/bookmark', icon: <BsBookmark /> },
  { id: 'alert', label: '알림', path: '/alert', icon: <HiOutlineBellAlert />},
  { id: 'history',      label: '분석 기록',   path: '/history',     icon: <LuHistory /> },
  { id: 'settings',     label: '설정',        path: '/settings',    icon: <IoSettingsOutline /> },
];

const user = {
  name: '사용자',
  email: 'user@email.com',
  initial: '사',
};

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className={styles.sidebar}>
      {/* 로고 */}
      <div className={styles.logo}>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}><img src="/logo.png" alt="로고" /></span>
          <span className={styles.logoSub}>AI 처방전 도우미</span>
        </div>
      </div>

      {/* 메인 메뉴 */}
      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* 하단 */}
      <div className={styles.bottom}>
        <button className={styles.helpButton}>
          <span className={styles.navIcon}><AiOutlineQuestionCircle /></span>
          <span className={styles.navLabel}>도움말</span>
        </button>

        <button className={styles.userProfile}>
          <div className={styles.userAvatar}>{user.initial}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
          <MdOutlineKeyboardArrowRight className={styles.chevron} />
        </button>
      </div>
    </nav>
  );
}
