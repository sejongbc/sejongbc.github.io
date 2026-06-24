<script setup lang="ts">
import DetailOverlay from './components/DetailOverlay.vue'
import AboutDetail from './components/details/AboutDetail.vue'
import CoachesDetail from './components/details/CoachesDetail.vue'
import ParentsDetail from './components/details/ParentsDetail.vue'
import RecruitDetail from './components/details/RecruitDetail.vue'

useHead({
  title: '세종BC',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/sejongbc-logo.svg'
    },
    {
      rel: 'apple-touch-icon',
      href: '/sejongbc-logo.svg'
    }
  ]
})

const theme = ref<'light' | 'dark'>('light')
const isDarkTheme = computed(() => theme.value === 'dark')
const showScrollTop = ref(false)
const route = useRoute()
type DetailKey = 'about' | 'coaches' | 'recruit' | 'parents'
const activeDetail = ref<DetailKey | null>(null)
const activeKeyMessage = ref(0)
const keyMessages = [
  {
    number: '01',
    title: '지역을 넘어 열린 기회',
    body: '세종을 기반으로 하되, 더 많은 실전과 성장 환경을 찾는 선수에게 열려 있습니다.'
  },
  {
    number: '02',
    title: '성장을 위한 바른 기준',
    body: '현재 기량만 보지 않고 태도, 반복, 기본기, 실전 적응력을 함께 봅니다.'
  },
  {
    number: '03',
    title: '함께 만들어가는 팀 문화',
    body: '지도진, 선수, 학부모가 필요한 정보를 나누며 팀의 방향을 함께 만들어갑니다.'
  }
]
let keyMessageTimer: ReturnType<typeof window.setInterval> | undefined

const updateScrollTopVisibility = () => {
  showScrollTop.value = window.scrollY > 520
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  const savedTheme = window.localStorage.getItem('sejongbc-theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.value = savedTheme
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }

  updateScrollTopVisibility()
  window.addEventListener('scroll', updateScrollTopVisibility, { passive: true })
  keyMessageTimer = window.setInterval(() => {
    activeKeyMessage.value = (activeKeyMessage.value + 1) % keyMessages.length
  }, 3600)
})

watch(theme, (nextTheme) => {
  window.localStorage.setItem('sejongbc-theme', nextTheme)
})

watch(activeDetail, (detail) => {
  document.body.style.overflow = detail ? 'hidden' : ''
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollTopVisibility)
  if (keyMessageTimer) {
    window.clearInterval(keyMessageTimer)
  }
  document.body.style.overflow = ''
})

const toggleTheme = () => {
  theme.value = isDarkTheme.value ? 'light' : 'dark'
}

const openDetail = (detail: DetailKey) => {
  activeDetail.value = detail
}

const closeDetail = () => {
  activeDetail.value = null
}
</script>

