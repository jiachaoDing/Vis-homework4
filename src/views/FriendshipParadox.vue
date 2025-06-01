<template>
  <div class="friendship-paradox">
    <el-card>
      <template #header>
        <h2>友谊悖论验证</h2>
        <p>验证大多数人的朋友比自己拥有更多朋友的现象</p>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never">
            <h3>参数设置</h3>
            <el-form label-width="120px">
              <el-form-item label="节点数量">
                <el-slider v-model="nodeCount" :min="10" :max="100" show-input />
              </el-form-item>
              <el-form-item label="连接概率">
                <el-slider v-model="probability" :min="0.1" :max="0.9" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="图类型">
                <el-select v-model="graphType">
                  <el-option label="随机图" value="random" />
                  <el-option label="社会网络" value="social" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="generateGraph">生成图</el-button>
                <el-button @click="analyzeParadox">分析悖论</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>分析结果</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="总节点数">{{ nodeCount }}</el-descriptions-item>
              <el-descriptions-item label="符合悖论节点">{{ paradoxNodes }}</el-descriptions-item>
              <el-descriptions-item label="悖论占比">{{ paradoxRatio }}%</el-descriptions-item>
              <el-descriptions-item label="平均度数">{{ averageDegree }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        
        <el-col :span="16">
          <el-card shadow="never">
            <h3>网络可视化</h3>
            <div ref="networkContainer" class="network-container"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

// 响应式数据
const nodeCount = ref(30)
const probability = ref(0.3)
const graphType = ref('random')
const nodes = ref([])
const links = ref([])
const paradoxNodes = ref(0)
const paradoxRatio = ref(0)
const averageDegree = ref(0)

// DOM引用
const networkContainer = ref(null)

// D3相关变量
let simulation = null
let linkSelection = null
let nodeSelection = null

// 生成图
const generateGraph = () => {
  // 生成节点
  nodes.value = Array.from({ length: nodeCount.value }, (_, i) => ({
    id: i,
    degree: 0,
    friendsAverageDegree: 0,
    satisfiesParadox: false
  }))
  
  // 生成连接
  links.value = []
  if (graphType.value === 'random') {
    generateRandomGraph()
  } else {
    generateSocialNetwork()
  }
  
  calculateDegrees()
  renderNetwork()
}

// 生成随机图
const generateRandomGraph = () => {
  for (let i = 0; i < nodeCount.value; i++) {
    for (let j = i + 1; j < nodeCount.value; j++) {
      if (Math.random() < probability.value) {
        links.value.push({ source: i, target: j })
      }
    }
  }
}

// 生成社会网络
const generateSocialNetwork = () => {
  // 生成具有社会网络特征的图（小世界网络）
  const k = Math.floor(nodeCount.value * probability.value)
  
  // 首先创建环形连接
  for (let i = 0; i < nodeCount.value; i++) {
    for (let j = 1; j <= k / 2; j++) {
      const target = (i + j) % nodeCount.value
      links.value.push({ source: i, target })
    }
  }
  
  // 随机重连
  const rewireProb = 0.3
  links.value = links.value.filter(link => {
    if (Math.random() < rewireProb) {
      const newTarget = Math.floor(Math.random() * nodeCount.value)
      if (newTarget !== link.source) {
        link.target = newTarget
      }
    }
    return true
  })
}

// 计算度数
const calculateDegrees = () => {
  // 重置度数
  nodes.value.forEach(node => node.degree = 0)
  
  // 计算每个节点的度数
  links.value.forEach(link => {
    nodes.value[link.source].degree++
    nodes.value[link.target].degree++
  })
  
  // 计算平均度数
  averageDegree.value = (nodes.value.reduce((sum, node) => sum + node.degree, 0) / nodeCount.value).toFixed(2)
}

// 分析悖论
const analyzeParadox = () => {
  nodes.value.forEach(node => {
    // 找到该节点的所有朋友
    const friends = []
    links.value.forEach(link => {
      if (link.source === node.id) friends.push(link.target)
      if (link.target === node.id) friends.push(link.source)
    })
    
    // 计算朋友的平均度数
    if (friends.length > 0) {
      const friendsDegreeSum = friends.reduce((sum, friendId) => sum + nodes.value[friendId].degree, 0)
      node.friendsAverageDegree = friendsDegreeSum / friends.length
      node.satisfiesParadox = node.friendsAverageDegree > node.degree
    } else {
      node.friendsAverageDegree = 0
      node.satisfiesParadox = false
    }
  })
  
  // 统计符合悖论的节点
  paradoxNodes.value = nodes.value.filter(node => node.satisfiesParadox).length
  paradoxRatio.value = ((paradoxNodes.value / nodeCount.value) * 100).toFixed(1)
  
  updateVisualization()
}

// 渲染网络图
const renderNetwork = () => {
  const container = networkContainer.value
  d3.select(container).selectAll("*").remove()
  
  const width = 600
  const height = 400
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  
  simulation = d3.forceSimulation(nodes.value)
    .force("link", d3.forceLink(links.value).id(d => d.id).distance(50))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
  
  const link = svg.append("g")
    .selectAll("line")
    .data(links.value)
    .enter().append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 1)
  
  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes.value)
    .enter().append("circle")
    .attr("r", d => 3 + d.degree)
    .attr("fill", "#69b3a2")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
  
  node.append("title")
    .text(d => `节点 ${d.id}\n度数: ${d.degree}\n朋友平均度数: ${d.friendsAverageDegree.toFixed(2)}`)
  
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
    
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
  })
  
  linkSelection = link
  nodeSelection = node
}

// 更新可视化
const updateVisualization = () => {
  if (nodeSelection) {
    nodeSelection
      .attr("fill", d => d.satisfiesParadox ? "#ff6b6b" : "#69b3a2")
      .select("title")
      .text(d => `节点 ${d.id}\n度数: ${d.degree}\n朋友平均度数: ${d.friendsAverageDegree.toFixed(2)}\n符合悖论: ${d.satisfiesParadox ? '是' : '否'}`)
  }
}

// 拖拽事件处理
const dragstarted = (event, d) => {
  if (!event.active) simulation.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
}

const dragged = (event, d) => {
  d.fx = event.x
  d.fy = event.y
}

const dragended = (event, d) => {
  if (!event.active) simulation.alphaTarget(0)
  d.fx = null
  d.fy = null
}

// 组件挂载时初始化
onMounted(() => {
  generateGraph()
})
</script>

<style scoped>
.friendship-paradox {
  padding: 20px;
}

.network-container {
  width: 100%;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.el-card {
  margin-bottom: 20px;
}
</style> 