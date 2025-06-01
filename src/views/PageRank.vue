<template>
  <div class="pagerank-demo">
    <el-card>
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2>PageRank算法演示</h2>
            <p>演示如何计算网络中每个节点的重要性分数</p>
            <p class="developer-signature"> 开发者：张宏亦</p>
          </div>
          <el-button type="info" @click="showHelpDialog = true" icon="el-icon-question">
            算法说明
          </el-button>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never">
            <h3>参数设置</h3>
            <el-form label-width="120px">
              <el-form-item label="节点数量">
                <el-slider v-model="nodeCount" :min="10" :max="50" show-input />
              </el-form-item>
              <el-form-item label="连接概率">
                <el-slider v-model="probability" :min="0.1" :max="0.9" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="阻尼因子">
                <el-slider v-model="dampingFactor" :min="0.1" :max="0.9" :step="0.1" show-input />
              </el-form-item>
              <el-form-item label="最大迭代次数">
                <el-slider v-model="maxIterations" :min="10" :max="100" :step="10" show-input />
              </el-form-item>
              <el-form-item label="图类型">
                <el-select v-model="graphType">
                  <el-option label="随机图" value="random" />
                  <el-option label="中心化网络" value="centralized" />
                  <el-option label="链式网络" value="chain" />
                </el-select>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="generateGraph">生成图</el-button>
                <el-button type="success" @click="runPageRank" :disabled="isRunning">运行PageRank</el-button>
              </el-form-item>
              <el-form-item >
                <el-button @click="initStepMode" :disabled="isRunning || isStepMode">开始单步</el-button>
                <el-button @click="stepByStep" :disabled="!canStep">执行一步</el-button>
                <el-button @click="resetAlgorithm" :disabled="isRunning">重置算法</el-button>
              </el-form-item>
            </el-form>
          </el-card>

          <el-card shadow="never" style="margin-top: 20px;">
            <h3>算法状态</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="模式">{{ isStepMode ? '单步模式' : '正常模式' }}</el-descriptions-item>
              <el-descriptions-item label="当前迭代">{{ currentIteration }}</el-descriptions-item>
              <el-descriptions-item label="收敛状态">
                <el-tag :type="converged ? 'success' : 'info'">
                  {{ converged ? '已收敛' : '未收敛' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="收敛差值">{{ convergenceDiff }}</el-descriptions-item>
              <el-descriptions-item label="最大PR值">{{ maxPageRank }}</el-descriptions-item>
              <el-descriptions-item label="最小PR值">{{ minPageRank }}</el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card shadow="never" style="margin-top: 20px;">
            <h3>网络统计</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="总节点数">{{ nodeCount }}</el-descriptions-item>
              <el-descriptions-item label="总边数">{{ links.length }}</el-descriptions-item>
              <el-descriptions-item label="平均出度">{{ averageOutDegree }}</el-descriptions-item>
              <el-descriptions-item label="平均入度">{{ averageInDegree }}</el-descriptions-item>
              <el-descriptions-item label="孤立节点">{{ isolatedNodes }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>Top 5 节点</h3>
            <el-table :data="topNodes" size="small">
              <el-table-column prop="rank" label="排名" width="60" />
              <el-table-column prop="id" label="节点" width="60" />
              <el-table-column prop="pagerank" label="PR值" />
              <el-table-column prop="change" label="变化" width="80">
                <template #default="scope">
                  <el-tag size="small" :type="getChangeType(scope.row.change)">
                    {{ scope.row.change }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>

        <el-col :span="16">
          <el-card shadow="never">
            <h3>网络可视化</h3>
            <div class="legend" style="margin-bottom: 10px;">
              <span style="color: #ff4444;">● 高PageRank值</span>
              <span style="color: #ffaa00; margin-left: 20px;">● 中等PageRank值</span>
              <span style="color: #44aa44; margin-left: 20px;">● 低PageRank值</span>
            </div>
            <div ref="networkContainer" class="network-container"></div>
          </el-card>

          <!-- 新增图表部分 -->
          <el-tabs v-model="activeChartTab" type="card" style="margin-top: 20px;">
            <el-tab-pane label="收敛过程" name="convergence">
              <el-card shadow="never">
                <h4>收敛差值变化</h4>
                <div ref="convergenceChart" class="chart-container"></div>
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="Top节点变化" name="topNodes">
              <el-card shadow="never">
                <h4>Top 5 节点PageRank值变化</h4>
                <div ref="topNodesChart" class="chart-container"></div>
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="分布统计" name="distribution">
              <el-card shadow="never">
                <h4>PageRank值分布直方图</h4>
                <div ref="distributionChart" class="chart-container"></div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>

    <!-- 新增帮助对话框 -->
    <el-dialog
        title="PageRank算法说明"
        v-model="showHelpDialog"
        width="80%"
        :before-close="handleClose">
      <el-tabs type="border-card">
        <el-tab-pane label="算法原理" name="algorithm">
          <div class="help-content">
            <h3>PageRank算法简介</h3>
            <p>PageRank是由Google创始人拉里·佩奇和谢尔盖·布林在1996年开发的链接分析算法，用于计算网页在搜索结果中的重要性排名。</p>

            <h4>核心思想</h4>
            <ul>
              <li><strong>链接投票：</strong>一个网页被越多的其他网页链接，它就越重要</li>
              <li><strong>权重传递：</strong>重要网页的链接比不重要网页的链接更有价值</li>
              <li><strong>递归定义：</strong>网页的重要性由链接到它的网页的重要性决定</li>
            </ul>

            <h4>数学公式</h4>
            <div class="formula">
              <p><strong>PR(A) = (1-d)/N + d × Σ(PR(Ti)/C(Ti))</strong></p>
              <p>其中：</p>
              <ul>
                <li>PR(A) = 网页A的PageRank值</li>
                <li>d = 阻尼因子（通常为0.85）</li>
                <li>N = 网络中总的网页数量</li>
                <li>Ti = 链接到网页A的网页</li>
                <li>C(Ti) = 网页Ti的出链数量</li>
              </ul>
            </div>

            <h4>算法特点</h4>
            <ul>
              <li><strong>迭代计算：</strong>通过多次迭代直到收敛</li>
              <li><strong>全局排序：</strong>考虑整个网络的链接结构</li>
              <li><strong>抗作弊：</strong>难以通过简单的链接操作作弊</li>
              <li><strong>随机游走：</strong>可以理解为随机游走者在网络中的稳态分布</li>
            </ul>
          </div>
        </el-tab-pane>

        <el-tab-pane label="参数说明" name="parameters">
          <div class="help-content">
            <h3>参数设置说明</h3>

            <h4>节点数量 (10-50)</h4>
            <p>设置网络中的节点总数。节点越多，网络越复杂，计算时间越长。</p>

            <h4>连接概率 (0.1-0.9)</h4>
            <p>在随机图模式下，任意两个节点之间建立连接的概率。概率越高，网络连接越密集。</p>

            <h4>阻尼因子 (0.1-0.9)</h4>
            <p>表示用户继续点击链接的概率，通常设为0.85。值越高，远程节点的影响越大；值越低，本地影响越强。</p>

            <h4>最大迭代次数 (10-100)</h4>
            <p>算法运行的最大迭代次数。如果在此次数内未收敛，算法将停止。</p>

            <h4>图类型</h4>
            <ul>
              <li><strong>随机图：</strong>根据连接概率随机生成连接</li>
              <li><strong>中心化网络：</strong>存在一个中心节点，大部分连接都经过它</li>
              <li><strong>链式网络：</strong>节点按链式连接，形成环状结构</li>
            </ul>
          </div>
        </el-tab-pane>

        <el-tab-pane label="功能介绍" name="features">
          <div class="help-content">
            <h3>主要功能介绍</h3>

            <h4>图生成与算法执行</h4>
            <ul>
              <li><strong>生成图：</strong>根据当前参数重新生成网络结构</li>
              <li><strong>运行PageRank：</strong>自动执行完整的PageRank算法</li>
              <li><strong>开始单步：</strong>进入单步执行模式，可以逐步观察算法过程</li>
              <li><strong>执行一步：</strong>在单步模式下执行一次迭代</li>
              <li><strong>重置算法：</strong>重置所有PageRank值到初始状态</li>
            </ul>

            <h4>算法状态监控</h4>
            <ul>
              <li><strong>当前迭代：</strong>显示算法执行的迭代次数</li>
              <li><strong>收敛状态：</strong>显示算法是否已经收敛</li>
              <li><strong>收敛差值：</strong>当前迭代与上一次的差值，用于判断收敛</li>
              <li><strong>最大/最小PR值：</strong>当前网络中的PageRank值范围</li>
            </ul>

            <h4>网络统计信息</h4>
            <ul>
              <li><strong>总节点数/总边数：</strong>网络的基本规模信息</li>
              <li><strong>平均出度/入度：</strong>节点的平均连接数</li>
              <li><strong>孤立节点：</strong>没有任何连接的节点数量</li>
            </ul>

            <h4>可视化展示</h4>
            <ul>
              <li><strong>网络图：</strong>节点大小和颜色反映PageRank值高低</li>
              <li><strong>收敛过程图：</strong>显示算法收敛过程</li>
              <li><strong>Top节点变化图：</strong>追踪重要节点的变化</li>
              <li><strong>分布统计图：</strong>PageRank值的分布直方图</li>
            </ul>

            <h4>交互操作</h4>
            <ul>
              <li><strong>节点拖拽：</strong>可以拖拽节点改变网络布局</li>
              <li><strong>节点悬停：</strong>鼠标悬停显示节点详细信息</li>
              <li><strong>图表切换：</strong>通过标签页查看不同类型的分析图表</li>
            </ul>
          </div>
        </el-tab-pane>

        <el-tab-pane label="使用指南" name="guide">
          <div class="help-content">
            <h3>使用指南</h3>

            <h4>快速开始</h4>
            <ol>
              <li>调整左侧参数设置（可使用默认值）</li>
              <li>点击"生成图"按钮创建网络</li>
              <li>点击"运行PageRank"查看完整执行过程</li>
              <li>观察右侧网络可视化和统计信息的变化</li>
            </ol>

            <h4>深入理解算法</h4>
            <ol>
              <li>点击"重置算法"回到初始状态</li>
              <li>点击"开始单步"进入单步模式</li>
              <li>反复点击"执行一步"观察每次迭代的变化</li>
              <li>查看右侧图表标签页中的详细分析</li>
            </ol>

            <h4>实验建议</h4>
            <ul>
              <li><strong>对比实验：</strong>尝试不同的图类型，观察PageRank分布的差异</li>
              <li><strong>参数影响：</strong>调整阻尼因子，观察对结果的影响</li>
              <li><strong>收敛分析：</strong>使用单步模式观察算法的收敛过程</li>
              <li><strong>网络结构：</strong>比较不同网络规模下的算法表现</li>
            </ul>

            <h4>注意事项</h4>
            <ul>
              <li>节点数量过多时，计算和渲染可能较慢</li>
              <li>某些参数组合可能导致收敛较慢</li>
              <li>网络结构会影响PageRank的分布特征</li>
              <li>单步模式下需要手动执行每一步</li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showHelpDialog = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'PageRankDemo',
  data() {
    return {
      nodeCount: 20,
      probability: 0.3,
      dampingFactor: 0.85,
      maxIterations: 50,
      graphType: 'random',
      nodes: [],
      links: [],
      adjacencyMatrix: [],
      currentIteration: 0,
      converged: false,
      convergenceDiff: '0.0000',
      maxPageRank: '0.0000',
      minPageRank: '0.0000',
      topNodes: [],
      simulation: null,
      isStepMode: false,
      canStep: false,
      isRunning: false,
      previousPageRanks: [],
      averageOutDegree: '0.00',
      averageInDegree: '0.00',
      isolatedNodes: 0,

      // 新增图表相关数据
      activeChartTab: 'convergence',
      convergenceHistory: [],
      topNodesHistory: [],
      distributionHistory: [],

      // 新增帮助对话框控制
      showHelpDialog: false
    }
  },
  mounted() {
    this.generateGraph()
  },
  watch: {
    activeChartTab(newTab) {
      this.$nextTick(() => {
        this.renderCharts()
      })
    }
  },
  methods: {
    generateGraph() {
      this.resetAlgorithm()

      // 生成节点
      this.nodes = Array.from({ length: this.nodeCount }, (_, i) => ({
        id: i,
        pagerank: 1.0 / this.nodeCount,
        previousPagerank: 1.0 / this.nodeCount,
        outDegree: 0,
        inDegree: 0
      }))

      // 生成连接
      this.links = []
      if (this.graphType === 'random') {
        this.generateRandomGraph()
      } else if (this.graphType === 'centralized') {
        this.generateCentralizedGraph()
      } else {
        this.generateChainGraph()
      }

      this.buildAdjacencyMatrix()
      this.calculateDegrees()
      this.renderNetwork()
      this.updateStatistics()
      this.recordHistoryData()
    },

    generateRandomGraph() {
      const connections = new Set()

      for (let i = 0; i < this.nodeCount; i++) {
        for (let j = 0; j < this.nodeCount; j++) {
          if (i !== j && Math.random() < this.probability) {
            const key = `${i}-${j}`
            if (!connections.has(key)) {
              connections.add(key)
              this.links.push({ source: i, target: j })
            }
          }
        }
      }

      // 确保每个节点至少有一个连接（入度或出度）
      const connectedNodes = new Set()
      this.links.forEach(link => {
        connectedNodes.add(link.source)
        connectedNodes.add(link.target)
      })

      // 为孤立节点添加连接
      for (let i = 0; i < this.nodeCount; i++) {
        if (!connectedNodes.has(i)) {
          let target
          do {
            target = Math.floor(Math.random() * this.nodeCount)
          } while (target === i)
          this.links.push({ source: i, target })
          connectedNodes.add(i)
          connectedNodes.add(target)
        }
      }
    },

    generateCentralizedGraph() {
      const centerNode = Math.floor(this.nodeCount / 2)

      // 中心节点连接到其他节点
      for (let i = 0; i < this.nodeCount; i++) {
        if (i !== centerNode) {
          if (Math.random() < 0.7) {
            this.links.push({ source: i, target: centerNode })
          }
          if (Math.random() < 0.5) {
            this.links.push({ source: centerNode, target: i })
          }
        }
      }

      // 添加其他随机连接
      for (let i = 0; i < this.nodeCount; i++) {
        for (let j = 0; j < this.nodeCount; j++) {
          if (i !== j && i !== centerNode && j !== centerNode && Math.random() < 0.2) {
            this.links.push({ source: i, target: j })
          }
        }
      }
    },

    generateChainGraph() {
      // 创建链式连接
      for (let i = 0; i < this.nodeCount - 1; i++) {
        this.links.push({ source: i, target: i + 1 })
      }

      // 最后一个节点连回第一个（形成环）
      this.links.push({ source: this.nodeCount - 1, target: 0 })

      // 添加一些随机跳跃连接
      for (let i = 0; i < this.nodeCount; i++) {
        if (Math.random() < 0.3) {
          let target = Math.floor(Math.random() * this.nodeCount)
          if (target !== i && target !== (i + 1) % this.nodeCount) {
            this.links.push({ source: i, target })
          }
        }
      }
    },

    buildAdjacencyMatrix() {
      this.adjacencyMatrix = Array(this.nodeCount).fill().map(() => Array(this.nodeCount).fill(0))

      this.links.forEach(link => {
        this.adjacencyMatrix[link.source][link.target] = 1
      })
    },

    calculateDegrees() {
      this.nodes.forEach(node => {
        node.outDegree = 0
        node.inDegree = 0
      })

      this.links.forEach(link => {
        this.nodes[link.source].outDegree++
        this.nodes[link.target].inDegree++
      })
    },

    initStepMode() {
      this.resetAlgorithm()
      this.isStepMode = true
      this.canStep = true
      console.log('单步模式已启动')
    },

    stepByStep() {
      if (!this.canStep || this.converged) {
        console.log('无法执行单步：', { canStep: this.canStep, converged: this.converged })
        return
      }

      console.log(`执行第 ${this.currentIteration + 1} 次迭代`)

      // 保存当前的PageRank值用于计算变化
      this.nodes.forEach(node => {
        node.previousPagerank = node.pagerank
      })

      // 执行一次PageRank迭代
      this.performPageRankIteration()

      // 检查收敛
      this.checkConvergence()

      // 记录历史数据
      this.recordHistoryData()

      // 更新统计信息和可视化
      this.updateStatistics()
      this.updateVisualization()
      this.renderCharts()

      // 如果已收敛或达到最大迭代次数，停止单步执行
      if (this.converged || this.currentIteration >= this.maxIterations) {
        this.canStep = false
        console.log('单步执行完成')
      }
    },

    runPageRank() {
      this.resetAlgorithm()
      this.isRunning = true

      const runIteration = () => {
        if (this.currentIteration < this.maxIterations && !this.converged) {
          this.nodes.forEach(node => {
            node.previousPagerank = node.pagerank
          })

          this.performPageRankIteration()
          this.checkConvergence()
          this.recordHistoryData()
          this.updateStatistics()
          this.updateVisualization()
          this.renderCharts()

          // 使用setTimeout让界面有时间更新
          setTimeout(runIteration, 100)
        } else {
          this.isRunning = false
          console.log('PageRank算法完成')
        }
      }

      runIteration()
    },

    performPageRankIteration() {
      const n = this.nodeCount
      const d = this.dampingFactor
      const newPageRanks = new Array(n)

      // 计算新的PageRank值
      for (let i = 0; i < n; i++) {
        let sum = 0

        // 计算所有指向节点i的节点的贡献
        for (let j = 0; j < n; j++) {
          if (this.adjacencyMatrix[j][i] === 1) {
            const outDegree = this.nodes[j].outDegree
            if (outDegree > 0) {
              sum += this.nodes[j].pagerank / outDegree
            } else {
              // 处理悬挂节点（出度为0的节点）
              sum += this.nodes[j].pagerank / n
            }
          }
        }

        // 添加悬挂节点的贡献（出度为0的节点将其PageRank平均分配给所有节点）
        let hangingNodeContribution = 0
        for (let j = 0; j < n; j++) {
          if (this.nodes[j].outDegree === 0) {
            hangingNodeContribution += this.nodes[j].pagerank / n
          }
        }

        newPageRanks[i] = (1 - d) / n + d * (sum + hangingNodeContribution)
      }

      // 更新PageRank值
      this.nodes.forEach((node, i) => {
        node.pagerank = newPageRanks[i]
      })

      this.currentIteration++
    },

    checkConvergence() {
      const diff = this.nodes.reduce((sum, node) =>
          sum + Math.abs(node.pagerank - node.previousPagerank), 0)

      this.convergenceDiff = diff.toFixed(6)

      if (diff < 0.0001) {
        this.converged = true
        console.log(`算法在第 ${this.currentIteration} 次迭代后收敛`)
      }
    },

    resetAlgorithm() {
      this.currentIteration = 0
      this.converged = false
      this.isStepMode = false
      this.canStep = false
      this.isRunning = false
      this.convergenceDiff = '0.0000'

      // 清空历史数据
      this.convergenceHistory = []
      this.topNodesHistory = []
      this.distributionHistory = []

      // 重置PageRank值
      if (this.nodes && this.nodes.length > 0) {
        this.nodes.forEach(node => {
          node.pagerank = 1.0 / this.nodeCount
          node.previousPagerank = 1.0 / this.nodeCount
        })

        this.updateStatistics()
        this.updateVisualization()
        this.recordHistoryData()
        this.renderCharts()
      }

      console.log('算法已重置')
    },

    // 新增：记录历史数据
    recordHistoryData() {
      // 记录收敛历史
      this.convergenceHistory.push({
        iteration: this.currentIteration,
        diff: parseFloat(this.convergenceDiff),
        maxPR: parseFloat(this.maxPageRank),
        minPR: parseFloat(this.minPageRank)
      })

      // 记录Top 5节点历史
      const top5 = this.nodes
          .map(node => ({ id: node.id, pagerank: node.pagerank }))
          .sort((a, b) => b.pagerank - a.pagerank)
          .slice(0, 5)

      this.topNodesHistory.push({
        iteration: this.currentIteration,
        nodes: top5
      })

      // 记录分布历史
      const pageRanks = this.nodes.map(n => n.pagerank)
      this.distributionHistory.push({
        iteration: this.currentIteration,
        values: [...pageRanks]
      })
    },

    // 新增：渲染图表
    renderCharts() {
      this.$nextTick(() => {
        if (this.activeChartTab === 'convergence') {
          this.renderConvergenceChart()
        } else if (this.activeChartTab === 'topNodes') {
          this.renderTopNodesChart()
        } else if (this.activeChartTab === 'distribution') {
          this.renderDistributionChart()
        }
      })
    },

    renderConvergenceChart() {
      const container = this.$refs.convergenceChart
      if (!container || this.convergenceHistory.length === 0) return

      d3.select(container).selectAll("*").remove()

      const margin = { top: 20, right: 30, bottom: 40, left: 60 }
      const width = 500 - margin.left - margin.right
      const height = 300 - margin.bottom - margin.top

      const svg = d3.select(container)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)

      // X轴：迭代次数
      const xScale = d3.scaleLinear()
          .domain([0, Math.max(this.maxIterations, this.currentIteration)])
          .range([0, width])

      // Y轴：收敛差值（对数尺度）
      const maxDiff = d3.max(this.convergenceHistory, d => d.diff) || 1
      const yScale = d3.scaleLog()
          .domain([0.0001, maxDiff])
          .range([height, 0])

      // 创建线条生成器
      const line = d3.line()
          .x(d => xScale(d.iteration))
          .y(d => yScale(Math.max(d.diff, 0.0001)))
          .curve(d3.curveMonotoneX)

      // 绘制网格线
      svg.append("g")
          .attr("class", "grid")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
          .style("stroke-dasharray", "3,3")
          .style("opacity", 0.3)

      // 绘制收敛线
      svg.append("path")
          .datum(this.convergenceHistory)
          .attr("fill", "none")
          .attr("stroke", "#ff6b6b")
          .attr("stroke-width", 2)
          .attr("d", line)

      // 绘制数据点
      svg.selectAll(".dot")
          .data(this.convergenceHistory)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("cx", d => xScale(d.iteration))
          .attr("cy", d => yScale(Math.max(d.diff, 0.0001)))
          .attr("r", 3)
          .attr("fill", "#ff6b6b")

      // 添加坐标轴
      svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(xScale))

      svg.append("g")
          .call(d3.axisLeft(yScale).tickFormat(d3.format(".1e")))

      // 添加坐标轴标签
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("收敛差值 (对数尺度)")

      svg.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
          .style("text-anchor", "middle")
          .text("迭代次数")
    },

    renderTopNodesChart() {
      const container = this.$refs.topNodesChart
      if (!container || this.topNodesHistory.length === 0) return

      d3.select(container).selectAll("*").remove()

      const margin = { top: 20, right: 100, bottom: 40, left: 60 }
      const width = 500 - margin.left - margin.right
      const height = 300 - margin.bottom - margin.top

      const svg = d3.select(container)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)

      // 获取Top 5节点的ID
      const topNodeIds = this.topNodesHistory[this.topNodesHistory.length - 1]?.nodes.map(n => n.id) || []
      const colors = d3.schemeCategory10

      // X轴：迭代次数
      const xScale = d3.scaleLinear()
          .domain([0, Math.max(this.maxIterations, this.currentIteration)])
          .range([0, width])

      // Y轴：PageRank值
      const allValues = this.topNodesHistory.flatMap(h => h.nodes.map(n => n.pagerank))
      const yScale = d3.scaleLinear()
          .domain([0, d3.max(allValues)])
          .range([height, 0])

      // 为每个Top节点创建线条
      topNodeIds.forEach((nodeId, index) => {
        const nodeData = this.topNodesHistory.map(h => {
          const node = h.nodes.find(n => n.id === nodeId)
          return {
            iteration: h.iteration,
            pagerank: node ? node.pagerank : 0
          }
        })

        const line = d3.line()
            .x(d => xScale(d.iteration))
            .y(d => yScale(d.pagerank))
            .curve(d3.curveMonotoneX)

        svg.append("path")
            .datum(nodeData)
            .attr("fill", "none")
            .attr("stroke", colors[index])
            .attr("stroke-width", 2)
            .attr("d", line)

        // 添加图例
        svg.append("text")
            .attr("x", width + 10)
            .attr("y", 20 + index * 20)
            .attr("fill", colors[index])
            .style("font-size", "12px")
            .text(`节点 ${nodeId}`)
      })

      // 添加坐标轴
      svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(xScale))

      svg.append("g")
          .call(d3.axisLeft(yScale))

      // 添加坐标轴标签
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("PageRank值")

      svg.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
          .style("text-anchor", "middle")
          .text("迭代次数")
    },

    renderDistributionChart() {
      const container = this.$refs.distributionChart
      if (!container || this.distributionHistory.length === 0) return

      d3.select(container).selectAll("*").remove()

      const margin = { top: 20, right: 30, bottom: 40, left: 60 }
      const width = 500 - margin.left - margin.right
      const height = 300 - margin.bottom - margin.top

      const svg = d3.select(container)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)

      // 使用最新的分布数据
      const latestDistribution = this.distributionHistory[this.distributionHistory.length - 1]
      if (!latestDistribution) return

      const values = latestDistribution.values
      const bins = d3.histogram()
          .domain(d3.extent(values))
          .thresholds(10)(values)

      // X轴：PageRank值
      const xScale = d3.scaleLinear()
          .domain(d3.extent(values))
          .range([0, width])

      // Y轴：频次
      const yScale = d3.scaleLinear()
          .domain([0, d3.max(bins, d => d.length)])
          .range([height, 0])

      // 绘制直方图
      svg.selectAll(".bar")
          .data(bins)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => xScale(d.x0))
          .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
          .attr("y", d => yScale(d.length))
          .attr("height", d => height - yScale(d.length))
          .attr("fill", "#69b3a2")
          .attr("stroke", "#333")
          .attr("stroke-width", 1)

      // 添加坐标轴
      svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(xScale))

      svg.append("g")
          .call(d3.axisLeft(yScale))

      // 添加坐标轴标签
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("节点数量")

      svg.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
          .style("text-anchor", "middle")
          .text("PageRank值")
    },

    updateStatistics() {
      if (!this.nodes || this.nodes.length === 0) return

      const pageRanks = this.nodes.map(node => node.pagerank)
      this.maxPageRank = Math.max(...pageRanks).toFixed(4)
      this.minPageRank = Math.min(...pageRanks).toFixed(4)

      // 计算平均度数
      const totalOutDegree = this.nodes.reduce((sum, node) => sum + node.outDegree, 0)
      const totalInDegree = this.nodes.reduce((sum, node) => sum + node.inDegree, 0)
      this.averageOutDegree = (totalOutDegree / this.nodeCount).toFixed(2)
      this.averageInDegree = (totalInDegree / this.nodeCount).toFixed(2)

      // 计算孤立节点数量
      this.isolatedNodes = this.nodes.filter(node => node.inDegree === 0 && node.outDegree === 0).length

      // 更新Top 5节点
      this.topNodes = this.nodes
          .map(node => ({
            id: node.id,
            pagerank: node.pagerank.toFixed(4),
            change: this.currentIteration > 0 ?
                (node.pagerank - node.previousPagerank >= 0 ? '+' : '') +
                (node.pagerank - node.previousPagerank).toFixed(6) : '0.000000'
          }))
          .sort((a, b) => parseFloat(b.pagerank) - parseFloat(a.pagerank))
          .slice(0, 5)
          .map((node, index) => ({ ...node, rank: index + 1 }))
    },

    getChangeType(change) {
      const val = parseFloat(change)
      if (val > 0.001) return 'success'
      if (val < -0.001) return 'danger'
      return 'info'
    },

    renderNetwork() {
      const container = this.$refs.networkContainer
      if (!container) return

      d3.select(container).selectAll("*").remove()

      // 根据节点数量动态调整画布尺寸
      const baseWidth = 600
      const baseHeight = 400
      const scaleFactor = Math.max(1, Math.sqrt(this.nodeCount / 20))
      const width = Math.min(baseWidth * scaleFactor, 1000) // 最大不超过1000px
      const height = Math.min(baseHeight * scaleFactor, 700)  // 最大不超过700px

      const svg = d3.select(container)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", `0 0 ${width} ${height}`)
          .style("border", "1px solid #ddd")

      // 添加缩放和平移功能
      const g = svg.append("g")
      const zoom = d3.zoom()
          .scaleExtent([0.1, 4])
          .on("zoom", (event) => {
            g.attr("transform", event.transform)
          })
      
      svg.call(zoom)

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

      // 优化初始位置布局
      this.nodes.forEach((node, i) => {
        if (!node.x || !node.y) {
          // 使用更分散的初始布局
          const spiralRadius = Math.min(width, height) / 3
          const angle = (i / this.nodeCount) * 2 * Math.PI * 3 // 3圈螺旋
          const radius = spiralRadius * (i / this.nodeCount)
          node.x = width / 2 + radius * Math.cos(angle)
          node.y = height / 2 + radius * Math.sin(angle)
        }
      })

      // 根据节点数量动态调整力导向参数
      const linkDistance = Math.max(80, 150 - this.nodeCount * 2) // 动态链接距离
      const chargeStrength = Math.min(-200, -50 - this.nodeCount * 5) // 动态排斥力
      const collisionRadius = Math.max(25, 40 - this.nodeCount * 0.5) // 动态碰撞半径

      this.simulation = d3.forceSimulation(this.nodes)
          .force("link", d3.forceLink(this.links)
              .id(d => d.id)
              .distance(linkDistance)
              .strength(0.3)
          )
          .force("charge", d3.forceManyBody()
              .strength(chargeStrength)
              .distanceMax(width / 2)
          )
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("collision", d3.forceCollide()
              .radius(collisionRadius)
              .strength(0.8)
          )
          // 添加边界约束力
          .force("boundary", () => {
            this.nodes.forEach(node => {
              const radius = collisionRadius
              node.x = Math.max(radius, Math.min(width - radius, node.x))
              node.y = Math.max(radius, Math.min(height - radius, node.y))
            })
          })

      const link = g.append("g")
          .selectAll("line")
          .data(this.links)
          .enter().append("line")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", 1.5)
          .attr("marker-end", "url(#arrowhead)")

      const node = g.append("g")
          .selectAll("circle")
          .data(this.nodes)
          .enter().append("circle")
          .attr("r", 8) // 稍微减小基础半径
          .attr("fill", "#69b3a2")
          .attr("stroke", "#333")
          .attr("stroke-width", 1)
          .style("cursor", "pointer")
          .call(d3.drag()
              .on("start", this.dragstarted)
              .on("drag", this.dragged)
              .on("end", this.dragended))

      // 添加节点标签
      const labels = g.append("g")
          .selectAll("text")
          .data(this.nodes)
          .enter().append("text")
          .text(d => d.id)
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .attr("dy", 3)
          .attr("fill", "white")
          .attr("font-weight", "bold")
          .style("pointer-events", "none")
          .style("user-select", "none")

      // 添加双击重置位置功能
      svg.on("dblclick", () => {
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
        )
      })

      this.simulation.on("tick", () => {
        // 更平滑的边界约束
        node
            .attr("cx", d => {
              const radius = collisionRadius
              d.x = Math.max(radius, Math.min(width - radius, d.x))
              return d.x
            })
            .attr("cy", d => {
              const radius = collisionRadius
              d.y = Math.max(radius, Math.min(height - radius, d.y))
              return d.y
            })

        labels
            .attr("x", d => d.x)
            .attr("y", d => d.y)

        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
      })

      this.linkSelection = link
      this.nodeSelection = node
      this.labelSelection = labels

      this.updateVisualization()
    },

    updateVisualization() {
      if (!this.nodeSelection || !this.nodes || this.nodes.length === 0) return

      const pageRanks = this.nodes.map(n => n.pagerank)
      const maxPR = Math.max(...pageRanks)
      const minPR = Math.min(...pageRanks)
      const range = maxPR - minPR || 1

      // 动态调整节点大小范围，避免过大导致重叠
      const minRadius = Math.max(6, 12 - this.nodeCount * 0.1)
      const maxRadius = Math.max(minRadius + 5, 20 - this.nodeCount * 0.2)

      this.nodeSelection
          .transition()
          .duration(200)
          .attr("r", d => minRadius + (d.pagerank - minPR) / range * (maxRadius - minRadius))
          .attr("fill", d => {
            const normalized = (d.pagerank - minPR) / range
            if (normalized > 0.7) return "#ff4444"
            if (normalized > 0.3) return "#ffaa00"
            return "#44aa44"
          })

      // 更新tooltip
      this.nodeSelection.select("title").remove()
      this.nodeSelection.append("title")
          .text(d => `节点 ${d.id}\nPageRank: ${d.pagerank.toFixed(6)}\n变化: ${this.currentIteration > 0 ? (d.pagerank - d.previousPagerank).toFixed(6) : '0'}\n入度: ${d.inDegree}\n出度: ${d.outDegree}`)
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
    },

    // 新增：处理对话框关闭
    handleClose(done) {
      this.showHelpDialog = false
      done()
    }
  }
}
</script>

<style>
/* 不使用scoped，直接覆盖全局样式 */
.pagerank-demo .el-form-item__content {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* 开发者署名样式 */
.developer-signature {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin: 5px 0 0 0;
  font-style: italic;
  font-weight: 500;
}
</style>