<template>
  <main class="site-shell" :data-theme="theme">
    <NuxtRouteAnnouncer />

    <template v-if="route.path === '/'">
    <nav class="topbar" aria-label="주요 메뉴">
      <a class="brand" href="#top" aria-label="세종BC 홈">
        <img class="brand-mark" src="/sejongbc-logo.svg" alt="" aria-hidden="true">
        <span>
          <strong>SEJONG BC</strong>
          <small>세종시 고교야구팀</small>
        </span>
      </a>

      <div class="nav-menu">
        <div class="nav-links">
          <a href="#identity">팀 소개</a>
          <a href="#staff">지도자</a>
          <a href="#recruit">선수모집</a>
          <a href="#parents">학부모 운영회</a>
          <a href="#qa">Q&amp;A</a>
        </div>
      </div>
    </nav>

    <button
      class="theme-toggle"
      type="button"
      :aria-label="isDarkTheme ? '라이트 모드로 전환' : '다크 모드로 전환'"
      :aria-pressed="isDarkTheme"
      @click="toggleTheme"
    >
      <svg v-if="isDarkTheme" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 14.7A8.5 8.5 0 0 1 9.3 4a7 7 0 1 0 10.7 10.7z" />
      </svg>
    </button>

    <div class="floating-contact-actions" aria-label="입단 문의 바로가기">
      <a class="phone-action" href="tel:01067400480" aria-label="입단 문의 전화 010-6740-0480">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.98.7 2.91a2 2 0 0 1-.45 2.11L8.09 10a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.93.34 1.91.57 2.91.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
      <a
        class="instagram-action"
        href="https://www.instagram.com/sejongbc25?igsh=MXFjNjRwamswbHZx"
        target="_blank"
        rel="noreferrer"
        aria-label="세종BC 인스타그램 열기"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" />
        </svg>
      </a>
    </div>

    <button
      v-show="showScrollTop"
      class="scroll-top-button"
      type="button"
      aria-label="최상단으로 이동"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 15 6-6 6 6" />
      </svg>
    </button>

    <section id="top" class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">세종특별자치시 대표 고교야구팀</p>
        <h1>세종BC</h1>
        <p class="hero-lead">
          세종특별자치시의 유일한 고교야구팀으로, 매년 세종시 대표 자격으로
          전국체전에 참가합니다. 더 많은 경기 경험과 성장 기회를 원하는 선수에게
          열린 환경을 제공합니다.
        </p>
      </div>

      <div class="key-message-slider" aria-label="세종BC 핵심 메시지">
        <div class="key-message-panel">
          <Transition name="key-message" mode="out-in">
            <div :key="keyMessages[activeKeyMessage].number" class="key-message-content">
              <span>{{ keyMessages[activeKeyMessage].number }}</span>
              <strong>{{ keyMessages[activeKeyMessage].title }}</strong>
              <p>{{ keyMessages[activeKeyMessage].body }}</p>
            </div>
          </Transition>

          <div class="key-message-dots" aria-label="핵심 메시지 순서">
            <button
              v-for="(message, index) in keyMessages"
              :key="message.number"
              type="button"
              :aria-label="`${message.title} 보기`"
              :aria-current="activeKeyMessage === index"
              @click="activeKeyMessage = index"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="recruit" class="section recruit-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Recruiting</p>
          <h2>선수모집 · 입단문의</h2>
        </div>
        <button class="heading-detail-action" type="button" @click="openDetail('recruit')">
          자세히 보기 &gt;
        </button>
      </div>

      <div class="recruit-layout">
        <div class="recruit-copy">
          <h3>세종BC에서 더 많은 실전 경험을 쌓을 선수를 기다립니다.</h3>
          <p>
            세종특별자치시 유일 고교야구팀이라는 장점을 바탕으로 전국체전,
            각종 대회, 실전 중심 훈련을 통해 성장할 선수를 모집합니다.
          </p>
        </div>

        <div class="recruit-list" aria-label="입단 문의 안내">
          <div>
            <span>대상</span>
            <strong>고교야구 진학 및 이적을 고민하는 선수</strong>
          </div>
          <div>
            <span>강점</span>
            <strong>경기 경험 기회, 체계적 훈련, 컨디션 관리 지도</strong>
          </div>
          <div>
            <span>문의</span>
            <strong>010-6740-0480 또는 공식 인스타그램 @sejongbc25 DM</strong>
          </div>
        </div>

        <div class="recruit-actions" aria-label="입단 문의 바로가기">
          <a
            class="recruit-primary"
            href="tel:01067400480"
          >
            전화 문의
          </a>
          <a
            class="recruit-secondary"
            href="https://www.instagram.com/sejongbc25?igsh=MXFjNjRwamswbHZx"
            target="_blank"
            rel="noreferrer"
          >
            인스타그램 DM 문의
          </a>
          <a class="recruit-secondary" href="#qa">자주 묻는 질문 보기</a>
        </div>
      </div>
    </section>

    <section id="identity" class="section identity-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Why Sejong BC</p>
          <h2>세종BC가 선수에게 주는 환경</h2>
        </div>
        <button class="heading-detail-action" type="button" @click="openDetail('about')">
          자세히 보기 &gt;
        </button>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <span class="feature-icon">市</span>
          <h3>세종시 유일 고교야구팀</h3>
          <p>
            세종특별자치시의 유일한 고교야구팀으로, 지역 안에서 야구를
            이어가고 싶은 선수에게 현실적인 선택지가 됩니다.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-icon">全</span>
          <h3>세종시 대표 전국체전 참가</h3>
          <p>
            매년 세종시 대표로 전국체전에 참가하며, 지역 대표라는 책임감과
            전국 무대 경험을 함께 쌓습니다.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-icon">移</span>
          <h3>이적 패널티 부담 완화</h3>
          <p>
            세종시 유일팀이라는 구조적 장점으로 진학과 이적 선택을 고민할 때
            불필요한 제약을 줄일 수 있습니다.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-icon">試</span>
          <h3>열려 있는 경기 경험</h3>
          <p>
            훈련 태도와 준비도에 따라 실전 기회를 만들어갈 수 있어, 경기 속에서
            빠르게 성장하려는 선수에게 맞는 환경입니다.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-icon">管</span>
          <h3>체계적인 컨디션 관리</h3>
          <p>
            강도 높은 훈련만 강조하지 않고, 회복과 컨디션을 함께 보며 지속해서
            훈련할 수 있는 몸 상태를 관리합니다.
          </p>
        </article>

        <article class="feature-card">
          <span class="feature-icon">通</span>
          <h3>권위보다 소통</h3>
          <p>
            젊은 지도진의 빠른 피드백과 소탈한 소통 방식으로 선수와 학부모가
            팀 운영을 이해하기 쉽게 돕습니다.
          </p>
        </article>
      </div>

    </section>

    <section id="staff" class="section staff-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Coaching Staff</p>
          <h2>젊고 소통하는 지도진</h2>
        </div>
        <button class="heading-detail-action" type="button" @click="openDetail('coaches')">
          자세히 보기 &gt;
        </button>
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
        <strong>지도자 상세 안내</strong>
        <span>
          감독 및 코치의 선수 경력, 지도 경력, 자격 사항, 주요 성과를 별도
          프로필 페이지로 확장할 수 있습니다.
        </span>
      </div>
    </section>

    <section id="parents" class="section parents-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Parents Committee</p>
          <h2>학부모 운영회 안내</h2>
        </div>
        <button class="heading-detail-action" type="button" @click="openDetail('parents')">
          자세히 보기 &gt;
        </button>
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
            전화 010-6740-0480 또는 공식 인스타그램 @sejongbc25를 통해 입단,
            훈련 참관, 운영회 관련 질문을 확인할 수 있습니다.
          </p>
        </details>
      </div>
    </section>

    <DetailOverlay v-if="activeDetail" :title="`${activeDetail} detail`" @close="closeDetail">
      <AboutDetail v-if="activeDetail === 'about'" />
      <CoachesDetail v-else-if="activeDetail === 'coaches'" />
      <RecruitDetail v-else-if="activeDetail === 'recruit'" />
      <ParentsDetail v-else-if="activeDetail === 'parents'" />
    </DetailOverlay>
    </template>

    <NuxtPage v-else />
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

