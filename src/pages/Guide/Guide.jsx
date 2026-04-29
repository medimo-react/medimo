import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import styles from "./Guide.module.css";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const navItems = [
  { label: "사용 방법", href: "#how" },
  { label: "주요 기능", href: "#features" },
  { label: "왜 메디모인가", href: "#why" },
];

const heroStats = [
  { value: "3", unit: "초", label: "평균 분석 시간" },
  { value: "98", unit: "%", label: "인식 정확도" },
  { value: "웹", unit: "", label: "앱 설치 없이 이용" },
];

const heroDrugs = [
  {
    icon: "💊",
    name: "타이레놀 500mg",
    desc: "해열·진통제",
    tags: ["하루 3회", "식후 30분"],
  },
  {
    icon: "🌿",
    name: "판콜에이",
    desc: "종합 감기약",
    tags: ["하루 3회", "식후 즉시"],
  },
  {
    icon: "🟡",
    name: "뮤코스타정 100mg",
    desc: "위장 보호제",
    tags: ["하루 3회", "식전 30분"],
  },
];

const steps = [
  {
    icon: "📸",
    label: "Step 01",
    title: "약 봉투 또는\n처방전을 촬영",
    desc: "카메라로 약 봉투나 처방전을 찍기만 하면 됩니다.",
  },
  {
    icon: "🤖",
    label: "Step 02",
    title: "Gemini AI가\n자동으로 분석",
    desc: "AI가 약 이름, 복용 시간, 주의사항을 한눈에 보기 쉽게 정리합니다.",
  },
  {
    icon: "🔔",
    label: "Step 03",
    title: "웹 알림으로\n복약 시간 확인",
    desc: "복용 시간에 맞춰 웹 화면에서 알림을 확인하고, 약 먹는 시간을 놓치지 않도록 돕습니다.",
  },
];

const analysisItems = [
  ["타이레놀 500mg", "해열·진통제 · 1회 1정 · 하루 3회", "식후 30분"],
  ["판콜에이", "종합감기약 · 1회 1포 · 하루 3회", "식후 즉시"],
  ["뮤코스타정 100mg", "위장보호제 · 1회 1정 · 하루 3회", "식전 30분"],
];

const alarmItems = [
  {
    time: "08:00",
    meridiem: "AM",
    title: "아침 복약 알림",
    desc: "타이레놀 · 판콜에이 · 뮤코스타",
    done: true,
  },
  {
    time: "13:00",
    meridiem: "PM",
    title: "점심 복약 알림",
    desc: "타이레놀 · 판콜에이 · 뮤코스타",
    next: true,
  },
  {
    time: "19:00",
    meridiem: "PM",
    title: "저녁 복약 알림",
    desc: "타이레놀 · 판콜에이 · 뮤코스타",
  },
];

const features = [
  {
    badge: "기능 01",
    title: (
      <>
        복잡한 처방전,
        <br />
        <em>한눈에</em> 정리
      </>
    ),
    desc: "의학 용어가 많은 처방전을 AI가 약 이름, 복용법, 주의사항 중심으로 알기 쉽게 정리합니다.",
    points: [
      [
        "🎯",
        "높은 인식 정확도",
        "국내 주요 처방약 데이터를 기반으로 약 정보를 인식합니다.",
      ],
      [
        "⚡",
        "빠른 분석",
        "촬영 후 기다림을 줄이고 분석 결과를 빠르게 확인할 수 있습니다.",
      ],
      [
        "⚠️",
        "주의사항 자동 강조",
        "복용 시 확인해야 할 내용을 별도로 표시합니다.",
      ],
    ],
    visual: "analysis",
  },
  {
    badge: "기능 02",
    title: (
      <>
        복약 알림,
        <br />
        <em>메디모</em>에서
        <br />
        바로 확인해요
      </>
    ),
    desc: "복용 시간을 설정하면 해당 시간에 맞춰 웹 화면에서 복약 알림을 확인할 수 있습니다.",
    points: [
      [
        "📅",
        "맞춤 복용 일정 설정",
        "AI가 분석한 복용 횟수를 바탕으로 하루 일정을 구성합니다.",
      ],
      [
        "🔔",
        "웹 알림 제공",
        "별도 앱 설치 없이 웹 화면에서 복약 시간을 바로 확인할 수 있습니다.",
      ],
      [
        "📊",
        "복용 기록 관리",
        "처방전 스캔 기록을 저장해 과거 처방 내역을 다시 확인할 수 있습니다.",
      ],
    ],
    visual: "alarm",
    reverse: true,
  },
];

