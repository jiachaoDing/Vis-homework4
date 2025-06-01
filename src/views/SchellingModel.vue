<template>
  <div class="schelling-model">
    <!-- 添加介绍弹窗 -->
    <el-dialog
      v-model="showIntroDialog"
      title="谢林模型介绍                 "
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
        
        <h3>隔离指数计算</h3>
        <p>隔离指数是衡量空间隔离程度的重要指标，计算方法如下：</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3498db;">
          <p><strong>计算步骤：</strong></p>
          <ol style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
            <li>对于网格中的每个个体，统计其8个邻居位置（上下左右及四个对角）</li>
            <li>计算该个体周围<strong>相同类型邻居的比例</strong> = 相同类型邻居数量 ÷ 总邻居数量</li>
            <li>将所有个体的相同类型邻居比例相加</li>
            <li>除以总个体数量，再乘以100%得到最终隔离指数</li>
          </ol>
          <p><strong>数学公式：</strong></p>
          <div style="text-align: center; font-family: 'Courier New', monospace; background: white; padding: 12px; border-radius: 4px; margin: 10px 0; border: 1px solid #e1e8ed;">
            隔离指数 = (∑(个体i的相同类型邻居比例) ÷ 总个体数) × 100%
          </div>
          <p><strong>指数含义：</strong></p>
          <ul style="margin: 8px 0; line-height: 1.5;">
            <li><span style="color: #27ae60; font-weight: bold;">▪ 0-30%</span>：低度隔离，两种类型混合居住</li>
            <li><span style="color: #f39c12; font-weight: bold;">▪ 30-60%</span>：中度隔离，出现一定程度聚集</li>
            <li><span style="color: #e67e22; font-weight: bold;">▪ 60-80%</span>：高度隔离，明显的空间分离</li>
            <li><span style="color: #e74c3c; font-weight: bold;">▪ 80-100%</span>：极高隔离，几乎完全分离</li>
          </ul>
        </div>
        
        <h3>模型参数</h3>
        <ul>
          <li><strong>网格大小</strong>：模拟区域的大小</li>
          <li><strong>满意阈值</strong>：个体希望周围相同类型邻居的最低比例</li>
          <li><strong>空置率</strong>：网格中空置单元格的比例</li>
          <li><strong>类型1比例</strong>：在非空位置中类型1个体所占的比例，剩余位置由类型2填充</li>
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
            <p class="developer-signature">开发者：贾书凡</p>
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
            <el-button @click="saveCurrentState">
              <el-icon><FolderOpened /></el-icon> 保存状态
            </el-button>
            <el-button @click="clearPersistedData" type="warning">
              <el-icon><Delete /></el-icon> 清除缓存
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
              <el-form-item label="类型1比例">
                <el-slider 
                  v-model="type1Ratio" 
                  :min="0.1" 
                  :max="0.9" 
                  :step="0.1" 
                  :format-tooltip="formatType1RatioTooltip"
                  show-input />
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
              <el-descriptions-item label="类型1比例">{{ actualType1Ratio }}%</el-descriptions-item>
              <el-descriptions-item label="类型2比例">{{ actualType2Ratio }}%</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        
        <!-- 右侧网格可视化 - 从span="20"调整为span="17" -->
        <el-col :span="15">
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
import { Refresh, VideoPlay, VideoPause, Download, InfoFilled, DataAnalysis, FolderOpened, Delete } from '@element-plus/icons-vue'

