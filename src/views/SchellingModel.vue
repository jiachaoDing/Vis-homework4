<template>
  <div class="schelling-model">
    <!-- 添加介绍弹窗 -->
    <el-dialog
      v-model="showIntroDialog"
      title="谢林模型介绍                 制作人贾书凡"
      width="60%"
      :show-close="true"
      :close-on-click-modal="true"
    >
      <div class="intro-content">
        <h3>什么是谢林模型？</h3>
        <p>谢林模型(Schelling's Model)是由诺贝尔经济学奖得主托马斯·谢林(Thomas Schelling)在1971年提出的一个经典模型，用于解释种族隔离等社会现象如何从个体行为中自发产生。</p>
        
        <h3>模型原理</h3>
        <p>模型基于以下简单规则：</p>
        <ul>
          <li>在一个网格中，有两种类型的个体和一些空置单元格</li>
          <li>每个个体都希望周围至少有一定比例的邻居与自己类型相同</li>
          <li>如果这个条件不满足，个体会变得"不满意"并寻求移动到一个空置单元格</li>
          <li>即使个体只有轻微的偏好(如希望30%的邻居相同)，系统最终也会呈现高度隔离状态</li>
        </ul>
        
        <h3>模型参数</h3>
        <ul>
          <li><strong>网格大小</strong>：模拟区域的大小</li>
          <li><strong>满意阈值</strong>：个体希望周围相同类型邻居的最低比例</li>
          <li><strong>空置率</strong>：网格中空置单元格的比例</li>
        </ul>
        
        <h3>模型意义</h3>
        <p>谢林模型展示了一个重要的社会学洞见：即使个体没有强烈的歧视倾向，仅仅基于对相似性的轻微偏好，也可能导致宏观层面上的严重隔离。这一发现对理解城市种族隔离、社会分层等现象具有重要意义。</p>
        
        <div class="intro-footer">
          <el-button type="primary" @click="showIntroDialog = false">开始探索模型</el-button>
        </div>
      </div>
    </el-dialog>
    
    <!-- 仪表盘弹窗 -->
    <el-dialog
      v-model="showDashboardDialog"
      title="模拟数据仪表盘"
      width="80%"
      :show-close="true"
      :close-on-click-modal="true"
      custom-class="dashboard-dialog"
    >
      <div class="dashboard-content">
        <el-row :gutter="20">
          <!-- 隔离指数 - 缩小宽度 -->
          <el-col :span="6">
            <el-card shadow="never" class="dashboard-card">
              <template #header>
                <div class="dashboard-header">
                  <h3>隔离指数仪表</h3>
                </div>
              </template>
              <div ref="gaugeContainer" class="gauge-container"></div>
            </el-card>
          </el-col>
          <!-- 满意度分布 - 缩小宽度 -->
          <el-col :span="6">
            <el-card shadow="never" class="dashboard-card">
              <template #header>
                <div class="dashboard-header">
                  <h3>满意度分布</h3>
                </div>
              </template>
              <div ref="pieContainer" class="pie-container"></div>
            </el-card>
          </el-col>
          <!-- 收敛性分析 - 增加宽度 -->
          <el-col :span="12">
            <el-card shadow="never" class="dashboard-card">
              <template #header>
                <div class="dashboard-header">
                  <h3>收敛性分析</h3>
                </div>
              </template>
              <div ref="convergenceContainer" class="convergence-container"></div>
            </el-card>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="24">
            <el-card shadow="never" class="dashboard-card">
              <template #header>
                <div class="dashboard-header">
                  <h3>演化趋势</h3>
                </div>
              </template>
              <div ref="chartContainer" class="large-chart-container"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <el-card class="main-card">
      <template #header>
        <div class="header">
          <div>
            <h2>谢林模型模拟</h2>
            <p>模拟种族隔离现象的动态演化过程</p>
          </div>
          <el-button-group>
            <el-button type="primary" @click="initializeGrid">
              <el-icon><Refresh /></el-icon> 重置
            </el-button>
            <el-button type="success" @click="runSimulation" :disabled="isRunning">
              <el-icon><VideoPlay /></el-icon> {{ isRunning ? '运行中...' : '开始' }}
            </el-button>
            <el-button type="warning" @click="stopSimulation">
              <el-icon><VideoPause /></el-icon> 暂停
            </el-button>
            <el-button @click="exportData">
              <el-icon><Download /></el-icon> 导出数据
            </el-button>
            <el-button @click="showIntroDialog = true">
              <el-icon><InfoFilled /></el-icon> 模型介绍
            </el-button>
            <!-- 添加仪表盘按钮 -->
            <el-button @click="showDashboardDialog = true">
              <el-icon><DataAnalysis /></el-icon> 数据仪表盘
            </el-button>
          </el-button-group>
        </div>
      </template>
      
      <el-row :gutter="20">
        <!-- 左侧控制面板 - 从span="4"调整为span="7" -->
        <el-col :span="7">
          <el-card shadow="never">
            <h3>参数设置</h3>
            <el-form label-width="100px" size="small">
              <el-form-item label="网格大小">
                <el-slider v-model="gridSize" :min="10" :max="50" show-input />
              </el-form-item>
              <el-form-item label="满意阈值">
                <el-slider v-model="threshold" :min="0.1" :max="0.9" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="空置率">
                <el-slider v-model="emptyRate" :min="0.1" :max="0.5" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="模拟速度">
                <el-slider 
                  v-model="simulationSpeed" 
                  :min="1" 
                  :max="10" 
                  :format-tooltip="formatSpeedTooltip"
                  show-input />
              </el-form-item>
            </el-form>
          </el-card>
          
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>统计信息</h3>
            <el-descriptions :column="1" border size="small">
              <el-descriptions-item label="迭代次数">{{ iterations }}</el-descriptions-item>
              <el-descriptions-item label="隔离指数">{{ segregationIndex }}%</el-descriptions-item>
              <el-descriptions-item label="不满意个体">{{ unsatisfiedCount }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        
        <!-- 右侧网格可视化 - 从span="20"调整为span="17" -->
        <el-col :span="17">
          <el-tabs v-model="activeView" class="grid-tabs">
            <el-tab-pane label="网格视图" name="grid">
              <el-card shadow="never" class="grid-card">
                <template #header>
                  <div class="grid-header">
                    <h3>网格可视化</h3>
                    <div class="color-legend">
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #f8f9fa;"></div>
                        <span>空置单元格</span>
                      </div>
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #ff7675;"></div>
                        <span>类型1 - 满意</span>
                      </div>
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #fab1a0;"></div>
                        <span>类型1 - 不满意</span>
                      </div>
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #74b9ff;"></div>
                        <span>类型2 - 满意</span>
                      </div>
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #a0d2f3;"></div>
                        <span>类型2 - 不满意</span>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- 使用flex布局自动填充可用空间 -->
                <div class="grid-flex-container">
                  <div ref="gridContainer" class="grid-container"></div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="热力图" name="heatmap">
              <el-card shadow="never" class="grid-card">
                <template #header>
                  <div class="grid-header">
                    <h3>聚集热力图</h3>
                    <el-radio-group v-model="heatmapType" size="small" @change="updateHeatmap">
                      <el-radio-button label="type1">类型1分布</el-radio-button>
                      <el-radio-button label="type2">类型2分布</el-radio-button>
                    </el-radio-group>
                  </div>
                </template>
                <!-- 使用flex布局自动填充可用空间 -->
                <div class="grid-flex-container">
                  <div ref="heatmapContainer" class="grid-container"></div>
                </div>
              </el-card>
            </el-tab-pane>
            <!-- 添加满意度热力图视图 -->
            <el-tab-pane label="满意度热力图" name="satisfaction">
              <el-card shadow="never" class="grid-card">
                <template #header>
                  <div class="grid-header">
                    <h3>满意度分布热力图</h3>
                    <div class="color-legend">
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #f8f9fa;"></div>
                        <span>空置单元格</span>
                      </div>
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #4cd137;"></div>
                        <span>高满意度</span>
                      </div>
                      <div class="legend-item">
                        <div class="color-box" style="background-color: #e84118;"></div>
                        <span>低满意度</span>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="grid-flex-container">
                  <div ref="satisfactionContainer" class="grid-container"></div>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { Refresh, VideoPlay, VideoPause, Download, InfoFilled, DataAnalysis } from '@element-plus/icons-vue'

export default {
  name: 'SchellingModel',
  components: {
    Refresh,
    VideoPlay,
    VideoPause,
    Download,
    InfoFilled,
    DataAnalysis
  },
  data() {
    return {
      showIntroDialog: true, // 设置为true以在页面加载时自动显示
      showDashboardDialog: false, // 添加仪表盘对话框控制变量
      gridSize: 20,
      threshold: 0.3,
      emptyRate: 0.2,
      simulationSpeed: 5,
      grid: [],
      iterations: 0,
      segregationIndex: 0,
      unsatisfiedCount: 0,
      isRunning: false,
      intervalId: null,
      historyData: {
        iterations: [],
        segregationIndex: [],
        unsatisfiedCount: []
      },
      chartSvg: null,
      chartScales: null,
      activeView: 'grid',
      heatmapType: 'type1',
      
      // 添加新的数据属性
      trajectories: [], // 存储移动轨迹
      lastMovedAgent: null, // 最后移动的个体
      movingAgents: new Set(), // 正在移动的个体
      convergenceData: [], // 收敛性数据
      satisfactionDistribution: { // 满意度分布数据
        satisfied: { type1: 0, type2: 0 },
        unsatisfied: { type1: 0, type2: 0 }
      }
    }
  },
  mounted() {
    this.showIntroDialog = true; // 确保对话框显示
    this.initializeGrid()
    // 添加窗口大小变化监听，以便重新渲染网格
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    activeView(newVal) {
      if (newVal === 'heatmap') {
        this.$nextTick(() => {
          this.renderHeatmap()
        })
      } else if (newVal === 'grid') {
        this.$nextTick(() => {
          this.renderGrid()
        })
      } else if (newVal === 'satisfaction') {
        this.$nextTick(() => {
          this.renderSatisfactionHeatmap()
        })
      } else if (newVal === 'trajectories') {
        this.$nextTick(() => {
          this.renderTrajectories()
        })
      }
    },
    showDashboardDialog(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.renderGauge()
          this.renderPieChart()
          this.renderConvergenceChart()
          this.renderChart()
        })
      }
    }
  },
  methods: {
    handleResize() {
      if (this.activeView === 'grid') {
        this.renderGrid()
      } else if (this.activeView === 'heatmap') {
        this.renderHeatmap()
      } else if (this.activeView === 'satisfaction') {
        this.renderSatisfactionHeatmap()
      } else if (this.activeView === 'trajectories') {
        this.renderTrajectories()
      }
      
      if (this.showDashboardDialog) {
        this.renderChart() // 重新渲染折线图
        this.renderGauge() // 重新渲染仪表盘
        this.renderPieChart() // 重新渲染饼图
        this.renderConvergenceChart() // 重新渲染收敛性图
      }
    },
    
    formatSpeedTooltip(val) {
      return `${val}x`
    },
    
    initializeGrid() {
      this.stopSimulation()
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
      
      // 如果当前是热力图视图，也更新热力图
      if (this.activeView === 'heatmap') {
        this.renderHeatmap()
      } else if (this.activeView === 'satisfaction') {
        this.renderSatisfactionHeatmap()
      } else if (this.activeView === 'trajectories') {
        this.renderTrajectories()
      }
      
      // 重置历史数据
      this.historyData = {
        iterations: [0],
        segregationIndex: [parseFloat(this.segregationIndex)],
        unsatisfiedCount: [this.unsatisfiedCount]
      }
      
      // 重置轨迹
      this.trajectories = []
      this.lastMovedAgent = null
      this.movingAgents.clear()
      
      // 重置收敛性数据
      this.convergenceData = []
      
      // 如果仪表盘对话框打开，更新仪表盘
      if (this.showDashboardDialog) {
        this.renderChart()
        this.renderGauge()
        this.renderPieChart()
        this.renderConvergenceChart()
      }
    },
    
    runSimulation() {
      this.isRunning = true
      // 根据速度调整间隔时间
      const interval = Math.max(50, 500 - (this.simulationSpeed * 45))
      this.intervalId = setInterval(() => {
        const moved = this.simulateOneStep()
        if (!moved) {
          this.stopSimulation()
        }
      }, interval)
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
      
      // 记录移动轨迹
      this.trajectories.push({
        from: { x: agentX, y: agentY },
        to: { x: emptyX, y: emptyY },
        type: this.grid[agentX][agentY],
        iteration: this.iterations
      })
      
      // 记录最后移动的个体
      this.lastMovedAgent = { x: emptyX, y: emptyY }
      
      // 添加到正在移动的个体集合
      this.movingAgents.add(`${emptyX}-${emptyY}`)
      
      // 3秒后从移动集合中移除
      setTimeout(() => {
        this.movingAgents.delete(`${emptyX}-${emptyY}`)
        this.updateVisualization() // 更新可视化以移除闪烁效果
      }, 1000)
      
      // 移动
      this.grid[emptyX][emptyY] = this.grid[agentX][agentY]
      this.grid[agentX][agentY] = 0
      
      this.iterations++
      this.calculateStatistics()
      this.updateVisualization()
      
      // 记录历史数据
      this.historyData.iterations.push(this.iterations)
      this.historyData.segregationIndex.push(parseFloat(this.segregationIndex))
      this.historyData.unsatisfiedCount.push(this.unsatisfiedCount)
      
      // 更新收敛性数据
      this.updateConvergenceData()
      
      // 如果仪表盘对话框打开，更新仪表盘
      if (this.showDashboardDialog) {
        // 更新折线图
        this.updateChart()
        
        // 更新仪表盘和饼图
        this.updateGauge()
        this.updatePieChart()
        this.updateConvergenceChart()
      }
      
      // 如果当前是热力图视图，也更新热力图
      if (this.activeView === 'heatmap') {
        this.updateHeatmap()
      } else if (this.activeView === 'satisfaction') {
        this.updateSatisfactionHeatmap()
      } else if (this.activeView === 'trajectories') {
        this.updateTrajectories()
      }
      
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
      
      // 重置满意度分布数据
      this.satisfactionDistribution = {
        satisfied: { type1: 0, type2: 0 },
        unsatisfied: { type1: 0, type2: 0 }
      }
      
      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
          if (this.grid[i][j] !== 0) {
            totalAgents++
            const isSatisfied = this.isSatisfied(i, j)
            
            // 更新满意度分布数据
            if (this.grid[i][j] === 1) {
              if (isSatisfied) {
                this.satisfactionDistribution.satisfied.type1++
              } else {
                this.satisfactionDistribution.unsatisfied.type1++
              }
            } else {
              if (isSatisfied) {
                this.satisfactionDistribution.satisfied.type2++
              } else {
                this.satisfactionDistribution.unsatisfied.type2++
              }
            }
            
            if (!isSatisfied) {
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
  if (!container) return
  
  d3.select(container).selectAll("*").remove()
  
  // 获取容器尺寸
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  
  // 增加边距，使网格更小
  const margin = 40 // 增加边距
  const availableWidth = containerWidth - margin * 2
  const availableHeight = containerHeight - margin * 2
  
  // 计算单元格大小，确保网格能完整显示，并添加缩放因子0.8使其更小
  const cellSize = Math.min(
    Math.floor(availableWidth / this.gridSize),
    Math.floor(availableHeight / this.gridSize)
  ) * 0.8 // 添加缩放因子
  
  const width = cellSize * this.gridSize
  const height = cellSize * this.gridSize
  
  // 居中放置网格
  const offsetX = (containerWidth - width) / 2
  const offsetY = (containerHeight - height) / 2
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .append("g")
    .attr("transform", `translate(${offsetX}, ${offsetY})`)
  
  // 添加网格背景
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#f0f0f0")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2)
  
  // 创建颜色方案，考虑满意度和移动状态
  const getColor = (value, isSatisfied, isMoving) => {
    if (value === 0) return "#f8f9fa"; // 空置单元格
    
    // 如果是正在移动的个体，添加闪烁效果
    if (isMoving) {
      return value === 1 ? "#ff9ff3" : "#00d2d3"; // 闪烁颜色
    }
    
    if (value === 1) {
      return isSatisfied ? "#ff7675" : "#fab1a0"; // 类型1：满意=深色，不满意=浅色
    } else {
      return isSatisfied ? "#74b9ff" : "#a0d2f3"; // 类型2：满意=深色，不满意=浅色
    }
  }
  
  // 添加网格线 - 仅当单元格足够大时才显示
  if (cellSize >= 8) {
    for (let i = 0; i <= this.gridSize; i++) {
      // 垂直线
      svg.append("line")
        .attr("x1", i * cellSize)
        .attr("y1", 0)
        .attr("x2", i * cellSize)
        .attr("y2", height)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1)
      
      // 水平线
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", i * cellSize)
        .attr("x2", width)
        .attr("y2", i * cellSize)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1)
    }
  }
  
  // 创建单元格
  this.cells = svg.selectAll(".cell")
    .data(this.grid.flat().map((d, i) => ({
      value: d,
      x: i % this.gridSize,
      y: Math.floor(i / this.gridSize),
      isSatisfied: d !== 0 ? this.isSatisfied(Math.floor(i / this.gridSize), i % this.gridSize) : true
    })))
    .enter()
    .append("g")
    .attr("class", "cell")
    .attr("transform", d => `translate(${d.x * cellSize}, ${d.y * cellSize})`)
  
  // 添加单元格背景，颜色反映类型、满意度和移动状态
  this.cellRects = this.cells.append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("fill", d => getColor(
      d.value, 
      d.isSatisfied, 
      this.movingAgents.has(`${d.y}-${d.x}`)
    ))
    .attr("stroke", cellSize >= 8 ? "#ddd" : "none")
    .attr("stroke-width", 1)
    .attr("rx", Math.min(3, cellSize / 5))
    .attr("ry", Math.min(3, cellSize / 5))
    .on("mouseover", (event, d) => {
      // 显示提示信息
      if (d.value !== 0) {
        const neighbors = this.getNeighbors(d.y, d.x)
        const sameType = neighbors.filter(n => n === d.value).length
        const ratio = neighbors.length > 0 ? (sameType / neighbors.length).toFixed(2) : 0
        const isSatisfied = d.isSatisfied ? "满意" : "不满意"
        const typeText = d.value === 1 ? "类型1" : "类型2"
        
        const tooltip = d3.select("body").append("div")
          .attr("class", "grid-tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0,0,0,0.7)")
          .style("color", "white")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", 1000)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`)
          .html(`
            <div>${typeText} (${isSatisfied})</div>
            <div>位置: (${d.x}, ${d.y})</div>
            <div>相同类型邻居: ${sameType}/${neighbors.length} (${(ratio * 100).toFixed(0)}%)</div>
            <div>满意阈值: ${this.threshold * 100}%</div>
          `)
      }
    })
    .on("mouseout", (event) => {
      // 移除提示信息
      d3.selectAll(".grid-tooltip").remove()
    })
  
  // 如果单元格足够大，添加文字标签
  if (cellSize >= 16) {
    this.cells.filter(d => d.value !== 0)
      .append("text")
      .attr("x", cellSize / 2)
      .attr("y", cellSize / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", `${cellSize / 2}px`)
      .attr("fill", "#fff")
      .text(d => d.value)
  }
},

    updateVisualization() {
      if (!this.cells) return
      
      // 创建颜色方案，考虑满意度和移动状态
      const getColor = (value, isSatisfied, isMoving) => {
        if (value === 0) return "#f8f9fa"; // 空置单元格
        
        // 如果是正在移动的个体，添加闪烁效果
        if (isMoving) {
          return value === 1 ? "#ff9ff3" : "#00d2d3"; // 闪烁颜色
        }
        
        if (value === 1) {
          return isSatisfied ? "#ff7675" : "#fab1a0"; // 类型1：满意=深色，不满意=浅色
        } else {
          return isSatisfied ? "#74b9ff" : "#a0d2f3"; // 类型2：满意=深色，不满意=浅色
        }
      }
      
      // 更新单元格数据和颜色
      this.cells
        .data(this.grid.flat().map((d, i) => ({
          value: d,
          x: i % this.gridSize,
          y: Math.floor(i / this.gridSize),
          isSatisfied: d !== 0 ? this.isSatisfied(Math.floor(i / this.gridSize), i % this.gridSize) : true
        })))
        .select("rect")
        .attr("fill", d => getColor(
          d.value, 
          d.isSatisfied, 
          this.movingAgents.has(`${d.y}-${d.x}`)
        ))
    },
    
   renderHeatmap() {
  const container = this.$refs.heatmapContainer
  if (!container) return
  
  d3.select(container).selectAll("*").remove()
  
  // 获取容器尺寸
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  
  // 增加边距
  const margin = { top: 40, right: 40, bottom: 60, left: 40 }
  const additionalMargin = 40 // 额外边距
  const downShift = 80// 整体下移的距离
  
  // 应用缩放因子0.8
  const scaleFactor = 0.8
  const width = (containerWidth - margin.left - margin.right - additionalMargin * 2) * scaleFactor
  const height = (containerHeight - margin.top - margin.bottom - additionalMargin * 2) * scaleFactor
  
  // 调整位置以保持居中，并整体下移
  const offsetX = (containerWidth - width - margin.left - margin.right) / 2
  const offsetY = additionalMargin / 2 + downShift // 增加下移距离
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .append("g")
    .attr("transform", `translate(${margin.left + offsetX},${margin.top + offsetY})`)
  
  // 准备热力图数据
  const heatmapData = []
  for (let i = 0; i < this.gridSize; i++) {
    for (let j = 0; j < this.gridSize; j++) {
      const value = this.heatmapType === 'type1' 
        ? (this.grid[i][j] === 1 ? 1 : 0)
        : (this.grid[i][j] === 2 ? 1 : 0)
      
      heatmapData.push({
        x: j,
        y: i,
        value: value
      })
    }
  }
  
  // 创建比例尺
  const x = d3.scaleLinear()
    .domain([0, this.gridSize])
    .range([0, width])
  
  const y = d3.scaleLinear()
    .domain([0, this.gridSize])
    .range([0, height])
  
  // 使用插值的热力图
  // 创建密度数据矩阵
  const resolution = 100
  const densityData = new Array(resolution)
    .fill(0)
    .map(() => new Array(resolution).fill(0))
  
  // 使用高斯核函数进行平滑插值
  const sigma = 10
  const gaussianKernel = (x, y, centerX, centerY) => {
    const dx = x - centerX
    const dy = y - centerY
    return Math.exp(-(dx*dx + dy*dy) / (2 * sigma * sigma))
  }
  
  // 填充密度数据
  for (const point of heatmapData) {
    if (point.value === 0) continue // 跳过空值
    
    const centerX = (point.x / this.gridSize) * resolution
    const centerY = (point.y / this.gridSize) * resolution
    
    // 对周围区域应用高斯核
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        densityData[j][i] += point.value * gaussianKernel(i, j, centerX, centerY)
      }
    }
  }
  
  // 归一化数据
  let max = 0
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      max = Math.max(max, densityData[j][i])
    }
  }
  
  if (max > 0) {
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        densityData[j][i] /= max
      }
    }
  }
  
  // 创建canvas元素用于渲染热力图
  const canvas = document.createElement('canvas')
  canvas.width = resolution
  canvas.height = resolution
  const context = canvas.getContext('2d')
  const imageData = context.createImageData(resolution, resolution)
  
  // 填充图像数据
  const colorScale = this.heatmapType === 'type1' 
    ? d3.interpolateReds
    : d3.interpolateBlues
  
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const value = densityData[j][i]
      const color = d3.color(colorScale(value))
      const index = (j * resolution + i) * 4
      
      imageData.data[index] = color.r
      imageData.data[index + 1] = color.g
      imageData.data[index + 2] = color.b
      imageData.data[index + 3] = 255 * Math.min(1, value * 1.5) // 透明度
    }
  }
  
  context.putImageData(imageData, 0, 0)
  
  // 将canvas内容转为图像
  const dataUrl = canvas.toDataURL()
  
  // 添加热力图背景
  svg.append("image")
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", dataUrl)
  
  // 添加网格线
  svg.append("g")
    .attr("class", "grid-lines")
    .selectAll("line")
    .data(d3.range(0, this.gridSize + 1))
    .enter()
    .append("line")
    .attr("x1", d => x(d))
    .attr("y1", 0)
    .attr("x2", d => x(d))
    .attr("y2", height)
    .attr("stroke", "#ddd")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.5)
  
  svg.append("g")
    .attr("class", "grid-lines")
    .selectAll("line")
    .data(d3.range(0, this.gridSize + 1))
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", d => y(d))
    .attr("x2", width)
    .attr("y2", d => y(d))
    .attr("stroke", "#ddd")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.5)
  
  // 添加坐标轴
  const xAxis = d3.axisBottom(x.copy().domain([1, this.gridSize]))
    .ticks(Math.min(this.gridSize, 10))
  
  const yAxis = d3.axisLeft(y.copy().domain([1, this.gridSize]))
    .ticks(Math.min(this.gridSize, 10))
  
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
  
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
  
  // 添加坐标轴标签
  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .text("X 坐标")
  
  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(-30, ${height / 2}) rotate(-90)`)
    .text("Y 坐标")
  
  // 添加图例
  const legendWidth = 200
  const legendHeight = 20
  
  const legendX = width - legendWidth - 10
  const legendY = -30
  
  const legendScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, legendWidth])
  
  const legendAxis = d3.axisBottom(legendScale)
    .ticks(5)
    .tickFormat(d => d.toFixed(1))
  
  const defs = svg.append("defs")
  
  // 创建线性渐变
  const gradient = defs.append("linearGradient")
    .attr("id", "density-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
  
  // 添加渐变颜色
  const numStops = 10
  for (let i = 0; i <= numStops; i++) {
    const offset = i / numStops
    gradient.append("stop")
      .attr("offset", `${offset * 100}%`)
      .attr("stop-color", colorScale(offset))
  }
  
  // 添加图例矩形
  svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#density-gradient)")
  
  // 添加图例轴
  svg.append("g")
    .attr("class", "legend-axis")
    .attr("transform", `translate(${legendX}, ${legendY + legendHeight})`)
    .call(legendAxis)
  
  // 添加图例标题
  svg.append("text")
    .attr("class", "legend-title")
    .attr("x", legendX + legendWidth / 2)
    .attr("y", legendY - 10)
    .attr("text-anchor", "middle")
    .text(this.heatmapType === 'type1' ? "类型1密度" : "类型2密度")
},


updateHeatmap() {
      if (this.activeView === 'heatmap') {
        this.renderHeatmap()
      }
    },
    
    renderChart() {
      const container = this.$refs.chartContainer
      if (!container) return
      
      d3.select(container).selectAll("*").remove()
      
      // 获取容器尺寸
      const containerWidth = container.clientWidth
      const containerHeight = 200
      
      // 计算边距
      const margin = { top: 20, right: 20, bottom: 30, left: 40 }
      const width = containerWidth - margin.left - margin.right
      const height = containerHeight - margin.top - margin.bottom
      
      this.chartSvg = d3.select(container)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
      
      // 创建比例尺
      const x = d3.scaleLinear()
        .domain([0, Math.max(1, d3.max(this.historyData.iterations))])
        .range([0, width])
      
      const y = d3.scaleLinear()
        .domain([0, Math.max(100, d3.max(this.historyData.segregationIndex) * 1.2)])
        .range([height, 0])
      
      const y2 = d3.scaleLinear()
        .domain([0, Math.max(1, d3.max(this.historyData.unsatisfiedCount) * 1.2)])
        .range([height, 0])
      
      this.chartScales = { x, y, y2 }
      
      // 添加坐标轴
      this.chartSvg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5))
      
      this.chartSvg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).ticks(5))
      
      this.chartSvg.append("g")
        .attr("class", "y2-axis")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(y2).ticks(5))
      
      // 添加坐标轴标签
      this.chartSvg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .attr("font-size", "10px")
        .text("迭代次数")
      
      this.chartSvg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-90)`)
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .attr("font-size", "10px")
        .text("隔离指数 (%)")
      
      this.chartSvg.append("text")
        .attr("class", "y2-label")
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(90)`)
        .attr("x", height / 2)
        .attr("y", -width - margin.right + 15)
        .attr("font-size", "10px")
        .text("不满意个体数")
      
      // 创建折线
      const segregationLine = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
      
      const unsatisfiedLine = d3.line()
        .x(d => x(d[0]))
        .y(d => y2(d[1]))
      
      // 添加隔离指数折线
      this.chartSvg.append("path")
        .datum(this.historyData.iterations.map((d, i) => [d, this.historyData.segregationIndex[i]]))
        .attr("class", "segregation-line")
        .attr("fill", "none")
        .attr("stroke", "#ff7675")
        .attr("stroke-width", 2)
        .attr("d", segregationLine)
      
      // 添加不满意个体数折线
      this.chartSvg.append("path")
        .datum(this.historyData.iterations.map((d, i) => [d, this.historyData.unsatisfiedCount[i]]))
        .attr("class", "unsatisfied-line")
        .attr("fill", "none")
        .attr("stroke", "#74b9ff")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("d", unsatisfiedLine)
      
      // 添加图例
      const legend = this.chartSvg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 100}, 0)`)
      
      // 隔离指数图例
      legend.append("line")
        .attr("x1", 0)
        .attr("y1", 10)
        .attr("x2", 20)
        .attr("y2", 10)
        .attr("stroke", "#ff7675")
        .attr("stroke-width", 2)
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 10)
        .attr("alignment-baseline", "middle")
        .attr("font-size", "10px")
        .text("隔离指数")
      
      // 不满意个体数图例
      legend.append("line")
        .attr("x1", 0)
        .attr("y1", 30)
        .attr("x2", 20)
        .attr("y2", 30)
        .attr("stroke", "#74b9ff")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 30)
        .attr("alignment-baseline", "middle")
        .attr("font-size", "10px")
        .text("不满意个体")
    },
    
    updateChart() {
      if (!this.chartSvg || !this.chartScales) return
      
      const { x, y, y2 } = this.chartScales
      
      // 更新X轴比例尺
      x.domain([0, Math.max(1, d3.max(this.historyData.iterations))])
      
      // 更新Y轴比例尺
      y.domain([0, Math.max(100, d3.max(this.historyData.segregationIndex) * 1.2)])
      y2.domain([0, Math.max(1, d3.max(this.historyData.unsatisfiedCount) * 1.2)])
      
      // 更新坐标轴
      this.chartSvg.select(".x-axis")
        .call(d3.axisBottom(x).ticks(5))
      
      this.chartSvg.select(".y-axis")
        .call(d3.axisLeft(y).ticks(5))
      
      this.chartSvg.select(".y2-axis")
        .call(d3.axisRight(y2).ticks(5))
      
      // 更新折线
      const segregationLine = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
      
      const unsatisfiedLine = d3.line()
        .x(d => x(d[0]))
        .y(d => y2(d[1]))
      
      this.chartSvg.select(".segregation-line")
        .datum(this.historyData.iterations.map((d, i) => [d, this.historyData.segregationIndex[i]]))
        .attr("d", segregationLine)
      
      this.chartSvg.select(".unsatisfied-line")
        .datum(this.historyData.iterations.map((d, i) => [d, this.historyData.unsatisfiedCount[i]]))
        .attr("d", unsatisfiedLine)
    },
    // 更新收敛性数据
    // 修正版本的收敛性数据更新方法
