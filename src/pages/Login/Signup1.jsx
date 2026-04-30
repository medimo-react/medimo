import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup1.module.css'; 
import { HiOutlineMail, HiArrowRight } from 'react-icons/hi';

const Signup1 = () => {
    const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNextStep = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    if (!email.trim()) {
      setError('이메일을 입력해주세요.');
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    setError('');
    navigate('/signup2');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>

        {/* 왼쪽 히어로 섹션: 언제나 동일하게 유지 */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.logoArea}>
              {/* <div className={styles.logoSymbol}>💊</div>
              <span className={styles.logoText}>MEDIMO</span> */}
              <img src="/logo.png" alt = "MEDIMO Logo" className={styles.logoImage}/>
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

        {/* 오른쪽 폼 섹션 */}
        <div className={styles.formSection}>
          <div className={styles.formCard}>
            
            <div className={styles.stepIndicator}>
              <span className={`${styles.step} ${styles.active}`}>1</span>
              <span className={styles.stepLine}></span>
              <span className={styles.step}>2</span>
            </div>

            <header className={styles.formHeader}>
              <h2>회원가입</h2>
              <p>이메일 주소를 입력해주세요</p>
            </header>

            <form className={styles.loginForm} onSubmit={handleNextStep}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>이메일</label>
                <div className={styles.inputWrapper}>
                  <HiOutlineMail className={styles.inputIcon} />
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className={`${styles.inputField} ${error ? styles.inputError : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(''); 
                    }}
                  />
                </div>
                {/* 에러 메시지 표시 */}
                {error && <p className={styles.errorMessage}>{error}</p>}
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
              >
                다음 단계 <HiArrowRight />
              </button>
            </form>

           <footer className={styles.formFooter}>
              이미 계정이 있으신가요? 
              <span className={styles.textLink} onClick={() => navigate('/login')}> 로그인</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup1;