export default {
  name: 'SchellingModel',
  components: {
    Refresh,
    VideoPlay,
    VideoPause,
    Download,
    InfoFilled,
    DataAnalysis,
    FolderOpened,
    Delete
  },
  data() {
    return {
      showIntroDialog: false, // 设置为true以在页面加载时自动显示
      showDashboardDialog: false, // 添加仪表盘对话框控制变量
      gridSize: 20,
      threshold: 0.3,
      emptyRate: 0.2,
      type1Ratio: 0.5, // 类型1的比例，剩余的非空位置由类型2填充
      simulationSpeed: 5,
      grid: [],
      iterations: 0,
      segregationIndex: 0,
      unsatisfiedCount: 0,
      actualType1Ratio: 0, // 实际类型1比例
      actualType2Ratio: 0, // 实际类型2比例
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
      },
      currentCellSize: 0 // 存储当前单元格尺寸
    }
  },
  mounted() {
    // this.showIntroDialog = true; // 确保对话框显示 - 已禁用自动显示
    
    // 尝试恢复之前保存的数据
    this.restorePersistedData()
    
    // 如果没有恢复到数据，则初始化新的网格
    if (!this.hasValidData()) {
      this.initializeGrid()
    }
    
    // 添加窗口大小变化监听，以便重新渲染网格
    window.addEventListener('resize', this.handleResize)
    
    // 添加页面离开前的数据保存
    window.addEventListener('beforeunload', this.persistData)
  },
  beforeUnmount() {
    // 保存数据到本地存储
    this.persistData()
    
    // 清理事件监听器
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('beforeunload', this.persistData)
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
    
    formatType1RatioTooltip(val) {
      return `${(val * 100).toFixed(0)}%`
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
          } else {
            // 在剩余的非空位置中按type1Ratio比例分配类型
            const remainingRate = 1 - this.emptyRate
            const type1Threshold = this.emptyRate + remainingRate * this.type1Ratio
            if (rand < type1Threshold) {
              this.grid[i][j] = 1 // 类型1
            } else {
              this.grid[i][j] = 2 // 类型2
            }
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
      
      // 保存新的初始状态
      this.persistData()
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
      
      // 模拟停止时保存当前状态
      this.persistData()
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
      
      // 检查是否所有个体都满意了（在统计数据更新后检查）
      if (this.unsatisfiedCount === 0) {
        // 停止自动模拟
        if (this.isSimulating) {
          this.stopSimulation()
        }
        
        // 延迟弹出对话框，确保界面更新完成
        setTimeout(() => {
          this.$confirm(
            `模拟已完成！所有个体都已满意。\n\n最终统计数据：\n- 总迭代次数：${this.iterations}\n- 隔离指数：${this.segregationIndex}%\n- `,
            '模拟结束',
            {
              confirmButtonText: '查看详细报告',
              cancelButtonText: '关闭',
              type: 'success',
              showCancelButton: true
            }
          ).then(() => {
            // 用户点击查看详细报告，打开仪表盘
            this.showDashboardDialog = true
          }).catch(() => {
            // 用户点击关闭，不做任何操作
          })
        }, 100)
      }
      
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
      
      // 定期保存数据（每10次迭代保存一次，避免频繁保存影响性能）
      if (this.iterations % 10 === 0) {
        this.persistData()
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
      let type1Count = 0
      let type2Count = 0
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
            
            // 统计类型数量
            if (this.grid[i][j] === 1) {
              type1Count++
              if (isSatisfied) {
                this.satisfactionDistribution.satisfied.type1++
              } else {
                this.satisfactionDistribution.unsatisfied.type1++
              }
            } else {
              type2Count++
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
      
      // 计算实际类型比例
      this.actualType1Ratio = totalAgents > 0 ? ((type1Count / totalAgents) * 100).toFixed(1) : 0
      this.actualType2Ratio = totalAgents > 0 ? ((type2Count / totalAgents) * 100).toFixed(1) : 0
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
  
  // 获取容器尺寸并添加安全检查
  const containerWidth = Math.min(container.clientWidth, 1000) // 增大最大宽度限制
  const containerHeight = Math.min(container.clientHeight, 700) // 增大最大高度限制
  
  // 确保容器有有效尺寸
  if (containerWidth < 100 || containerHeight < 100) {
    console.warn('容器尺寸过小，跳过渲染')
    return
  }
  
  // 减少边距，确保网格能完整显示
  const margin = 20 // 减少边距释放更多空间
  const availableWidth = containerWidth - margin * 2
  const availableHeight = containerHeight - margin * 2
  
  // 计算单元格大小，确保网格能完整显示，使用更大的缩放因子
  const cellSize = Math.min(
    Math.floor(availableWidth / this.gridSize),
    Math.floor(availableHeight / this.gridSize),
    35 // 增大最大单元格尺寸
  ) * 0.95 // 使用更大的缩放因子
  
  // 确保单元格尺寸有效
  if (cellSize < 3) {
    console.warn('计算出的单元格尺寸过小，跳过渲染')
    return
  }
  
  const width = cellSize * this.gridSize
  const height = cellSize * this.gridSize
  
  // 居中放置网格，确保不超出容器边界
  const offsetX = Math.max(margin, (containerWidth - width) / 2)
  const offsetY = Math.max(margin, (containerHeight - height) / 2)
  
  const svg = d3.select(container)
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .style("border", "1px solid #ddd") // 添加边框便于调试
    .append("g")
    .attr("transform", `translate(${offsetX}, ${offsetY})`)
  
  // 添加网格背景
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#f0f0f0")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1)
  
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
  if (cellSize >= 5) { // 降低网格线显示阈值
    for (let i = 0; i <= this.gridSize; i++) {
      // 垂直线
      svg.append("line")
        .attr("x1", i * cellSize)
        .attr("y1", 0)
        .attr("x2", i * cellSize)
        .attr("y2", height)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 0.5)
      
      // 水平线
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", i * cellSize)
        .attr("x2", width)
        .attr("y2", i * cellSize)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 0.5)
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
    .attr("width", cellSize - 0.5) // 略小于cellSize，创建间隙
    .attr("height", cellSize - 0.5)
    .attr("fill", d => getColor(
      d.value, 
      d.isSatisfied, 
      this.movingAgents.has(`${d.y}-${d.x}`)
    ))
    .attr("stroke", "none")
    .attr("rx", Math.min(3, cellSize / 6)) // 增大圆角
    .attr("ry", Math.min(3, cellSize / 6))
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
  
  // 添加文字标签，降低显示阈值
  if (cellSize >= 8) { // 降低文字显示阈值
    this.cells.filter(d => d.value !== 0)
      .append("text")
      .attr("x", cellSize / 2)
      .attr("y", cellSize / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", `${Math.max(cellSize / 3.5, 9)}px`) // 使用更大的字体比例
      .attr("fill", "#fff")
      .attr("font-weight", "bold") // 加粗文字，提高可读性
      .text(d => d.value)
  }
  
  // 存储当前的cellSize供updateVisualization使用
  this.currentCellSize = cellSize
},

    updateVisualization() {
  if (!this.cells || !this.currentCellSize) return
  
  const cellSize = this.currentCellSize // 使用存储的cellSize

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

  // 更新单元格数据
  const cellData = this.grid.flat().map((d, i) => ({
    value: d,
    x: i % this.gridSize,
    y: Math.floor(i / this.gridSize),
    isSatisfied: d !== 0 ? this.isSatisfied(Math.floor(i / this.gridSize), i % this.gridSize) : true
  }))

  // 更新单元格颜色
  this.cells
    .data(cellData)
    .select("rect")
    .attr("fill", d => getColor(
      d.value, 
      d.isSatisfied, 
      this.movingAgents.has(`${d.y}-${d.x}`)
    ))

  // 移除所有现有的文字标签
  this.cells.selectAll("text").remove()

  // 重新添加文字标签，仅当单元格足够大时显示
  if (cellSize >= 8) { // 降低文字显示阈值
    this.cells
      .data(cellData)
      .filter(d => d.value !== 0)
      .append("text")
      .attr("x", cellSize / 2)
      .attr("y", cellSize / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", `${Math.max(cellSize / 3.5, 9)}px`) // 使用更大的字体比例
      .attr("fill", "#fff")
      .attr("font-weight", "bold") // 加粗文字，提高可读性
      .text(d => d.value)
  }
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
    // 全新的收敛性分析算法
updateConvergenceData() {
    // 确保有足够的历史数据进行分析
    if (this.historyData.segregationIndex.length < 5) return
    
    const indices = this.historyData.segregationIndex
    const iterations = this.historyData.iterations
    const currentIndex = parseFloat(this.segregationIndex)
    const currentIteration = this.iterations
    
    // 1. 计算短期和长期变化率
    const shortTermWindow = Math.min(5, indices.length - 1) // 最近5次迭代
    const longTermWindow = Math.min(15, indices.length - 1) // 最近15次迭代
    
    // 短期变化率（最近5次）
    const shortTermIndices = indices.slice(-shortTermWindow - 1)
    const shortTermVariance = this.calculateVariance(shortTermIndices)
    const shortTermSlope = this.calculateSlope(shortTermIndices)
    
    // 长期变化率（最近15次）
    const longTermIndices = indices.slice(-longTermWindow - 1)
    const longTermVariance = this.calculateVariance(longTermIndices)
    const longTermSlope = this.calculateSlope(longTermIndices)
    
    // 2. 计算收敛速度 (基于指数衰减模型)
    const recentChanges = []
    for (let i = Math.max(1, indices.length - 10); i < indices.length; i++) {
        recentChanges.push(Math.abs(indices[i] - indices[i-1]))
    }
    
    const avgChangeRate = recentChanges.reduce((sum, val) => sum + val, 0) / recentChanges.length
    const maxChangeRate = Math.max(...recentChanges)
    
    // 3. 收敛速度计算 (越小越接近收敛)
    const convergenceSpeed = Math.exp(-avgChangeRate * 5) * 100 // 指数衰减模型
    
    // 4. 稳定性评估
    const stabilityScore = this.calculateStabilityScore(shortTermVariance, longTermVariance, shortTermSlope)
    
    // 5. 收敛质量评估 (考虑趋势一致性)
    const trendConsistency = this.calculateTrendConsistency(indices.slice(-10))
    
    // 6. 综合收敛评分
    const convergenceScore = (convergenceSpeed * 0.4 + stabilityScore * 0.4 + trendConsistency * 0.2)
    
    // 7. 收敛状态判断
    let convergenceStatus = 'diverging'
    if (convergenceScore > 90 && avgChangeRate < 0.01) {
        convergenceStatus = 'converged'
    } else if (convergenceScore > 70 && avgChangeRate < 0.1) {
        convergenceStatus = 'converging'
    } else if (convergenceScore > 40) {
        convergenceStatus = 'oscillating'
    }
    
    // 8. 预测最终收敛值
    const predictedFinalValue = this.predictFinalConvergenceValue(indices)
    
    // 9. 存储收敛数据
    this.convergenceData.push({
        iteration: currentIteration,
        segregationIndex: currentIndex,
        convergenceSpeed: Math.round(convergenceSpeed * 100) / 100,
        stabilityScore: Math.round(stabilityScore * 100) / 100,
        trendConsistency: Math.round(trendConsistency * 100) / 100,
        overallScore: Math.round(convergenceScore * 100) / 100,
        avgChangeRate: avgChangeRate,
        maxChangeRate: maxChangeRate,
        shortTermSlope: shortTermSlope,
        longTermSlope: longTermSlope,
        status: convergenceStatus,
        predictedFinal: predictedFinalValue,
        // 新增平滑曲线数据
        smoothedIndex: this.calculateSmoothedValue(indices),
        residual: currentIndex - this.calculateSmoothedValue(indices) // 残差
    })
    
    // 10. 详细调试输出
    console.log(`🔄 收敛分析 [迭代 ${currentIteration}]:`, {
        当前隔离指数: currentIndex.toFixed(3),
        平均变化率: avgChangeRate.toFixed(6),
        收敛速度: convergenceSpeed.toFixed(2) + '%',
        稳定性得分: stabilityScore.toFixed(2),
        趋势一致性: trendConsistency.toFixed(2),
        综合评分: convergenceScore.toFixed(2),
        收敛状态: convergenceStatus,
        预测最终值: predictedFinalValue.toFixed(3),
        短期斜率: shortTermSlope.toFixed(6),
        长期斜率: longTermSlope.toFixed(6)
    })
    
    // 11. 收敛完成判断
    if (convergenceStatus === 'converged' && this.convergenceData.length >= 3) {
        const lastThreeStatuses = this.convergenceData.slice(-3).map(d => d.status)
        if (lastThreeStatuses.every(status => status === 'converged')) {
            console.log('🎯 系统已达到稳定收敛状态!')
            // 可以选择在这里停止模拟或发出通知
        }
    }
},

// 辅助函数：计算方差
calculateVariance(values) {
    if (values.length < 2) return 0
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2))
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length
},

// 辅助函数：计算斜率 (线性回归)
calculateSlope(values) {
    if (values.length < 2) return 0
    const n = values.length
    const x = Array.from({length: n}, (_, i) => i)
    const y = values
    
    const sumX = x.reduce((sum, val) => sum + val, 0)
    const sumY = y.reduce((sum, val) => sum + val, 0)
    const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0)
    const sumXX = x.reduce((sum, val) => sum + val * val, 0)
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    return isNaN(slope) ? 0 : slope
},

// 辅助函数：计算稳定性得分
calculateStabilityScore(shortTermVar, longTermVar, slope) {
    // 方差越小越稳定，斜率越接近0越稳定
    const varianceStability = Math.exp(-shortTermVar * 10) * 50
    const slopeStability = Math.exp(-Math.abs(slope) * 100) * 50
    return Math.min(100, varianceStability + slopeStability)
},

// 辅助函数：计算趋势一致性
calculateTrendConsistency(values) {
    if (values.length < 3) return 50
    
    let consistentTrends = 0
    let totalTrends = 0
    
    for (let i = 2; i < values.length; i++) {
        const trend1 = values[i-1] - values[i-2] // 前一个趋势
        const trend2 = values[i] - values[i-1]   // 当前趋势
        
        // 判断趋势是否一致（同向）
        if ((trend1 > 0 && trend2 > 0) || (trend1 < 0 && trend2 < 0) || (Math.abs(trend1) < 0.01 && Math.abs(trend2) < 0.01)) {
            consistentTrends++
        }
        totalTrends++
    }
    
    return totalTrends > 0 ? (consistentTrends / totalTrends) * 100 : 50
},

// 辅助函数：预测最终收敛值
predictFinalConvergenceValue(indices) {
    if (indices.length < 10) return indices[indices.length - 1]
    
    // 使用指数加权移动平均预测
    const weights = indices.map((_, i) => Math.exp(i * 0.1)) // 指数权重
    const weightedSum = indices.reduce((sum, val, i) => sum + val * weights[i], 0)
    const weightSum = weights.reduce((sum, val) => sum + val, 0)
    
    return weightedSum / weightSum
},

// 辅助函数：计算平滑值 (移动平均)
calculateSmoothedValue(indices) {
    if (indices.length < 3) return indices[indices.length - 1]
    
    const windowSize = Math.min(5, indices.length)
    const recentValues = indices.slice(-windowSize)
    return recentValues.reduce((sum, val) => sum + val, 0) / recentValues.length
},
    
    exportData() {
      // 准备导出的数据
      const data = {
        parameters: {
          gridSize: this.gridSize,
          threshold: this.threshold,
          emptyRate: this.emptyRate,
          type1Ratio: this.type1Ratio
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
      
      const radius = Math.min(width, height) / 2.5 // 减小半径为饼图留出更多空间给图例
      
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
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
          // 添加hover效果
          d3.select(event.currentTarget).style("opacity", 0.8)
          
          // 移除可能存在的旧tooltip
          d3.selectAll(".pie-tooltip").remove()
          
          // 计算总数用于百分比
          const total = d3.sum(data, item => item.value)
          const percentage = Math.round((d.data.value / total) * 100)
          
          // 创建tooltip
          d3.select("body")
            .append("div")
            .attr("class", "pie-tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0,0,0,0.9)")
            .style("color", "white")
            .style("padding", "10px")
            .style("border-radius", "6px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("z-index", "9999")
            .style("box-shadow", "0 2px 8px rgba(0,0,0,0.3)")
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 10) + "px")
            .html(`
              <div style="font-weight: bold; margin-bottom: 4px;">${d.data.name}</div>
              <div>数量: ${d.data.value} 个</div>
              <div>占比: ${percentage}%</div>
            `)
        })
        .on("mouseout", (event, d) => {
          // 移除hover效果
          d3.select(event.currentTarget).style("opacity", 1)
          
          // 移除tooltip
          d3.selectAll(".pie-tooltip").remove()
        })
      
      // 添加百分比标签在扇形内部
      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("fill", "#fff")
        .attr("font-weight", "bold")
        .text(d => {
          const percentage = Math.round(d.data.value / d3.sum(data, d => d.value) * 100)
          return percentage > 5 ? `${percentage}%` : "" // 只显示大于5%的标签
        })
      
      // 将图例放在右上角
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${radius + 15}, ${-radius})`) // 放在饼图右上角
      
      const legendItems = legend.selectAll(".legend-item")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 15})`) // 减少行间距
      
      // 图例色块
      legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => d.color)
        .attr("rx", 3) // 圆角
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
          // 移除可能存在的旧tooltip
          d3.selectAll(".pie-tooltip").remove()
          
          // 计算总数用于百分比
          const total = d3.sum(data, item => item.value)
          const percentage = Math.round((d.value / total) * 100)
          
          // 创建tooltip
          d3.select("body")
            .append("div")
            .attr("class", "pie-tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0,0,0,0.9)")
            .style("color", "white")
            .style("padding", "10px")
            .style("border-radius", "6px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("z-index", "9999")
            .style("box-shadow", "0 2px 8px rgba(0,0,0,0.3)")
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 10) + "px")
            .html(`
              <div style="font-weight: bold; margin-bottom: 4px;">${d.name}</div>
              <div>数量: ${d.value} 个</div>
              <div>占比: ${percentage}%</div>
            `)
        })
        .on("mouseout", (event, d) => {
          // 移除tooltip
          d3.selectAll(".pie-tooltip").remove()
        })
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
      
      const margin = { top: 20, right: 60, bottom: 40, left: 50 }
      const width = containerWidth - margin.left - margin.right
      const height = containerHeight - margin.top - margin.bottom
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
      
      // 如果没有收敛数据，显示提示信息
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
      
      // 隔离指数的比例尺 (主要Y轴)
      const yIndex = d3.scaleLinear()
        .domain([0, Math.max(100, d3.max(this.convergenceData, d => d.segregationIndex) * 1.1)])
        .range([height, 0])
      
      // 收敛得分的比例尺 (次要Y轴)
      const yScore = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])
      
      // 创建线条生成器
      const indexLine = d3.line()
        .x(d => x(d.iteration))
        .y(d => yIndex(d.segregationIndex))
        .curve(d3.curveMonotoneX)
      
      const smoothedLine = d3.line()
        .x(d => x(d.iteration))
        .y(d => yIndex(d.smoothedIndex))
        .curve(d3.curveMonotoneX)
      
      const scoreLine = d3.line()
        .x(d => x(d.iteration))
        .y(d => yScore(d.overallScore))
        .curve(d3.curveMonotoneX)
      
      // 添加坐标轴
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5))
      
      svg.append("g")
        .attr("class", "y-axis-left")
        .call(d3.axisLeft(yIndex).ticks(5))
      
      svg.append("g")
        .attr("class", "y-axis-right")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(yScore).ticks(5))
      
      // 添加坐标轴标签
      svg.append("text")
        .attr("class", "x-label")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .text("迭代次数")
      
      svg.append("text")
        .attr("class", "y-label-left")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -35)
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("fill", "#e74c3c")
        .text("隔离指数")
      
      svg.append("text")
        .attr("class", "y-label-right")
        .attr("transform", "rotate(90)")
        .attr("x", height / 2)
        .attr("y", -width - margin.right + 15)
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("fill", "#3498db")
        .text("收敛得分 (%)")
      
      // 添加网格线
      svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x)
          .tickSize(-height)
          .tickFormat("")
        )
        .style("stroke-dasharray", "2,2")
        .style("opacity", 0.3)
      
      svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yIndex)
          .tickSize(-width)
          .tickFormat("")
        )
        .style("stroke-dasharray", "2,2")
        .style("opacity", 0.3)
      
      // 绘制隔离指数原始曲线
      svg.append("path")
        .datum(this.convergenceData)
        .attr("class", "index-line")
        .attr("fill", "none")
        .attr("stroke", "#e74c3c")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.7)
        .attr("d", indexLine)
      
      // 绘制隔离指数平滑曲线
      svg.append("path")
        .datum(this.convergenceData)
        .attr("class", "smoothed-line")
        .attr("fill", "none")
        .attr("stroke", "#c0392b")
        .attr("stroke-width", 3)
        .attr("d", smoothedLine)
      
      // 绘制收敛得分曲线
      svg.append("path")
        .datum(this.convergenceData)
        .attr("class", "score-line")
        .attr("fill", "none")
        .attr("stroke", "#3498db")
        .attr("stroke-width", 2)
        .attr("d", scoreLine)
      
      // 添加收敛状态标记点
      const statusColors = {
        'converged': '#27ae60',
        'converging': '#f39c12',
        'oscillating': '#e67e22',
        'diverging': '#e74c3c'
      }
      
      svg.selectAll(".status-point")
        .data(this.convergenceData.filter((d, i) => i % 3 === 0)) // 每3个点显示一个状态
        .enter()
        .append("circle")
        .attr("class", "status-point")
        .attr("cx", d => x(d.iteration))
        .attr("cy", d => yIndex(d.segregationIndex))
        .attr("r", 4)
        .attr("fill", d => statusColors[d.status] || '#95a5a6')
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
      
      // 添加预测线 (如果有足够数据)
      if (this.convergenceData.length >= 10) {
        const lastPoint = this.convergenceData[this.convergenceData.length - 1]
        const predictedY = yIndex(lastPoint.predictedFinal)
        
        svg.append("line")
          .attr("class", "prediction-line")
          .attr("x1", x(lastPoint.iteration))
          .attr("y1", yIndex(lastPoint.segregationIndex))
          .attr("x2", width)
          .attr("y2", predictedY)
          .attr("stroke", "#9b59b6")
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "5,5")
          .attr("opacity", 0.7)
        
        // 预测值标签
        svg.append("text")
          .attr("x", width - 5)
          .attr("y", predictedY - 5)
          .attr("text-anchor", "end")
          .attr("font-size", "10px")
          .attr("fill", "#9b59b6")
          .text(`预测: ${lastPoint.predictedFinal.toFixed(1)}`)
      }
      
      // 添加图例
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(10, 10)`)
      
      const legendItems = [
        { name: "隔离指数", color: "#e74c3c", style: "solid" },
        { name: "平滑曲线", color: "#c0392b", style: "solid" },
        { name: "收敛得分", color: "#3498db", style: "solid" },
        { name: "预测趋势", color: "#9b59b6", style: "dashed" }
      ]
      
      legendItems.forEach((item, i) => {
        const legendItem = legend.append("g")
          .attr("transform", `translate(0, ${i * 15})`)
        
        legendItem.append("line")
          .attr("x1", 0)
          .attr("y1", 5)
          .attr("x2", 15)
          .attr("y2", 5)
          .attr("stroke", item.color)
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", item.style === "dashed" ? "3,3" : "0")
        
        legendItem.append("text")
          .attr("x", 20)
          .attr("y", 5)
          .attr("alignment-baseline", "middle")
          .attr("font-size", "9px")
          .text(item.name)
      })
    },
    
    // 更新收敛性图表
    updateConvergenceChart() {
      // 重新渲染收敛性图表
      this.renderConvergenceChart()
    },
    
    // === 数据持久化相关方法 ===
    
    // 保存数据到本地存储
    persistData() {
      try {
        const dataToSave = {
          // 基本参数
          gridSize: this.gridSize,
          threshold: this.threshold,
          emptyRate: this.emptyRate,
          type1Ratio: this.type1Ratio,
          simulationSpeed: this.simulationSpeed,
          
          // 网格状态
          grid: this.grid,
          iterations: this.iterations,
          segregationIndex: this.segregationIndex,
          unsatisfiedCount: this.unsatisfiedCount,
          actualType1Ratio: this.actualType1Ratio,
          actualType2Ratio: this.actualType2Ratio,
          
          // 历史数据
          historyData: this.historyData,
          convergenceData: this.convergenceData,
          trajectories: this.trajectories,
          satisfactionDistribution: this.satisfactionDistribution,
          
          // 其他状态
          activeView: this.activeView,
          heatmapType: this.heatmapType,
          
          // 保存时间戳
          savedAt: new Date().toISOString(),
          
          // 运行状态（停止模拟状态）
          isRunning: false
        }
        
        localStorage.setItem('schellingModelData', JSON.stringify(dataToSave))
        console.log('✅ 谢林模型数据已保存到本地存储')
      } catch (error) {
        console.warn('⚠️ 保存数据失败:', error)
      }
    },
    
    // 从本地存储恢复数据
    restorePersistedData() {
      try {
        const savedData = localStorage.getItem('schellingModelData')
        if (!savedData) {
          console.log('📝 没有找到保存的数据，将创建新的模拟')
          return false
        }
        
        const data = JSON.parse(savedData)
        
        // 检查数据有效性
        if (!data.grid || !Array.isArray(data.grid) || data.grid.length === 0) {
          console.log('📝 保存的数据无效，将创建新的模拟')
          return false
        }
        
        // 检查数据是否过期（可选：7天后过期）
        const savedTime = new Date(data.savedAt)
        const now = new Date()
        const daysDiff = (now - savedTime) / (1000 * 60 * 60 * 24)
        
        if (daysDiff > 7) {
          console.log('📝 保存的数据已过期，将创建新的模拟')
          localStorage.removeItem('schellingModelData')
          return false
        }
        
        // 恢复基本参数
        this.gridSize = data.gridSize || 20
        this.threshold = data.threshold || 0.3
        this.emptyRate = data.emptyRate || 0.2
        this.type1Ratio = data.type1Ratio || 0.5
        this.simulationSpeed = data.simulationSpeed || 5
        
        // 恢复网格状态
        this.grid = data.grid
        this.iterations = data.iterations || 0
        this.segregationIndex = data.segregationIndex || 0
        this.unsatisfiedCount = data.unsatisfiedCount || 0
        this.actualType1Ratio = data.actualType1Ratio || 0
        this.actualType2Ratio = data.actualType2Ratio || 0
        
        // 恢复历史数据
        this.historyData = data.historyData || {
          iterations: [],
          segregationIndex: [],
          unsatisfiedCount: []
        }
        this.convergenceData = data.convergenceData || []
        this.trajectories = data.trajectories || []
        this.satisfactionDistribution = data.satisfactionDistribution || {
          satisfied: { type1: 0, type2: 0 },
          unsatisfied: { type1: 0, type2: 0 }
        }
        
        // 恢复界面状态
        this.activeView = data.activeView || 'grid'
        this.heatmapType = data.heatmapType || 'type1'
        
        // 确保模拟停止状态
        this.isRunning = false
        
        // 重新计算统计数据（确保数据一致性）
        this.calculateStatistics()
        
        console.log(`✅ 成功恢复谢林模型数据 (保存于: ${data.savedAt})`)
        console.log(`📊 恢复的数据: ${this.iterations}次迭代, 隔离指数: ${this.segregationIndex}%`)
        
        // 等待DOM更新后渲染可视化
        this.$nextTick(() => {
          this.renderGrid()
          if (this.activeView === 'heatmap') {
            this.renderHeatmap()
          } else if (this.activeView === 'satisfaction') {
            this.renderSatisfactionHeatmap()
          }
        })
        
        return true
      } catch (error) {
        console.warn('⚠️ 恢复数据失败:', error)
        localStorage.removeItem('schellingModelData')
        return false
      }
    },
    
    // 检查是否有有效数据
    hasValidData() {
      return this.grid && 
             Array.isArray(this.grid) && 
             this.grid.length > 0 && 
             this.grid[0] && 
             Array.isArray(this.grid[0])
    },
    
    // 清除保存的数据
    clearPersistedData() {
      try {
        localStorage.removeItem('schellingModelData')
        console.log('🗑️ 已清除保存的数据')
        this.$message.success('已清除保存的数据')
      } catch (error) {
        console.warn('⚠️ 清除数据失败:', error)
      }
    },
    
    // 手动保存当前状态
    saveCurrentState() {
      this.persistData()
      this.$message.success('当前状态已保存')
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
  height: 100%; /* 固定合理高度，避免超出页面 */
  max-height: 700px; /* 增大最大高度限制 */
  min-height: 400px; /* 增大最小高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible; /* 确保内容可见 */
  border: 1px solid #e1e8ed; /* 添加边框便于观察 */
  border-radius: 4px;
  background-color: #fafbfc; /* 浅色背景 */
}

.grid-flex-container {
  height: 100%; /* 固定合理高度 */
  max-height: 750px; /* 增大最大高度限制 */
  width: 100%;
  min-height: 400px; /* 增大最小高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible; /* 确保内容可见 */
  padding: 5px; /* 减少内边距 */
}

.grid-card {
  height: 500px; /* 固定合理高度 */
  max-height: 800px; /* 增大最大高度限制 */
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
  
  .grid-container {
    max-height: 900px; /* 大屏幕允许更大高度 */
    min-height: 500px;
  }
  
  .grid-flex-container {
    max-height: 950px;
    min-height: 500px;
  }
  
  .grid-card {
    height: 600px;
    max-height: 1000px;
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
  
  .grid-container {
    max-height: 800px; /* 中大屏幕适当增大 */
    min-height: 450px;
  }
  
  .grid-flex-container {
    max-height: 850px;
    min-height: 450px;
  }
  
  .grid-card {
    height: 550px;
    max-height: 900px;
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