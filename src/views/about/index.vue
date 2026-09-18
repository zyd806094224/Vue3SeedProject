<template>
  <div class="about-page">
    <!-- 背景层：极光光斑 + 暗角 -->
    <div class="bg-aurora aurora-a"></div>
    <div class="bg-aurora aurora-b"></div>
    <div class="bg-aurora aurora-c"></div>
    <div class="bg-vignette"></div>

    <!-- 顶部导航 -->
    <nav class="about-nav">
      <div class="nav-inner">
        <a href="#hero" class="nav-brand">
          <span class="brand-dot"></span>
          {{ profile.name }}<span class="brand-sub">.dev</span>
        </a>
        <div class="nav-links">
          <a href="#hero" class="nav-link">首页</a>
          <a href="#skills" class="nav-link">技术栈</a>
          <a href="#experience" class="nav-link">项目经历</a>
          <router-link to="/login" class="nav-login">前往登录</router-link>
        </div>
      </div>
    </nav>

    <main>
      <HeroSection :profile="profile" />
      <SkillSection :skills="profile.skills" class="about-reveal section-band" />
      <ExperienceSection :experiences="profile.experiences" class="about-reveal" />
    </main>
    <FooterSection :profile="profile" class="about-reveal" />
  </div>
</template>

<script setup name="About">
import { profile } from './profile'
import HeroSection from './components/HeroSection.vue'
import SkillSection from './components/SkillSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import FooterSection from './components/FooterSection.vue'

onMounted(() => {
  document.title = `${profile.name} · 个人介绍`
  // 进入视口时给 section 加入场动画
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  document.querySelectorAll('.about-reveal').forEach((el) => observer.observe(el))
})
</script>

<style lang="scss">
/* 本页锚点跳转启用平滑滚动（仅在挂载本页时生效） */
html:has(.about-page) {
  scroll-behavior: smooth;
}
</style>

<style scoped lang="scss">
/* ---------- 页面级配色变量（亮色） ---------- */
.about-page {
  --about-bg: #f4f6fb;
  --about-text: #1f2937;
  --about-text-sub: #4b5563;
  --about-text-faint: #9aa3b5;
  --about-card-bg: rgba(255, 255, 255, 0.72);
  --about-card-bg-solid: #ffffff;
  --about-card-border: rgba(15, 23, 42, 0.08);
  --about-card-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  --about-card-shadow-hover: 0 14px 32px rgba(99, 102, 241, 0.16);
  --about-card-shadow-primary: 0 16px 36px rgba(99, 102, 241, 0.22);
  --about-chip-bg: rgba(99, 102, 241, 0.08);
  --about-icon-bg: rgba(99, 102, 241, 0.1);
  --about-track-bg: rgba(15, 23, 42, 0.08);
  --about-grad-start: #6366f1;
  --about-grad-end: #22d3ee;
  --about-avatar-shadow: rgba(99, 102, 241, 0.35);
  --about-btn-shadow: rgba(99, 102, 241, 0.3);
  --about-dot-bg: #ffffff;
  --about-dot-halo: rgba(99, 102, 241, 0.15);
  --about-nav-bg: rgba(255, 255, 255, 0.7);
  --about-band-bg: rgba(99, 102, 241, 0.045);
  --about-aurora-opacity: 0.5;

  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--about-bg);
  color: var(--about-text);
}

/* ---------- 暗色模式适配 ---------- */
html.dark .about-page {
  --about-bg: #0b1020;
  --about-text: #e5e9f2;
  --about-text-sub: #a7b0c3;
  --about-text-faint: #6b7689;
  --about-card-bg: rgba(23, 30, 51, 0.72);
  --about-card-bg-solid: #171e33;
  --about-card-border: rgba(148, 163, 184, 0.16);
  --about-card-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  --about-card-shadow-hover: 0 14px 32px rgba(0, 0, 0, 0.45);
  --about-card-shadow-primary: 0 16px 36px rgba(34, 211, 238, 0.18);
  --about-chip-bg: rgba(148, 163, 184, 0.12);
  --about-icon-bg: rgba(99, 102, 241, 0.18);
  --about-track-bg: rgba(148, 163, 184, 0.18);
  --about-avatar-shadow: rgba(0, 0, 0, 0.5);
  --about-btn-shadow: rgba(34, 211, 238, 0.22);
  --about-dot-bg: #101728;
  --about-dot-halo: rgba(34, 211, 238, 0.12);
  --about-nav-bg: rgba(11, 16, 32, 0.72);
  --about-band-bg: rgba(148, 163, 184, 0.05);
  --about-aurora-opacity: 0.22;
}

/* ---------- 背景光斑 ---------- */
.bg-aurora {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  opacity: var(--about-aurora-opacity);
  pointer-events: none;
  z-index: 0;
}

.aurora-a {
  width: 480px;
  height: 480px;
  top: -140px;
  left: -120px;
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  animation: aurora-float 16s ease-in-out infinite alternate;
}

.aurora-b {
  width: 520px;
  height: 520px;
  top: 20%;
  right: -180px;
  background: radial-gradient(circle, #22d3ee 0%, transparent 70%);
  animation: aurora-float 20s ease-in-out infinite alternate-reverse;
}

.aurora-c {
  width: 460px;
  height: 460px;
  bottom: -160px;
  left: 30%;
  background: radial-gradient(circle, #a855f7 0%, transparent 70%);
  animation: aurora-float 24s ease-in-out infinite alternate;
}

.bg-vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(ellipse at center, transparent 55%, var(--about-bg) 130%);
  opacity: 0.6;
}

@keyframes aurora-float {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(60px, 40px) scale(1.12);
  }
}

/* ---------- 顶部导航 ---------- */
.about-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 100;
  background: var(--about-nav-bg);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--about-card-border);
}

.nav-inner {
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 17px;
  font-weight: 800;
  color: var(--about-text);
  text-decoration: none;

  .brand-sub {
    color: var(--about-grad-start);
  }
}

.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--about-grad-start), var(--about-grad-end));
  box-shadow: 0 0 8px var(--about-btn-shadow);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-link {
  font-size: 14.5px;
  color: var(--about-text-sub);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--about-grad-start);
  }
}

.nav-login {
  padding: 7px 18px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(120deg, var(--about-grad-start), var(--about-grad-end));
  box-shadow: 0 6px 14px var(--about-btn-shadow);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

/* ---------- 内容层级与入场动画 ---------- */
.about-page > main,
.about-page > :deep(footer) {
  position: relative;
  z-index: 1;
}

.section-band {
  background: var(--about-band-bg);
}

.about-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;

  &.is-inview {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 640px) {
  .nav-link {
    display: none;
  }
}
</style>
