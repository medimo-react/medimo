import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; 
import { HiArrowRight, HiOutlineMail } from 'react-icons/hi';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* 왼쪽 히어로 섹션 (로그인과 동일한 결 유지) */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.logoArea}>
              <div className={styles.logoSymbol}>💊</div>
              <span className={styles.logoText}>MEDIMO AI</span>
            </div>
            <h1 className={styles.mainTitle}>
              처방전 사진 한 장으로<br />
              약 정보를 한눈에
            </h1>
            <p className={styles.subTitle}>
              AI가 처방전을 분석하여 약의 효능, 부작용,<br />
              주의사항을 쉽게 알려드립니다.
            </p>
          </div>
          <div className={styles.heroFooter}>
            <div className={styles.userAvatars}>
              {['A', 'B', 'C', 'D'].map((l) => <span key={l} className={styles.avatar}>{l}</span>)}
            </div>
            <p className={styles.userCount}>10,000+ 사용자가 이용 중</p>
          </div>
        </div>

        {/* 오른쪽 회원가입 폼 섹션 (전달해주신 이미지 디자인 반영) */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <header className={styles.formHeader}>
              <h2 className={styles.signupTitle}>회원가입</h2>
            </header>

            <form className={styles.signupForm}>
              <div className={styles.inputGroup}>
                <label className={styles.instructionText}>
                  회원가입을 위한 이메일주소를 알려주세요!
                </label>
                <div className={styles.inputWrapper}>
                  <input 
                    type="email" 
                    placeholder="example@medimo.com" 
                    className={styles.inputField}
                  />
                </div>
              </div>

              <button type="submit" className={styles.nextButton}>
                다음
              </button>
            </form>

            <footer className={styles.formFooter}>
              이미 계정이 있으신가요? 
              <span className={styles.textLink} onClick={() => navigate('/')}> 로그인</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;