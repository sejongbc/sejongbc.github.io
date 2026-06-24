<script setup lang="ts">
const theme = ref<'light' | 'dark'>('light')
const isDarkTheme = computed(() => theme.value === 'dark')

onMounted(() => {
  const savedTheme = window.localStorage.getItem('sejongbc-theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.value = savedTheme
    return
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
})

watch(theme, (nextTheme) => {
  window.localStorage.setItem('sejongbc-theme', nextTheme)
})

const toggleTheme = () => {
  theme.value = isDarkTheme.value ? 'light' : 'dark'
}
</script>

<template>
  <main class="site-shell" :data-theme="theme">
    <NuxtRouteAnnouncer />

    <nav class="topbar" aria-label="주요 메뉴">
      <a class="brand" href="#top" aria-label="세종BC 홈">
        <span class="brand-mark">S</span>
        <span>
          <strong>SEJONG BC</strong>
          <small>세종시 고교야구팀</small>
        </span>
      </a>

      <div class="nav-menu">
        <div class="nav-links">
          <a href="#identity">팀 소개</a>
          <a href="#staff">지도자</a>
          <a href="#parents">학부모 운영회</a>
          <a href="#qa">Q&amp;A</a>
        </div>

        <button
          class="theme-toggle"
          type="button"
          :aria-pressed="isDarkTheme"
          @click="toggleTheme"
        >
          {{ isDarkTheme ? 'Light' : 'Dark' }}
        </button>
      </div>
    </nav>

    <section id="top" class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">세종특별자치시 대표 고교야구팀</p>
        <h1>세종BC</h1>
        <p class="hero-lead">
          세종특별자치시의 유일한 고교야구팀으로, 매년 세종시 대표 자격으로
          전국체전에 참가합니다. 더 많은 경기 경험과 성장 기회를 원하는 선수에게
          열린 환경을 제공합니다.
        </p>

        <div class="hero-actions" aria-label="바로가기">
          <a class="primary-action" href="#qa">입단 문의</a>
          <a class="secondary-action" href="#qa">
            Instagram 연결 예정
          </a>
        </div>
      </div>

      <div class="hero-board" aria-label="세종BC 핵심 정보">
        <div>
          <span>01</span>
          <strong>세종시 유일팀</strong>
          <p>같은 지역 내 이적 패널티 부담 없이 진로와 훈련 환경을 고민할 수 있습니다.</p>
        </div>
        <div>
          <span>02</span>
          <strong>전국체전 참가</strong>
          <p>세종시 대표팀으로 매년 전국 무대 경험을 쌓을 수 있습니다.</p>
        </div>
        <div>
          <span>03</span>
          <strong>경기 경험 기회</strong>
          <p>타 팀 대비 출전과 실전 경험의 문이 넓게 열려 있습니다.</p>
        </div>
      </div>
    </section>

    <section id="identity" class="section identity-section">
      <div class="section-heading">
        <p class="eyebrow">Why Sejong BC</p>
        <h2>선수의 성장 기회가 분명한 팀</h2>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <span class="feature-icon">市</span>
          <h3>세종시 대표성</h3>
          <p>
            세종특별자치시를 대표하는 고교야구팀으로서 지역의 이름을 걸고
            전국 대회에 도전합니다.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-icon">移</span>
          <h3>이적 부담 완화</h3>
          <p>
            세종시 유일팀이라는 구조적 장점 덕분에 선수와 학부모가 진학 및
            이적 선택지를 더 현실적으로 검토할 수 있습니다.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-icon">試</span>
          <h3>실전 중심 성장</h3>
          <p>
            선수층과 운영 구조상 경기 경험을 얻을 기회가 열려 있어, 실전을
            통해 성장하고 싶은 선수에게 적합합니다.
          </p>
        </article>
      </div>
    </section>

    <section id="staff" class="section staff-section">
      <div class="section-heading">
        <p class="eyebrow">Coaching Staff</p>
        <h2>젊고 소통하는 지도진</h2>
      </div>

      <div class="staff-layout">
        <article class="profile-panel">
          <p class="role">감독</p>
          <h3>열정과 책임감으로 이끄는 젊은 감독</h3>
          <p>
            권위적인 방식보다 선수와 직접 소통하는 방식을 중시합니다. 소탈한
            태도와 빠른 피드백으로 선수 개개인의 상황을 살피고, 팀 안에서
            책임감 있게 성장할 수 있도록 지도합니다.
          </p>
          <ul>
            <li>선수와 학부모가 이해하기 쉬운 소통 방식</li>
            <li>젊은 지도자의 에너지와 현장 밀착형 피드백</li>
            <li>개인별 역할과 출전 기회를 함께 설계하는 운영</li>
          </ul>
        </article>

        <article class="profile-panel accent">
          <p class="role">코치</p>
          <h3>체계적이고 강도 있는 훈련 설계</h3>
          <p>
            선수 시절부터 성실하고 체계적인 훈련을 이어온 지도자로, 기본기와
            반복 훈련의 중요성을 강조합니다. 강도 높은 훈련 속에서도 컨디션을
            관리하며 지속 가능한 성장을 지도합니다.
          </p>
          <ul>
            <li>기본기 중심의 꾸준하고 밀도 높은 훈련</li>
            <li>훈련량과 회복을 함께 보는 컨디션 관리</li>
            <li>선수별 약점 보완을 위한 반복 루틴 설계</li>
          </ul>
        </article>
      </div>

      <div class="notice-strip">
        <strong>지도자 이력 페이지 준비 영역</strong>
        <span>
          감독 및 코치의 선수 경력, 지도 경력, 자격 사항, 주요 성과를 별도
          프로필 페이지로 확장할 수 있습니다.
        </span>
      </div>
    </section>

    <section id="parents" class="section parents-section">
      <div class="section-heading">
        <p class="eyebrow">Parents Committee</p>
        <h2>학부모 운영회 안내</h2>
      </div>

      <div class="info-columns">
        <div>
          <h3>운영회가 하는 일</h3>
          <p>
            선수단 활동을 안정적으로 지원하기 위해 일정 공유, 대회 지원,
            비용 안내, 현장 협조 사항 등을 투명하게 정리합니다.
          </p>
        </div>
        <div>
          <h3>확인할 수 있는 내용</h3>
          <p>
            월별 주요 일정, 회비 및 사용 내역 안내 방식, 대회별 지원 항목,
            학부모 참여가 필요한 업무를 한눈에 볼 수 있도록 구성합니다.
          </p>
        </div>
        <div>
          <h3>운영 원칙</h3>
          <p>
            부담은 줄이고 정보는 명확하게 공유합니다. 선수의 훈련과 경기력이
            우선이라는 기준 아래 필요한 지원을 협의합니다.
          </p>
        </div>
      </div>
    </section>

    <section id="qa" class="section qa-section">
      <div class="section-heading">
        <p class="eyebrow">Q&amp;A</p>
        <h2>자주 묻는 질문</h2>
      </div>

      <div class="qa-list">
        <details open>
          <summary>세종BC는 어떤 팀인가요?</summary>
          <p>
            세종특별자치시의 유일한 고교야구팀이며, 세종시 대표로 매년
            전국체전에 참가하는 팀입니다.
          </p>
        </details>

        <details>
          <summary>이적 패널티가 없다는 장점은 무엇인가요?</summary>
          <p>
            세종시 내 유일팀이라는 특성상 지역 내 팀 선택으로 인한 제약이 적어,
            선수에게 맞는 환경을 비교적 유연하게 선택할 수 있다는 의미입니다.
          </p>
        </details>

        <details>
          <summary>경기 출전 기회는 어떤가요?</summary>
          <p>
            팀 규모와 운영 방향상 실전 경험을 쌓을 기회가 열려 있습니다. 포지션,
            훈련 태도, 경기 준비도에 따라 출전 기회를 만들어갈 수 있습니다.
          </p>
        </details>

        <details>
          <summary>훈련은 강한 편인가요?</summary>
          <p>
            기본기와 반복 훈련을 중시해 훈련 강도는 높은 편입니다. 동시에
            컨디션 관리와 회복 지도도 함께 진행합니다.
          </p>
        </details>

        <details>
          <summary>문의는 어디로 하면 되나요?</summary>
          <p>
            공식 인스타그램 계정명과 문의 연락처가 확정되면 입단, 훈련 참관,
            운영회 관련 질문을 바로 연결할 수 있도록 반영합니다.
          </p>
        </details>
      </div>
    </section>
  </main>
</template>

<style>
:root {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #171717;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-shell {
  --accent: #f6be00;
  --accent-strong: #a87900;
  --bg: #f7f4ea;
  --surface: #fffdf6;
  --surface-soft: #f2ead3;
  --surface-glass: rgba(255, 252, 242, 0.84);
  --text: #171717;
  --text-strong: #111111;
  --muted: #5f594d;
  --nav-muted: #423c31;
  --subtle: #6b6250;
  --line: rgba(23, 23, 23, 0.12);
  --line-strong: rgba(23, 23, 23, 0.18);
  --shadow: rgba(23, 23, 23, 0.08);
  --topbar-bg: rgba(247, 244, 234, 0.9);
  --dark-panel: #111111;
  --dark-panel-text: #ffffff;
  --dark-panel-muted: #ece7d9;
  --profile-bg: rgba(255, 255, 255, 0.06);
  --profile-accent-bg: rgba(246, 190, 0, 0.13);
  --hero-gradient-a: rgba(246, 190, 0, 0.24);
  --hero-gradient-b: rgba(23, 23, 23, 0.1);

  min-height: 100vh;
  overflow-x: hidden;
  color: var(--text);
  background:
    linear-gradient(135deg, var(--hero-gradient-a), transparent 38%),
    linear-gradient(315deg, var(--hero-gradient-b), transparent 42%),
    var(--bg);
  transition:
    color 180ms ease,
    background-color 180ms ease;
}

.site-shell[data-theme="dark"] {
  --accent: #f6be00;
  --accent-strong: #f6be00;
  --bg: #111111;
  --surface: #1b1b1b;
  --surface-soft: #242016;
  --surface-glass: rgba(27, 27, 27, 0.86);
  --text: #f7f4ea;
  --text-strong: #ffffff;
  --muted: #d2c8ae;
  --nav-muted: #efe7d4;
  --subtle: #d7cba8;
  --line: rgba(246, 190, 0, 0.22);
  --line-strong: rgba(246, 190, 0, 0.36);
  --shadow: rgba(0, 0, 0, 0.28);
  --topbar-bg: rgba(17, 17, 17, 0.9);
  --dark-panel: #050505;
  --dark-panel-text: #ffffff;
  --dark-panel-muted: #f0e4bf;
  --profile-bg: rgba(246, 190, 0, 0.08);
  --profile-accent-bg: rgba(246, 190, 0, 0.16);
  --hero-gradient-a: rgba(246, 190, 0, 0.18);
  --hero-gradient-b: rgba(255, 255, 255, 0.05);
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px clamp(20px, 5vw, 72px);
  border-bottom: 1px solid var(--line);
  background: var(--topbar-bg);
  backdrop-filter: blur(16px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 172px;
}

.brand-mark {
  display: inline-grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 8px;
  background: var(--text-strong);
  color: var(--accent);
  font-weight: 900;
}

.brand strong,
.brand small {
  display: block;
  line-height: 1.1;
}

.brand small {
  margin-top: 3px;
  color: var(--subtle);
  font-size: 12px;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px 18px;
  color: var(--nav-muted);
  font-size: 14px;
  font-weight: 700;
}

.nav-links a {
  padding: 8px 0;
}

.nav-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
}

.theme-toggle {
  min-width: 72px;
  min-height: 36px;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background: var(--text-strong);
  color: var(--accent);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 900;
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: clamp(32px, 5vw, 76px);
  align-items: center;
  min-height: calc(100vh - 73px);
  padding: clamp(48px, 7vw, 92px) clamp(20px, 5vw, 72px);
}

.hero-copy {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--accent-strong);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  word-break: keep-all;
}

