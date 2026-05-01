import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup2.module.css'; 
import { 
  HiOutlineUser, 
  HiOutlinePhone, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeOff 
} from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Signup2 = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(''); 
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    let result = '';

    // 010-0000-0000 형식 로직
    if (value.length < 4) {
      result = value;
    } else if (value.length < 8) {
      result = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      result = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setPhone(result);

    // 유효성 검사: 13자
    if (result.length === 13) {
      setPhoneError('');
    } 
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 입력값이 비어있는지 확인
    if (!formData.name || !phone || !formData.password || !formData.confirmPassword) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    // 비밀번호 일치 여부 확인
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert("회원가입 완료되었습니다!\n가입하신 이메일과 비밀번호로 로그인해주세요");
    navigate('/login');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* 왼쪽 히어로 섹션 (Login과 100% 동일) */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.logoArea}>
              <img src="/logo2 1.png" alt = "MEDIMO Logo" className={styles.logoImage}/>
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
              <span className={styles.step}>1</span>
              <span className={styles.stepLine}></span>
              <span className={`${styles.step} ${styles.active}`}>2</span>
            </div>

            <header className={styles.formHeader}>
              <h2>회원가입</h2>
              <p>계정 정보를 입력해주세요</p>
            </header>

            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>이름</label>
                <div className={styles.inputWrapper}>
                  <HiOutlineUser className={styles.inputIcon} />
                  <input 
                    name="name"
                    type="text"
                    placeholder="이름을 입력해주세요" 
                    className={styles.inputField}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>전화번호</label>
                <div className={styles.inputWrapper}>
                  <HiOutlinePhone className={styles.inputIcon} />
                  <input 
                    type="tel" 
                    placeholder="010-1234-5678" 
                    className={`${styles.inputField} ${phoneError ? styles.inputError : ''}`}
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="13"
                  />
                </div>
                {phoneError && <p className={styles.errorMessage}>{phoneError}</p>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>비밀번호</label>
                <div className={styles.inputWrapper}>
                  <HiOutlineLockClosed className={styles.inputIcon} />
                  <input 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="비밀번호를 입력해주세요" 
                    className={`${styles.inputField} ${passwordError ? styles.inputError : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>비밀번호 확인</label>
                <div className={styles.inputWrapper}>
                  <HiOutlineLockClosed className={styles.inputIcon} />
                  <input 
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="비밀번호를 다시 입력해주세요" 
                    className={`${styles.inputField} ${passwordError ? styles.inputError : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button type="button" className={styles.eyeButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
                {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
              </div>

              <div className={styles.buttonGroup}>
                <button type="button" className={styles.prevButton} onClick={() => navigate(-1)}>
                  이전
                </button>
                <button type="submit" className={styles.submitButton} style={{ marginTop: 0 }}>
                  가입 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup2;