const whyCards = [
  [
    "🧠",
    "어려운 의학 용어, 이제 그만",
    "전문 용어로 가득한 처방전을 이해하기 쉬운 표현으로 정리합니다.",
  ],
  [
    "⏰",
    "잊어도 괜찮아요",
    "바쁜 하루 속에서도 복용 시간을 놓치지 않도록 웹 알림을 제공합니다.",
  ],
  [
    "🔒",
    "개인정보는 안전하게",
    "처방전 정보는 필요한 범위 안에서만 다루고, 민감한 정보 보호를 우선합니다.",
  ],
  [
    "📱",
    "앱 설치 불필요",
    "웹 브라우저에서 바로 사용할 수 있어 스마트폰, 태블릿, PC에서 접근할 수 있습니다.",
  ],
  [
    "👨‍👩‍👧",
    "가족 처방전도 한곳에",
    "부모님, 자녀 등 가족 구성원의 처방전도 함께 관리할 수 있습니다.",
  ],
  [
    "🌱",
    "가볍게 시작",
    "복잡한 설정 없이 핵심 기능부터 바로 경험할 수 있습니다.",
  ],
];

function SectionHeader({ badge, title, desc, center = false }) {
  return (
    <div className={center ? styles.centerHeader : ""}>
      <span className={styles.sectionBadge}>✦ {badge}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {desc && <p className={styles.sectionDesc}>{desc}</p>}
    </div>
  );
}

function AnalysisMockup() {
  return (
    <>
      <div className={styles.visualLabel}>AI 분석 결과 화면</div>

      <div className={styles.analysisList}>
        {analysisItems.map(([name, desc, tag]) => (
          <div key={name} className={styles.analysisItem}>
            <span className={styles.aiDot} />
            <div className={styles.analysisInfo}>
              <strong>{name}</strong>
              <p>{desc}</p>
            </div>
            <span className={styles.miniTag}>{tag}</span>
          </div>
        ))}
      </div>

      <div className={styles.warningMini}>
        ⚠️ 음주 후 복용 주의 · 졸음 주의 · 성분 중복 확인 필요
      </div>
    </>
  );
}

