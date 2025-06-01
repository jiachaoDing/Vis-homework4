<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="highlight">众智科学</span>
            <br>知识可视化平台
          </h1>
          <p class="hero-description">
            山东大学软件学院数据可视化课程作业四。
            通过交互式可视化展示众智科学核心概念，
            让抽象的理论知识变得直观易懂。
          </p>
          <div class="hero-actions">
            <el-button 
              type="primary" 
              size="large" 
              class="cta-button primary"
              @click="startExploring"
            >
              <i class="action-icon">🚀</i>
              开始探索
            </el-button>
            <el-button 
              size="large" 
              class="cta-button secondary"
              @click="learnMore"
            >
              <i class="action-icon">📚</i>
              了解更多
            </el-button>
            <el-button 
              size="large" 
              class="cta-button secondary"
              @click="viewTeam"
            >
              <i class="action-icon">📚</i>
              小组分工
            </el-button>
            <el-button 
              size="large" 
              class="cta-button github"
              @click="viewSource"
            >
              <i class="action-icon">📖</i>
              查看源码
            </el-button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-elements">
            <div class="float-item" :style="{ animationDelay: '0s' }">🧠</div>
            <div class="float-item" :style="{ animationDelay: '0.5s' }">🤝</div>
            <div class="float-item" :style="{ animationDelay: '1s' }">🌐</div>
            <div class="float-item" :style="{ animationDelay: '1.5s' }">📊</div>
            <div class="float-item" :style="{ animationDelay: '2s' }">🔗</div>
            <div class="float-item" :style="{ animationDelay: '2.5s' }">⚡</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色功能 -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">项目特色</h2>
          <p class="section-subtitle">基于Web技术实现众智科学核心概念的可视化展示</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 学习模块 -->
    <section class="modules-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">知识模块</h2>
          <p class="section-subtitle">涵盖众智科学课程的五个核心知识点</p>
        </div>
        <div class="modules-grid">
          <div 
            class="module-card" 
            v-for="(module, index) in modules" 
            :key="index"
            @click="navigateToModule(module.path)"
          >
            <div class="module-header">
              <div class="module-icon">{{ module.icon }}</div>
              <div class="module-badge">{{ module.difficulty }}</div>
            </div>
            <div class="module-content">
              <h3 class="module-title">{{ module.title }}</h3>
              <p class="module-description">{{ module.description }}</p>
              <div class="module-tags">
                <span 
                  class="module-tag" 
                  v-for="tag in module.tags" 
                  :key="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="module-footer">
              <span class="module-duration">{{ module.duration }}</span>
              <i class="arrow-icon">→</i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" v-for="(stat, index) in stats" :key="index">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于平台 -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="about-title">关于项目</h2>
            <p class="about-description">
              本项目是山东大学软件学院数据可视化课程的第四次作业，
              旨在通过现代化的Web技术展示众智科学课程中的核心概念和算法。
              我们选择了五个具有代表性的知识点，通过交互式可视化的方式帮助理解复杂的理论知识。
              项目源码已开源至GitHub：
              <a href="https://github.com/jiachaoDing/Vis-homework4" target="_blank" class="github-link">
                https://github.com/jiachaoDing/Vis-homework4
              </a>
            </p>
            <div class="about-highlights">
              <div class="highlight-item">
                <i class="highlight-icon">👥</i>
                <span>团队协作开发</span>
              </div>
              <div class="highlight-item">
                <i class="highlight-icon">🎯</i>
                <span>教学辅助工具</span>
              </div>
              <div class="highlight-item">
                <i class="highlight-icon">🌟</i>
                <span>开源学习项目</span>
              </div>
            </div>
          </div>
          <div class="about-visual">
            <div class="network-animation">
              <div class="network-node" v-for="i in 12" :key="i"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队信息 -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">小组成员</h2>
          <p class="section-subtitle">山东大学软件学院数据可视化课程小组</p>
        </div>
        <div class="team-grid">
          <div class="team-member leader">
            <div class="member-avatar">
              <span class="member-initial">丁</span>
            </div>
            <h3 class="member-name">丁家超</h3>
            <p class="member-role">组长</p>
            <p class="member-task">框架搭建、项目部署、朋友悖论模块</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <span class="member-initial">贾</span>
            </div>
            <h3 class="member-name">贾书凡</h3>
            <p class="member-role">组员</p>
            <p class="member-task">谢林模型模块</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <span class="member-initial">张</span>
            </div>
            <h3 class="member-name">张宏亦</h3>
            <p class="member-role">组员</p>
            <p class="member-task">PageRank模块</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <span class="member-initial">王</span>
            </div>
            <h3 class="member-name">王嘉</h3>
            <p class="member-role">组员</p>
            <p class="member-task">网络级联模块</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <span class="member-initial">肖</span>
            </div>
            <h3 class="member-name">肖富帅</h3>
            <p class="member-role">组员</p>
            <p class="member-task">表决问题模块</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 平台特色
