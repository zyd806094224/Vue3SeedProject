<template>
  <section id="experience" class="exp-section">
    <div class="section-inner">
      <header class="section-header">
        <h2 class="section-title">项目经历</h2>
        <p class="section-subtitle">Experience</p>
      </header>

      <ol class="timeline">
        <li v-for="item in experiences" :key="item.title" class="timeline-item">
          <div class="item-dot"></div>
          <div class="item-card">
            <div class="item-meta">
              <span class="item-period">{{ item.period }}</span>
              <span v-if="item.role" class="item-role">{{ item.role }}</span>
            </div>
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-desc">{{ item.desc }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup name="ExperienceSection">
defineProps({
  experiences: { type: Array, required: true }
})
</script>

<style scoped lang="scss">
.exp-section {
  padding: 88px 20px;
  scroll-margin-top: 64px;
}

.section-inner {
  max-width: 820px;
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

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--about-grad-start), var(--about-grad-end));
  opacity: 0.35;
}

.timeline-item {
  position: relative;
  padding-left: 36px;
  margin-bottom: 26px;

  &:last-child {
    margin-bottom: 0;
  }
}

.item-dot {
  position: absolute;
  left: 0;
  top: 22px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--about-dot-bg);
  border: 3px solid var(--about-grad-start);
  box-shadow: 0 0 0 4px var(--about-dot-halo);
}

.item-card {
  padding: 20px 24px;
  border-radius: 16px;
  background: var(--about-card-bg);
  border: 1px solid var(--about-card-border);
  box-shadow: var(--about-card-shadow);
  backdrop-filter: blur(12px);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateX(6px);
    box-shadow: var(--about-card-shadow-hover);
  }
}

.item-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.item-period {
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  padding: 3px 10px;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--about-grad-start), var(--about-grad-end));
}

.item-role {
  font-size: 12.5px;
  color: var(--about-text-faint);
}

.item-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--about-text);
  margin: 0 0 8px;
}

.item-desc {
  font-size: 14px;
  line-height: 1.8;
  color: var(--about-text-sub);
  margin: 0;
}

@media (max-width: 640px) {
  .exp-section {
    padding: 64px 16px;
  }
}
</style>