h1 {
  margin: 0;
  color: var(--text-strong);
  font-size: clamp(58px, 12vw, 136px);
  line-height: 0.9;
  letter-spacing: 0;
}

.hero-lead {
  max-width: 680px;
  margin: 28px 0 0;
  color: var(--nav-muted);
  font-size: clamp(18px, 2.2vw, 25px);
  font-weight: 600;
  line-height: 1.62;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 20px;
  font-weight: 900;
}

.primary-action {
  background: var(--text-strong);
  color: var(--accent);
}

.secondary-action {
  border: 1px solid var(--line-strong);
  background: var(--accent);
  color: #171717;
}

.hero-board {
  display: grid;
  gap: 14px;
}

.hero-board > div {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-glass);
  box-shadow: 0 20px 50px var(--shadow);
}

.hero-board span {
  color: var(--accent-strong);
  font-size: 13px;
  font-weight: 900;
}

.hero-board strong {
  display: block;
  margin-top: 10px;
  font-size: 24px;
}

.hero-board p,
.feature-card p,
.profile-panel p,
.info-columns p,
.qa-list p,
.notice-strip span {
  color: var(--muted);
  line-height: 1.72;
}

.section {
  padding: clamp(62px, 9vw, 112px) clamp(20px, 5vw, 72px);
}

