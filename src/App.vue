<template>
  <div id="app">
    <el-container class="app-container">
      <el-header class="app-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-icon">
              <div class="logo-shape">
                <div class="logo-inner"></div>
              </div>
            </div>
            <h1 class="app-title">众智科学知识可视化平台</h1>
          </div>
          <nav class="nav-menu">
            <router-link to="/" class="nav-link home">
              <span class="nav-text">首页</span>
            </router-link>
            <router-link to="/friendship-paradox" class="nav-link">
              <span class="nav-text">朋友悖论</span>
            </router-link>
            <router-link to="/schelling-model" class="nav-link">
              <span class="nav-text">谢林模型</span>
            </router-link>
            <router-link to="/pagerank" class="nav-link">
              <span class="nav-text">PageRank</span>
            </router-link>
            <router-link to="/cascade" class="nav-link">
              <span class="nav-text">网络级联</span>
            </router-link>
            <router-link to="/voting" class="nav-link">
              <span class="nav-text">表决问题</span>
            </router-link>
          </nav>
          <div class="header-actions">
            <el-button class="theme-toggle" circle @click="toggleTheme">
              <div class="theme-icon">
                <div class="sun-moon-icon"></div>
              </div>
            </el-button>
          </div>
        </div>
      </el-header>
      
      <el-main class="app-main">
        <div class="content-wrapper">
          <transition name="page" mode="out-in">
            <router-view />
          </transition>
        </div>
      </el-main>
    
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }
}
</script>

<style>
/* 全局重置和基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

/* 头部样式 */
.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-shape {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  position: relative;
  animation: logoFloat 3s ease-in-out infinite;
  box-shadow: 
    0 0 20px rgba(102, 126, 234, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
}

.logo-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 30%, transparent 70%);
  border-radius: 50%;
  opacity: 0.8;
}

.logo-shape::before,
.logo-shape::after {
  content: '';
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.logo-shape::before {
  width: 8px;
  height: 8px;
  top: 8px;
  left: 12px;
  animation: pulse 2s ease-in-out infinite;
}

.logo-shape::after {
  width: 6px;
  height: 6px;
  top: 12px;
  right: 10px;
  animation: pulse 2s ease-in-out infinite 0.5s;
}

@keyframes logoFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }
  50% { 
    transform: translateY(-5px) rotate(180deg);
    border-radius: 40% 60% 50% 50% / 50% 50% 60% 40%;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.app-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
  background: linear-gradient(45deg, #fff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.nav-link {
  position: relative;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  font-weight: 600;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.nav-link.home {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.nav-link.home:hover {
  background: linear-gradient(135deg, #5a6fd8, #6a4190);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.nav-text {
  position: relative;
  z-index: 1;
}

/* 头部操作区 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 44px;
  height: 44px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
}

.theme-icon {
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun-moon-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 10px rgba(255, 215, 0, 0.5),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
}

.sun-moon-icon::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, transparent 40%, #4a5568 42%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.sun-moon-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 
    0 0 0 2px transparent,
    3px 0 0 -1px rgba(255, 215, 0, 0.6),
    -3px 0 0 -1px rgba(255, 215, 0, 0.6),
    0 3px 0 -1px rgba(255, 215, 0, 0.6),
    0 -3px 0 -1px rgba(255, 215, 0, 0.6),
    2px 2px 0 -1px rgba(255, 215, 0, 0.4),
    -2px -2px 0 -1px rgba(255, 215, 0, 0.4),
    2px -2px 0 -1px rgba(255, 215, 0, 0.4),
    -2px 2px 0 -1px rgba(255, 215, 0, 0.4);
  transition: all 0.4s ease;
}

/* 暗色模式时的月亮状态 */
body.dark-mode .sun-moon-icon {
  background: linear-gradient(135deg, #718096, #4a5568);
  box-shadow: 
    0 0 10px rgba(113, 128, 150, 0.5),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

body.dark-mode .sun-moon-icon::before {
  opacity: 1;
}

body.dark-mode .sun-moon-icon::after {
  box-shadow: none;
}

/* 主内容区域 */
.app-main {
  flex: 1;
  padding: 0;
  overflow: hidden;
}

.content-wrapper {
  min-height: 100%;
  position: relative;
}

/* 页面切换动画 */
.page-enter-active, .page-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 底部样式 */
.app-footer {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-left p {
  margin: 0;
  font-size: 0.9rem;
}

.footer-right {
  display: flex;
  gap: 2rem;
}

.footer-link {
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .header-content {
    padding: 0 1.5rem;
  }
  
  .app-title {
    font-size: 1.5rem;
  }
  
  .nav-link {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .logo-section {
    justify-content: center;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
  }
  
  .logo-shape {
    width: 32px;
    height: 32px;
  }
  
  .logo-inner {
    width: 18px;
    height: 18px;
  }
  
  .app-title {
    font-size: 1.3rem;
    text-align: center;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .theme-toggle {
    width: 36px;
    height: 36px;
  }
  
  .theme-icon {
    width: 16px;
    height: 16px;
  }
  
  .sun-moon-icon {
    width: 12px;
    height: 12px;
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
  .header-content {
    padding: 0.75rem;
  }
  
  .nav-menu {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .nav-text {
    font-size: 0.8rem;
  }
}

/* 暗色主题 */
body.dark-mode {
  background: #1a1a1a;
  color: #e0e0e0;
}

body.dark-mode .app-container {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

body.dark-mode .app-header {
  background: rgba(0, 0, 0, 0.3);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

body.dark-mode .nav-link {
  color: rgba(255, 255, 255, 0.8);
}

body.dark-mode .app-footer {
  background: rgba(0, 0, 0, 0.3);
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style> 