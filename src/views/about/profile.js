/**
 * 个人介绍页数据源
 * 页面结构与样式不依赖这里的具体内容，后续迭代主要维护本文件即可：
 * 改名字/文案/标签 → 直接修改；加项目经历 → 往 experiences 里追加；
 * 加技术栈分组 → 往 skills 里追加；展示/下架开源项目 → 调整 repos 数组。
 */
export const profile = {
  // 姓名 / 昵称（TODO：替换为你的名字）
  name: 'Yudong',
  // 头像图片地址，留空则自动展示名字首字母
  avatar: '',
  // 身份头衔，展示在名字下方
  role: '安卓开发工程师',
  // 一句话标语
  slogan: '深耕 Android 与多端混合开发，兼顾前端与服务端的全栈探索者',
  // 较长的自我介绍段落
  intro:
    '多年移动端开发经验，主导过多个上线 App 的架构设计与性能优化；' +
    '熟悉 Vue3 / React / React Native / Flutter / 鸿蒙等多端技术栈，也能独立完成 Spring Boot 服务端开发。' +
    '在 GitHub 维护着一套覆盖 Android、前端、服务端、鸿蒙的种子工程矩阵，享受从客户端到服务端的全链路交付。',
  // 所在地（TODO：按需替换或删除）
  location: '中国',
  // 联系方式
  contact: {
    email: '806094224@qq.com',
    github: 'https://github.com/zyd806094224',
    phone: '18611785026'
  },

  // 技术栈分组：primary 为 true 的分组会被高亮为"主力方向"
  skills: [
    {
      key: 'android',
      name: 'Android 开发',
      primary: true,
      level: 90,
      desc: '主力方向：扎实的 Java / Kotlin 功底，熟悉 Jetpack 全家桶与主流架构模式，具备组件化、插件化与性能优化能力',
      tags: [
        'Java',
        'Kotlin',
        'Jetpack Compose',
        'MVVM / MVI',
        '组件化 / 插件化',
        '性能优化',
        'NDK / JNI',
        'Gradle'
      ]
    },
    {
      key: 'hybrid',
      name: '跨端 & 混合开发',
      primary: false,
      level: 78,
      desc: '围绕 Android 打造多端能力：RN / Flutter / H5 嵌入原生的混合架构，并扩展到鸿蒙、Electron 桌面端',
      tags: [
        'React Native',
        'Flutter',
        'H5 Hybrid',
        'HarmonyOS',
        'Electron',
        'Pushy 热更新',
        'code-push-server'
      ]
    },
    {
      key: 'frontend',
      name: '前端开发',
      primary: false,
      level: 72,
      desc: '能够独立完成中后台、移动端 H5 与小程序的开发，本页面就由我基于 Vue3 + Vite 搭建',
      tags: ['Vue3', 'React 18', 'TypeScript', 'Vite', 'Element Plus', 'ECharts', '小程序']
    },
    {
      key: 'backend',
      name: '服务端开发',
      primary: false,
      level: 68,
      desc: '可独立设计与实现业务接口和微服务脚手架，熟悉认证授权、任务调度与常用中间件，支撑全链路联调',
      tags: [
        'Spring Boot',
        'Spring Cloud',
        'Spring Security',
        'MyBatis-Plus',
        'MySQL',
        'Redis',
        'XXL-JOB'
      ]
    }
  ],

  // 精选开源项目（数据来自 GitHub，按重要程度排序；下架某项直接删除即可）
  repos: [
    {
      name: 'AndroidSeedProject',
      lang: 'Java',
      stars: 12,
      year: 2024,
      desc: '模块化安卓种子工程：MVVM + 协程 + Flow，集成 Room / DataStore / Glide，含 Compose MVI、RePlugin 插件化、Flutter 混合等实践分支'
    },
    {
      name: 'flutter_app',
      lang: 'Dart',
      stars: 2,
      year: 2025,
      desc: 'Flutter 企业级脚手架：MVVM + Provider 架构，整合 go_router 路由、Dio 网络封装、列表刷新与通用 WebView'
    },
    {
      name: 'SpringBootServiceSeedProject',
      lang: 'Java',
      stars: 1,
      year: 2025,
      desc: 'Spring Boot 3 服务端种子项目：JWT 认证、MyBatis-Plus、动态数据源、XXL-JOB 调度、Redis 缓存（本站后端）'
    },
    {
      name: 'HarmonyOSSeedProject',
      lang: 'TypeScript',
      stars: 1,
      year: 2025,
      desc: 'HarmonyOS 5 模块化应用脚手架：多模块架构 + 统一网络层 + 共享组件库，快速构建高质量鸿蒙应用'
    },
    {
      name: 'Vue3SeedProject',
      lang: 'Vue',
      stars: 0,
      year: 2025,
      desc: 'Vue3 + TypeScript + Vite 前端种子工程，配套后台管理系统（本站前端）'
    },
    {
      name: 'React18SeedProject',
      lang: 'TypeScript',
      stars: 0,
      year: 2025,
      desc: 'React 18 + TypeScript 前端种子工程'
    },
    {
      name: 'RNHybrid',
      lang: 'JavaScript',
      stars: 0,
      year: 2024,
      desc: 'React Native 嵌入原生混合开发：适配 RN 0.66 / 0.72，安卓 / iOS / 鸿蒙三端接入与参数透传，含 Pushy 热更新'
    },
    {
      name: 'WmsService',
      lang: 'Java',
      stars: 0,
      year: 2024,
      desc: '仓储管理（WMS）后端：用户角色权限、货物分类、仓库存储与出入库记录，Spring Security + JWT 认证'
    },
    {
      name: 'WmsWeb',
      lang: 'Vue',
      stars: 0,
      year: 2024,
      desc: 'WMS 前端（Vue2）：登录、商品与品类、仓储位、出入库记录等全流程管理界面'
    }
  ],

  // 项目 / 工作经历：按时间倒序追加即可（依据 GitHub 仓库时间线整理）
  experiences: [
    {
      period: '2025 - 至今',
      title: '多端种子工程矩阵',
      role: '独立开发者',
      desc: '陆续搭建 Spring Boot 服务端、Vue3 / React 18 前端、HarmonyOS 鸿蒙等种子工程，沉淀一套跨端标准化的项目启动范式。'
    },
    {
      period: '2024 - 至今',
      title: 'AndroidSeedProject 种子工程体系',
      role: '主导设计与维护',
      desc: '以 MVVM + 协程 + Flow 为基座的模块化安卓脚手架，延伸出 Compose / MVI、RePlugin 插件化、Flutter 混合等实践分支，作为新项目快速启动的标准底座。'
    },
    {
      period: '2024 - 2025',
      title: '多端混合开发实践',
      role: '移动端开发',
      desc: 'React Native 嵌入安卓 / iOS / 鸿蒙三端并接入 Pushy 热更新，Flutter module 嵌入原生页面，并自建 code-push-server 热更新服务。'
    },
    {
      period: '2024',
      title: 'WMS 仓储管理系统',
      role: '全栈开发',
      desc: '独立完成 Spring Boot 后端与 Vue 前端：用户角色权限、货物分类、仓储位与出入库记录的全流程管理。'
    },
    {
      period: '2022 - 2024',
      title: '早期全栈探索',
      role: '服务端 / 前端',
      desc: '从音乐服务（music-service + music-background）等小型全栈项目起步，逐步构建前后端一体的完整交付能力。'
    }
  ]
}
