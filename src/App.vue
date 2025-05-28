<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>众智科学知识可视化平台</h1>
        <nav>
          <router-link to="/friendship-paradox">友谊悖论</router-link>
          <router-link to="/schelling-model">谢林模型</router-link>
          <router-link to="/pagerank">PageRank算法</router-link>
          <router-link to="/cascade">网络级联</router-link>
          <router-link to="/voting">表决问题</router-link>
        </nav>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.el-header {
  background-color: #409EFF;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header h1 {
  margin: 0;
}

.el-header nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.el-header nav a:hover,
.el-header nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.el-main {
  padding: 20px;
}
</style> 