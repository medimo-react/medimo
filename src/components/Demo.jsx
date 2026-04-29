import React, { useState } from "react";

import Button from "./Button/Button";
import Card from "./Card/Card";
import Input from "./Input/Input";
import Form from "./Form/Form";
import PageHeader from "./PageHeader/PageHeader";
import Container from "./Container/Container";
import Badge from "./Badge/Badge";
import Modal from "./Modal/Modal";
import Textarea from "./Textarea/Textarea";
import Select from "./Select/Select";
import Checkbox from "./Checkbox/Checkbox";
import Radio from "./Radio/Radio";
import Pagination from "./Pagination/Pagination";
import Tabs from "./Tabs/Tabs";
import {
  FiCheck,
  FiX,
  FiInfo,
  FiAlertTriangle,
  FiSearch,
  FiPlus,
  FiSettings,
  FiTrash2,
  FiHeart,
  FiStar,
} from "react-icons/fi";

const codeBoxStyle = {
  marginTop: "12px",
  padding: "18px",
  borderRadius: "var(--radius-md)",
  backgroundColor: "#1f2937",
  color: "#f9fafb",
  fontSize: "var(--font-size-small)",
  fontWeight: "var(--font-weight-regular)",
  lineHeight: "var(--line-height-body)",
  whiteSpace: "pre-wrap",
  overflowX: "auto",
};

const codeToggleWrapStyle = {
  marginTop: "20px",
};

const codeToggleButtonStyle = {
  padding: "18px 88px",
  backgroundColor: "var(--text-color)",
  color: "var(--background-color)",
};

const CodeToggle = ({ children, title = "코드 보기" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={codeToggleWrapStyle}>
      <Button
        type="button"
        variant="outline"
        size="small"
        style={codeToggleButtonStyle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "코드 닫기" : title}
      </Button>

      {isOpen && <pre style={codeBoxStyle}>{children}</pre>}
    </div>
  );
};