button {
  font: inherit;
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
  padding: 16px max(156px, clamp(20px, 5vw, 72px)) 16px clamp(20px, 5vw, 72px);
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
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--line);
  object-fit: contain;
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
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 40;
  display: inline-grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-strong);
  cursor: pointer;
  opacity: 0.62;
  padding: 0;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  opacity: 1;
  transform: scale(1.04);
}

.theme-toggle svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.floating-contact-actions {
  position: fixed;
  top: 18px;
  right: 68px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 12px;
}

.scroll-top-button {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 40;
  display: inline-grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: var(--text-strong);
  color: var(--accent);
  cursor: pointer;
  box-shadow: 0 16px 40px var(--shadow);
  opacity: 0.78;
  padding: 0;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.scroll-top-button:hover,
.scroll-top-button:focus-visible {
  opacity: 1;
  transform: translateY(-2px);
}

.scroll-top-button svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.4;
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

.primary-action,
.phone-action,
.instagram-action {
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

.phone-action,
.instagram-action {
  width: 40px;
  min-height: 40px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--text-strong);
  opacity: 0.78;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.phone-action:hover,
.phone-action:focus-visible,
.instagram-action:hover,
.instagram-action:focus-visible {
  opacity: 1;
  transform: scale(1.04);
}

.phone-action svg,
.instagram-action svg {
  width: 25px;
  height: 25px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.key-message-slider {
  display: grid;
  align-self: center;
  gap: 14px;
}

.key-message-panel {
  display: flex;
  min-height: 260px;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}

.key-message-content {
  min-height: 186px;
}

.key-message-enter-active,
.key-message-leave-active {
  transition:
    opacity 260ms ease,
    transform 260ms ease;
}

.key-message-enter-from {
  opacity: 0;
  transform: translateX(18px);
}

.key-message-leave-to {
  opacity: 0;
  transform: translateX(-18px);
}

.key-message-dots {
  display: flex;
  min-height: auto;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.key-message-dots button {
  width: 28px;
  height: 4px;
  border: 0;
  border-radius: 999px;
  background: var(--line-strong);
  cursor: pointer;
  padding: 0;
}

.key-message-dots button[aria-current="true"] {
  background: var(--accent);
}

.key-message-slider span {
  color: var(--accent-strong);
  font-size: 13px;
  font-weight: 900;
}

.key-message-slider strong {
  display: block;
  max-width: 620px;
  margin-top: 14px;
  color: var(--text-strong);
  font-size: clamp(38px, 5vw, 72px);
  line-height: 1.04;
}

.key-message-slider p,
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
  display: flex;
  max-width: none;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 22px;
  margin-bottom: 32px;
}

.section-heading > div {
  max-width: 760px;
}

.section-heading h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(32px, 5vw, 58px);
  line-height: 1.08;
  letter-spacing: 0;
}

.heading-detail-action {
  flex: 0 0 auto;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 15px;
  font-weight: 900;
  padding: 8px 0;
}

.heading-detail-action:hover,
.heading-detail-action:focus-visible {
  color: var(--text-strong);
}

.section-more {
  margin-top: 24px;
}

.detail-link,
.inline-detail-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  cursor: pointer;
  font-weight: 900;
}

.detail-link {
  background: var(--text-strong);
  color: var(--accent);
}

.inline-detail-link {
  flex: 0 0 auto;
  background: #171717;
  color: #f6be00;
}

.detail-drawer-shell {
  position: fixed;
  inset: 0;
  z-index: 80;
  overflow-y: auto;
  background:
    linear-gradient(135deg, var(--hero-gradient-a), transparent 38%),
    var(--bg);
}

.detail-drawer {
  min-height: 100%;
  padding: clamp(24px, 5vw, 72px);
  padding-bottom: calc(clamp(24px, 5vw, 72px) + env(safe-area-inset-bottom));
}

.detail-drawer-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(28px, 5vw, 64px);
}

