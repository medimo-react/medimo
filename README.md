# Medimo(메디모) 

처방전 또는 약 이미지를 업로드하면 약 정보를 분석하고, 복용 주의사항과 보관 방법 등을 확인할 수 있는 의약품 정보 서비스입니다.

## 기획 배경
 병원이나 약국에서 받은 약을 시간이 지나 다시 확인하려고 할 때, 약 이름이나 복용 주의사항을 기억하기 어려운 경우가 많습니다.
  
특히 여러 약을 함께 복용하는 경우에는 어떤 약인지, 주의할 점이 무엇인지 쉽게 확인할 수 있는 서비스가 필요하다고 생각했습니다.


## 핵심기능

1. **처방전 스캔 & AI 분석**
약 봉투 또는 처방전을 촬영하면 Gemini AI가 약 이름, 복용법, 주의사항을 자동으로 정리
2. **복약 알림** 
복용 시간을 설정하면 웹 화면에서 제때 알림 확인 (앱 설치 불필요, PWA)
3. **복약 기록 & 북마크** 
과거 처방 내역과 자주 복용하는 약을 폴더별로 관리
4. **타겟 사용자**
    - 의학 용어에 익숙하지 않은 일반인
    - 여러 약을 동시에 복용 중인 환자
    - 가족의 복약을 함께 관리하고 싶은 보호자

🔗 [사이트 바로가기](https://medimo-ecru.vercel.app/)

- 워크플로우
<br/>
<img src="./src/assets/workflow.png" width="500" />


## 주요 기능

## 📅 개발 기간

> 2026.04.20 ~ 2026.05.03

## 👥 프로젝트 팀 소개

|                          프로필                           |  이름  |      역할      | 담당 페이지                                                                                                                                          |                  GitHub                  |
| :-------------------------------------------------------: | :----: | :------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------: |
|  <img src="https://github.com/YUNA9627.png" width="80">   | 배유나 | 팀장, PM, 발표 | 버튼 클릭시 조건별 알림 메시지<br /> 에러/로딩 처리<br /> AI약 요약<br />gemini백엔드 만듦<br /> 웹사이트 설명페이지                                 | [GitHub](https://github.com/minggichae)  |
|  <img src="https://github.com/kkhhjjoo.png" width="80">   | 김현주 |    팀원, PL    | 식약처 API연결<br /> Google Vision API연결<br /> nodejs 서버 만듦<br /> 알림메시지 및 페이지<br /> 북마크 페이지<br />북마크 컴포넌트, 네비게이션 바 |   [GitHub](https://github.com/holyhw)    |
|   <img src="https://github.com/yujsoo.png" width="80">    | 유지수 |      팀원      | 카메라 기능연<br /> 갤러리 연결<br />ai 채팅 내용 북마크 및 북마크 컴포넌트<br /> AI 분석 내용 목록                                                  |   [GitHub](https://github.com/yujsoo)    |
| <img src="https://github.com/leopard0315.png" width="80"> | 김민혁 |      팀원      | 로그인/회원가입<br /> OCR추출 정보 json파일 변환<br /> 주요질문 템플릿화 <br /> 설정                                                                 | [GitHub](https://github.com/leopard0315) |

## ⚙️ 기술 스택

## ⚙️ 기술 스택

| 분류 | 기술 |
| :--- | :--- |
| **프론트엔드** | ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **상태 관리** | ![Zustand](https://img.shields.io/badge/Zustand_5-000000?style=flat-square) |
| **스타일링** | ![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **API / AI** | ![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=flat-square&logo=openai&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) |
| **UI 컴포넌트** | ![radix UI](https://img.shields.io/badge/radix_UI-66E3FF?style=flat-square&logo=headlessui&logoColor=black) |
| **UI/UX 디자인** | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white) |
| **개발 환경** | ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white) |
| **협업 툴** | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white) |
| **배포** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |                                                                    
## 📚 라이브러리 선정 이유

| 기술 스택 | 도입 이유 |
| :--- | :--- |
| React | 컴포넌트 기반 아키텍처를 통한 UI 재사용성 및 개발 생산성 향상 |
| Zustand | 간결한 API와 보일러플레이트 최소화를 통한 효율적인 전역 상태 관리, localStorage persist 기능으로 새로고침 시 상태 유지 |
| CSS Modules | 스코프 격리를 통한 스타일 충돌 방지 및 컴포넌트 단위 스타일 관리 |
| OpenAI API | GPT-4o-mini 모델을 활용한 사용자 맞춤형 모임 카테고리 추천 |
| radix UI | 접근성을 고려한 UI 컴포넌트 (모달, 드롭다운 등) |


- 회의록
# 2026년 4월

| 일 | 월 | 화 | 수 | 목 | 금 | 토 |
|---|---|---|---|---|---|---|
|   |   |   | 1 | 2 | 3 | 4 |
| 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 12 | 13 | 14 | 15 | 16 | 17 | 18 |
| 19 | 20 | 21 | 22 | 23 | 24 | 25 |
| 26 | [27](docs/dailyscrum/0427-데일리스크럼.md) | [28](docs/dailyscrum/0428-데일리스크럼.md) | [29](docs/dailyscrum/0429-데일리스크럼.md) | [30](docs/dailyscrum/0430-데일리스크럼.md) |   |   |

# 2026년 5월
| 일 | 월 | 화 | 수 | 목 | 금 | 토 |
|---|---|---|---|---|---|---|
|   |   |   |   |   | [1](docs/dailyscrum/0501-데일리스크럼.md) | [2](docs/dailyscrum/0502-데일리스크럼.md) |
| [3](docs/dailyscrum/0503-데일리스크럼.md) | 4 | 5 | 6 | 7 | 8 | 9 |
| 10 | 11 | 12 | 13 | 14 | 15 | 16 |
| 17 | 18 | 19 | 20 | 21 | 22 | 23 |
| 24 | 25 | 26 | 27 | 28 | 29 | 30 |
| 31 |   |   |   |   |   |   |