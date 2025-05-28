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

<script>
import * as d3 from 'd3'

export default {
  name: 'NetworkCascade',
  data() {
    return {
      nodeCount: 50,
      threshold: 0.3,
      seedCount: 3,
      delayRange: 5,
      nodes: [],
      links: [],
      currentStep: 0,
      adoptedCount: 0,
      adoptionRate: 0,
      averageDelay: 0,
      isRunning: false,
      intervalId: null
    }
  },
  mounted() {
    this.generateNetwork()
  },
  methods: {
    generateNetwork() {
      // 生成节点
      this.nodes = Array.from({ length: this.nodeCount }, (_, i) => ({
        id: i,
        state: 'susceptible', // susceptible, adopted, aware
        adoptionTime: null,
        delay: Math.floor(Math.random() * this.delayRange) + 1,
        awarenessTime: null,
        neighbors: []
      }))
      
      // 生成小世界网络
      this.generateSmallWorldNetwork()
      
      // 计算邻居关系
      this.calculateNeighbors()
      
      this.renderNetwork()
    },
    
    generateSmallWorldNetwork() {
      this.links = []
      const k = 4 // 每个节点的初始连接数
      
      // 创建环形连接
      for (let i = 0; i < this.nodeCount; i++) {
        for (let j = 1; j <= k / 2; j++) {
          const target = (i + j) % this.nodeCount
          this.links.push({ source: i, target })
        }
      }
      
      // 随机重连
      const rewireProb = 0.3
      this.links = this.links.map(link => {
        if (Math.random() < rewireProb) {
          let newTarget
          do {
            newTarget = Math.floor(Math.random() * this.nodeCount)
          } while (newTarget === link.source)
          
          return { source: link.source, target: newTarget }
        }
        return link
      })
    },
    
    calculateNeighbors() {
      // 重置邻居列表
      this.nodes.forEach(node => node.neighbors = [])
      
      // 构建邻居关系
      this.links.forEach(link => {
        this.nodes[link.source].neighbors.push(link.target)
        this.nodes[link.target].neighbors.push(link.source)
      })
    },
    
    startCascade() {
      this.resetCascade()
      
      // 随机选择种子节点
      const seedIndices = []
      while (seedIndices.length < this.seedCount) {
        const index = Math.floor(Math.random() * this.nodeCount)
        if (!seedIndices.includes(index)) {
          seedIndices.push(index)
        }
      }
      
      // 设置种子节点为已采纳状态
      seedIndices.forEach(index => {
        this.nodes[index].state = 'adopted'
        this.nodes[index].adoptionTime = 0
        this.nodes[index].awarenessTime = 0
      })
      
      this.updateStatistics()
      this.updateVisualization()
      
      this.isRunning = true
      this.intervalId = setInterval(() => {
        const hasChange = this.simulateOneStep()
        if (!hasChange) {
          this.stopCascade()
        }
      }, 500)
    },
    
    simulateOneStep() {
      this.currentStep++
      let hasChange = false
      
      // 处理知晓到行动的延时
      this.nodes.forEach(node => {
        if (node.state === 'aware' && 
            node.awarenessTime !== null && 
            this.currentStep - node.awarenessTime >= node.delay) {
          node.state = 'adopted'
          node.adoptionTime = this.currentStep
          hasChange = true
        }
      })
      
      // 传播给邻居
      const newlyAware = []
      this.nodes.forEach(node => {
        if (node.state === 'adopted') {
          node.neighbors.forEach(neighborId => {
            const neighbor = this.nodes[neighborId]
            if (neighbor.state === 'susceptible') {
              // 计算已采纳的邻居比例
              const adoptedNeighbors = neighbor.neighbors.filter(nId => 
                this.nodes[nId].state === 'adopted'
              ).length
              
              const adoptionRatio = adoptedNeighbors / neighbor.neighbors.length
              
              if (adoptionRatio >= this.threshold) {
                newlyAware.push(neighborId)
              }
            }
          })
        }
      })
      
      // 更新新知晓的节点
      newlyAware.forEach(nodeId => {
        if (this.nodes[nodeId].state === 'susceptible') {
          this.nodes[nodeId].state = 'aware'
          this.nodes[nodeId].awarenessTime = this.currentStep
          hasChange = true
        }
      })
      
      this.updateStatistics()
      this.updateVisualization()
      
      return hasChange
    },
    
    stopCascade() {
      this.isRunning = false
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    
    resetCascade() {
      this.currentStep = 0
      this.nodes.forEach(node => {
        node.state = 'susceptible'
        node.adoptionTime = null
        node.awarenessTime = null
      })
      this.updateStatistics()
      this.updateVisualization()
    },
    
    updateStatistics() {
      this.adoptedCount = this.nodes.filter(node => node.state === 'adopted').length
      this.adoptionRate = ((this.adoptedCount / this.nodeCount) * 100).toFixed(1)
      
      const adoptedNodes = this.nodes.filter(node => node.adoptionTime !== null)
      if (adoptedNodes.length > 0) {
        const totalDelay = adoptedNodes.reduce((sum, node) => 
          sum + (node.adoptionTime - (node.awarenessTime || 0)), 0)
        this.averageDelay = (totalDelay / adoptedNodes.length).toFixed(2)
      } else {
        this.averageDelay = 0
      }
    },
    
    renderNetwork() {
      const container = this.$refs.cascadeContainer
      d3.select(container).selectAll("*").remove()
      
      const width = 600
      const height = 400
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
      
      this.simulation = d3.forceSimulation(this.nodes)
        .force("link", d3.forceLink(this.links).id(d => d.id).distance(50))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2))
      
      this.linkSelection = svg.append("g")
        .selectAll("line")
        .data(this.links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1)
      
      this.nodeSelection = svg.append("g")
        .selectAll("circle")
        .data(this.nodes)
        .enter().append("circle")
        .attr("r", 6)
        .attr("fill", this.getNodeColor)
        .call(d3.drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended))
      
      this.nodeSelection.append("title")
        .text(d => `节点 ${d.id}\n状态: ${this.getStateText(d.state)}\n延时: ${d.delay}`)
      
      this.simulation.on("tick", () => {
        this.linkSelection
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y)
        
        this.nodeSelection
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
      })
    },
    
    updateVisualization() {
      if (this.nodeSelection) {
        this.nodeSelection
          .attr("fill", this.getNodeColor)
          .select("title")
          .text(d => `节点 ${d.id}\n状态: ${this.getStateText(d.state)}\n延时: ${d.delay}`)
      }
    },
    
    getNodeColor(d) {
      switch (d.state) {
        case 'susceptible': return '#cccccc'
        case 'aware': return '#ffa500'
        case 'adopted': return '#ff4444'
        default: return '#cccccc'
      }
    },
    
    getStateText(state) {
      switch (state) {
        case 'susceptible': return '易感'
        case 'aware': return '知晓'
        case 'adopted': return '采纳'
        default: return '未知'
      }
    },
    
    dragstarted(event, d) {
      if (!event.active) this.simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    },
    
    dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    },
    
    dragended(event, d) {
      if (!event.active) this.simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  },
  
  beforeUnmount() {
    this.stopCascade()
  }
}
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