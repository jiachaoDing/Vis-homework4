<template>
  <div class="pagerank">
    <el-card>
      <template #header>
        <h2>PageRank算法和六度空间</h2>
        <p>计算网页重要性排名和验证六度空间理论</p>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never">
            <h3>参数设置</h3>
            <el-form label-width="120px">
              <el-form-item label="节点数量">
                <el-slider v-model="nodeCount" :min="10" :max="100" show-input />
              </el-form-item>
              <el-form-item label="阻尼系数">
                <el-slider v-model="dampingFactor" :min="0.1" :max="0.9" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="迭代次数">
                <el-slider v-model="iterations" :min="10" :max="100" show-input />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="generateGraph">生成图</el-button>
                <el-button @click="calculatePageRank">计算PageRank</el-button>
                <el-button @click="analyzeSixDegrees">六度分析</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>分析结果</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="平均路径长度">{{ averagePathLength }}</el-descriptions-item>
              <el-descriptions-item label="六度内节点">{{ sixDegreeNodes }}</el-descriptions-item>
              <el-descriptions-item label="六度占比">{{ sixDegreeRatio }}%</el-descriptions-item>
              <el-descriptions-item label="最高PageRank">{{ maxPageRank }}</el-descriptions-item>
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
  name: 'PageRank',
  data() {
    return {
      nodeCount: 30,
      dampingFactor: 0.85,
      iterations: 50,
      nodes: [],
      links: [],
      pageRankValues: [],
      averagePathLength: 0,
      sixDegreeNodes: 0,
      sixDegreeRatio: 0,
      maxPageRank: 0
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
        pageRank: 1 / this.nodeCount
      }))
      
      // 生成有向边（模拟网页链接）
      this.links = []
      for (let i = 0; i < this.nodeCount; i++) {
        const outDegree = Math.floor(Math.random() * 5) + 1
        const targets = new Set()
        
        for (let j = 0; j < outDegree; j++) {
          let target
          do {
            target = Math.floor(Math.random() * this.nodeCount)
          } while (target === i || targets.has(target))
          
          targets.add(target)
          this.links.push({ source: i, target })
        }
      }
      
      this.renderNetwork()
    },
    
    calculatePageRank() {
      const n = this.nodeCount
      const d = this.dampingFactor
      
      // 初始化PageRank值
      let pageRank = new Array(n).fill(1 / n)
      
      // 构建转移矩阵
      const outLinks = new Array(n).fill(0).map(() => [])
      const outDegree = new Array(n).fill(0)
      
      this.links.forEach(link => {
        outLinks[link.source].push(link.target)
        outDegree[link.source]++
      })
      
      // 迭代计算PageRank
      for (let iter = 0; iter < this.iterations; iter++) {
        const newPageRank = new Array(n).fill((1 - d) / n)
        
        for (let i = 0; i < n; i++) {
          if (outDegree[i] > 0) {
            const contribution = d * pageRank[i] / outDegree[i]
            outLinks[i].forEach(target => {
              newPageRank[target] += contribution
            })
          } else {
            // 处理悬挂节点
            const contribution = d * pageRank[i] / n
            for (let j = 0; j < n; j++) {
              newPageRank[j] += contribution
            }
          }
        }
        
        pageRank = newPageRank
      }
      
      this.pageRankValues = pageRank
      this.maxPageRank = Math.max(...pageRank).toFixed(4)
      
      // 更新节点的PageRank值
      this.nodes.forEach((node, i) => {
        node.pageRank = pageRank[i]
      })
      
      this.updateVisualization()
    },
    
    analyzeSixDegrees() {
      // 使用BFS计算所有节点对之间的最短路径
      const distances = this.calculateAllPairsShortestPath()
      
      let totalDistance = 0
      let validPairs = 0
      let sixDegreeCount = 0
      
      for (let i = 0; i < this.nodeCount; i++) {
        for (let j = i + 1; j < this.nodeCount; j++) {
          if (distances[i][j] !== Infinity) {
            totalDistance += distances[i][j]
            validPairs++
            
            if (distances[i][j] <= 6) {
              sixDegreeCount++
            }
          }
        }
      }
      
      this.averagePathLength = validPairs > 0 ? (totalDistance / validPairs).toFixed(2) : 0
      this.sixDegreeNodes = sixDegreeCount
      this.sixDegreeRatio = validPairs > 0 ? ((sixDegreeCount / validPairs) * 100).toFixed(1) : 0
    },
    
    calculateAllPairsShortestPath() {
      const n = this.nodeCount
      const distances = Array(n).fill().map(() => Array(n).fill(Infinity))
      
      // 初始化距离矩阵
      for (let i = 0; i < n; i++) {
        distances[i][i] = 0
      }
      
      this.links.forEach(link => {
        distances[link.source][link.target] = 1
        distances[link.target][link.source] = 1 // 转为无向图
      })
      
      // Floyd-Warshall算法
      for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (distances[i][k] + distances[k][j] < distances[i][j]) {
              distances[i][j] = distances[i][k] + distances[k][j]
            }
          }
        }
      }
      
      return distances
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
      
      // 添加箭头标记
      svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#999")
      
      this.simulation = d3.forceSimulation(this.nodes)
        .force("link", d3.forceLink(this.links).id(d => d.id).distance(80))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2))
      
      this.linkSelection = svg.append("g")
        .selectAll("line")
        .data(this.links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrowhead)")
      
      this.nodeSelection = svg.append("g")
        .selectAll("circle")
        .data(this.nodes)
        .enter().append("circle")
        .attr("r", 8)
        .attr("fill", "#69b3a2")
        .call(d3.drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended))
      
      this.nodeSelection.append("title")
        .text(d => `节点 ${d.id}\nPageRank: ${d.pageRank.toFixed(4)}`)
      
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
        const maxPR = Math.max(...this.pageRankValues)
        const minPR = Math.min(...this.pageRankValues)
        
        const radiusScale = d3.scaleLinear()
          .domain([minPR, maxPR])
          .range([5, 15])
        
        const colorScale = d3.scaleSequential(d3.interpolateReds)
          .domain([minPR, maxPR])
        
        this.nodeSelection
          .attr("r", d => radiusScale(d.pageRank))
          .attr("fill", d => colorScale(d.pageRank))
          .select("title")
          .text(d => `节点 ${d.id}\nPageRank: ${d.pageRank.toFixed(4)}`)
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
.pagerank {
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