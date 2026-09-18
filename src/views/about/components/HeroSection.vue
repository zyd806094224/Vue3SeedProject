<template>
  <section id="hero" class="hero-section">
    <div class="hero-inner">
      <div class="avatar-ring">
        <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" class="avatar-img" />
        <span v-else class="avatar-fallback">{{ initial }}</span>
      </div>
      <p class="hero-hello">Hello，我是</p>
      <h1 class="hero-name">{{ profile.name }}</h1>
      <div class="hero-roles">
        <span class="role-chip is-primary">{{ profile.role }} · 主力</span>
        <span class="role-chip">跨端 RN / Flutter / 鸿蒙</span>
        <span class="role-chip">前端 Vue / React</span>
        <span class="role-chip">服务端 Spring Boot</span>
      </div>
      <p class="hero-slogan">{{ profile.slogan }}</p>
      <p class="hero-intro">{{ profile.intro }}</p>
      <div class="hero-actions">
        <a href="#skills" class="hero-btn is-primary">查看技术栈</a>
        <button class="hero-btn is-ghost" @click="copyEmail">
          {{ copied ? '邮箱已复制 ✓' : '联系我' }}
        </button>
      </div>
    </div>
    <a href="#skills" class="scroll-hint" aria-label="向下滚动">
      <span class="scroll-mouse"></span>
    </a>
  </section>
</template>

<script setup name="HeroSection">
const props = defineProps({
  profile: { type: Object, required: true }
})

const initial = computed(() => {
  const name = props.profile.name || ''
  return name.trim().charAt(0).toUpperCase() || 'Me'
})

const copied = ref(false)
let copiedTimer = null

const copyEmail = async () => {
  const email = props.profile.contact?.email || ''
  if (!email) return
  try {
    await navigator.clipboard.writeText(email)
  } catch (e) {
    // 非安全上下文（如 http 环境）下 Clipboard API 不可用时降级
    const input = document.createElement('textarea')
    input.value = email
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 2000)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px 72px;
  text-align: center;
}

.hero-inner {
  max-width: 760px;
  animation: hero-fade-up 0.8s ease both;
}

.avatar-ring {
  width: 112px;
  height: 112px;
  margin: 0 auto 24px;
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--about-grad-start), var(--about-grad-end));
  box-shadow: 0 12px 32px var(--about-avatar-shadow);
}

.avatar-img,
.avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--about-grad-start), var(--about-grad-end));
}

.hero-hello {
  font-size: 16px;
  letter-spacing: 2px;
  color: var(--about-text-sub);
  margin-bottom: 8px;
}

.hero-name {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 16px;
  background: linear-gradient(120deg, var(--about-grad-start), var(--about-grad-end));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-roles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 22px;
}

.role-chip {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--about-text-sub);
  background: var(--about-chip-bg);
  border: 1px solid var(--about-card-border);

  &.is-primary {
    color: #fff;
    font-weight: 600;
    border: none;
    background: linear-gradient(120deg, var(--about-grad-start), var(--about-grad-end));
  }
}

.hero-slogan {
  font-size: 18px;
  font-weight: 600;
  color: var(--about-text);
  margin: 0 0 12px;
}

.hero-intro {
  font-size: 15px;
  line-height: 1.9;
  color: var(--about-text-sub);
  margin: 0 auto 32px;
  max-width: 620px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.hero-btn {
  padding: 11px 28px;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &.is-primary {
    color: #fff;
    background: linear-gradient(120deg, var(--about-grad-start), var(--about-grad-end));
    box-shadow: 0 8px 20px var(--about-btn-shadow);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 26px var(--about-btn-shadow);
    }
  }

  &.is-ghost {
    color: var(--about-text);
    border: 1px solid var(--about-card-border);
    background: var(--about-card-bg);

    &:hover {
      transform: translateY(-2px);
      border-color: var(--about-grad-start);
      color: var(--about-grad-start);
    }
  }
}

.scroll-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-mouse {
  display: block;
  width: 22px;
  height: 36px;
  border: 2px solid var(--about-text-sub);
  border-radius: 12px;
  position: relative;
  opacity: 0.6;

  &::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    width: 3px;
    height: 7px;
    border-radius: 2px;
    background: var(--about-text-sub);
    transform: translateX(-50%);
    animation: scroll-dot 1.6s ease-in-out infinite;
  }
}

@keyframes hero-fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scroll-dot {
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  70% {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 640px) {
  .hero-name {
    font-size: 36px;
  }

  .hero-intro {
    font-size: 14px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
