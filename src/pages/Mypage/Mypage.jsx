import React, { useState, useEffect } from "react";
import Container from "../../components/Container/Container.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/Button/Button.jsx";
import Badge from "../../components/Badge/Badge.jsx";
import { useUserStore } from "../../store/userStore.js"; 
import Modal from "../../components/Modal/Modal.jsx";
import { useNavigate } from "react-router-dom";

import styles from "./Mypage.module.css";

const MyPage = () => {

  const { name, email, token, setUser } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      setTempName(name);
    }
  }, [name]);

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempName(name);
    setIsEditing(false);
  };

  const handleSave = () => {
    setUser({ 
      email, 
      name: tempName, 
      token 
    });
    alert("기본 정보가 수정되었습니다.");
    setIsEditing(false);
  };

  const handlePasswordCancel = () => {
    setIsPasswordEditing(false);
  };

  const handlePasswordSave = () => {
    // API 로직 추가
    alert("비밀번호가 변경되었습니다.");
    setIsPasswordEditing(false);
  };
    
  return (
    <Container>
      <PageHeader title="마이페이지" />

      <div className={styles.myPage}>
        <section className={styles.topGrid}>
          <Card radius="sm" className={styles.infoCard}>
            <div className={styles.cardHeaderInline}>
              <p className={styles.cardTitle}>개인정보 관리</p>
              <Badge variant="primary" size="sm">기본 정보</Badge>
            </div>
            
            <div className={styles.profileContent}>
              <div className={styles.avatar}>
                {name ? name.charAt(0) : "?"}
              </div>
              <div className={styles.formGroup}>
                <div className={styles.inputItem}>
                  <label>이름</label>
                  <input 
                    type="text" 
                    value={tempName} 
                    onChange={(e) => setTempName(e.target.value)}
                    disabled={!isEditing}
                    className={isEditing ? styles.input : styles.readOnlyInput} 
                  />
                </div>
                <div className={styles.inputItem}>
                  <label>이메일</label>
                  <input 
                    type="text" 
                    value={email} 
                    readOnly 
                    className={styles.readOnlyInput} 
                  />
                </div>
              </div>
            </div>

            {/* 버튼 쪼개서 나란히 배치 */}
            <div className={styles.buttonGroup}>
              {!isEditing ? (
                <Button variant="outline" size="small" onClick={handleEditToggle}>
                  정보 수정
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="small" onClick={() => setIsEditing(false)}>
                    취소
                  </Button>
                  <Button size="small" onClick={handleSave}>
                    저장
                  </Button>
                </>
              )}
            </div>
          </Card>

          {/* 비밀번호 변경 섹션 */}
          <Card radius="sm" className={styles.passwordCard}>
            <p className={styles.cardTitle}>비밀번호 변경</p>
            <div className={styles.formGroup}>
              <div className={styles.inputItem}>
                <label>현재 비밀번호</label>
                <input type="password" placeholder="현재 비밀번호" className={styles.input} disabled={isPasswordEditing} />
              </div>
              <div className={styles.inputItem}>
                <label>새 비밀번호</label>
                <input type="password" placeholder="새 비밀번호" className={styles.input} disabled = {!isPasswordEditing}/>
              </div>
              <div className={styles.inputItem}>
                <label>새 비밀번호 확인</label>
                <input type="password" placeholder="비밀번호 확인" className={styles.input} disabled={!isPasswordEditing} />
              </div>
            </div>
            <div className={styles.buttonArea}>
                    {!isPasswordEditing ? (
            <Button variant="outline" size="small" onClick={() => setIsPasswordEditing(true)}>
                비밀번호 수정
            </Button>
            ) : (
            <>
                <Button variant="outline" size="small" onClick={handlePasswordCancel}>
                취소
                </Button>
                <Button size="small" onClick={handlePasswordSave}>
                저장
                </Button>
            </>
            )}
            </div>
          </Card>
        </section>

        {/* 계정 관리 영역 */}
        <section className={styles.bottomGrid}>
          <Card radius="sm" className={styles.dangerCard}>
            <div className={styles.recentHeader}>
              <div>
                <p className={styles.cardTitle}>계정 관리</p>
                <p className={styles.dangerDesc}>
                  계정을 삭제하면 모든 분석 내역과 복약 알림 데이터가 즉시 파기되며 복구할 수 없습니다.
                </p>
              </div>
              <Button variant="danger" size="small" onClick={() => setShowDeleteModal(true)}>
                회원 탈퇴
              </Button>
            </div>
          </Card>
        </section>

        {/* 모달 관리 영역 */}
        <Modal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          iconType="warning"
          variant="destructive"
          title="정말 탈퇴하시나요?"
          description="계정을 삭제하면 모든 분석 내역과 복약 알림 데이터가 즉시 파기되며 복구할 수 없습니다."
          confirmText="탈퇴하기"
          cancelText="취소"
          onConfirm={() => {
            // 탈퇴 API 로직 추가
            setShowDeleteModal(false);
            alert("회원 탈퇴가 완료되었습니다.");
            navigate("/");
          }}
        />
      </div>
    </Container>
  );
};

export default MyPage;