updateConvergenceData() {
    // 每10次迭代计算一次收敛率
    if (this.iterations % 10 === 0 && this.iterations > 0) {
        // 计算最近10次迭代的平均变化率
        const recentIndices = this.historyData.segregationIndex.slice(-11) // 获取最近11个值
        let changeSum = 0
        
        for (let i = 1; i < recentIndices.length; i++) {
            changeSum += Math.abs(recentIndices[i] - recentIndices[i-1])
        }
        
        const avgChange = changeSum / 10
        
        // 方案1: 基于变化率的指数衰减模型
        // 变化率越小，收敛率越高
        const convergenceRate = Math.min(100, 100 * Math.exp(-avgChange * 2))
        
        // 方案2: 基于相对变化的线性模型
        // const maxExpectedChange = 5 // 预期的最大变化率
        // const convergenceRate = Math.max(0, Math.min(100, 100 * (1 - avgChange / maxExpectedChange)))
        
        // 方案3: 基于历史趋势的收敛判断
        // if (this.convergenceData.length >= 3) {
        //     const recent3 = this.convergenceData.slice(-3).map(d => d.rate)
        //     const trend = (recent3[2] - recent3[0]) / 2 // 趋势斜率
        //     const stability = recent3.reduce((sum, val) => sum + Math.abs(val - recent3[1]), 0) / 3
        //     const convergenceRate = Math.max(0, Math.min(100, 
        //         100 * Math.exp(-avgChange * 2) * (1 - Math.abs(trend) * 0.1) * (1 - stability * 0.05)
        //     ))
        // }
        
        this.convergenceData.push({
            iteration: this.iterations,
            rate: convergenceRate,
            avgChange: avgChange // 添加调试信息
        })
        
        // 调试输出
        console.log(`迭代 ${this.iterations}: 平均变化=${avgChange.toFixed(4)}, 收敛率=${convergenceRate.toFixed(2)}%`)
    }
},