const features = ref([
  {
    icon: '🎨',
    title: '交互式可视化',
    description: '使用D3.js等前端技术，将复杂的算法和概念转化为直观的可视化效果'
  },
  {
    icon: '🔬',
    title: '理论与实践结合',
    description: '基于众智科学课程内容，通过实际案例展示理论概念的应用'
  },
  {
    icon: '⚡',
    title: '实时参数调整',
    description: '支持用户调整参数并实时观察结果变化，增强学习体验'
  }
])

// 学习模块
const modules = ref([
  {
    icon: '🤝',
    title: '朋友悖论',
    description: '探索社交网络中的统计现象，理解为什么你的朋友比你更受欢迎',
    difficulty: '入门',
    duration: '20分钟',
    tags: ['社交网络', '统计学', '悖论'],
    path: '/friendship-paradox'
  },
  {
    icon: '🏘️',
    title: '谢林模型',
    description: '研究种族隔离和聚集现象的经典模型，揭示个体偏好如何影响集体行为',
    difficulty: '中级',
    duration: '30分钟',
    tags: ['复杂系统', '社会学', '仿真'],
    path: '/schelling-model'
  },
  {
    icon: '📊',
    title: 'PageRank算法',
    description: '了解Google搜索引擎背后的核心算法，掌握网页重要性的计算方法',
    difficulty: '中级',
    duration: '25分钟',
    tags: ['算法', '图论', '搜索引擎'],
    path: '/pagerank'
  },
  {
    icon: '🌊',
    title: '网络级联',
    description: '研究信息、行为和影响在网络中的传播机制和扩散模式',
    difficulty: '高级',
    duration: '35分钟',
    tags: ['传播', '动力学', '临界点'],
    path: '/cascade'
  },
  {
    icon: '🗳️',
    title: '表决问题',
    description: '探索不同投票制度的公平性和有效性，理解民主决策的复杂性',
    difficulty: '高级',
    duration: '40分钟',
    tags: ['博弈论', '决策', '民主'],
    path: '/voting'
  }
])

// 项目数据
const stats = ref([
  { number: '5', label: '知识模块' },
  { number: '5', label: '团队成员' },
  { number: '1', label: '课程作业' },
  { number: '100%', label: '开源项目' }
])

// 方法
const startExploring = () => {
  document.querySelector('.modules-section').scrollIntoView({ 
    behavior: 'smooth' 
  })
}

const learnMore = () => {
  // 滚动到关于部分
  document.querySelector('.about-section').scrollIntoView({ 
    behavior: 'smooth' 
  })
}

const viewTeam = () => {
  document.querySelector('.team-section').scrollIntoView({ 
    behavior: 'smooth' 
  })
}


const viewSource = () => {
  window.open('https://github.com/jiachaoDing/Vis-homework4', '_blank')
}

const navigateToModule = (path) => {
  router.push(path)
}

onMounted(() => {
  // 添加一些动画效果
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)

  // 观察需要动画的元素
  document.querySelectorAll('.feature-card, .module-card, .stat-item, .team-member').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* 全局样式 */
.home-page {
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 英雄区域 */
.hero-section {
  min-height: 80vh;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  animation: slideInLeft 1s ease-out;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
}

.hero-title .highlight {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 500px;
}

.hero-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 800px;
}

.cta-button {
  padding: 1rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: auto;
  justify-content: center;
  font-size: 0.9rem;
}

.cta-button.primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  border: none;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(255, 255, 255, 0.2);
}

.cta-button.github {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta-button.github:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(255, 255, 255, 0.2);
}