.detail-drawer-header h2 {
  margin: 0;
  color: var(--text-strong);
  font-size: clamp(46px, 8vw, 92px);
  line-height: 1.08;
}

.drawer-close {
  position: sticky;
  top: 18px;
  display: inline-grid;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--text-strong);
  cursor: pointer;
  opacity: 0.72;
  padding: 0;
}

.overlay-close {
  position: fixed;
  top: clamp(16px, 3vw, 28px);
  right: clamp(16px, 3vw, 28px);
  z-index: 2;
  border-radius: 999px;
  background: var(--surface-glass);
  box-shadow: 0 12px 32px var(--shadow);
}

.drawer-close:hover,
.drawer-close:focus-visible {
  opacity: 1;
}

.drawer-close svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 2.2;
}

.drawer-body-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(22px, 4vw, 44px);
  align-items: start;
}

.drawer-photo-placeholder {
  display: grid;
  min-height: min(58vh, 560px);
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(246, 190, 0, 0.22), transparent 48%),
    var(--surface-soft);
  color: var(--muted);
  text-align: center;
  font-weight: 900;
}

.drawer-summary {
  max-width: 780px;
  margin: 20px 0 0;
  color: var(--nav-muted);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 700;
  line-height: 1.7;
}

.drawer-content-list {
  display: grid;
  gap: 12px;
}