// 额外的收敛性分析方法
analyzeConvergence() {
    if (this.historyData.segregationIndex.length < 20) return null
    
    const recent20 = this.historyData.segregationIndex.slice(-20)
    
    // 计算方差（稳定性指标）
    const mean = recent20.reduce((sum, val) => sum + val, 0) / recent20.length
    const variance = recent20.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / recent20.length
    const stability = Math.max(0, 100 * Math.exp(-variance))
    
    // 计算趋势（是否仍在变化）
    const firstHalf = recent20.slice(0, 10).reduce((sum, val) => sum + val, 0) / 10
    const secondHalf = recent20.slice(10).reduce((sum, val) => sum + val, 0) / 10
    const trendStrength = Math.abs(secondHalf - firstHalf)
    const trendConvergence = Math.max(0, 100 * Math.exp(-trendStrength * 0.5))
    
    // 综合收敛评分
    const overallConvergence = (stability + trendConvergence) / 2
    
    return {
        stability: stability,
        trendConvergence: trendConvergence,
        overall: overallConvergence,
        variance: variance,
        trendStrength: trendStrength
    }
},
    
    exportData() {
      // 准备导出的数据
      const data = {
        parameters: {
          gridSize: this.gridSize,
          threshold: this.threshold,
          emptyRate: this.emptyRate
        },
        statistics: {
          iterations: this.iterations,
          segregationIndex: this.segregationIndex,
          unsatisfiedCount: this.unsatisfiedCount,
          satisfactionDistribution: this.satisfactionDistribution
        },
        historyData: this.historyData,
        convergenceData: this.convergenceData
      }
      
      // 转换为JSON字符串
      const jsonString = JSON.stringify(data, null, 2)
      
      // 创建下载链接
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `schelling_model_data_${new Date().toISOString().slice(0,10)}.json`
      document.body.appendChild(a)
      a.click()
      
      // 清理
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 0)
    },
    
    // 渲染满意度热力图
    renderSatisfactionHeatmap() {
  const container = this.$refs.satisfactionContainer
  if (!container) return
  
  d3.select(container).selectAll("*").remove()
  
  // 获取容器尺寸
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  
  // 计算边距
  const margin = { top: 40, right: 40, bottom: 60, left: 40 }
  const additionalMargin = 40 // 额外边距
  const downShift = 80// 整体下移的距离
  
  // 应用缩放因子0.8
  const scaleFactor = 0.8
  const width = (containerWidth - margin.left - margin.right - additionalMargin * 2) * scaleFactor
  const height = (containerHeight - margin.top - margin.bottom - additionalMargin * 2) * scaleFactor
  
  // 调整位置以保持居中，并整体下移
  const offsetX = (containerWidth - width - margin.left - margin.right) / 2
  const offsetY = additionalMargin / 2 + downShift // 增加下移距离
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .append("g")
    .attr("transform", `translate(${margin.left + offsetX},${margin.top + offsetY})`)
  
  // 准备热力图数据
  const heatmapData = []
  for (let i = 0; i < this.gridSize; i++) {
    for (let j = 0; j < this.gridSize; j++) {
      if (this.grid[i][j] === 0) {
        // 空单元格
        heatmapData.push({
          x: j,
          y: i,
          value: 0
        })
        continue
      }
      
      // 计算满意度
      const neighbors = this.getNeighbors(i, j)
      const sameType = neighbors.filter(n => n === this.grid[i][j]).length
      const satisfactionLevel = neighbors.length > 0 ? sameType / neighbors.length : 0
      
      heatmapData.push({
        x: j,
        y: i,
        value: satisfactionLevel
      })
    }
  }
  
  // 创建比例尺
  const x = d3.scaleLinear()
    .domain([0, this.gridSize])
    .range([0, width])
  
  const y = d3.scaleLinear()
    .domain([0, this.gridSize])
    .range([0, height])
  
  // 使用插值的热力图
  // 创建密度数据矩阵
  const resolution = 100
  const densityData = new Array(resolution)
    .fill(0)
    .map(() => new Array(resolution).fill(0))
  
  // 使用高斯核函数进行平滑插值
  const sigma = 10
  const gaussianKernel = (x, y, centerX, centerY) => {
    const dx = x - centerX
    const dy = y - centerY
    return Math.exp(-(dx*dx + dy*dy) / (2 * sigma * sigma))
  }
  
  // 填充密度数据
  for (const point of heatmapData) {
    if (point.value === 0) continue // 跳过空值
    
    const centerX = (point.x / this.gridSize) * resolution
    const centerY = (point.y / this.gridSize) * resolution
    
    // 对周围区域应用高斯核
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        densityData[j][i] += point.value * gaussianKernel(i, j, centerX, centerY)
      }
    }
  }
  
  // 归一化数据
  let max = 0
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      max = Math.max(max, densityData[j][i])
    }
  }
  
  if (max > 0) {
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        densityData[j][i] /= max
      }
    }
  }
  
  // 创建canvas元素用于渲染热力图
  const canvas = document.createElement('canvas')
  canvas.width = resolution
  canvas.height = resolution
  const context = canvas.getContext('2d')
  const imageData = context.createImageData(resolution, resolution)
  
  // 填充图像数据
  const colorScale = d3.interpolate(d3.rgb(255, 0, 0), d3.rgb(0, 255, 0))
  
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const value = densityData[j][i]
      const color = d3.color(colorScale(value))
      const index = (j * resolution + i) * 4
      
      imageData.data[index] = color.r
      imageData.data[index + 1] = color.g
      imageData.data[index + 2] = color.b
      imageData.data[index + 3] = 255 * Math.min(1, value * 1.5) // 透明度
    }
  }
  
  context.putImageData(imageData, 0, 0)
  
  // 将canvas内容转为图像
  const dataUrl = canvas.toDataURL()
  
  // 添加热力图背景
  svg.append("image")
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", dataUrl)
  
  // 添加网格线
  svg.append("g")
    .attr("class", "grid-lines")
    .selectAll("line")
    .data(d3.range(0, this.gridSize + 1))
    .enter()
    .append("line")
    .attr("x1", d => x(d))
    .attr("y1", 0)
    .attr("x2", d => x(d))
    .attr("y2", height)
    .attr("stroke", "#ddd")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.5)
  
  svg.append("g")
    .attr("class", "grid-lines")
    .selectAll("line")
    .data(d3.range(0, this.gridSize + 1))
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", d => y(d))
    .attr("x2", width)
    .attr("y2", d => y(d))
    .attr("stroke", "#ddd")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 0.5)
  
  // 添加坐标轴
  const xAxis = d3.axisBottom(x.copy().domain([1, this.gridSize]))
    .ticks(Math.min(this.gridSize, 10))
  
  const yAxis = d3.axisLeft(y.copy().domain([1, this.gridSize]))
    .ticks(Math.min(this.gridSize, 10))
  
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
  
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
  
  // 添加坐标轴标签
  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .text("X 坐标")
  
  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(-30, ${height / 2}) rotate(-90)`)
    .text("Y 坐标")
  
  // 添加图例
  const legendWidth = 200
  const legendHeight = 20
  
  const legendX = width - legendWidth - 10
  const legendY = -30
  
  const legendScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, legendWidth])
  
  const legendAxis = d3.axisBottom(legendScale)
    .ticks(5)
    .tickFormat(d => d.toFixed(1))
  
  const defs = svg.append("defs")
  
  // 创建线性渐变
  const gradient = defs.append("linearGradient")
    .attr("id", "satisfaction-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
  
  // 添加渐变颜色
  const numStops = 10
  for (let i = 0; i <= numStops; i++) {
    const offset = i / numStops
    gradient.append("stop")
      .attr("offset", `${offset * 100}%`)
      .attr("stop-color", colorScale(offset))
  }
  
  // 添加图例矩形
  svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#satisfaction-gradient)")
  
  // 添加图例轴
  svg.append("g")
    .attr("class", "legend-axis")
    .attr("transform", `translate(${legendX}, ${legendY + legendHeight})`)
    .call(legendAxis)
  
  // 添加图例标题
  svg.append("text")
    .attr("class", "legend-title")
    .attr("x", legendX + legendWidth / 2)
    .attr("y", legendY - 10)
    .attr("text-anchor", "middle")
    .text("满意度")
},

    
    // 更新满意度热力图
    updateSatisfactionHeatmap() {
      if (this.activeView === 'satisfaction') {
        this.renderSatisfactionHeatmap()
      }
    },
    
    // 渲染移动轨迹图
    
    
    // 渲染仪表盘
    renderGauge() {
  const container = this.$refs.gaugeContainer
  if (!container) return
  
  d3.select(container).selectAll("*").remove()
  
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight // 使用容器实际高度
  
  const margin = { top: 20, right: 20, bottom: 40, left: 20 } // 增加边距
  const width = containerWidth - margin.left - margin.right
  const height = containerHeight - margin.top - margin.bottom
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .append("g")
    .attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height * 0.45})`) // 调整垂直位置
  
  const radius = Math.min(width, height * 0.8) / 2 // 减小半径以适应容器
  
  // 创建仪表盘比例尺
  const scale = d3.scaleLinear()
    .domain([0, 100])
    .range([-Math.PI / 2, Math.PI / 2])
  
  // 创建弧形生成器
  const arc = d3.arc()
    .innerRadius(radius - Math.max(20, radius * 0.3)) // 动态计算内半径
    .outerRadius(radius)
    .startAngle(-Math.PI / 2)
  
  // 添加背景弧形
  const backgroundArc = svg.append("path")
    .datum({ endAngle: Math.PI / 2 })
    .attr("class", "gauge-background")
    .attr("d", arc)
    .attr("fill", "#ecf0f1")
  
  // 创建渐变
  const defs = svg.append("defs")
  const gradient = defs.append("linearGradient")
    .attr("id", "gauge-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
  
  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#2ecc71") // 绿色代表低隔离
  
  gradient.append("stop")
    .attr("offset", "30%")
    .attr("stop-color", "#f1c40f") // 黄色代表中等隔离
  
  gradient.append("stop")
    .attr("offset", "70%")
    .attr("stop-color", "#e67e22") // 橙色代表高隔离
  
  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#e74c3c") // 红色代表极高隔离
  
  // 添加前景弧形
  const foregroundArc = svg.append("path")
    .datum({ endAngle: scale(parseFloat(this.segregationIndex)) })
    .attr("class", "gauge-foreground")
    .attr("d", arc)
    .attr("fill", "url(#gauge-gradient)")
  
  // 添加刻度
  const ticks = [0, 20, 40, 60, 80, 100]
  const innerRadius = radius - Math.max(20, radius * 0.3)
  
  svg.selectAll(".gauge-tick")
    .data(ticks)
    .enter()
    .append("line")
    .attr("class", "gauge-tick")
    .attr("x1", d => innerRadius * Math.cos(scale(d)))
    .attr("y1", d => innerRadius * Math.sin(scale(d)))
    .attr("x2", d => (innerRadius - 10) * Math.cos(scale(d))) // 向内延伸
    .attr("y2", d => (innerRadius - 10) * Math.sin(scale(d)))
    .attr("stroke", "#7f8c8d")
    .attr("stroke-width", 2)
  
  // 动态计算文字大小
  const fontSize = Math.max(10, Math.min(14, radius / 8))
  const tickTextRadius = radius + Math.max(12, radius * 0.15)
  
  svg.selectAll(".gauge-tick-text")
    .data(ticks)
    .enter()
    .append("text")
    .attr("class", "gauge-tick-text")
    .attr("x", d => tickTextRadius * Math.cos(scale(d)))
    .attr("y", d => tickTextRadius * Math.sin(scale(d)) + fontSize/3) // 调整垂直对齐
    .attr("text-anchor", "middle")
    .attr("font-size", `${fontSize}px`)
    .attr("fill", "#34495e")
    .text(d => d)
  
  // 添加指针
  const pointerLength = radius - Math.max(5, radius * 0.1)
  const pointer = svg.append("line")
    .attr("class", "gauge-pointer")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -pointerLength)
    .attr("stroke", "#e74c3c")
    .attr("stroke-width", Math.max(2, radius / 30))
    .attr("stroke-linecap", "round")
    .attr("transform", `rotate(${scale(parseFloat(this.segregationIndex)) * 180 / Math.PI})`)
  
  // 添加指针圆心
  const centerRadius = Math.max(3, radius / 15)
  svg.append("circle")
    .attr("class", "gauge-center")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", centerRadius)
    .attr("fill", "#e74c3c")
  
  // 动态计算主值文字大小和位置
  const valueFontSize = Math.max(16, Math.min(32, radius / 4))
  const valueY = Math.max(30, radius / 3)
  
  // 添加当前值文本
  svg.append("text")
    .attr("class", "gauge-value")
    .attr("x", 0)
    .attr("y", valueY)
    .attr("text-anchor", "middle")
    .attr("font-size", `${valueFontSize}px`)
    .attr("font-weight", "bold")
    .attr("fill", "#2c3e50")
    .text(`${this.segregationIndex}%`)
  
  // 动态计算标题文字大小和位置
  const titleFontSize = Math.max(12, Math.min(18, radius / 6))
  const titleY = -Math.max(10, radius / 6)
  
  // 添加标题
  svg.append("text")
    .attr("class", "gauge-title")
    .attr("x", 0)
    .attr("y", titleY)
    .attr("text-anchor", "middle")
    .attr("font-size", `${titleFontSize}px`)
    .attr("font-weight", "600")
    .attr("fill", "#34495e")
    .text("隔离指数")
  
  // 添加单位说明
  const unitFontSize = Math.max(10, Math.min(14, radius / 8))
  svg.append("text")
    .attr("class", "gauge-unit")
    .attr("x", 0)
    .attr("y", valueY + valueFontSize + 5)
    .attr("text-anchor", "middle")
    .attr("font-size", `${unitFontSize}px`)
    .attr("fill", "#7f8c8d")
    .text("Segregation Index")
},

