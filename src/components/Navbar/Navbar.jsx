import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuScanLine, LuHistory } from "react-icons/lu";
import { FaPills } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { useUserStore } from "../../store/userStore";
import { HiOutlineLogout } from "react-icons/hi";

import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  {
    id: "prescription",
    label: "AI 처방전 분석",
    path: "/dashboard",
    icon: <LuScanLine />,
  },
  {
    id: "medicine",
    label: "내 약 목록",
    path: "/medicine",
    icon: <FaPills />,
  },
  { id: "alert", label: "알림", path: "/alert", icon: <HiOutlineBellAlert /> },
  { id: "history", label: "AI 분석 기록", path: "/history", icon: <LuHistory /> },
];

const user = {
  name: "사용자",
  email: "user@email.com",
  initial: "사",
};

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { name, email, isLoggedIn,clearUser } = useUserStore();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      clearUser(); 
      navigate("/"); 
    }
  };

  const displayUser = {
    name: isLoggedIn && name ? name : "로그인 필요",
    email: isLoggedIn && email ? email : "로그인 해주세요",
    initial: name ? name[0] : "사",
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsOpen(true)}
          aria-label="메뉴 열기"
        >
          <FiMenu />
        </button>
      )}

      {isOpen && (
        <button
          type="button"
          className={styles.backdrop}
          onClick={() => setIsOpen(false)}
          aria-label="메뉴 닫기"
        />
      )}

      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <button
            type="button"
            className={styles.logoButton}
            onClick={() => handleNavigate("/dashboard")}
            aria-label="대시보드로 이동"
          >
            <img src="/logo.png" alt="로고" />
          </button>
        </div>

        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`${styles.navItem} ${
                  pathname === item.path ? styles.active : ""
                }`}
                onClick={() => handleNavigate(item.path)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            </li>
          ))}

          {isLoggedIn && (
            <li className={styles.logoutWrapper}>
              <button
                type="button"
                className={styles.navItem} 
                onClick={handleLogout}
              >
                <span className={styles.navIcon}><HiOutlineLogout /></span>
                <span className={styles.navLabel}>로그아웃</span>
              </button>
            </li>
          )}
        </ul>

        <div className={styles.bottom}>
          <button
            type="button"
            className={`${styles.helpButton} ${
              pathname === "/about" ? styles.active : ""
            }`}
            onClick={() => handleNavigate("/about")}
          >
            <span className={styles.navIcon}>
              <AiOutlineQuestionCircle />
            </span>
            <span className={styles.navLabel}>도움말</span>
          </button>

          <button type="button" className={styles.userProfile} onClick={() => handleNavigate("/Mypage")}>
            <div className={styles.userAvatar}>{displayUser.initial}</div>

            <div className={styles.userInfo}>
              <span className={styles.userName}>{displayUser.name}</span>
              <span className={styles.userEmail}>{displayUser.email}</span>
            </div>

            <MdOutlineKeyboardArrowRight className={styles.chevron} />
          </button>
        </div>
      </nav>
    </>
  );
}
