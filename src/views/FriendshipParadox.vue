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

<script>
import * as d3 from 'd3'

export default {
  name: 'FriendshipParadox',
  data() {
    return {
      nodeCount: 30,
      probability: 0.3,
      graphType: 'random',
      nodes: [],
      links: [],
      paradoxNodes: 0,
      paradoxRatio: 0,
      averageDegree: 0,
      simulation: null
    }
  },
  mounted() {
    this.generateGraph()
  },
  methods: {
    generateGraph() {
      // 生成节点
      this.nodes = Array.from({ length: this.nodeCount }, (_, i) => ({
        id: i,
        degree: 0,
        friendsAverageDegree: 0,
        satisfiesParadox: false
      }))
      
      // 生成连接
      this.links = []
      if (this.graphType === 'random') {
        this.generateRandomGraph()
      } else {
        this.generateSocialNetwork()
      }
      
      this.calculateDegrees()
      this.renderNetwork()
    },
    
    generateRandomGraph() {
      for (let i = 0; i < this.nodeCount; i++) {
        for (let j = i + 1; j < this.nodeCount; j++) {
          if (Math.random() < this.probability) {
            this.links.push({ source: i, target: j })
          }
        }
      }
    },
    
    generateSocialNetwork() {
      // 生成具有社会网络特征的图（小世界网络）
      const k = Math.floor(this.nodeCount * this.probability)
      
      // 首先创建环形连接
      for (let i = 0; i < this.nodeCount; i++) {
        for (let j = 1; j <= k / 2; j++) {
          const target = (i + j) % this.nodeCount
          this.links.push({ source: i, target })
        }
      }
      
      // 随机重连
      const rewireProb = 0.3
      this.links = this.links.filter(link => {
        if (Math.random() < rewireProb) {
          const newTarget = Math.floor(Math.random() * this.nodeCount)
          if (newTarget !== link.source) {
            link.target = newTarget
          }
        }
        return true
      })
    },
    
    calculateDegrees() {
      // 重置度数
      this.nodes.forEach(node => node.degree = 0)
      
      // 计算每个节点的度数
      this.links.forEach(link => {
        this.nodes[link.source].degree++
        this.nodes[link.target].degree++
      })
      
      // 计算平均度数
      this.averageDegree = (this.nodes.reduce((sum, node) => sum + node.degree, 0) / this.nodeCount).toFixed(2)
    },
    
    analyzeParadox() {
      this.nodes.forEach(node => {
        // 找到该节点的所有朋友
        const friends = []
        this.links.forEach(link => {
          if (link.source === node.id) friends.push(link.target)
          if (link.target === node.id) friends.push(link.source)
        })
        
        // 计算朋友的平均度数
        if (friends.length > 0) {
          const friendsDegreeSum = friends.reduce((sum, friendId) => sum + this.nodes[friendId].degree, 0)
          node.friendsAverageDegree = friendsDegreeSum / friends.length
          node.satisfiesParadox = node.friendsAverageDegree > node.degree
        } else {
          node.friendsAverageDegree = 0
          node.satisfiesParadox = false
        }
      })
      
      // 统计符合悖论的节点
      this.paradoxNodes = this.nodes.filter(node => node.satisfiesParadox).length
      this.paradoxRatio = ((this.paradoxNodes / this.nodeCount) * 100).toFixed(1)
      
      this.updateVisualization()
    },
    
    renderNetwork() {
      const container = this.$refs.networkContainer
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
      
      const link = svg.append("g")
        .selectAll("line")
        .data(this.links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1)
      
      const node = svg.append("g")
        .selectAll("circle")
        .data(this.nodes)
        .enter().append("circle")
        .attr("r", d => 3 + d.degree)
        .attr("fill", "#69b3a2")
        .call(d3.drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended))
      
      node.append("title")
        .text(d => `节点 ${d.id}\n度数: ${d.degree}\n朋友平均度数: ${d.friendsAverageDegree.toFixed(2)}`)
      
      this.simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y)
        
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
      })
      
      this.linkSelection = link
      this.nodeSelection = node
    },
    
    updateVisualization() {
      if (this.nodeSelection) {
        this.nodeSelection
          .attr("fill", d => d.satisfiesParadox ? "#ff6b6b" : "#69b3a2")
          .select("title")
          .text(d => `节点 ${d.id}\n度数: ${d.degree}\n朋友平均度数: ${d.friendsAverageDegree.toFixed(2)}\n符合悖论: ${d.satisfiesParadox ? '是' : '否'}`)
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
  }
}
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