// 更新仪表盘
updateGauge() {
  const container = this.$refs.gaugeContainer
  if (!container) return
  
  const svg = d3.select(container).select("svg").select("g")
  if (svg.empty()) {
    // 如果SVG不存在，重新渲染
    this.renderGauge()
    return
  }
  
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  
  const margin = { top: 20, right: 20, bottom: 40, left: 20 }
  const width = containerWidth - margin.left - margin.right
  const height = containerHeight - margin.top - margin.bottom
  
  const radius = Math.min(width, height * 0.8) / 2
  
  // 创建仪表盘比例尺
  const scale = d3.scaleLinear()
    .domain([0, 100])
    .range([-Math.PI / 2, Math.PI / 2])
  
  // 更新弧形
  const arc = d3.arc()
    .innerRadius(radius - Math.max(20, radius * 0.3))
    .outerRadius(radius)
    .startAngle(-Math.PI / 2)
  
  // 更新前景弧形 - 添加过渡动画
  svg.select(".gauge-foreground")
    .datum({ endAngle: scale(parseFloat(this.segregationIndex)) })
    .transition()
    .duration(500)
    .attrTween("d", function(d) {
      const interpolate = d3.interpolate(this._current || { endAngle: -Math.PI / 2 }, d)
      this._current = interpolate(0)
      return function(t) {
        return arc(interpolate(t))
      }
    })
  
  // 更新指针 - 添加过渡动画
  svg.select(".gauge-pointer")
    .transition()
    .duration(500)
    .attr("transform", `rotate(${scale(parseFloat(this.segregationIndex)) * 180 / Math.PI})`)
  
  // 更新当前值文本 - 添加数字动画
  const valueElement = svg.select(".gauge-value")
  const currentValue = parseFloat(valueElement.text()) || 0
  const newValue = parseFloat(this.segregationIndex)
  
  valueElement
    .transition()
    .duration(500)
    .tween("text", function() {
      const interpolate = d3.interpolate(currentValue, newValue)
      return function(t) {
        this.textContent = `${interpolate(t).toFixed(1)}%`
      }
    })
},
    // 渲染饼图
    renderPieChart() {
      const container = this.$refs.pieContainer
      if (!container) return
      
      d3.select(container).selectAll("*").remove()
      
      const containerWidth = container.clientWidth
      const containerHeight = 180
      
      const margin = { top: 10, right: 10, bottom: 10, left: 10 }
      const width = containerWidth - margin.left - margin.right
      const height = containerHeight - margin.top - margin.bottom
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`)
      
      const radius = Math.min(width, height) / 2
      
      // 准备数据
      const satisfiedType1 = this.satisfactionDistribution.satisfied.type1
      const unsatisfiedType1 = this.satisfactionDistribution.unsatisfied.type1
      const satisfiedType2 = this.satisfactionDistribution.satisfied.type2
      const unsatisfiedType2 = this.satisfactionDistribution.unsatisfied.type2
      
      const data = [
        { name: "类型1满意", value: satisfiedType1, color: "#ff7675" },
        { name: "类型1不满意", value: unsatisfiedType1, color: "#fab1a0" },
        { name: "类型2满意", value: satisfiedType2, color: "#74b9ff" },
        { name: "类型2不满意", value: unsatisfiedType2, color: "#a0d2f3" }
      ].filter(d => d.value > 0)
      
      // 创建饼图生成器
      const pie = d3.pie()
        .value(d => d.value)
        .sort(null)
      
      // 创建弧形生成器
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      
      // 绘制饼图
      const arcs = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
      
      arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => d.data.color)
      
      // 添加标签
      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
                .attr("font-size", "12px")
        .attr("fill", "#fff")
        .text(d => d.data.value > 0 ? `${Math.round(d.data.value / d3.sum(data, d => d.value) * 100)}%` : "")
      
      // 添加图例
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${radius + 20}, -${radius / 2})`)
      
      const legendItems = legend.selectAll(".legend-item")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`)
      
      legendItems.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", d => d.color)
      
      legendItems.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .attr("font-size", "10px")
        .text(d => d.name)
    },
    
    // 更新饼图
    updatePieChart() {
      const container = this.$refs.pieContainer
      if (!container) return
      
      // 重新渲染饼图
      this.renderPieChart()
    },
    
    // 渲染收敛性图表
    renderConvergenceChart() {
      const container = this.$refs.convergenceContainer
      if (!container) return
      
      d3.select(container).selectAll("*").remove()
      
      const containerWidth = container.clientWidth
      const containerHeight = 180
      
      const margin = { top: 20, right: 20, bottom: 40, left: 40 }
      const width = containerWidth - margin.left - margin.right
      const height = containerHeight - margin.top - margin.bottom
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
      
      // 如果没有数据，显示提示信息
      if (this.convergenceData.length === 0) {
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .text("运行模拟以查看收敛性分析")
        return
      }
      
      // 创建比例尺
      const x = d3.scaleLinear()
        .domain([0, d3.max(this.convergenceData, d => d.iteration)])
        .range([0, width])
      
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])
      
      // 创建线条生成器
      const line = d3.line()
        .x(d => x(d.iteration))
        .y(d => y(d.rate))
        .curve(d3.curveMonotoneX)
      
      // 添加坐标轴
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5))
      
      svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).ticks(5))
      
      // 添加坐标轴标签
      svg.append("text")
        .attr("class", "x-label")
        .attr("x", width / 2)
        .attr("y", height + 30)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text("迭代次数")
      
      svg.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .text("收敛率 (%)")
      
      // 添加参考线
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(90))
        .attr("x2", width)
        .attr("y2", y(90))
        .attr("stroke", "#e74c3c")
        .attr("stroke-dasharray", "3,3")
        .attr("stroke-width", 1)
      
      svg.append("text")
        .attr("x", 5)
        .attr("y", y(90) - 5)
        .attr("font-size", "10px")
        .attr("fill", "#e74c3c")
        .text("90% 收敛")
      
      // 绘制线条
      svg.append("path")
        .datum(this.convergenceData)
        .attr("class", "convergence-line")
        .attr("fill", "none")
        .attr("stroke", "#3498db")
        .attr("stroke-width", 2)
        .attr("d", line)
      
      // 添加数据点
      svg.selectAll(".convergence-point")
        .data(this.convergenceData)
        .enter()
        .append("circle")
        .attr("class", "convergence-point")
        .attr("cx", d => x(d.iteration))
        .attr("cy", d => y(d.rate))
        .attr("r", 3)
        .attr("fill", "#3498db")
    },
    
    // 更新收敛性图表
    updateConvergenceChart() {
      // 重新渲染收敛性图表
      this.renderConvergenceChart()
    }
  }
}
</script>
<style scoped>
.schelling-model {
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-card {
  margin-bottom: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  margin: 0;
  color: #2c3e50;
}

.header p {
  margin: 0.5rem 0 0;
  color: #7f8c8d;
}

.grid-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-flex-container {
  height: calc(100vh - 12.5rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-card {
  height: calc(100vh - 9.375rem);
}

.grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-header h3 {
  margin: 0;
}

.color-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-box {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.125rem;
}

.grid-tabs :deep(.el-tabs__content) {
  overflow: visible;
  height: calc(100vh - 12.5rem);
}

/* 仪表盘对话框样式 */
.dashboard-dialog :deep(.el-dialog__body) {
  padding: 2rem;
}

.dashboard-card {
  height: 22rem; /* 统一所有仪表卡片高度 */
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h3 {
  margin: 0;
  font-size: 1rem;
}

.gauge-container, .pie-container, .convergence-container {
  width: 100%;
  height: 18rem; /* 统一所有仪表容器高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.large-chart-container {
  width: 100%;
  height: 12.5rem;
}

/* 主要布局容器 - 针对左右分栏布局 */
.main-layout-container {
  display: flex;
  gap: 1.5rem;
  height: calc(100vh - 8rem);
}

/* 左侧参数面板 - 扩大宽度 */
.left-panel {
  flex: 0 0 25rem; /* 固定宽度400px，确保参数完全显示 */
  min-width: 25rem;
  max-width: 28rem;
}

/* 右侧内容区域 */
.right-panel {
  flex: 1;
  min-width: 0; /* 确保flex项目可以缩小 */
}

/* 添加动画效果 */
.gauge-pointer {
  transition: transform 0.5s ease-out;
}

.gauge-foreground {
  transition: d 0.5s ease-out;
}

.gauge-value {
  transition: all 0.5s ease-out;
}

/* 超大屏幕优化 */
@media (min-width: 100rem) { /* 1600px+ */
  .schelling-model {
    padding: 3rem;
  }
  
  .left-panel {
    flex: 0 0 30rem; /* 更大屏幕可以给更多空间 */
    min-width: 30rem;
    max-width: 35rem;
  }
  
  .dashboard-card {
    height: 24rem;
  }
  
  .gauge-container, .pie-container, .convergence-container {
    height: 20rem;
  }
  
  .large-chart-container {
    height: 15rem;
  }
}

/* 大屏幕 (1200px+) */
@media (max-width: 75rem) and (min-width: 64rem) { /* 1200px - 1024px */
  .schelling-model {
    padding: 1.5rem;
  }
  
  .main-layout-container {
    gap: 1.25rem;
  }
  
  .left-panel {
    flex: 0 0 24rem; /* 1200px屏幕保持较大宽度 */
    min-width: 24rem;
    max-width: 26rem;
  }
  
  .dashboard-card {
    height: 20rem;
  }
  
  .gauge-container, .pie-container, .convergence-container {
    height: 16rem;
  }
  
  .large-chart-container {
    height: 11rem;
  }
}

/* 1K分辨率优化 (1024px) */
@media (max-width: 64rem) and (min-width: 58rem) { /* 1024px - 928px */
  .schelling-model {
    padding: 1.25rem;
  }
  
  .main-layout-container {
    gap: 1rem;
    height: calc(100vh - 7rem);
  }
  
  .left-panel {
    flex: 0 0 22rem; /* 1K屏幕确保参数面板足够宽 */
    min-width: 22rem;
    max-width: 24rem;
  }
  
  .dashboard-card {
    height: 19rem;
  }
  
  .gauge-container, .pie-container, .convergence-container {
    height: 15rem;
  }
  
  .large-chart-container {
    height: 10.5rem;
  }
}

/* 中等屏幕 (992px) */
@media (max-width: 58rem) and (min-width: 48rem) { /* 928px - 768px */
  .schelling-model {
    padding: 1rem;
  }
  
  .main-layout-container {
    gap: 0.75rem;
    height: calc(100vh - 6rem);
  }
  
  .left-panel {
    flex: 0 0 20rem; /* 中等屏幕适当减少但保持足够宽度 */
    min-width: 20rem;
    max-width: 22rem;
  }
  
  .main-card {
    margin-bottom: 1.5rem;
  }
  
  .dashboard-card {
    height: 18rem;
  }
  
  .gauge-container, .pie-container, .convergence-container {
    height: 14rem;
  }
  
  .large-chart-container {
    height: 10rem;
  }
  
  .color-legend {
    gap: 0.75rem;
  }
  
  .legend-item {
    gap: 0.375rem;
  }
}

/* 平板竖屏 (768px) */
@media (max-width: 48rem) { /* 768px */
  .schelling-model {
    padding: 0.75rem;
  }
  
  /* 在平板上改为垂直布局 */
  .main-layout-container {
    flex-direction: column;
    gap: 1rem;
    height: auto;
  }
  
  .left-panel {
    flex: none;
    width: 100%;
    min-width: auto;
    max-width: none;
  }
  
  .right-panel {
    flex: none;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .grid-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .color-legend {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .dashboard-card {
    height: 15rem;
  }
  
  .gauge-container, .pie-container, .convergence-container {
    height: 12rem;
  }
  
  .large-chart-container {
    height: 9rem;
  }
  
  .grid-flex-container {
    height: calc(100vh - 15rem);
  }
  
  .grid-card {
    height: calc(100vh - 12rem);
  }
}

/* 手机横屏/小平板 (576px) */
@media (max-width: 36rem) { /* 576px */
  .schelling-model {
    padding: 0.5rem;
  }
  
  .main-card {
    margin-bottom: 1rem;
  }
  
  .main-layout-container {
    gap: 0.75rem;
  }
  
  .dashboard-card {
    height: 13rem;
  }
  
  .gauge-container, .pie-container, .convergence-container {
    height: 10rem;
  }
  
  .large-chart-container {
    height: 8rem;
  }
  
  .dashboard-header h3 {
    font-size: 0.875rem;
  }
  
  .color-box {
    width: 0.625rem;
    height: 0.625rem;
  }
  
  .grid-flex-container {
    height: calc(100vh - 18rem);
  }
  
  .grid-card {
    height: calc(100vh - 15rem);
  }
}

/* 小手机 (384px) */
@media (max-width: 24rem) { /* 384px */
  .schelling-model {
    padding: 0.25rem;
  }
  
  .main-layout-container {
    gap: 0.5rem;
  }
  
  .dashboard-card {
    height: 12rem;
  }
  
  .gauge-container, .pie-container, .convergence-container {
    height: 9rem;
  }
  
  .large-chart-container {
    height: 7rem;
  }
  
  .color-legend {
    gap: 0.25rem;
  }
  
  .legend-item {
    gap: 0.25rem;
    font-size: 0.875rem;
  }
}

/* 参数面板内部优化 */
.parameter-panel {
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
}

.parameter-section {
  margin-bottom: 1.5rem;
}

.parameter-section:last-child {
  margin-bottom: 0;
}

.parameter-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e1e8ed;
}

.parameter-item {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.parameter-label {
  font-weight: 500;
  color: #34495e;
  font-size: 0.95rem;
}

.parameter-description {
  font-size: 0.85rem;
  color: #7f8c8d;
  line-height: 1.4;
}

/* 控制按钮组优化 */
.control-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e1e8ed;
}

.control-row {
  display: flex;
  gap: 0.5rem;
}

.control-row .el-button {
  flex: 1;
}

/* 高亮动画 */
@keyframes pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

.cell:hover rect {
  stroke: #34495e;
  stroke-width: 0.125rem;
}

/* 介绍弹窗样式 */
.intro-content h3 {
  color: #2c3e50;
  margin-top: 1.25rem;
  margin-bottom: 0.625rem;
}

.intro-content p {
  color: #34495e;
  line-height: 1.6;
}

.intro-content ul {
  padding-left: 1.25rem;
}

.intro-content li {
  margin-bottom: 0.5rem;
  color: #34495e;
  line-height: 1.6;
}

/* 确保在1K分辨率下滚动条样式优化 */
.parameter-panel::-webkit-scrollbar {
  width: 6px;
}

.parameter-panel::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 3px;
}

.parameter-panel::-webkit-scrollbar-thumb {
  background: #c1c8cd;
  border-radius: 3px;
}

.parameter-panel::-webkit-scrollbar-thumb:hover {
  background: #a8b2b9;
}
</style>