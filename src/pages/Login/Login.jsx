import React, { useState } from 'react';
import styles from './Login.module.css';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiArrowRight } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* 왼쪽 히어로 섹션 (Brand Section) */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.logoArea}>
              <div className={styles.logoSymbol}>💊</div>
              <span className={styles.logoText}>MEDIMO</span>
            </div>
            
            <h1 className={styles.mainTitle}>
              사진 한 장으로<br />
              약 정보를 한눈에
            </h1>
            <p className={styles.subTitle}>
              촬영된 사진을 분석하여 약의 효능, 부작용,<br />
              주의사항 등 간단하게 알려드립니다.
            </p>
          </div>

          <div className={styles.heroFooter}>
            <div className={styles.userAvatars}>
              {['A', 'B', 'C', 'D'].map((label) => (
                <span key={label} className={styles.avatar}>{label}</span>
              ))}
            </div>
            <p className={styles.userCount}>1,000+ 사용자가 이용 중</p>
          </div>
        </div>

        {/* 오른쪽 폼 섹션 (Auth Section) */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <header className={styles.formHeader}>
              <h2>로그인</h2>
              <p>계정에 로그인하여 서비스를 이용하세요</p>
            </header>

            <form className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>이메일</label>
                <div className={styles.inputWrapper}>
                  <HiOutlineMail className={styles.inputIcon} />
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelWrapper}>
                  <label className={styles.label}>비밀번호</label>
                  <a href="#" className={styles.textLink}>비밀번호 찾기</a>
                </div>
                <div className={styles.inputWrapper}>
                  <HiOutlineLockClosed className={styles.inputIcon} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="비밀번호 입력" 
                    className={styles.inputField}
                  />
                  <button 
                    type="button" 
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                로그인 <HiArrowRight />
              </button>
            </form>

            <div className={styles.divider}>
              <span>또는</span>
            </div>

            <div className={styles.socialGroup}>
              <button className={styles.socialBtn}>
                <FcGoogle size={20} /> Google
              </button>
              <button className={styles.socialBtn}>
                <FaGithub size={20} /> GitHub
              </button>
            </div>

            <footer className={styles.formFooter}>
              계정이 없으신가요? <a href="#" className={styles.textLink}>회원가입</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;