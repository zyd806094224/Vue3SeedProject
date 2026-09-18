/**
 * 个人介绍页数据源
 * 页面结构与样式不依赖这里的具体内容，后续迭代主要维护本文件即可：
 * 改名字/文案/标签 → 直接修改；加项目经历 →往 experiences 里追加；
 * 加技术栈分组 → 往 skills 里追加（卡片会自动排列）。
 *
 * 注意：以下均为占位内容，标记 TODO 的字段请替换为真实信息。
 */
export const profile = {
  // 姓名 / 昵称（TODO：替换为你的名字）
  name: 'Yudong',
  // 头像图片地址，留空则自动展示名字首字母
  avatar: '',
  // 身份头衔，展示在名字下方
  role: '安卓开发工程师',
  // 一句话标语
  slogan: '深耕 Android，兼顾前端与服务端的全栈探索者',
  // 较长的自我介绍段落
  intro:
    '多年移动端开发经验，主导过多个上线 App 的架构设计与性能优化；' +
    '同时熟悉 Vue3 / React / React Native 前端技术栈，也能独立完成 Spring Boot 服务端开发，' +
    '享受从客户端到服务端的全链路交付。',
  // 所在地（TODO：按需替换或删除）
  location: '中国',
  // 联系方式（TODO：替换为真实地址）
  contact: {
    email: 'example@example.com',
    github: 'https://github.com/yourname'
  },

  // 技术栈分组：primary 为 true 的分组会被高亮为"主力方向"
  skills: [
    {
      key: 'android',
      name: 'Android 开发',
      primary: true,
      level: 90,
      desc: '主力方向：扎实的 Java / Kotlin 功底，熟悉 Jetpack 全家桶与主流架构模式，具备性能优化与疑难问题排查能力',
      tags: [
        'Java',
        'Kotlin',
        'Jetpack Compose',
        'MVVM / MVI',
        'Android Framework',
        '性能优化',
        'NDK / JNI',
        'Gradle'
      ]
    },
    {
      key: 'frontend',
      name: '前端开发',
      primary: false,
      level: 70,
      desc: '能够独立完成中后台与移动端 H5 的开发，本页面就由我基于 Vue3 + Vite 搭建',
      tags: ['Vue3', 'React', 'React Native', 'Vite', 'Element Plus', 'ES6+', 'SCSS']
    },
    {
      key: 'backend',
      name: '服务端开发',
      primary: false,
      level: 65,
      desc: '可独立设计与实现业务接口，熟悉常用中间件与部署流程，支撑客户端全链路联调',
      tags: ['Spring Boot', 'Spring Security', 'MyBatis', 'MySQL', 'Redis', 'Linux']
    }
  ],

  // 项目 / 工作经历：按时间倒序追加即可（TODO：替换为真实经历）
  experiences: [
    {
      period: '20XX - 至今',
      title: '项目经历占位一',
      role: '安卓开发负责人',
      desc: '一句话描述项目背景、你的职责与产出成果，欢迎替换成真实内容。'
    },
    {
      period: '20XX - 20XX',
      title: '项目经历占位二',
      role: 'Android / 前端开发',
      desc: '骨架占位：可以是 App、跨端项目或全栈小产品的经历介绍。'
    },
    {
      period: '20XX - 20XX',
      title: '项目经历占位三',
      role: '服务端开发',
      desc: '骨架占位：例如基于 Spring Boot 的服务端项目经验。'
    }
  ]
}
