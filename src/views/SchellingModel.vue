<template>
  <div class="schelling-model">
    <el-card>
      <template #header>
        <h2>谢林模型模拟</h2>
        <p>模拟种族隔离现象的动态演化过程</p>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="never">
            <h3>参数设置</h3>
            <el-form label-width="120px">
              <el-form-item label="网格大小">
                <el-slider v-model="gridSize" :min="10" :max="50" show-input />
              </el-form-item>
              <el-form-item label="满意阈值">
                <el-slider v-model="threshold" :min="0.1" :max="0.9" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="空置率">
                <el-slider v-model="emptyRate" :min="0.1" :max="0.5" :step="0.1" show-input />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="initializeGrid">初始化</el-button>
                <el-button @click="runSimulation" :disabled="isRunning">{{ isRunning ? '运行中...' : '开始模拟' }}</el-button>
                <el-button @click="stopSimulation">停止</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>统计信息</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="迭代次数">{{ iterations }}</el-descriptions-item>
              <el-descriptions-item label="隔离指数">{{ segregationIndex }}%</el-descriptions-item>
              <el-descriptions-item label="不满意个体">{{ unsatisfiedCount }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        
        <el-col :span="18">
          <el-card shadow="never">
            <h3>网格可视化</h3>
            <div ref="gridContainer" class="grid-container"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'SchellingModel',
  data() {
    return {
      gridSize: 20,
      threshold: 0.3,
      emptyRate: 0.2,
      grid: [],
      iterations: 0,
      segregationIndex: 0,
      unsatisfiedCount: 0,
      isRunning: false,
      intervalId: null
    }
  },
  mounted() {
    this.initializeGrid()
  },
  methods: {
    initializeGrid() {
      this.iterations = 0
      this.grid = []
      
      // 创建网格
      for (let i = 0; i < this.gridSize; i++) {
        this.grid[i] = []
        for (let j = 0; j < this.gridSize; j++) {
          const rand = Math.random()
          if (rand < this.emptyRate) {
            this.grid[i][j] = 0 // 空置
          } else if (rand < this.emptyRate + (1 - this.emptyRate) / 2) {
            this.grid[i][j] = 1 // 类型1
          } else {
            this.grid[i][j] = 2 // 类型2
          }
        }
      }
      
      this.calculateStatistics()
      this.renderGrid()
    },
    
    runSimulation() {
      this.isRunning = true
      this.intervalId = setInterval(() => {
        const moved = this.simulateOneStep()
        if (!moved) {
          this.stopSimulation()
        }
      }, 200)
    },
    
    stopSimulation() {
      this.isRunning = false
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    
    simulateOneStep() {
      const unsatisfied = []
      const empty = []
      
      // 找到不满意的个体和空位置
      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
          if (this.grid[i][j] === 0) {
            empty.push([i, j])
          } else if (!this.isSatisfied(i, j)) {
            unsatisfied.push([i, j])
          }
        }
      }
      
      if (unsatisfied.length === 0 || empty.length === 0) {
        return false // 没有移动
      }
      
      // 随机选择一个不满意的个体移动到空位置
      const agentIndex = Math.floor(Math.random() * unsatisfied.length)
      const emptyIndex = Math.floor(Math.random() * empty.length)
      
      const [agentX, agentY] = unsatisfied[agentIndex]
      const [emptyX, emptyY] = empty[emptyIndex]
      
      // 移动
      this.grid[emptyX][emptyY] = this.grid[agentX][agentY]
      this.grid[agentX][agentY] = 0
      
      this.iterations++
      this.calculateStatistics()
      this.updateVisualization()
      
      return true
    },
    
    isSatisfied(x, y) {
      const agentType = this.grid[x][y]
      if (agentType === 0) return true
      
      let sameTypeCount = 0
      let totalNeighbors = 0
      
      // 检查8个邻居
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue
          
          const nx = x + dx
          const ny = y + dy
          
          if (nx >= 0 && nx < this.gridSize && ny >= 0 && ny < this.gridSize) {
            if (this.grid[nx][ny] !== 0) {
              totalNeighbors++
              if (this.grid[nx][ny] === agentType) {
                sameTypeCount++
              }
            }
          }
        }
      }
      
      if (totalNeighbors === 0) return true
      return (sameTypeCount / totalNeighbors) >= this.threshold
    },
    
    calculateStatistics() {
      let unsatisfied = 0
      let totalAgents = 0
      let segregationSum = 0
      
      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
          if (this.grid[i][j] !== 0) {
            totalAgents++
            if (!this.isSatisfied(i, j)) {
              unsatisfied++
            }
            
            // 计算隔离指数
            const neighbors = this.getNeighbors(i, j)
            const sameType = neighbors.filter(n => n === this.grid[i][j]).length
            if (neighbors.length > 0) {
              segregationSum += sameType / neighbors.length
            }
          }
        }
      }
      
      this.unsatisfiedCount = unsatisfied
      this.segregationIndex = totalAgents > 0 ? ((segregationSum / totalAgents) * 100).toFixed(1) : 0
    },
    
    getNeighbors(x, y) {
      const neighbors = []
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue
          
          const nx = x + dx
          const ny = y + dy
          
          if (nx >= 0 && nx < this.gridSize && ny >= 0 && ny < this.gridSize && this.grid[nx][ny] !== 0) {
            neighbors.push(this.grid[nx][ny])
          }
        }
      }
      return neighbors
    },
    
    renderGrid() {
      const container = this.$refs.gridContainer
      d3.select(container).selectAll("*").remove()
      
      const cellSize = Math.min(600 / this.gridSize, 20)
      const width = cellSize * this.gridSize
      const height = cellSize * this.gridSize
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
      
      const colorScale = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(["white", "#ff6b6b", "#4ecdc4"])
      
      this.cells = svg.selectAll("rect")
        .data(this.grid.flat().map((d, i) => ({
          value: d,
          x: i % this.gridSize,
          y: Math.floor(i / this.gridSize)
        })))
        .enter()
        .append("rect")
        .attr("x", d => d.x * cellSize)
        .attr("y", d => d.y * cellSize)
        .attr("width", cellSize - 1)
        .attr("height", cellSize - 1)
        .attr("fill", d => colorScale(d.value))
        .attr("stroke", "#ddd")
        .attr("stroke-width", 0.5)
    },
    
    updateVisualization() {
      if (this.cells) {
        const colorScale = d3.scaleOrdinal()
          .domain([0, 1, 2])
          .range(["white", "#ff6b6b", "#4ecdc4"])
        
        this.cells
          .data(this.grid.flat().map((d, i) => ({
            value: d,
            x: i % this.gridSize,
            y: Math.floor(i / this.gridSize)
          })))
          .attr("fill", d => colorScale(d.value))
      }
    }
  },
  
  beforeUnmount() {
    this.stopSimulation()
  }
}
</script>

<style scoped>
.schelling-model {
  padding: 20px;
}

.grid-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-card {
  margin-bottom: 20px;
}
</style> 