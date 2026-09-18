<template>
  <footer class="about-footer">
    <div class="footer-inner">
      <p class="footer-links">
        <a
          v-if="profile.contact?.email"
          :href="`mailto:${profile.contact.email}`"
          class="footer-link"
        >
          📮 {{ profile.contact.email }}
        </a>
        <a
          v-if="profile.contact?.github"
          :href="profile.contact.github"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          🐙 GitHub
        </a>
        <span v-if="profile.location" class="footer-link is-text">📍 {{ profile.location }}</span>
      </p>
      <p class="footer-copy">© {{ year }} {{ profile.name }} · 保持热爱，持续迭代</p>
      <p class="footer-meta">
        本页面由 Vue3 + Vite 构建 ·
        <router-link to="/login" class="footer-link">前往管理系统</router-link>
      </p>
    </div>
  </footer>
</template>

<script setup name="FooterSection">
const props = defineProps({
  profile: { type: Object, required: true }
})

const year = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.about-footer {
  padding: 40px 20px 32px;
  border-top: 1px solid var(--about-card-border);
}

.footer-inner {
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 24px;
  margin: 0 0 14px;
}

.footer-link {
  font-size: 13.5px;
  color: var(--about-text-sub);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--about-grad-start);
  }

  &.is-text:hover {
    color: var(--about-text-sub);
  }
}

.footer-copy {
  font-size: 14px;
  color: var(--about-text);
  margin: 0 0 6px;
}

.footer-meta {
  font-size: 12px;
  color: var(--about-text-faint);
  margin: 0;
}
</style>