.drawer-content-list section {
  padding: clamp(22px, 3vw, 34px);
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-glass);
}

.drawer-content-list h3 {
  margin: 0 0 8px;
  color: var(--text-strong);
  font-size: clamp(24px, 3vw, 34px);
}

.drawer-content-list p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.drawer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: clamp(28px, 5vw, 56px);
  padding-bottom: env(safe-area-inset-bottom);
}

.drawer-actions a,
.drawer-actions button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  cursor: pointer;
  font-weight: 900;
}

.drawer-actions a {
  background: var(--text-strong);
  color: var(--accent);
}

.drawer-actions button {
  background: var(--accent);
  color: #171717;
}

.page-detail-content {
  min-height: auto;
}

.detail-page {
  min-height: 100vh;
  color: var(--text);
  background:
    linear-gradient(135deg, var(--hero-gradient-a), transparent 38%),
    var(--bg);
}

.detail-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px max(72px, clamp(20px, 5vw, 72px)) 16px clamp(20px, 5vw, 72px);
  border-bottom: 1px solid var(--line);
  background: var(--topbar-bg);
  backdrop-filter: blur(16px);
}

.detail-home {
  color: var(--text-strong);
  font-weight: 900;
}

.detail-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  color: var(--nav-muted);
  font-size: 14px;
  font-weight: 800;
}

.detail-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
  padding: clamp(56px, 8vw, 108px) clamp(20px, 5vw, 72px);
}

.detail-hero h1 {
  font-size: clamp(46px, 8vw, 92px);
}

.detail-hero p {
  max-width: 760px;
  color: var(--nav-muted);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 700;
  line-height: 1.65;
}

.photo-placeholder {
  display: grid;
  min-height: 340px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(246, 190, 0, 0.2), transparent 46%),
    var(--surface-glass);
  color: var(--muted);
  text-align: center;
  font-weight: 900;
}

.photo-placeholder.small {
  min-height: 180px;
}

.photo-placeholder.portrait {
  min-height: 260px;
  aspect-ratio: 4 / 5;
}

.detail-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
  gap: 32px;
  align-items: start;
  padding: 0 clamp(20px, 5vw, 72px) clamp(72px, 9vw, 120px);
}

.content-main {
  display: grid;
  gap: 18px;
}

