<template>
  <div class="login">
    <!-- 动态背景：粒子星空 -->
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
    <!-- 极光光斑 -->
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
    <!-- 透视网格与暗角 -->
    <div class="grid-overlay"></div>
    <div class="vignette"></div>

    <div class="login-stage">
      <!-- 左侧品牌区 -->
      <div class="brand-side">
        <div class="brand-logo">
          <svg viewBox="0 0 44 44" class="logo-svg" aria-hidden="true">
            <defs>
              <linearGradient id="login-logo-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#22d3ee" />
                <stop offset="1" stop-color="#a855f7" />
              </linearGradient>
            </defs>
            <path
              d="M22 2 L40 22 L22 42 L4 22 Z"
              fill="none"
              stroke="url(#login-logo-gradient)"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M22 12 L30 22 L22 32 L14 22 Z"
              fill="url(#login-logo-gradient)"
              opacity="0.9"
            />
            <circle cx="22" cy="22" r="2.6" fill="#e0f2fe" />
          </svg>
          <span class="brand-name">{{ title }}</span>
        </div>
        <h1 class="brand-title">安全高效的<br />数字化管理平台</h1>
        <p class="brand-slogan">高效 · 安全 · 开放，一站式掌控你的业务</p>
        <ul class="brand-features">
          <li>
            <span class="feature-icon-box">
              <svg-icon icon-class="chart" class="feature-icon" />
            </span>
            <div class="feature-text">
              <b>实时数据洞察</b>
              <span>多维度报表与可视化，业务状态一目了然</span>
            </div>
          </li>
          <li>
            <span class="feature-icon-box">
              <svg-icon icon-class="lock" class="feature-icon" />
            </span>
            <div class="feature-text">
              <b>细粒度权限管控</b>
              <span>数据隔离与操作审计，安全合规有保障</span>
            </div>
          </li>
          <li>
            <span class="feature-icon-box">
              <svg-icon icon-class="component" class="feature-icon" />
            </span>
            <div class="feature-text">
              <b>丰富组件生态</b>
              <span>开箱即用的业务组件，快速构建应用</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 右侧登录卡片 -->
      <div class="glass-card">
        <div class="card-header">
          <h3 class="form-title">欢迎回来</h3>
          <p class="form-subtitle">登录 {{ title }}，继续你的工作</p>
        </div>
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="账号"
            >
              <template #prefix>
                <svg-icon icon-class="user" class="el-input__icon input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <svg-icon icon-class="password" class="el-input__icon input-icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" v-if="captchaEnabled">
            <div class="code-row">
              <el-input
                v-model="loginForm.code"
                size="large"
                auto-complete="off"
                placeholder="验证码"
                class="code-input"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <svg-icon icon-class="validCode" class="el-input__icon input-icon" />
                </template>
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img" alt="验证码" />
              </div>
            </div>
          </el-form-item>
          <div class="form-options">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
            <router-link v-if="register" class="link-type register-link" :to="'/register'">
              立即注册
            </router-link>
          </div>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              size="large"
              class="login-btn"
              @click.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--  底部  -->
    <div class="el-login-footer">
      <span>{{ footerContent }}</span>
    </div>
  </div>
</template>

<script setup>
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import useUserStore from '@/store/modules/user'
import defaultSettings from '@/settings'
import { useRoute, useRouter } from 'vue-router'

const title = import.meta.env.VITE_APP_TITLE
const footerContent = defaultSettings.footerContent
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const loginForm = ref({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
})

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
}

const codeUrl = ref('')
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(true)
// 注册开关
const register = ref(false)
const redirect = ref(undefined)

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect
  },
  { immediate: true }
)

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, { expires: 30 })
        Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set('rememberMe', loginForm.value.rememberMe, { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          const query = route.query
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
              acc[cur] = query[cur]
            }
            return acc
          }, {})
          router.push({ path: redirect.value || '/', query: otherQueryParams })
        })
        .catch(() => {
          loading.value = false
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode()
          }
        })
    }
  })
}

function getCode() {
  getCodeImg().then((res) => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img
      loginForm.value.uuid = res.uuid
    }
  })
}

function getCookie() {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  }
}

/**
 * 粒子星空背景：星点 + 星链连线 + 流星 + 鼠标交互
 * 返回清理函数，组件卸载时移除监听并停止动画
 */
