import React from "react";

import Button from "./Button/Button";
import Card from "./Card/Card";
import Input from "./Input/Input";
import Form from "./Form/Form";
import Container from "./Container/Container";
import Badge from "./Badge/Badge";
import Modal from "./Modal/Modal";
import Textarea from "./Textarea/Textarea";
import Select from "./Select/Select";
import Checkbox from "./Checkbox/Checkbox";
import Radio from "./Radio/Radio";

const Demo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("폼 제출");
  };

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

  const pageTitleStyle = {
    margin: 0,
    fontSize: "var(--font-size-title-lg)",
    fontWeight: "var(--font-weight-bold)",
    lineHeight: "var(--line-height-title)",
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

  const codeBoxStyle = {
    marginTop: "20px",
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

  return (
    <Container>
      <h1 style={pageTitleStyle}>공통 UI 컴포넌트 Demo</h1>

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

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Container</h2>

        <div
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "24px 0",
            border: "1px dashed var(--primary-color)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "#f8f8ff",
          }}
        >
          <Container>
            <Card>
              <strong style={cardTitleStyle}>Container 내부 영역</strong>
              <p style={cardTextStyle}>
                이 영역은 max-width와 반응형 좌우 padding이 적용된 공통
                레이아웃입니다.
                <br />
                상하 여백은 페이지나 섹션마다 달라지는 경우가 많아 넣지
                않겠습니다.
              </p>
            </Card>
          </Container>
        </div>

        <pre style={codeBoxStyle}>
          {`// Container 컴포넌트 경로
JSX: src/components/Container/Container.jsx
CSS Module: src/components/Container/Container.module.css

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
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
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

        <pre style={codeBoxStyle}>
          {`// Color 변수 경로
CSS: src/components/common.css

// 사용 방법
color: "var(--text-color)"
backgroundColor: "var(--primary-color)"
border: "1px solid var(--border-color)"`}
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
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
                color: "var(--sub-text-color)",
              }}
            >
              Small Text
            </p>
            <p style={{ ...smallTextStyle, marginTop: "8px" }}>
              0.875rem / 14px · weight 400
            </p>
            <code style={colorCodeStyle}>var(--font-size-small)</code>
          </Card>
        </div>

        <pre style={codeBoxStyle}>
          {`// Typography 변수 경로
CSS: src/styles/global.css

// Font Size
--font-size-title-lg: 2rem;
--font-size-title-md: 1.5rem;
--font-size-title-sm: 1.25rem;
--font-size-body: 1rem;
--font-size-small: 0.875rem;

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
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={{...sectionTitleStyle, marginBottom: "20px" }}>Badge</h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Badge>기본</Badge>
          <Badge variant="secondary">보조</Badge>
          <Badge variant="gray">대기</Badge>
          <Badge variant="success">완료</Badge>
          <Badge variant="warning">주의</Badge>
          <Badge variant="danger">오류</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>

        <pre style={codeBoxStyle}>
          {`// Badge 컴포넌트 경로
JSX: src/components/Badge/Badge.jsx
CSS Module: src/components/Badge/Badge.module.css

// 불러오기
import Badge from "./Badge/Badge";

// 사용 방법
<Badge>기본</Badge>

<Badge variant="success">
  완료
</Badge>

<Badge variant="warning">
  주의
</Badge>

<Badge variant="danger">
  오류
</Badge>

<Badge variant="outline">
  Outline
</Badge>`}
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
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

        <pre style={codeBoxStyle}>
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
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
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

        <pre style={codeBoxStyle}>
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
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Input</h2>

        <div
          style={{
            maxWidth: "360px",
            display: "grid",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <Input placeholder="약 이름을 입력하세요" />
          <Input type="email" placeholder="이메일을 입력하세요" />
        </div>

        <pre style={codeBoxStyle}>
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
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Textarea</h2>

        <div style={{ maxWidth: "480px", marginTop: "16px" }}>
          <Textarea placeholder="내용을 입력하세요" />
        </div>

        <pre style={codeBoxStyle}>
          {`// Textarea 컴포넌트 경로
JSX: src/layout/Textarea/Textarea.jsx
CSS Module: src/layout/Textarea/Textarea.module.css

// 불러오기
import Textarea from "./Textarea/Textarea";

// 사용 방법
<Textarea placeholder="내용을 입력하세요" />`}
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Select</h2>

        <div style={{ maxWidth: "360px", marginTop: "16px" }}>
          <Select
            placeholder="상태를 선택하세요"
            options={[
              { label: "대기", value: "pending" },
              { label: "진행중", value: "progress" },
              { label: "완료", value: "done" },
            ]}
          />
        </div>

        <pre style={codeBoxStyle}>
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
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Checkbox</h2>

        <div style={{ marginTop: "16px" }}>
          <Checkbox label="약관에 동의합니다" />
        </div>

        <pre style={codeBoxStyle}>
          {`// Checkbox 컴포넌트 경로
JSX: src/layout/Checkbox/Checkbox.jsx
CSS Module: src/layout/Checkbox/Checkbox.module.css

// 불러오기
import Checkbox from "./Checkbox/Checkbox";

// 사용 방법
<Checkbox label="약관에 동의합니다" />`}
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Radio</h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginTop: "16px",
          }}
        >
          <Radio name="type" label="일반" value="normal" />
          <Radio name="type" label="중요" value="important" />
          <Radio name="type" label="긴급" value="urgent" />
        </div>

        <pre style={codeBoxStyle}>
          {`// Radio 컴포넌트 경로
JSX: src/layout/Radio/Radio.jsx
CSS Module: src/layout/Radio/Radio.module.css

// 불러오기
import Radio from "./Radio/Radio";

// 사용 방법
<Radio name="type" label="일반" value="normal" />
<Radio name="type" label="중요" value="important" />
<Radio name="type" label="긴급" value="urgent" />`}
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Modal</h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: "16px",
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

        <pre style={codeBoxStyle}>
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
        </pre>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={sectionTitleStyle}>Form</h2>

        <Card>
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

        <pre style={codeBoxStyle}>
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
        </pre>
      </section>
    </Container>
  );
};

export default Demo;