.action-icon {
  font-size: 1.2rem;
}

/* 浮动元素动画 */
.hero-visual {
  position: relative;
  height: 400px;
  animation: slideInRight 1s ease-out;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.float-item {
  position: absolute;
  font-size: 3rem;
  animation: float 6s ease-in-out infinite;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.float-item:hover {
  opacity: 1;
  transform: scale(1.2);
}

.float-item:nth-child(1) { top: 10%; left: 20%; }
.float-item:nth-child(2) { top: 20%; right: 10%; }
.float-item:nth-child(3) { top: 40%; left: 10%; }
.float-item:nth-child(4) { top: 60%; right: 20%; }
.float-item:nth-child(5) { bottom: 20%; left: 30%; }
.float-item:nth-child(6) { bottom: 10%; right: 30%; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-3deg); }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 通用区域样式 */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 特色功能区域 */
.features-section {
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
}

.feature-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* 学习模块区域 */
.modules-section {
  padding: 5rem 0;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.module-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
}

.module-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.15);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 1rem;
}

.module-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.module-badge {
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.module-content {
  padding: 0 2rem 1rem;
}

.module-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.95);
}

.module-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.module-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.module-tag {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.module-footer {
  padding: 1rem 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.module-duration {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.arrow-icon {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.3s ease;
}

.module-card:hover .arrow-icon {
  transform: translateX(5px);
}

/* 统计数据区域 */
.stats-section {
  padding: 4rem 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.3s ease;
}

.stat-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

/* 关于平台区域 */
.about-section {
  padding: 5rem 0;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.about-highlights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.highlight-icon {
  font-size: 1.5rem;
}

.highlight-item span {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* 网络动画 */
.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.network-animation {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
}

.network-node {
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  animation: orbit 10s linear infinite;
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
}

.network-node:nth-child(1) { animation-delay: 0s; }
.network-node:nth-child(2) { animation-delay: -0.8s; }
.network-node:nth-child(3) { animation-delay: -1.6s; }
.network-node:nth-child(4) { animation-delay: -2.4s; }
.network-node:nth-child(5) { animation-delay: -3.2s; }
.network-node:nth-child(6) { animation-delay: -4s; }
.network-node:nth-child(7) { animation-delay: -4.8s; }
.network-node:nth-child(8) { animation-delay: -5.6s; }
.network-node:nth-child(9) { animation-delay: -6.4s; }
.network-node:nth-child(10) { animation-delay: -7.2s; }
.network-node:nth-child(11) { animation-delay: -8s; }
.network-node:nth-child(12) { animation-delay: -8.8s; }

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(120px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(120px) rotate(-360deg);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .modules-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  .team-member {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .cta-button {
    min-width: 140px;
    padding: 0.8rem 1.5rem;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .team-member {
    padding: 1.2rem;
  }
  
  .member-avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  
  .member-initial {
    font-size: 1.5rem;
  }
  
  .member-name {
    font-size: 1.1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-right {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .module-card {
    margin: 0 0.5rem;
  }
  
  .network-animation {
    width: 200px;
    height: 200px;
  }
  
  .network-node {
    width: 8px;
    height: 8px;
  }
  
  @keyframes orbit {
    from {
      transform: rotate(0deg) translateX(80px) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(80px) rotate(-360deg);
    }
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .feature-card,
  .module-card {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .feature-card:hover,
  .module-card:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* 团队信息区域 */
.team-section {
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.team-member {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
}

.team-member.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.team-member.leader.animate-in {
  transform: scale(1.05) translateY(0);
}

.team-member.leader {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.team-member:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.team-member.leader:hover {
  transform: scale(1.05) translateY(-8px);
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.member-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.team-member:hover .member-avatar::before {
  transform: translateX(100%);
}

.member-initial {
  font-size: 2rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 1;
}

.member-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.95);
}

.member-role {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team-member.leader .member-role {
  color: #FFD700;
  font-weight: 600;
}

.member-task {
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.1);
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.github-link {
  color: #4ecdc4;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  margin-left: 0.5rem;
}

.github-link:hover {
  color: #ff6b6b;
  text-decoration: underline;
}

.github-link::before {
  content: '🔗';
  margin-right: 0.3rem;
}
</style> 