function createParticleSky(canvas) {
  if (!canvas) return () => {}
  const ctx = canvas.getContext('2d')
  const palette = ['34,211,238', '129,140,248', '232,121,249', '224,242,254']
  const linkDist = 110
  let width = 0
  let height = 0
  let particles = []
  const meteors = []
  let rafId = 0
  let nextMeteorTime = 0
  const mouse = { x: -1e4, y: -1e4 }
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function initParticles() {
    const count = Math.max(36, Math.min(140, Math.floor((width * height) / 13000)))
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.7,
      color: palette[i % palette.length],
      star: i % 6 === 0,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.5 + Math.random()
    }))
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    initParticles()
    if (reduced) drawFrame(performance.now())
  }

  function drawMeteors(now) {
    if (now > nextMeteorTime && meteors.length < 2) {
      meteors.push({
        x: width * (0.15 + Math.random() * 0.7),
        y: -30,
        vx: (Math.random() > 0.5 ? 1 : -1) * (2.6 + Math.random() * 1.6),
        vy: 2.2 + Math.random() * 1.4,
        life: 1,
        len: 110 + Math.random() * 90
      })
      nextMeteorTime = now + 4200 + Math.random() * 4800
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i]
      m.x += m.vx
      m.y += m.vy
      m.life -= 0.007
      const speed = Math.hypot(m.vx, m.vy)
      const tailX = m.x - (m.vx / speed) * m.len
      const tailY = m.y - (m.vy / speed) * m.len
      const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
      grad.addColorStop(0, `rgba(224,242,254,${0.65 * Math.max(m.life, 0)})`)
      grad.addColorStop(1, 'rgba(224,242,254,0)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(m.x, m.y)
      ctx.lineTo(tailX, tailY)
      ctx.stroke()
      if (m.life <= 0 || m.y > height + 60 || m.x < -120 || m.x > width + 120) {
        meteors.splice(i, 1)
      }
    }
  }

  function drawFrame(now) {
    ctx.clearRect(0, 0, width, height)
    const t = now / 1000

    if (!reduced) drawMeteors(now)

    // 星点
    for (const p of particles) {
      if (!reduced) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = width + 10
        else if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        else if (p.y > height + 10) p.y = -10
        // 鼠标附近的星点被轻轻推开
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 8100) {
          const d = Math.sqrt(d2) || 1
          const f = ((90 - d) / 90) * 0.9
          p.x += (dx / d) * f
          p.y += (dy / d) * f
        }
      }
      const alpha = p.star ? 0.55 + 0.45 * Math.sin(t * p.twinkle + p.phase) : 0.65
      if (p.star) {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        glow.addColorStop(0, `rgba(${p.color},${alpha})`)
        glow.addColorStop(1, `rgba(${p.color},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = `rgba(${p.color},${alpha})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }

    // 星链
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i]
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d2 = dx * dx + dy * dy
        if (d2 < linkDist * linkDist) {
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.24
          ctx.strokeStyle = `rgba(129,140,248,${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    // 鼠标与星点之间的连线
    if (mouse.x > -1000) {
      for (const p of particles) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (d < 170) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 170) * 0.35})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
      }
    }
  }

  function loop(now) {
    drawFrame(now)
    rafId = requestAnimationFrame(loop)
  }

  function onMouseMove(e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }
  function onMouseLeave() {
    mouse.x = -1e4
    mouse.y = -1e4
  }

  resize()
  window.addEventListener('resize', resize)
  if (!reduced) {
    window.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(loop)
  }

  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
    document.documentElement.removeEventListener('mouseleave', onMouseLeave)
  }
}

const canvasRef = ref(null)
let cleanupSky = null

onMounted(() => {
  cleanupSky = createParticleSky(canvasRef.value)
})

onUnmounted(() => {
  cleanupSky && cleanupSky()
})

getCode()
getCookie()
// 获取注册开关
proxy.getConfigKey('sys.account.registerUser').then((res) => {
  register.value = res.msg === 'true'
})
</script>

<style lang="scss" scoped>
@property --card-border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(1100px 720px at 78% -12%, #131d40 0%, rgba(19, 29, 64, 0) 60%),
    radial-gradient(900px 640px at -8% 108%, #17123a 0%, rgba(23, 18, 58, 0) 58%),
    linear-gradient(180deg, #0a0f26 0%, #060a1a 55%, #04060f 100%);
}

/* ---------- 背景层 ---------- */
.particle-canvas {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.aurora {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 1;
}

.aurora-1 {
  width: 62vmax;
  height: 62vmax;
  top: -24vmax;
  left: -18vmax;
  background: radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.32), transparent 62%);
  animation: aurora-drift-1 26s ease-in-out infinite alternate;
}

.aurora-2 {
  width: 55vmax;
  height: 55vmax;
  right: -20vmax;
  bottom: -22vmax;
  background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.22), transparent 62%);
  animation: aurora-drift-2 32s ease-in-out infinite alternate;
}

.aurora-3 {
  width: 40vmax;
  height: 40vmax;
  top: 30%;
  left: 42%;
  background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.22), transparent 60%);
  animation: aurora-drift-3 24s ease-in-out infinite alternate;
}

@keyframes aurora-drift-1 {
  to {
    transform: translate(9vmax, 7vmax) scale(1.12);
  }
}

@keyframes aurora-drift-2 {
  to {
    transform: translate(-8vmax, -9vmax) scale(1.18);
  }
}

@keyframes aurora-drift-3 {
  to {
    transform: translate(-7vmax, 6vmax) scale(0.86);
  }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 42%, #000 0%, transparent 100%);
  mask-image: radial-gradient(ellipse 70% 60% at 50% 42%, #000 0%, transparent 100%);
}

.vignette {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(
    ellipse 90% 80% at 50% 46%,
    transparent 55%,
    rgba(2, 6, 23, 0.65) 100%
  );
}

/* ---------- 主舞台 ---------- */
.login-stage {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: clamp(48px, 7vw, 110px);
  padding: 32px;
  animation: stage-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes stage-rise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- 左侧品牌区 ---------- */
.brand-side {
  max-width: 520px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;

  .logo-svg {
    width: 44px;
    height: 44px;
    filter: drop-shadow(0 0 14px rgba(99, 102, 241, 0.65));
  }

  .brand-name {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: 3px;
    color: #eef2ff;
  }
}

.brand-title {
  margin: 0 0 18px;
  font-size: clamp(30px, 3.6vw, 46px);
  font-weight: 700;
  line-height: 1.28;
  letter-spacing: 1px;
  background: linear-gradient(
    110deg,
    #e0f2fe 18%,
    #38bdf8 38%,
    #818cf8 54%,
    #f0abfc 72%,
    #e0f2fe 92%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: brand-shimmer 7s linear infinite;
}

@keyframes brand-shimmer {
  to {
    background-position: -200% 0;
  }
}

.brand-slogan {
  margin: 0 0 42px;
  font-size: 15px;
  letter-spacing: 1px;
  color: rgba(148, 163, 184, 0.95);
}

.brand-features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 22px;

  li {
    display: flex;
    align-items: center;
    gap: 14px;
  }
}

.feature-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.16), rgba(168, 85, 247, 0.16));
  border: 1px solid rgba(129, 140, 248, 0.28);
  box-shadow: inset 0 0 14px rgba(99, 102, 241, 0.12);
}

.feature-icon {
  width: 19px;
  height: 19px;
  color: #7dd3fc;
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 3px;

  b {
    font-size: 14px;
    color: #e2e8f0;
  }

  span {
    font-size: 12.5px;
    color: rgba(148, 163, 184, 0.85);
  }
}

/* ---------- 玻璃拟态登录卡片 ---------- */
.glass-card {
  position: relative;
  width: 420px;
  max-width: 100%;
  padding: 40px 36px 30px;
  border-radius: 20px;
  background: linear-gradient(160deg, rgba(30, 41, 74, 0.82) 0%, rgba(13, 20, 42, 0.88) 100%);
  backdrop-filter: blur(26px) saturate(155%);
  -webkit-backdrop-filter: blur(26px) saturate(155%);
  box-shadow:
    0 24px 70px rgba(2, 6, 23, 0.65),
    0 0 110px rgba(99, 102, 241, 0.2);
  animation: card-rise 0.9s 0.12s cubic-bezier(0.22, 1, 0.36, 1) both;

  /* 旋转流光描边 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.5px;
    background: conic-gradient(
      from var(--card-border-angle),
      rgba(34, 211, 238, 0) 0%,
      rgba(34, 211, 238, 0.9) 8%,
      rgba(129, 140, 248, 0.9) 16%,
      rgba(232, 121, 249, 0.6) 24%,
      rgba(255, 255, 255, 0) 32%,
      rgba(255, 255, 255, 0) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
    animation: card-border-spin 5s linear infinite;
  }

  /* 顶部高光 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(224, 242, 254, 0.55), transparent);
    pointer-events: none;
  }
}

@keyframes card-rise {
  from {
    opacity: 0;
    transform: translateY(34px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes card-border-spin {
  to {
    --card-border-angle: 360deg;
  }
}

.card-header {
  margin-bottom: 26px;
}

.form-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #f1f5f9;
}

.form-subtitle {
  margin: 0;
  font-size: 13px;
  color: rgba(148, 163, 184, 0.9);
}

/* ---------- 表单元素深度定制 ---------- */
.login-form {
  :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  :deep(.el-input__wrapper) {
    height: 46px;
    padding: 0 14px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(148, 163, 184, 0.18);
    box-shadow: none !important;
    transition:
      border-color 0.25s ease,
      background-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  :deep(.el-input__wrapper:hover) {
    border-color: rgba(129, 140, 248, 0.45);
  }

  :deep(.el-input__wrapper.is-focus) {
    background: rgba(255, 255, 255, 0.09) !important;
    border-color: rgba(34, 211, 238, 0.75) !important;
    box-shadow:
      0 0 0 3px rgba(34, 211, 238, 0.14),
      0 0 22px rgba(34, 211, 238, 0.22) !important;
  }

  :deep(.el-input__inner) {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #e6edf7;
    caret-color: #22d3ee;

    &::placeholder {
      color: rgba(203, 213, 225, 0.4);
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: #e6edf7;
      transition: background-color 99999s ease-in-out 0s;
    }
  }

  .input-icon {
    width: 16px;
    height: 16px;
    color: rgba(125, 211, 252, 0.85);
  }

  :deep(.el-form-item__error) {
    color: #fda4af;
    font-size: 12px;
  }

  :deep(.el-checkbox__label) {
    color: rgba(226, 232, 240, 0.95);
    font-size: 14px;
  }

  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background: linear-gradient(120deg, #0ea5e9, #6366f1);
    border-color: transparent;
  }

  :deep(.el-checkbox__inner) {
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(203, 213, 225, 0.5);
  }

  :deep(.el-checkbox__inner::after) {
    left: 5px;
    top: 2px;
  }
}

.code-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;

  .code-input {
    flex: 1;
  }
}

.login-code {
  display: flex;
  align-items: center;
  flex: none;
}

.login-code-img {
  height: 46px;
  width: 108px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(255, 255, 255, 0.92);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.04);
  }
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.register-link {
  font-size: 13px;
  color: #7dd3fc;

  &:hover {
    color: #38bdf8;
    text-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
  }
}

/* ---------- 登录按钮 ---------- */
.login-form :deep(.el-button.login-btn) {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 10px;
  padding-left: calc(12px + 10px);
  color: #fff;
  background: linear-gradient(120deg, #0ea5e9 0%, #6366f1 52%, #a855f7 100%);
  background-size: 220% 100%;
  box-shadow:
    0 10px 26px rgba(99, 102, 241, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition:
    background-position 0.5s ease,
    transform 0.25s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -160%;
    width: 60%;
    height: 100%;
    background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    transform: skewX(-20deg);
    transition: left 0.6s ease;
  }

  &:not(.is-disabled):hover {
    background-position: 100% 0;
    transform: translateY(-2px);
    box-shadow:
      0 14px 34px rgba(99, 102, 241, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);

    &::before {
      left: 160%;
    }
  }

  &:not(.is-disabled):active {
    transform: translateY(0);
  }
}

/* ---------- 底部 ---------- */
.el-login-footer {
  position: fixed;
  bottom: 0;
  z-index: 6;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: rgba(226, 232, 240, 0.62);
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

/* ---------- 响应式 ---------- */
@media (max-width: 960px) {
  .brand-side {
    display: none;
  }

  .glass-card {
    padding: 34px 26px 26px;
  }
}

@media (max-width: 480px) {
  .login-stage {
    padding: 20px;
  }

  .glass-card {
    border-radius: 16px;
  }
}
</style>
