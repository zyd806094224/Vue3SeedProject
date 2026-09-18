<template>
  <section id="skills" class="skill-section">
    <div class="section-inner">
      <header class="section-header">
        <h2 class="section-title">技术栈</h2>
        <p class="section-subtitle">Technology Stack</p>
      </header>

      <div class="skill-grid">
        <article
          v-for="skill in skills"
          :key="skill.key"
          class="skill-card"
          :class="{ 'is-primary': skill.primary }"
        >
          <span v-if="skill.primary" class="primary-badge">主力方向</span>
          <div class="card-icon">
            <!-- Android 机器人 -->
            <svg
              v-if="skill.key === 'android'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5.5 10.5a6.5 6.5 0 0 1 13 0V15a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3v-4.5z" />
              <path d="M9.2 4.6 10.5 6.9M14.8 4.6 13.5 6.9" />
              <path d="M9.6 10.2h.01M14.4 10.2h.01" stroke-width="2.4" />
              <path d="M3.2 11.5v3.5M20.8 11.5v3.5" />
            </svg>
            <!-- 显示器 + 代码 -->
            <svg
              v-else-if="skill.key === 'frontend'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="13" rx="2" />
              <path d="M8 21h8M12 17v4" />
              <path d="m9 8-2.5 2.5L9 13M15 8l2.5 2.5L15 13" />
            </svg>
            <!-- 多端拼图 -->
            <svg
              v-else-if="skill.key === 'hybrid'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
              <path d="M17.25 13.5v7.5M13.5 17.25h7.5" />
            </svg>
            <!-- 服务器机柜 -->
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="7" rx="2" />
              <rect x="3" y="13" width="18" height="7" rx="2" />
              <path d="M7 7.5h.01M7 16.5h.01" stroke-width="2.4" />
              <path d="M12 7.5h5M12 16.5h5" />
            </svg>
          </div>
          <h3 class="card-name">{{ skill.name }}</h3>
          <p class="card-desc">{{ skill.desc }}</p>
          <div class="card-level">
            <span class="level-label">熟练度</span>
            <div class="level-track">
              <div class="level-bar" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="level-num">{{ skill.level }}%</span>
          </div>
          <div class="card-tags">
            <span v-for="tag in skill.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup name="SkillSection">
defineProps({
  skills: { type: Array, required: true }
})
</script>

<style scoped lang="scss">
.skill-section {
  padding: 88px 20px;
  scroll-margin-top: 64px;
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 44px;
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--about-text);
  margin: 0 0 8px;
}

.section-subtitle {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--about-text-faint);
  margin: 0;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  align-items: stretch;
}

.skill-card {
  position: relative;
  padding: 28px 26px 24px;
  border-radius: 18px;
  background: var(--about-card-bg);
  border: 1px solid var(--about-card-border);
  box-shadow: var(--about-card-shadow);
  backdrop-filter: blur(12px);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--about-card-shadow-hover);
  }

  &.is-primary {
    border: 1.5px solid transparent;
    background:
      linear-gradient(var(--about-card-bg-solid), var(--about-card-bg-solid)) padding-box,
      linear-gradient(135deg, var(--about-grad-start), var(--about-grad-end)) border-box;
    box-shadow: var(--about-card-shadow-primary);

    .card-icon {
      color: #fff;
      background: linear-gradient(135deg, var(--about-grad-start), var(--about-grad-end));
      box-shadow: 0 8px 18px var(--about-btn-shadow);
    }
  }
}

.primary-badge {
  position: absolute;
  top: -13px;
  right: 20px;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(120deg, var(--about-grad-start), var(--about-grad-end));
  box-shadow: 0 6px 14px var(--about-btn-shadow);
}

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--about-grad-start);
  background: var(--about-icon-bg);

  svg {
    width: 30px;
    height: 30px;
  }
}

.card-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--about-text);
  margin: 0 0 10px;
}

.card-desc {
  font-size: 14px;
  line-height: 1.8;
  color: var(--about-text-sub);
  margin: 0 0 18px;
  min-height: 76px;
}

.card-level {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.level-label,
.level-num {
  font-size: 12px;
  color: var(--about-text-faint);
  white-space: nowrap;
}

.level-track {
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: var(--about-track-bg);
  overflow: hidden;
}

.level-bar {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--about-grad-start), var(--about-grad-end));
  transition: width 1s ease;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  color: var(--about-text-sub);
  background: var(--about-chip-bg);
  border: 1px solid var(--about-card-border);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: var(--about-grad-start);
    border-color: var(--about-grad-start);
  }
}

@media (max-width: 640px) {
  .skill-section {
    padding: 64px 16px;
  }

  .card-desc {
    min-height: 0;
  }
}
</style>