const Demo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("폼 제출");
  };

  const [currentPage, setCurrentPage] = useState(1);

  const primaryButtonStyle = {
    backgroundColor: "var(--primary-color)",
    border: "1px solid var(--primary-color)",
    color: "var(--background-color)",
  };

  const outlineButtonStyle = {
    backgroundColor: "transparent",
    border: "1px solid var(--primary-color)",
    boxShadow: "none",
    color: "var(--primary-color)",
  };

  const dangerButtonStyle = {
    backgroundColor: "#e5484d",
    border: "1px solid #e5484d",
    color: "var(--background-color)",
  };

  const disabledButtonStyle = {
    backgroundColor: "var(--border-color)",
    border: "1px solid var(--border-color)",
    color: "var(--sub-text-color)",
  };

  const sectionTitleStyle = {
    margin: 0,
    fontSize: "var(--font-size-title-md)",
    fontWeight: "var(--font-weight-bold)",
    lineHeight: "var(--line-height-title)",
  };

  const subTitleStyle = {
    marginTop: "24px",
    marginBottom: "12px",
    fontSize: "var(--font-size-title-sm)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-title)",
  };

  const smallTextStyle = {
    margin: 0,
    color: "var(--sub-text-color)",
    fontSize: "var(--font-size-small)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-small)",
  };

  const bodyTextStyle = {
    margin: 0,
    fontSize: "var(--font-size-body)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body)",
    color: "var(--text-color)",
  };

  const cardTitleStyle = {
    fontSize: "var(--font-size-body)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-body)",
  };

  const cardTextStyle = {
    marginBottom: 0,
    color: "var(--sub-text-color)",
    fontSize: "var(--font-size-small)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-small)",
  };

  const guideBoxStyle = {
    marginTop: "20px",
    padding: "14px 16px",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-md)",
    backgroundColor: "#f8f8ff",
    color: "var(--text-color)",
    fontSize: "var(--font-size-small)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-small)",
  };

  const colorCodeStyle = {
    display: "inline-block",
    marginTop: "8px",
    padding: "4px 8px",
    borderRadius: "var(--radius-sm)",
    backgroundColor: "#f3f4f6",
    color: "var(--text-color)",
    fontSize: "var(--font-size-caption)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-small)",
  };

  const colorList = [
    {
      name: "--primary-color",
      value: "#6367FF",
      usage: "var(--primary-color)",
    },
    {
      name: "--secondary-color",
      value: "#8494FF",
      usage: "var(--secondary-color)",
    },
    {
      name: "--background-color",
      value: "#FFFFFF",
      usage: "var(--background-color)",
    },
    {
      name: "--text-color",
      value: "#1A1A1A",
      usage: "var(--text-color)",
    },
    {
      name: "--sub-text-color",
      value: "#8f8f8f",
      usage: "var(--sub-text-color)",
    },
    {
      name: "--border-color",
      value: "#dbdbdb",
      usage: "var(--border-color)",
    },
  ];

  const iconList = [
    { name: "FiCheck", icon: <FiCheck /> },
    { name: "FiX", icon: <FiX /> },
    { name: "FiInfo", icon: <FiInfo /> },
    { name: "FiAlertTriangle", icon: <FiAlertTriangle /> },
    { name: "FiSearch", icon: <FiSearch /> },
    { name: "FiPlus", icon: <FiPlus /> },
    { name: "FiSettings", icon: <FiSettings /> },
    { name: "FiTrash2", icon: <FiTrash2 /> },
    { name: "FiHeart", icon: <FiHeart /> },
    { name: "FiStar", icon: <FiStar /> },
  ];

  const radiusList = [
    {
      name: "--radius-sm",
      value: "0.5rem",
      usage: "var(--radius-sm)",
    },
    {
      name: "--radius-md",
      value: "1rem",
      usage: "var(--radius-md)",
    },
    {
      name: "--radius-lg",
      value: "1.5rem",
      usage: "var(--radius-lg)",
    },
    {
      name: "--radius-max",
      value: "999em",
      usage: "var(--radius-max)",
    },
  ];

  return (
    <Container>
      <PageHeader title="공통 UI 컴포넌트 Demo" />
      <h2 style={{ margin: 0 }}>Radix UI 사용</h2>

      <p style={{ ...smallTextStyle, marginTop: "8px" }}>
        * 호버효과는 같이 상의해 보아요
      </p>

      <strong
        style={{
          display: "block",
          marginTop: "4px",
          color: "var(--sub-text-color)",
          fontSize: "var(--font-size-small)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "var(--line-height-small)",
        }}
      >
        추가사항 및 수정사항 있으시면 말씀 주세요
      </strong>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Container</h2>

        <div
          style={{
            width: "100%",
            marginTop: "16px",
            border: "1px dashed var(--primary-color)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "#f8f8ff",
          }}
        >
          <Container>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.5rem 1fr 1.5rem",
                gridTemplateRows: "1.5rem auto 1.5rem",
                alignItems: "stretch",
                width: "calc(100% + 3rem)",
                margin: "-1.5rem",
                gap: 0,
              }}
            >
              {/* 상단 padding 표시 - 가운데만 */}
              <div
                style={{
                  gridColumn: "2 / 3",
                  gridRow: "1 / 2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-color)",
                  fontSize: "var(--font-size-tiny)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                1.5rem / 24px
              </div>

              {/* 좌측 padding 표시 */}
              <div
                style={{
                  gridColumn: "1 / 2",
                  gridRow: "2 / 3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-color)",
                  fontSize: "var(--font-size-tiny)",
                  fontWeight: "var(--font-weight-semibold)",
                  writingMode: "vertical-rl",
                }}
              >
                1.5rem
              </div>

              {/* 실제 콘텐츠 영역 */}
              <Card
                radius="sm"
                style={{
                  gridColumn: "2 / 3",
                  gridRow: "2 / 3",
                }}
              >
                <strong style={cardTitleStyle}>Container 내부 영역</strong>

                <p style={cardTextStyle}>
                  이 영역은 max-width와 반응형 상하좌우 padding이 적용된 공통
                  레이아웃입니다.
                  <br />
                  padding은 1.5rem이며, 16px = 1rem 기준으로 24px입니다.
                </p>
              </Card>

              {/* 우측 padding 표시 */}
              <div
                style={{
                  gridColumn: "3 / 4",
                  gridRow: "2 / 3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-color)",
                  fontSize: "var(--font-size-tiny)",
                  fontWeight: "var(--font-weight-semibold)",
                  writingMode: "vertical-rl",
                }}
              >
                1.5rem
              </div>

              {/* 하단 padding 표시 - 가운데만 */}
              <div
                style={{
                  gridColumn: "2 / 3",
                  gridRow: "3 / 4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-color)",
                  fontSize: "var(--font-size-tiny)",
                  fontWeight: "var(--font-weight-semibold)",
                }}
              >
                1.5rem / 24px
              </div>
            </div>
          </Container>
        </div>

        <CodeToggle>
          {`// Container 컴포넌트 경로
JSX: src/components/Container/Container.jsx
CSS Module: src/components/Container/Container.module.css

// 역할
Container는 페이지 콘텐츠의 최대 너비와 상하좌우 여백을 잡는 컴포넌트입니다.

// 기본 padding
padding: 1.5rem; /* 24px */

// 불러오기
import Container from "./Container/Container";

// 사용 방법
<Container>
  <h1>페이지 제목</h1>
  <p>페이지 내용</p>
</Container>

// 실제 페이지에서 사용 예시
<main>
  <Container>
    <Card>
      <p>컨테이너 안에 들어가는 콘텐츠</p>
    </Card>
  </Container>
</main>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>PageHeader</h2>

        <div style={{ marginTop: "16px" }}>
          <Card>
            <PageHeader title="페이지 제목" />
            <p style={cardTextStyle}>페이지의 가장 필수적인 부분입니다.</p>
          </Card>
        </div>

        <CodeToggle>
          {`// PageHeader 컴포넌트 경로
JSX: src/components/PageHeader/PageHeader.jsx
CSS Module: src/components/PageHeader/PageHeader.module.css

// 불러오기
import Container from "./Container/Container";
import PageHeader from "./PageHeader/PageHeader";

// 사용 방법
<Container>
  <PageHeader
    title="페이지 제목"
  />
</Container>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Color</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {colorList.map((color) => (
            <Card key={color.name}>
              <div
                style={{
                  width: "100%",
                  height: "80px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  backgroundColor: color.value,
                }}
              />

              <div style={{ marginTop: "12px" }}>
                <strong style={cardTitleStyle}>{color.name}</strong>

                <p style={{ ...smallTextStyle, marginTop: "6px" }}>
                  {color.value}
                </p>

                <code style={colorCodeStyle}>{color.usage}</code>
              </div>
            </Card>
          ))}
        </div>

        <CodeToggle>
          {`// Color 변수 경로
CSS: src/components/common.css

// 사용 방법
color: "var(--text-color)"
backgroundColor: "var(--primary-color)"
border: "1px solid var(--border-color)"`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Typography</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <Card>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-title-lg)",
                fontWeight: "var(--font-weight-bold)",
                lineHeight: "var(--line-height-title)",
              }}
            >
              Title Large
            </p>
            <p style={{ ...smallTextStyle, marginTop: "8px" }}>
              2rem / 32px · weight 700
            </p>
            <code style={colorCodeStyle}>var(--font-size-title-lg)</code>
          </Card>

          <Card>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-title-md)",
                fontWeight: "var(--font-weight-bold)",
                lineHeight: "var(--line-height-title)",
              }}
            >
              Title Medium
            </p>
            <p style={{ ...smallTextStyle, marginTop: "8px" }}>
              1.5rem / 24px · weight 700
            </p>
            <code style={colorCodeStyle}>var(--font-size-title-md)</code>
          </Card>

          <Card>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-title-sm)",
                fontWeight: "var(--font-weight-semibold)",
                lineHeight: "var(--line-height-title)",
              }}
            >
              Title Small
            </p>
            <p style={{ ...smallTextStyle, marginTop: "8px" }}>
              1.25rem / 20px · weight 600
            </p>
            <code style={colorCodeStyle}>var(--font-size-title-sm)</code>
          </Card>

          <Card>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-body)",
                fontWeight: "var(--font-weight-regular)",
                lineHeight: "var(--line-height-body)",
              }}
            >
              Body Text
            </p>
            <p style={{ ...smallTextStyle, marginTop: "8px" }}>
              1rem / 16px · weight 400
            </p>
            <code style={colorCodeStyle}>var(--font-size-body)</code>
          </Card>

          <Card>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-small)",
                fontWeight: "var(--font-weight-regular)",
                lineHeight: "var(--line-height-small)",
                color: "var(--text-color)",
              }}
            >
              Small Text
            </p>
            <p style={{ ...smallTextStyle, marginTop: "8px" }}>
              0.875rem / 14px · weight 400
            </p>
            <code style={colorCodeStyle}>var(--font-size-small)</code>
          </Card>

          <Card>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-tiny)",
                fontWeight: "var(--font-weight-regular)",
                lineHeight: "var(--line-height-small)",
                color: "var(--text-color)",
              }}
            >
              Tiny Text
            </p>
            <p style={{ ...smallTextStyle, marginTop: "8px" }}>
              0.75rem / 12px · weight 400
            </p>
            <code style={colorCodeStyle}>var(--font-size-tiny)</code>
          </Card>
        </div>

        <CodeToggle>
          {`// Typography 변수 경로
CSS: src/styles/global.css

// Font Size
--font-size-title-lg: 2rem;
--font-size-title-md: 1.5rem;
--font-size-title-sm: 1.25rem;
--font-size-body: 1rem;
--font-size-small: 0.875rem;
--font-size-tiny: 0.8125rem;

// Font Weight
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

// 사용 방법
.title {
  font-size: var(--font-size-title-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-title);
}

.body {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
}

.small {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  color: var(--sub-text-color);
}`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Radius</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {radiusList.map((radius) => (
            <Card key={radius.name}>
              <div
                style={{
                  width: "100%",
                  height: "80px",
                  border: "1px solid var(--border-color)",
                  borderRadius: radius.usage,
                  backgroundColor: "#f8f8ff",
                }}
              />

              <div style={{ marginTop: "12px" }}>
                <strong style={cardTitleStyle}>{radius.name}</strong>

                <p style={{ ...smallTextStyle, marginTop: "6px" }}>
                  {radius.value}
                </p>

                <code style={colorCodeStyle}>{radius.usage}</code>
              </div>
            </Card>
          ))}
        </div>

        <CodeToggle>
          {`// Radius 변수 경로
CSS: src/styles/global.css

// Radius
--radius-sm: 0.5rem;
--radius-md: 1rem;
--radius-lg: 1.5rem;
--radius-max: 999em;

// 사용 방법
.card {
  border-radius: var(--radius-md);
}

.button {
  border-radius: var(--radius-sm);
}

.badge {
  border-radius: var(--radius-max);
}`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Icons</h2>

        <Card style={{ marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <strong style={cardTitleStyle}>React Icons</strong>
              <p style={{ ...smallTextStyle, marginTop: "6px" }}>
                자주 사용할 아이콘 일부입니다. 더 많은 아이콘은 공식 페이지에서
                확인할 수 있습니다.
              </p>
            </div>

            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--primary-color)",
                fontSize: "var(--font-size-small)",
                fontWeight: "var(--font-weight-semibold)",
                textDecoration: "underline",
                whiteSpace: "nowrap",
              }}
            >
              전체 아이콘 보기
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
            }}
          >
            {iconList.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "#f8f8ff",
                    color: "var(--primary-color)",
                  }}
                >
                  {item.icon}
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "var(--sub-text-color)",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-regular)",
                    lineHeight: "var(--line-height-small)",
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <CodeToggle>
          {`// React Icons 설치
npm install react-icons

// 불러오기
import {
  FiCheck,
  FiX,
  FiInfo,
  FiAlertTriangle,
  FiSearch,
  FiPlus,
  FiSettings,
  FiTrash2,
  FiHeart,
  FiStar,
} from "react-icons/fi";

// 전체 아이콘 확인
https://react-icons.github.io/react-icons/

// 사용 방법
<FiCheck />
<FiX />
<FiInfo />
<FiAlertTriangle />

// 버튼 안에서 사용 예시
<Button>
  <FiPlus />
  추가하기
</Button>

// 뱃지 안에서 사용 예시
<Badge variant="success">
  <FiCheck />
  완료
</Badge>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={{ ...sectionTitleStyle, marginBottom: "20px" }}>Badge</h2>

        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
            alignItems: "flex-start",
            flexDirection: "column",
            alignContent: "flex-start",
          }}
        >
          {/* size */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Badge size="lg" variant="primary">
              큰 뱃지
            </Badge>

            <Badge>기본</Badge>

            <Badge size="sm" variant="primary">
              작은 뱃지
            </Badge>
          </div>

          {/* outline + size */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Badge size="lg" variant="primary" outline>
              큰 뱃지
            </Badge>

            <Badge variant="primary" outline>
              뱃지
            </Badge>

            <Badge size="sm" variant="primary" outline>
              작은 뱃지
            </Badge>
          </div>

          {/* filled color */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Badge variant="primary">Primary-color</Badge>
            <Badge variant="success">완료</Badge>
            <Badge variant="danger">오류</Badge>
            <Badge variant="warning">주의</Badge>
            <Badge variant="secondary">보라</Badge>
            <Badge variant="pink">핑크</Badge>
            <Badge variant="teal">청록</Badge>
            <Badge variant="orange">주황</Badge>
            <Badge variant="indigo">인디고</Badge>
            <Badge variant="greenLight">연두</Badge>
          </div>

          {/* outline color */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Badge variant="success" outline>
              완료 Outline
            </Badge>

            <Badge variant="danger" outline>
              오류 Outline
            </Badge>

            <Badge variant="warning" outline>
              주의 Outline
            </Badge>

            <Badge variant="secondary" outline>
              보라 Outline
            </Badge>

            <Badge variant="pink" outline>
              핑크 Outline
            </Badge>

            <Badge variant="teal" outline>
              청록 Outline
            </Badge>

            <Badge variant="orange" outline>
              주황 Outline
            </Badge>

            <Badge variant="indigo" outline>
              인디고 Outline
            </Badge>

            <Badge variant="greenLight" outline>
              연두 Outline
            </Badge>
          </div>
        </div>

        <CodeToggle>
          {`// Badge 컴포넌트 경로
JSX: src/components/Badge/Badge.jsx
CSS Module: src/components/Badge/Badge.module.css

// 불러오기
import Badge from "./Badge/Badge";

// 기본 사용
<Badge>
  기본
</Badge>

<Badge variant="primary">
  기본
</Badge>

<Badge variant="secondary">
  보조
</Badge>

<Badge variant="gray">
  대기
</Badge>

<Badge variant="success">
  완료
</Badge>

<Badge variant="warning">
  주의
</Badge>

<Badge variant="danger">
  오류
</Badge>

<Badge variant="pink">
  핑크
</Badge>

<Badge variant="teal">
  청록
</Badge>

<Badge variant="orange">
  주황
</Badge>

<Badge variant="indigo">
  인디고
</Badge>

<Badge variant="greenLight">
  연두
</Badge>

// size
<Badge size="sm">
  작은 뱃지
</Badge>

<Badge size="md">
  기본 뱃지
</Badge>

<Badge size="lg">
  큰 뱃지
</Badge>

// outline
<Badge variant="primary" outline>
  Primary Outline
</Badge>

<Badge variant="success" outline>
  완료 Outline
</Badge>

<Badge variant="danger" outline>
  오류 Outline
</Badge>

<Badge variant="warning" outline>
  주의 Outline
</Badge>

// outline + size
<Badge variant="primary" size="sm" outline>
  작은 Primary Outline
</Badge>

<Badge variant="primary" size="md" outline>
  기본 Primary Outline
</Badge>

<Badge variant="primary" size="lg" outline>
  큰 Primary Outline
</Badge>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Button</h2>

        <h3 style={subTitleStyle}>Button Variant</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button style={primaryButtonStyle}>기본 버튼</Button>

          <Button variant="outline" style={outlineButtonStyle}>
            아웃라인 버튼
          </Button>

          <Button style={dangerButtonStyle}>삭제</Button>

          <Button disabled style={disabledButtonStyle}>
            비활성화
          </Button>
        </div>

        <h3 style={subTitleStyle}>Button Size</h3>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button size="normal" style={primaryButtonStyle}>
            일반 버튼
          </Button>

          <Button size="small" style={primaryButtonStyle}>
            작은 버튼
          </Button>
        </div>

        <h3 style={subTitleStyle}>Outline Size</h3>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button variant="outline" size="normal" style={outlineButtonStyle}>
            일반 아웃라인
          </Button>

          <Button variant="outline" size="small" style={outlineButtonStyle}>
            작은 아웃라인
          </Button>
        </div>

        <div style={guideBoxStyle}>
          <strong
            style={{
              fontSize: "var(--font-size-body)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            너비 조절
          </strong>
          <p style={{ ...smallTextStyle, marginTop: "6px" }}>
            버튼의 너비는 필요한 곳에서 <code>style</code>로 조절하면 됩니다.
            예: <code>{`style={{ width: "100%" }}`}</code>,
            <code>{` style={{ minWidth: "120px" }}`}</code>
          </p>
        </div>

        <CodeToggle>
          {`// Button 컴포넌트 경로
JSX: src/components/Button/Button.jsx
CSS Module: src/components/Button/Button.module.css

// 불러오기
import Button from "./Button/Button";

// 사용 방법
<Button>기본 버튼</Button>

<Button variant="outline">
  아웃라인 버튼
</Button>

<Button size="normal">
  일반 버튼
</Button>

<Button size="small">
  작은 버튼
</Button>

<Button disabled>
  비활성화
</Button>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Card</h2>

        <h3 style={subTitleStyle}>Card Variant</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          <Card>
            <strong style={cardTitleStyle}>기본 카드</strong>
            <p style={cardTextStyle}>공통 Card 컴포넌트입니다.</p>
          </Card>
        </div>

        <h3 style={subTitleStyle}>Card Radius Size</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          <Card radius="sm">
            <strong style={cardTitleStyle}>Small Radius</strong>
            <p style={cardTextStyle}>radius="sm"</p>
          </Card>

          <Card radius="md">
            <strong style={cardTitleStyle}>Medium Radius</strong>
            <p style={cardTextStyle}>radius="md"</p>
          </Card>

          <Card radius="lg">
            <strong style={cardTitleStyle}>Large Radius</strong>
            <p style={cardTextStyle}>radius="lg"</p>
          </Card>
        </div>

        <CodeToggle>
          {`// Card 컴포넌트 경로
JSX: src/components/Card/Card.jsx
CSS Module: src/components/Card/Card.module.css

// 불러오기
import Card from "./Card/Card";

// 사용 방법
<Card>
  <p>카드 내용</p>
</Card>

<Card radius="sm">
  작은 radius 카드
</Card>

<Card radius="md">
  기본 radius 카드
</Card>

<Card radius="lg">
  큰 radius 카드
</Card>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Input</h2>

        <div
          style={{
            maxWidth: "360px",
            display: "grid",
            gap: "12px",
            margin: "36px 0",
          }}
        >
          <Input placeholder="약 이름을 입력하세요" />
          <Input type="email" placeholder="이메일을 입력하세요" />
        </div>

        <CodeToggle>
          {`// Input 컴포넌트 경로
JSX: src/components/Input/Input.jsx
CSS Module: src/components/Input/Input.module.css

// 불러오기
import Input from "./Input/Input";

// 사용 방법
<Input placeholder="입력" />

<Input
  type="email"
  placeholder="이메일을 입력하세요"
/>

<Input
  type="password"
  placeholder="비밀번호를 입력하세요"
/>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Textarea</h2>

        <div style={{ maxWidth: "480px", margin: "36px 0" }}>
          <Textarea placeholder="내용을 입력하세요" />
        </div>

        <CodeToggle>
          {`// Textarea 컴포넌트 경로
JSX: src/layout/Textarea/Textarea.jsx
CSS Module: src/layout/Textarea/Textarea.module.css

// 불러오기
import Textarea from "./Textarea/Textarea";

// 사용 방법
<Textarea placeholder="내용을 입력하세요" />`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Select</h2>

        <div style={{ maxWidth: "360px", margin: "36px 0" }}>
          <Select
            placeholder="상태를 선택하세요"
            options={[
              { label: "대기", value: "pending" },
              { label: "진행중", value: "progress" },
              { label: "완료", value: "done" },
            ]}
          />
        </div>

        <CodeToggle>
          {`// Select 컴포넌트 경로
JSX: src/layout/Select/Select.jsx
CSS Module: src/layout/Select/Select.module.css

// 불러오기
import Select from "./Select/Select";

// 사용 방법
<Select
  placeholder="상태를 선택하세요"
  options={[
    { label: "대기", value: "pending" },
    { label: "진행중", value: "progress" },
    { label: "완료", value: "done" },
  ]}
/>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Checkbox</h2>

        <div style={{ margin: "36px 0" }}>
          <Checkbox label="약관에 동의합니다" />
        </div>

        <CodeToggle>
          {`// Checkbox 컴포넌트 경로
JSX: src/layout/Checkbox/Checkbox.jsx
CSS Module: src/layout/Checkbox/Checkbox.module.css

// 불러오기
import Checkbox from "./Checkbox/Checkbox";

// 사용 방법
<Checkbox label="약관에 동의합니다" />`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Radio</h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            margin: "36px 0",
          }}
        >
          <Radio name="type" label="일반" value="normal" />
          <Radio name="type" label="중요" value="important" />
          <Radio name="type" label="긴급" value="urgent" />
        </div>

        <CodeToggle>
          {`// Radio 컴포넌트 경로
JSX: src/layout/Radio/Radio.jsx
CSS Module: src/layout/Radio/Radio.module.css

// 불러오기
import Radio from "./Radio/Radio";

// 사용 방법
<Radio name="type" label="일반" value="normal" />
<Radio name="type" label="중요" value="important" />
<Radio name="type" label="긴급" value="urgent" />`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Modal</h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            margin: "36px 0",
          }}
        >
          <Modal
            title="Modal Title"
            description="기본 모달입니다."
            trigger={<Button style={primaryButtonStyle}>모달 열기</Button>}
            onConfirm={() => console.log("모달 확인")}
          >
            <p style={bodyTextStyle}>
              간단한 안내나 확인 메시지에 사용하는 공통 모달입니다.
            </p>
          </Modal>
        </div>

        <CodeToggle>
          {`// Modal 컴포넌트 경로
JSX: src/components/Modal/Modal.jsx
CSS Module: src/components/Modal/Modal.module.css

// 불러오기
import Modal from "./Modal/Modal";

// 사용 방법
<Modal
  title="모달 제목"
  description="모달 설명입니다."
  trigger={
    <Button>
      모달 열기
    </Button>
  }
  onConfirm={() => console.log("확인")}
>
  <p>모달 내용입니다.</p>
</Modal>

// 버튼 텍스트 변경
<Modal
  cancelText="닫기"
  confirmText="저장"
/>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Form</h2>

        <Card style={{ margin: "36px 0" }}>
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-semibold)",
                    lineHeight: "var(--line-height-small)",
                  }}
                >
                  아이디
                </label>
                <Input placeholder="아이디를 입력하세요" />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-semibold)",
                    lineHeight: "var(--line-height-small)",
                  }}
                >
                  비밀번호
                </label>
                <Input type="password" placeholder="비밀번호를 입력하세요" />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <Button
                  variant="outline"
                  type="button"
                  style={outlineButtonStyle}
                >
                  취소
                </Button>

                <Button type="submit" style={primaryButtonStyle}>
                  저장
                </Button>
              </div>
            </div>
          </Form>
        </Card>

        <CodeToggle>
          {`// Form 컴포넌트 경로
JSX: src/components/Form/Form.jsx
CSS Module: src/components/Form/Form.module.css

// 불러오기
import Form from "./Form/Form";

// 사용 방법
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("폼 제출");
};

<Form onSubmit={handleSubmit}>
  <Input placeholder="아이디를 입력하세요" />

  <Input
    type="password"
    placeholder="비밀번호를 입력하세요"
  />

  <Button type="submit">
    저장
  </Button>
</Form>`}
        </CodeToggle>
      </section>

      <section
        style={{
          marginTop: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2 style={sectionTitleStyle}>Tabs</h2>

        <div style={{ margin: "36px 0" }}>
          <Tabs
            tabs={[
              {
                label: "전체",
                value: "all",
                content: (
                  <Card>
                    <strong style={cardTitleStyle}>전체 내용</strong>
                    <p style={cardTextStyle}>
                      전체 데이터를 보여주는 탭입니다.
                    </p>
                  </Card>
                ),
              },
              {
                label: "진행중",
                value: "progress",
                content: (
                  <Card>
                    <strong style={cardTitleStyle}>진행중</strong>
                    <p style={cardTextStyle}>
                      진행중인 항목을 보여주는 탭입니다.
                    </p>
                  </Card>
                ),
              },
              {
                label: "완료",
                value: "done",
                content: (
                  <Card>
                    <strong style={cardTitleStyle}>완료</strong>
                    <p style={cardTextStyle}>
                      완료된 항목을 보여주는 탭입니다.
                    </p>
                  </Card>
                ),
              },
            ]}
          />
        </div>

        <CodeToggle>
          {`// Tabs 컴포넌트 경로
JSX: src/components/Tabs/Tabs.jsx
CSS Module: src/components/Tabs/Tabs.module.css

// 불러오기
import Tabs from "./Tabs/Tabs";

// 사용 방법
<Tabs
  tabs={[
    {
      label: "전체",
      value: "all",
      content: <div>전체 내용</div>,
    },
    {
      label: "진행중",
      value: "progress",
      content: <div>진행중 내용</div>,
    },
    {
      label: "완료",
      value: "done",
      content: <div>완료 내용</div>,
    },
  ]}
/>

// 기본 선택 탭 지정
<Tabs
  defaultValue="progress"
  tabs={tabs}
/>`}
        </CodeToggle>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Pagination</h2>

        <div style={{ margin: "36px" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>

        <CodeToggle>
          {`// Pagination 컴포넌트 경로
JSX: src/components/Pagination/Pagination.jsx
CSS Module: src/components/Pagination/Pagination.module.css

// 불러오기
import Pagination from "./Pagination/Pagination";

// 사용 방법
const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={setCurrentPage}
/>

// props 설명
currentPage: 현재 페이지
totalPages: 전체 페이지 수
onPageChange: 페이지 변경 함수`}
        </CodeToggle>
      </section>
    </Container>
  );
};

export default Demo;
