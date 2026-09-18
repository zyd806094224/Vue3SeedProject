<template>
  <section id="repos" class="repo-section">
    <div class="section-inner">
      <header class="section-header">
        <h2 class="section-title">开源项目</h2>
        <p class="section-subtitle">Open Source Projects</p>
      </header>

      <div class="repo-grid">
        <a
          v-for="repo in repos"
          :key="repo.name"
          :href="`${github}/${repo.name}`"
          target="_blank"
          rel="noopener noreferrer"
          class="repo-card"
        >
          <div class="repo-head">
            <h3 class="repo-name">{{ repo.name }}</h3>
            <svg
              class="repo-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </div>
          <p class="repo-desc">{{ repo.desc }}</p>
          <div class="repo-meta">
            <span class="meta-item">
              <span class="lang-dot" :style="{ background: langColor(repo.lang) }"></span>
              {{ repo.lang }}
            </span>
            <span class="meta-item">★ {{ repo.stars }}</span>
            <span class="meta-item">{{ repo.year }}</span>
          </div>
        </a>
      </div>

      <a :href="github" target="_blank" rel="noopener noreferrer" class="repo-more">
        更多项目尽在 GitHub →
      </a>
    </div>
  </section>
</template>

<script setup name="RepoSection">
defineProps({
  repos: { type: Array, required: true },
  github: { type: String, required: true }
})

// GitHub 语言配色（缺失语言回退为灰色）
const langColors = {
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  Swift: '#F05138'
}

const langColor = (lang) => langColors[lang] || '#8b949e'
</script>

<style scoped lang="scss">
.repo-section {
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

.repo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
}

.repo-card {
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  border-radius: 16px;
  background: var(--about-card-bg);
  border: 1px solid var(--about-card-border);
  box-shadow: var(--about-card-shadow);
  backdrop-filter: blur(12px);
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--about-card-shadow-hover);
    border-color: var(--about-grad-start);

    .repo-arrow {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
}

.repo-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.repo-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--about-grad-start);
  margin: 0;
  word-break: break-all;
}

.repo-arrow {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--about-text-faint);
  opacity: 0;
  transform: translate(-4px, 4px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.repo-desc {
  flex: 1;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--about-text-sub);
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.repo-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  color: var(--about-text-faint);
}

.lang-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.repo-more {
  display: block;
  width: fit-content;
  margin: 32px auto 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--about-grad-start);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 640px) {
  .repo-section {
    padding: 64px 16px;
  }
}
</style>