function AlarmMockup() {
  return (
    <>
      <div className={styles.visualLabel}>복약 알림 설정 화면</div>

      <div className={styles.alarmList}>
        {alarmItems.map(({ time, meridiem, title, desc, done, next }) => (
          <div
            key={time}
            className={cx(styles.alarmItem, next && styles.nextAlarm)}
          >
            <div className={styles.timeBadge}>
              <strong>{time}</strong>
              <span>{meridiem}</span>
            </div>

            <div className={styles.alarmText}>
              <strong>
                {title}
                {next && <span> · 다음</span>}
              </strong>
              <p>{desc}</p>
            </div>

            <div className={cx(styles.alarmCheck, done && styles.done)}>
              {done ? "✓" : "○"}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.alertPreview}>
        <p>웹 알림</p>
        <strong>💊 오후 1시 복약 알림 — 타이레놀 외 2종</strong>
        <span>복용하실 시간이 됐어요. 처방된 약을 식후에 복용해 주세요.</span>
      </div>
    </>
  );
}

function FeatureBlock({ feature }) {
  const Mockup = feature.visual === "analysis" ? AnalysisMockup : AlarmMockup;

  return (
    <div className={cx(styles.featureGrid, feature.reverse && styles.reverse)}>
      <Card className={styles.featureVisual} radius="lg">
        <Mockup />
      </Card>

      <div className={styles.featureText}>
        <SectionHeader {...feature} />

        <div className={styles.featureList}>
          {feature.points.map(([icon, title, desc]) => (
            <div key={title} className={styles.featureItem}>
              <span>{icon}</span>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Guide() {
  return (
    <div className={styles.guide}>
      {/* Header */}
      <header className={styles.nav}>
        <nav className={styles.navLinks}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <Link to="/dashboard" className={styles.navCta}>
            바로 시작하기
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className={styles.hero}>
        <span className={styles.heroGlow} />
        <span className={styles.heroGlowSmall} />

        <Container className={styles.sectionContainer}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <span className={styles.heroBadge}>
                <i /> Gemini AI 기반 약 분석
              </span>

              <h1 className={styles.heroTitle}>
                약 봉투를
                <br />
                찍으면
                <br />
                <em>바로 이해</em>돼요
              </h1>

              <p className={styles.heroDesc}>
                복잡한 처방전, 이제 사진 한 장으로 끝내세요.
                <br />
                AI가 약 정보를 분석하고, 잊지 않도록 제때 알림까지 보내드립니다.
              </p>

              <div className={styles.heroButtons}>
                <Link to="/dashboard" className={styles.primaryButton}>
                  🚀 바로 시작하기
                </Link>
                <a href="#how" className={styles.ghostButton}>
                  ▶ 사용 방법 보기
                </a>
              </div>

              <div className={styles.heroStats}>
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <strong>
                      {stat.value}
                      {stat.unit && <span>{stat.unit}</span>}
                    </strong>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <Card className={styles.mockupCard} radius="lg">
                <div className={styles.mockupTop}>
                  <span className={styles.mockupIcon}>🤖</span>
                  <div>
                    <p>AI 분석 완료</p>
                    <strong>처방전에서 3가지 약 확인</strong>
                  </div>
                  <span className={styles.mockupBadge}>Gemini</span>
                </div>

                <div className={styles.drugList}>
                  {heroDrugs.map(({ icon, name, desc, tags }) => (
                    <div key={name} className={styles.drugRow}>
                      <span>{icon}</span>

                      <div>
                        <strong>{name}</strong>
                        <p>{desc}</p>
                      </div>

                      <div className={styles.drugTags}>
                        {tags.map((tag) => (
                          <em key={tag}>{tag}</em>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={styles.noticeCard} radius="md">
                <span>🔔</span>
                <div>
                  <strong>복약 알림이 도착했어요</strong>
                  <p>오후 1:00 — 타이레놀 외 2종 복용 시간</p>
                </div>
                <em>방금 전</em>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* How */}
      <section id="how" className={styles.how}>
        <Container className={styles.sectionContainer}>
          <SectionHeader
            center
            badge="사용 방법"
            title={
              <>
                딱 세 단계면
                <br />
                <em>충분</em>해요
              </>
            }
            desc="복잡한 설정 없이, 누구나 쉽게 사용할 수 있도록 설계했습니다."
          />

          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.label} className={styles.step}>
                <span>{step.icon}</span>
                <em>{step.label}</em>
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <Container className={styles.sectionContainer}>
          {features.map((feature) => (
            <FeatureBlock key={feature.badge} feature={feature} />
          ))}
        </Container>
      </section>

      {/* Why */}
      <section id="why" className={styles.why}>
        <Container className={styles.sectionContainer}>
          <SectionHeader
            center
            badge="왜 메디모인가"
            title={
              <>
                약 복용, 이렇게
                <br />
                <em>달라집니다</em>
              </>
            }
            desc="메디모는 단순한 약 정보 앱이 아니라 건강한 복약 습관을 돕는 서비스입니다."
          />

          <div className={styles.whyGrid}>
            {whyCards.map(([icon, title, desc]) => (
              <Card key={title} className={styles.whyCard} radius="lg">
                <span>{icon}</span>
                <strong>{title}</strong>
                <p>{desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="cta" className={styles.cta}>
        <Container className={styles.sectionContainer}>
          <SectionHeader
            center
            badge="지금 바로 시작"
            title={
              <>
                약 봉투를 찍는
                <br />
                순간부터 <em>시작돼요</em>
              </>
            }
            desc="회원가입이나 앱 설치 없이, 처방전 스캔 흐름을 바로 확인해보세요."
          />

          <div className={styles.ctaButtons}>
            <Link to="/dashboard" className={styles.primaryButton}>
              🚀 바로 시작하기
            </Link>
            <a href="#how" className={styles.ghostButton}>
              자세히 알아보기
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Guide;
