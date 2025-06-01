<template>
  <div class="network-cascade">
    <el-card>
      <template #header>
        <h2>从知晓到行动的模拟</h2>
        <p>模拟新事物在网络中的传播扩散过程</p>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never">
            <h3>参数设置</h3>
            <el-form label-width="120px">
              <el-form-item label="节点数量">
                <el-slider v-model="nodeCount" :min="20" :max="100" show-input />
              </el-form-item>
              <el-form-item label="采纳阈值">
                <el-slider v-model="threshold" :min="0.1" :max="0.9" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="初始种子数">
                <el-slider v-model="seedCount" :min="1" :max="10" show-input />
              </el-form-item>
              <el-form-item label="延时范围">
                <el-slider v-model="delayRange" :min="1" :max="10" show-input />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="generateNetwork">生成网络</el-button>
                <el-button @click="startCascade" :disabled="isRunning">开始扩散</el-button>
                <el-button @click="stopCascade">停止</el-button>
                <el-button @click="resetCascade">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>扩散统计</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="当前步数">{{ currentStep }}</el-descriptions-item>
              <el-descriptions-item label="已采纳节点">{{ adoptedCount }}</el-descriptions-item>
              <el-descriptions-item label="采纳率">{{ adoptionRate }}%</el-descriptions-item>
              <el-descriptions-item label="平均延时">{{ averageDelay }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        
        <el-col :span="16">
          <el-card shadow="never">
            <h3>扩散可视化</h3>
            <div ref="cascadeContainer" class="cascade-container"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'

// 响应式数据
const nodeCount = ref(50)
const threshold = ref(0.3)
const seedCount = ref(3)
const delayRange = ref(5)
const nodes = ref([])
const links = ref([])
const currentStep = ref(0)
const adoptedCount = ref(0)
const adoptionRate = ref(0)
const averageDelay = ref(0)
const isRunning = ref(false)
const intervalId = ref(null)

// DOM引用
const cascadeContainer = ref(null)

// D3相关变量
let simulation = null
let linkSelection = null
let nodeSelection = null

// 生成网络
const generateNetwork = () => {
  // 生成节点
  nodes.value = Array.from({ length: nodeCount.value }, (_, i) => ({
    id: i,
    state: 'susceptible', // susceptible, adopted, aware
    adoptionTime: null,
    delay: Math.floor(Math.random() * delayRange.value) + 1,
    awarenessTime: null,
    neighbors: []
  }))
  
  // 生成小世界网络
  generateSmallWorldNetwork()
  
  // 计算邻居关系
  calculateNeighbors()
  
  renderNetwork()
}

// 生成小世界网络
const generateSmallWorldNetwork = () => {
  links.value = []
  const k = 4 // 每个节点的初始连接数
  
  // 创建环形连接
  for (let i = 0; i < nodeCount.value; i++) {
    for (let j = 1; j <= k / 2; j++) {
      const target = (i + j) % nodeCount.value
      links.value.push({ source: i, target })
    }
  }
  
  // 随机重连
  const rewireProb = 0.3
  links.value = links.value.map(link => {
    if (Math.random() < rewireProb) {
      let newTarget
      do {
        newTarget = Math.floor(Math.random() * nodeCount.value)
      } while (newTarget === link.source)
      
      return { source: link.source, target: newTarget }
    }
    return link
  })
}

// 计算邻居关系
const calculateNeighbors = () => {
  // 重置邻居列表
  nodes.value.forEach(node => node.neighbors = [])
  
  // 构建邻居关系
  links.value.forEach(link => {
    nodes.value[link.source].neighbors.push(link.target)
    nodes.value[link.target].neighbors.push(link.source)
  })
}

// 开始扩散
const startCascade = () => {
  resetCascade()
  
  // 随机选择种子节点
  const seedIndices = []
  while (seedIndices.length < seedCount.value) {
    const index = Math.floor(Math.random() * nodeCount.value)
    if (!seedIndices.includes(index)) {
      seedIndices.push(index)
    }
  }
  
  // 设置种子节点为已采纳状态
  seedIndices.forEach(index => {
    nodes.value[index].state = 'adopted'
    nodes.value[index].adoptionTime = 0
    nodes.value[index].awarenessTime = 0
  })
  
  updateStatistics()
  updateVisualization()
  
  isRunning.value = true
  intervalId.value = setInterval(() => {
    const hasChange = simulateOneStep()
    if (!hasChange) {
      stopCascade()
    }
  }, 500)
}

// 模拟一步
const simulateOneStep = () => {
  currentStep.value++
  let hasChange = false
  
  // 处理知晓到行动的延时
  nodes.value.forEach(node => {
    if (node.state === 'aware' && 
        node.awarenessTime !== null && 
        currentStep.value - node.awarenessTime >= node.delay) {
      node.state = 'adopted'
      node.adoptionTime = currentStep.value
      hasChange = true
    }
  })
  
  // 传播给邻居
  const newlyAware = []
  nodes.value.forEach(node => {
    if (node.state === 'adopted') {
      node.neighbors.forEach(neighborId => {
        const neighbor = nodes.value[neighborId]
        if (neighbor.state === 'susceptible') {
          // 计算已采纳的邻居比例
          const adoptedNeighbors = neighbor.neighbors.filter(nId => 
            nodes.value[nId].state === 'adopted'
          ).length
          
          const adoptionRatio = adoptedNeighbors / neighbor.neighbors.length
          
          if (adoptionRatio >= threshold.value) {
            newlyAware.push(neighborId)
          }
        }
      })
    }
  })
  
  // 更新新知晓的节点
  newlyAware.forEach(nodeId => {
    if (nodes.value[nodeId].state === 'susceptible') {
      nodes.value[nodeId].state = 'aware'
      nodes.value[nodeId].awarenessTime = currentStep.value
      hasChange = true
    }
  })
  
  updateStatistics()
  updateVisualization()
  
  return hasChange
}

// 停止扩散
const stopCascade = () => {
  isRunning.value = false
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

// 重置扩散
const resetCascade = () => {
  currentStep.value = 0
  nodes.value.forEach(node => {
    node.state = 'susceptible'
    node.adoptionTime = null
    node.awarenessTime = null
  })
  updateStatistics()
  updateVisualization()
}

// 更新统计信息
const updateStatistics = () => {
  adoptedCount.value = nodes.value.filter(node => node.state === 'adopted').length
  adoptionRate.value = ((adoptedCount.value / nodeCount.value) * 100).toFixed(1)
  
  const adoptedNodes = nodes.value.filter(node => node.adoptionTime !== null)
  if (adoptedNodes.length > 0) {
    const totalDelay = adoptedNodes.reduce((sum, node) => 
      sum + (node.adoptionTime - (node.awarenessTime || 0)), 0)
    averageDelay.value = (totalDelay / adoptedNodes.length).toFixed(2)
  } else {
    averageDelay.value = 0
  }
}

// 渲染网络
const renderNetwork = () => {
  const container = cascadeContainer.value
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
  
  linkSelection = svg.append("g")
    .selectAll("line")
    .data(links.value)
    .enter().append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 1)
  
  nodeSelection = svg.append("g")
    .selectAll("circle")
    .data(nodes.value)
    .enter().append("circle")
    .attr("r", 6)
    .attr("fill", getNodeColor)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
  
  nodeSelection.append("title")
    .text(d => `节点 ${d.id}\n状态: ${getStateText(d.state)}\n延时: ${d.delay}`)
  
  simulation.on("tick", () => {
    linkSelection
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
    
    nodeSelection
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
  })
}

// 更新可视化
const updateVisualization = () => {
  if (nodeSelection) {
    nodeSelection
      .attr("fill", getNodeColor)
      .select("title")
      .text(d => `节点 ${d.id}\n状态: ${getStateText(d.state)}\n延时: ${d.delay}`)
  }
}

// 获取节点颜色
const getNodeColor = (d) => {
  switch (d.state) {
    case 'susceptible': return '#cccccc'
    case 'aware': return '#ffa500'
    case 'adopted': return '#ff4444'
    default: return '#cccccc'
  }
}

// 获取状态文本
const getStateText = (state) => {
  switch (state) {
    case 'susceptible': return '易感'
    case 'aware': return '知晓'
    case 'adopted': return '采纳'
    default: return '未知'
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
  generateNetwork()
})

// 组件卸载前清理
onBeforeUnmount(() => {
  stopCascade()
})
</script>

<style scoped>
.network-cascade {
  padding: 20px;
}

.cascade-container {
  width: 100%;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.el-card {
  margin-bottom: 20px;
}
</style>