.section-heading {
  max-width: 760px;
  margin-bottom: 32px;
}

.section-heading h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(32px, 5vw, 58px);
  line-height: 1.08;
  letter-spacing: 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature-card {
  min-height: 250px;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.feature-icon {
  display: inline-grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 8px;
  background: var(--accent);
  color: #171717;
  font-weight: 900;
}

.feature-card h3,
.profile-panel h3,
.info-columns h3 {
  margin: 22px 0 10px;
  font-size: 24px;
  line-height: 1.22;
}

.staff-section {
  background: var(--dark-panel);
  color: var(--dark-panel-text);
}

.staff-section .section-heading h2,
.staff-section .profile-panel h3 {
  color: var(--dark-panel-text);
}

.staff-section .eyebrow {
  color: var(--accent);
}

.staff-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.profile-panel {
  padding: 30px;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background: var(--profile-bg);
}

.profile-panel.accent {
  background: var(--profile-accent-bg);
}

.role {
  margin: 0;
  color: var(--accent);
  font-size: 13px;
  font-weight: 900;
}

.profile-panel ul {
  display: grid;
  gap: 10px;
  margin: 22px 0 0;
  padding-left: 20px;
  color: var(--dark-panel-muted);
  line-height: 1.6;
}

.notice-strip {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  padding: 22px 24px;
  border-radius: 8px;
  background: var(--accent);
  color: #171717;
}

.notice-strip strong {
  min-width: 190px;
}

.parents-section {
  background: var(--surface);
}

.info-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  border-top: 2px solid var(--text-strong);
}

.info-columns > div {
  padding-top: 24px;
}

.qa-section {
  background: var(--surface-soft);
}

.qa-list {
  display: grid;
  gap: 12px;
  max-width: 920px;
}

.qa-list details {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.qa-list summary {
  cursor: pointer;
  padding: 20px 22px;
  color: var(--text);
  font-size: 18px;
  font-weight: 900;
}

.qa-list p {
  margin: 0;
  padding: 0 22px 22px;
}

@media (max-width: 900px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-menu {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .nav-links {
    justify-content: flex-start;
  }

  .hero-section,
  .feature-grid,
  .staff-layout,
  .info-columns {
    grid-template-columns: 1fr;
  }

  .hero-section {
    min-height: auto;
  }

  .notice-strip {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .topbar {
    padding: 14px 18px;
  }

  .section,
  .hero-section {
    padding-right: 18px;
    padding-left: 18px;
  }

  .hero-board > div,
  .feature-card,
  .profile-panel {
    padding: 22px;
  }

  .primary-action,
  .secondary-action {
    width: 100%;
  }
}
</style>