.content-block,
.aside-card,
.story-grid article {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.content-block {
  padding: clamp(24px, 4vw, 36px);
}

.content-block h2,
.aside-card h2 {
  margin: 0 0 14px;
  color: var(--text-strong);
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.16;
}

.content-block h3 {
  margin: 0 0 10px;
  color: var(--text-strong);
  font-size: 24px;
}

.content-block p,
.aside-card p,
.story-grid p {
  color: var(--muted);
  line-height: 1.76;
}

.detail-list {
  display: grid;
  gap: 10px;
  margin: 16px 0 0;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.7;
}

.inline-photo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.inline-photo-grid .photo-placeholder:nth-child(3) {
  grid-column: 1 / -1;
}

.profile-detail {
  display: grid;
  grid-template-columns: minmax(180px, 260px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.step-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.step-list > div {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-soft);
}

.step-list span {
  display: block;
  margin-bottom: 8px;
  color: var(--accent-strong);
  font-weight: 900;
}

.step-list strong {
  color: var(--text-strong);
  line-height: 1.45;
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.story-grid article {
  padding: 18px;
}

.story-grid h3 {
  margin-top: 16px;
}

.aside-card {
  position: sticky;
  top: 92px;
  display: grid;
  gap: 10px;
  padding: 22px;
}

.aside-card a {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  border-radius: 8px;
  color: var(--text-strong);
  font-weight: 900;
}

.aside-card.accent {
  background: var(--text-strong);
}

.aside-card.accent h2,
.aside-card.accent a {
  color: var(--accent);
}

.aside-card.accent p {
  color: var(--dark-panel-muted);
}

.recruit-section {
  background: var(--dark-panel);
  color: var(--accent);
}

.recruit-section .section-heading h2 {
  color: var(--accent);
}

.recruit-section .eyebrow {
  color: var(--dark-panel-text);
}

.recruit-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 24px 42px;
  align-items: start;
}

.recruit-copy h3 {
  max-width: 760px;
  margin: 0 0 14px;
  color: var(--dark-panel-text);
  font-size: clamp(26px, 4vw, 42px);
  line-height: 1.18;
}

.recruit-copy p {
  max-width: 700px;
  margin: 0;
  color: var(--dark-panel-muted);
  font-size: 18px;
  line-height: 1.72;
}

.recruit-list {
  display: grid;
  gap: 12px;
}

.recruit-list > div {
  padding: 18px 20px;
  border: 1px solid rgba(246, 190, 0, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}

.recruit-list span {
  display: block;
  margin-bottom: 8px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 900;
}

.recruit-list strong {
  color: var(--dark-panel-text);
  line-height: 1.5;
  word-break: keep-all;
}

.recruit-actions {
  display: flex;
  flex-wrap: wrap;
  grid-column: 1 / -1;
  gap: 12px;
  margin-top: 8px;
}

.recruit-primary,
.recruit-secondary {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  padding: 0 18px;
  cursor: pointer;
  font-weight: 900;
}

.recruit-primary {
  background: var(--accent);
  color: #171717;
}

.recruit-secondary {
  border: 1px solid rgba(246, 190, 0, 0.34);
  background: transparent;
  color: var(--dark-panel-text);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature-card {
  min-height: 236px;
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
  .detail-hero,
  .detail-content,
  .recruit-layout,
  .feature-grid,
  .staff-layout,
  .info-columns {
    grid-template-columns: 1fr;
  }

  .detail-topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .detail-drawer-header {
    flex-direction: column-reverse;
    margin-bottom: 24px;
  }

  .drawer-body-grid {
    grid-template-columns: 1fr;
  }

  .drawer-photo-placeholder {
    min-height: 280px;
  }

  .profile-detail,
  .step-list,
  .story-grid,
  .inline-photo-grid {
    grid-template-columns: 1fr;
  }

  .aside-card {
    position: static;
  }

  .hero-section {
    min-height: auto;
  }

  .key-message-panel {
    min-height: 220px;
  }

  .key-message-slider {
    order: 2;
  }

  .key-message-content {
    min-height: 154px;
  }

  .notice-strip {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .topbar {
    padding: 14px 156px 14px 18px;
  }

  .floating-contact-actions {
    top: 16px;
    right: 64px;
    gap: 8px;
  }

  .detail-topbar {
    padding: 14px 64px 14px 18px;
  }

  .detail-drawer {
    padding: 18px;
    padding-bottom: calc(24px + env(safe-area-inset-bottom));
  }

  .detail-drawer-header {
    gap: 12px;
  }

  .detail-drawer-header h2 {
    font-size: clamp(34px, 13vw, 52px);
  }

  .drawer-summary {
    margin-top: 14px;
    font-size: 17px;
  }

  .drawer-close {
    top: 8px;
    width: 44px;
    height: 44px;
    align-self: flex-end;
    border-radius: 999px;
    background: var(--surface-glass);
  }

  .drawer-photo-placeholder {
    min-height: 220px;
    padding: 18px;
  }

  .drawer-content-list section {
    padding: 18px;
  }

  .drawer-content-list h3 {
    font-size: 22px;
  }

  .drawer-actions {
    position: sticky;
    bottom: 0;
    margin-right: -18px;
    margin-left: -18px;
    padding: 12px 18px calc(12px + env(safe-area-inset-bottom));
    background: var(--surface);
    border-top: 1px solid var(--line);
  }

  .drawer-actions a,
  .drawer-actions button {
    width: 100%;
  }

  .section,
  .hero-section {
    padding-right: 18px;
    padding-left: 18px;
  }

  .key-message-panel,
  .feature-card,
  .profile-panel {
    padding: 22px;
  }

  .primary-action,
  .phone-action,
  .instagram-action {
    width: 38px;
    min-height: 38px;
  }

  .recruit-primary,
  .recruit-secondary {
    width: 100%;
  }
}
</style>
