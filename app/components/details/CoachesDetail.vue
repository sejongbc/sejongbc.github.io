<template>
  <header class="detail-drawer-header">
    <div>
      <p class="eyebrow">Coaching Staff</p>
      <h2>지도자 상세</h2>
      <p class="drawer-summary">
        신진호 감독의 약력, 지도 강점, 현장 역할을 프로필 형태로
        소개합니다.
      </p>
    </div>
  </header>

  <div class="coach-profile-list">
    <article class="coach-profile">
      <div class="coach-photo-placeholder">
        <span>감독 신진호 사진</span>
      </div>

      <div class="coach-profile-content">
        <p class="coach-role">감독</p>
        <h3>신진호</h3>
        <p class="coach-lead">
          도전과 전환을 직접 겪은 지도자, 유연한 소통으로 선수의 다음 가능성을 찾는 감독
        </p>

        <div class="coach-section">
          <h4>주요 약력</h4>
          <ul class="coach-history">
            <li>화순초 · 화순중 · 화순고 출신</li>
            <li>캔자스시티 로열스 입단</li>
            <li>NC 다이노스 2017년 2차 1라운드 8순위 지명</li>
            <li>KBO, 포수·투수 포지션 전환 경험</li>
            <li>천안상업고등학교 야구부 코치</li>
            <li>현재 세종BC 감독</li>
          </ul>
        </div>

        <div class="coach-section">
          <h4>감독으로서의 강점</h4>
          <div class="coach-strength-grid">
            <div>
              <strong>현실적인 성장 기준</strong>
              <p>
                선수 시절의 도전과 포지션 전환 경험을 바탕으로, 선수의 현재와
                다음 가능성을 함께 봅니다.
              </p>
            </div>
            <div>
              <strong>포지션 전환을 아는 지도</strong>
              <p>
                포수와 투수 전환을 겪으며 선수의 포지션 이해, 역할 변화, 전환 가능성을
                폭넓게 바라봅니다.
              </p>
            </div>
            <div>
              <strong>부드럽고 유연한 소통</strong>
              <p>
                국내와 다른 야구 문화를 경험하며 쌓은 시야를 바탕으로, 일방적인 지시보다
                선수와 눈높이를 맞추는 소통을 지향합니다. 훈련 태도와 준비 과정을 함께
                보며 실전 경험이 다음 성장으로 이어지도록 피드백합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.coach-profile-list {
  display: grid;
  gap: 18px;
}

.coach-profile {
  display: grid;
  grid-template-columns: minmax(260px, 0.42fr) minmax(0, 0.58fr);
  gap: clamp(18px, 3vw, 32px);
  align-items: stretch;
  padding: clamp(18px, 3vw, 28px);
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-glass);
}

.coach-photo-placeholder {
  display: grid;
  min-height: 420px;
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

.coach-photo-placeholder.secondary {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 46%),
    var(--surface-soft);
}

.coach-profile-content {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.coach-role {
  margin: 0 0 8px;
  color: var(--accent);
  font-size: 13px;
  font-weight: 900;
}

.coach-profile h3 {
  margin: 0;
  color: var(--text-strong);
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1;
}

.coach-lead {
  margin: 16px 0 24px;
  color: var(--nav-muted);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 800;
  line-height: 1.55;
}

.coach-section {
  margin-top: 18px;
}

.coach-section h4 {
  margin: 0 0 10px;
  color: var(--text-strong);
  font-size: 18px;
}

.coach-history {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.6;
}

.coach-strength-grid {
  display: grid;
  gap: 10px;
}

.coach-strength-grid > div {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.coach-strength-grid strong {
  display: block;
  margin-bottom: 6px;
  color: var(--text-strong);
}

.coach-strength-grid p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

@media (max-width: 900px) {
  .coach-profile {
    grid-template-columns: 1fr;
  }

  .coach-photo-placeholder {
    min-height: 300px;
  }
}

@media (max-width: 560px) {
  .coach-profile {
    padding: 16px;
  }

  .coach-photo-placeholder {
    min-height: 240px;
  }
}
</style>
