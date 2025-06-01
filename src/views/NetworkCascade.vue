<template>
  <div class="network-cascade-container">
    <!-- 理论说明卡片 -->
    <el-card class="theory-card">
      <template #header>
        <div class="theory-header">
          <h1>
            <i class="el-icon-connection"></i> 网络级联 (Network Cascade)
          </h1>
        </div>
      </template>

      <el-collapse v-model="activeTheorySection" class="theory-collapse">
        <el-collapse-item name="concept" title="📚 基础概念与机制">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="theory-content">
                <h3>📚 什么是网络级联？</h3>
                <p class="theory-text">
                  网络级联是指<strong>个体的行为选择受到邻居节点的影响，并可能引发连锁反应的现象</strong>。
                  这种现象在社交网络、信息传播、创新采纳等领域普遍存在。
                </p>

                <h3>🔍 级联的核心机制</h3>
                <ul class="theory-list">
                  <li>
                    <strong>阈值效应</strong>：个体只有当周围足够比例的邻居采纳后才会跟随采纳
                  </li>
                  <li>
                    <strong>传播延迟</strong>：从知晓到采纳之间存在时间延迟
                  </li>
                  <li>
                    <strong>局部影响</strong>：个体主要受到直接相连节点的影响
                  </li>
                </ul>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="cascade-illustration">
                <h3>🎯 级联特征</h3>
                <div class="cascade-boxes">
                  <div class="cascade-box process">
                    <h4>传播过程</h4>
                    <p>1. 初始种子节点采纳</p>
                    <p>2. 邻居节点知晓</p>
                    <p>3. 达到阈值后采纳</p>
                    <p>4. 形成连锁反应</p>
                  </div>
                  <div class="arrow">⇕</div>
                  <div class="cascade-box impact">
                    <h4>影响因素</h4>
                    <p>网络结构特征</p>
                    <p>个体采纳阈值</p>
                    <p>初始种子分布</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        

        <el-collapse-item name="scenarios" title="🎯 典型级联情境">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="scenario-card positive">
                <h3>🌟 正向级联</h3>
                <div class="scenario-content">
                  <h4>特征表现</h4>
                  <ul>
                    <li>采纳行为带来<strong>正面收益</strong></li>
                    <li>网络<strong>正外部性</strong>明显</li>
                    <li>采纳意愿随邻居数增加</li>
                  </ul>
                  <h4>典型案例</h4>
                  <ul>
                    <li>社交媒体平台普及</li>
                    <li>新技术标准采用</li>
                    <li>创新产品扩散</li>
                  </ul>
                </div>
              </div>
            </el-col>
            
            <el-col :span="8">
              <div class="scenario-card negative">
                <h3>⚠️ 负向级联</h3>
                <div class="scenario-content">
                  <h4>特征表现</h4>
                  <ul>
                    <li>采纳行为带来<strong>负面影响</strong></li>
                    <li>网络<strong>负外部性</strong>显著</li>
                    <li>防御性决策倾向</li>
                  </ul>
                  <h4>典型案例</h4>
                  <ul>
                    <li>金融市场恐慌</li>
                    <li>谣言传播扩散</li>
                    <li>群体性踩踏</li>
                  </ul>
                </div>
              </div>
            </el-col>
            
            <el-col :span="8">
              <div class="scenario-card complex">
                <h3>🔄 复杂级联</h3>
                <div class="scenario-content">
                  <h4>特征表现</h4>
                  <ul>
                    <li><strong>多重阈值</strong>共存</li>
                    <li><strong>竞争性</strong>传播过程</li>
                    <li>局部与全局效应交织</li>
                  </ul>
                  <h4>典型案例</h4>
                  <ul>
                    <li>意见极化演化</li>
                    <li>创新与保守并存</li>
                    <li>多产品市场竞争</li>
                  </ul>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>

        <el-collapse-item name="applications" title="💡 现实应用案例">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="application-card">
                <div class="app-icon">🛍️</div>
                <h3>营销传播</h3>
                <div class="app-content">
                  <h4>应用场景</h4>
                  <ul>
                    <li>病毒式营销</li>
                    <li>意见领袖影响</li>
                    <li>口碑传播效应</li>
                  </ul>
                  <div class="app-insight">
                    <strong>关键策略：</strong>
                    识别关键节点，设计传播激励
                  </div>
                </div>
              </div>
            </el-col>
            
            <el-col :span="6">
              <div class="application-card">
                <div class="app-icon">📱</div>
                <h3>产品创新</h3>
                <div class="app-content">
                  <h4>应用场景</h4>
                  <ul>
                    <li>新产品推广</li>
                    <li>技术标准采纳</li>
                    <li>平台生态构建</li>
                  </ul>
                  <div class="app-insight">
                    <strong>关键策略：</strong>
                    降低采纳门槛，提供网络价值
                  </div>
                </div>
              </div>
            </el-col>
            
            <el-col :span="6">
              <div class="application-card">
                <div class="app-icon">🏛️</div>
                <h3>公共政策</h3>
                <div class="app-content">
                  <h4>应用场景</h4>
                  <ul>
                    <li>政策推广实施</li>
                    <li>公共意见形成</li>
                    <li>社会规范演化</li>
                  </ul>
                  <div class="app-insight">
                    <strong>关键策略：</strong>
                    示范引导，渐进推进
                  </div>
                </div>
              </div>
            </el-col>
            
            <el-col :span="6">
              <div class="application-card">
                <div class="app-icon">🌍</div>
                <h3>社会创新</h3>
                <div class="app-content">
                  <h4>应用场景</h4>
                  <ul>
                    <li>可持续行为推广</li>
                    <li>公益项目传播</li>
                    <li>社区治理创新</li>
                  </ul>
                  <div class="app-insight">
                    <strong>关键策略：</strong>
                    社群营造，价值共创
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <!-- 顶部控制面板 -->
    <el-row class="control-panel" :gutter="20">
      <el-col :span="24">
        <el-card class="control-card">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <h3>网络级联控制面板</h3>
              </div>
              <div class="control-buttons">
                <el-button type="primary" @click="startSimulation">开始模拟</el-button>
                <el-button type="warning" @click="pauseSimulation">暂停</el-button>
                <el-button @click="resetSimulation">重置</el-button>
              </div>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="网络规模">
                <el-slider v-model="networkSize" :min="20" :max="100" @change="updateNetwork"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="采纳阈值">
                <el-slider v-model="adoptionThreshold" :min="0.1" :max="0.9" :step="0.1"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="传播延时">
                <el-slider v-model="propagationDelay" :min="1" :max="10"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="初始种子数">
                <el-input-number v-model="seedCount" :min="1" :max="10"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 主要内容区域 -->
    <el-row :gutter="20" class="main-content">
      <!-- 左侧：网络可视化 -->
      <el-col :span="16">
        <el-card class="visualization-card">
          <template #header>
            <div class="card-header">
              <h3>网络级联过程</h3>
              <div class="view-controls">
                <el-radio-group v-model="visualMode" size="small">
                  <el-radio-button label="network">
                    <el-icon class="view-icon"><Monitor /></el-icon>
                    网络视图
                  </el-radio-button>
                  <el-radio-button label="community">
                    <el-icon class="view-icon"><Share /></el-icon>
                    社区视图
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </template>
          <div ref="networkContainer" class="network-container"></div>
          <!-- 图例说明 -->
          <div class="legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: gray"></div>
              <span>未知晓</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: gold"></div>
              <span>已知晓</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #ff4444"></div>
              <span>已采纳</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧：统计与分析 -->
      <el-col :span="8">
        <el-card class="teaching-card">
          <template #header>
            <div class="card-header">
              <h3>教学控制</h3>
            </div>
          </template>
          <div class="teaching-tools">
            <el-button-group>
              <el-button @click="highlightInfluencers">
                <el-icon><Star /></el-icon>影响力节点
              </el-button>
              <el-button @click="toggleCommunityView">
                <el-icon><Grid /></el-icon>社区结构
              </el-button>
            </el-button-group>
            <!-- 更新教学步骤显示 -->
            <div class="teaching-progress">
              <el-steps :active="teachingStep" finish-status="success" simple>
                <el-step 
                  v-for="(step, index) in [
                    '初始状态',
                    '知晓阶段',
                    '采纳过程',
                    '稳定状态'
                  ]" 
                  :key="index"
                  :title="step"
                >
                  <template #title>
                    <el-tooltip
                      effect="dark"
                      placement="top"
                    >
                      <template #content>
                        <div class="step-tooltip">
                          <p>{{ [
                            '网络中的节点尚未接触到创新',
                            '部分节点开始知晓创新信息',
                            '创新在网络中快速传播',
                            '网络达到稳定状态'
                          ][index] }}</p>
                          <p v-if="index === teachingStep">
                            {{ 
                              index === 0 ? `当前所有节点未知晓` :
                              index === 1 ? `当前已知晓比例: ${((stateData.aware + stateData.adopted) / nodes.length * 100).toFixed(1)}%` :
                              index === 2 ? `当前采纳比例: ${(stateData.adopted / nodes.length * 100).toFixed(1)}%` :
                              `最终采纳比例: ${(stateData.adopted / nodes.length * 100).toFixed(1)}%`
                            }}
                          </p>
                        </div>
                      </template>
                      <span :class="{ 'current-step': index === teachingStep }">{{ step }}</span>
                    </el-tooltip>
                  </template>
                </el-step>
              </el-steps>
            </div>
          </div>
        </el-card>
        <el-card class="stats-card">
          <template #header>
            <div class="card-header">
              <h3>传播统计</h3>
              <el-switch v-model="autoUpdate" active-text="自动更新"/>
            </div>
          </template>
          <!-- S型增长曲线 -->
          <div ref="growthChart" class="chart-container"></div>
          <!-- 状态分布 -->
          <div ref="stateChart" class="chart-container"></div>
          <!-- 关键指标 -->
          <div class="key-metrics">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="metric-item">
                  <div class="metric-title">传播速度</div>
                  <div class="metric-value">
                    <span class="number">{{ propagationSpeed }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="metric-item">
                  <div class="metric-title">采纳率</div>
                  <div class="metric-value">
                    <span class="number">{{ adoptionRate }}</span>
                    <span class="unit">%</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="metric-item">
                  <div class="metric-title">预计完成</div>
                  <div class="metric-value">
                    <span class="number">{{ estimatedCompletion }}</span>
                    <span class="unit">步</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 结果对话框 -->
    <el-dialog
      v-model="showResultDialog"
      title="模拟结果分析"
      width="60%"
      :modal="true"
      :close-on-click-modal="true"
      :show-close="true"
      destroy-on-close
    >
      <div class="simulation-results">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="result-section">
              <h4>总体统计</h4>
              <ul>
                <li>总步数：{{ simulationResults.totalSteps }} 步</li>
                <li>最终采纳率：{{ simulationResults.adoptionRate }}%</li>
                <li>平均传播速度：{{ simulationResults.averageSpeed }} 节点/步</li>
                <li>增长峰值：第 {{ simulationResults.peakStep }} 步 ({{ simulationResults.peakRate }}%)</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="result-section">
              <h4>关键节点</h4>
              <ul>
                <li v-for="node in simulationResults.influentialNodes" :key="node.id">
                  节点 {{ node.id }}：{{ node.influenceText }}
                  <el-tooltip effect="dark" placement="right">
                    <template #content>
                      <div>
                        <p>影响效率：{{ (node.efficiency * 100).toFixed(1) }}%</p>
                        <p>采纳时间：第{{ node.adoptionTime }}步</p>
                      </div>
                    </template>
                    <el-progress 
                      :percentage="(node.influenced / node.neighbors * 100)" 
                      :format="format => `${format}%`"
                      :stroke-width="10"
                      :status="node.efficiency >= 0.5 ? 'success' : 'warning'"
                    />
                  </el-tooltip>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>

        <div class="result-section" v-if="simulationResults.communityStats.length > 0">
          <h4>社区分析</h4>
          <el-table :data="simulationResults.communityStats" style="width: 100%">
            <el-table-column prop="id" label="社区" width="80" />
            <el-table-column prop="size" label="规模" width="100" />
            <el-table-column prop="adopted" label="采纳数" width="100" />
            <el-table-column prop="adoptionRate" label="采纳率">
              <template #default="{ row }">
                <el-progress 
                  :percentage="Number(row.adoptionRate)"
                  :format="format => `${format}%`"
                  :stroke-width="10"
                  :status="Number(row.adoptionRate) >= 80 ? 'success' : 'warning'"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showResultDialog = false">关闭</el-button>
          <el-button type="primary" @click="resetSimulation">重新开始</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import { ElMessage } from 'element-plus'
import { Monitor, Share, QuestionFilled, Star, Grid } from '@element-plus/icons-vue'

const VIVID_COLORS = [
  '#FF6B35', // 鲜艳橙色
  '#FF1744', // 鲜艳红色  
  '#7C4DFF', // 鲜艳紫色
  '#00BCD4', // 鲜艳青色
  '#4CAF50', // 鲜艳绿色
  '#FF9800', // 鲜艳琥珀色
  '#E91E63', // 鲜艳粉色
  '#2196F3', // 鲜艳蓝色
  '#9C27B0', // 鲜艳紫红色
  '#00E676', // 鲜艳青绿色
  '#FFD600', // 鲜艳黄色
  '#FF5722'  // 鲜艳深橙色
]

export default {
  name: 'NetworkCascade',
  components: {
    Monitor,
    Share,
    QuestionFilled,
    Star,
    Grid
  },
  setup() {
    // 理论部分的展开状态
    const activeTheorySection = ref(['concept'])
    
    // 状态变量
    const networkSize = ref(50)
    const adoptionThreshold = ref(0.2)  // 修改默认值为 0.2
    const propagationDelay = ref(3)
    const seedCount = ref(5)  // 修改默认值为 5
    const visualMode = ref('network')
    const autoUpdate = ref(true)
    const teachingStep = ref(0)
    
    // DOM引用
    const networkContainer = ref(null)
    const growthChart = ref(null)
    const stateChart = ref(null)

    // 模拟数据
    const propagationSpeed = ref(0)
    const adoptionRate = ref(0)
    const estimatedCompletion = ref(0)

    // 常量定义
    const width = 800
    const height = 600
    const NODE_RADIUS = 6
    const LINK_DISTANCE = 50
    const REWIRING_PROBABILITY = 0.3

    // 网络数据结构
    let simulation = null
    let nodes = []
    let links = []
    let svg = null
    let linkElements = null
    let nodeElements = null

    // 模拟控制变量
    const isSimulating = ref(false)
    const simulationStep = ref(0)
    const simulationInterval = ref(null)
    const SIMULATION_SPEED = 1000 // 模拟速度（毫秒）

    // 模拟状态数据
    const stateData = ref({
      unaware: 0,
      aware: 0,
      adopted: 0,
      history: [] // 存储每一步的状态数据
    })

    // 图表尺寸常量
    const CHART_MARGIN = { top: 20, right: 20, bottom: 30, left: 40 }
    const CHART_WIDTH = 300
    const CHART_HEIGHT = 200
    const INNER_WIDTH = CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right
    const INNER_HEIGHT = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom

    // 图表引用
    let growthSvg = null
    let stateSvg = null
    let growthLine = null
    let growthXAxis = null
    let growthYAxis = null
    let pieChart = null

    // 教学功能状态
    const teachingMode = ref('')
    const highlightedNodes = ref(new Set())
    const communityData = ref([])

    // 在 setup 函数中添加对话框相关的状态
    const showResultDialog = ref(false)
    const simulationResults = ref({
      totalSteps: 0,
      adoptionRate: 0,
      averageSpeed: 0,
      peakStep: 0,
      peakRate: 0,
      communityStats: [],
      influentialNodes: []
    })

    // 初始化函数
    onMounted(() => {
      initializeNetwork()
      initializeCharts()
    })

    // 生成小世界网络
    const generateSmallWorldNetwork = () => {
      nodes = []
      links = []
      
      // 创建节点
      for (let i = 0; i < networkSize.value; i++) {
        nodes.push({
          id: i,
          state: 'unaware',
          neighbors: [],
          awarenessTime: null,
          adoptionTime: null,
          delay: Math.floor(Math.random() * propagationDelay.value) + 1
        })
      }

      // 创建规则环形连接
      const k = 4 // 每个节点的初始邻居数
      for (let i = 0; i < networkSize.value; i++) {
        for (let j = 1; j <= k/2; j++) {
          const target = (i + j) % networkSize.value
          links.push({
            source: i,
            target: target,
            id: `${i}-${target}`
          })
          nodes[i].neighbors.push(target)
          nodes[target].neighbors.push(i)
        }
      }

      // 随机重连
      links = links.map(link => {
        if (Math.random() < REWIRING_PROBABILITY) {
          let newTarget
          do {
            newTarget = Math.floor(Math.random() * networkSize.value)
          } while (newTarget === link.source || 
                   nodes[link.source].neighbors.includes(newTarget))
          
          // 更新邻居关系
          const oldTarget = link.target
          nodes[link.source].neighbors = nodes[link.source].neighbors.filter(n => n !== oldTarget)
          nodes[oldTarget].neighbors = nodes[oldTarget].neighbors.filter(n => n !== link.source)
          
          nodes[link.source].neighbors.push(newTarget)
          nodes[newTarget].neighbors.push(link.source)
          
          return {
            source: link.source,
            target: newTarget,
            id: `${link.source}-${newTarget}`
          }
        }
        return link
      })
    }

    // 网络初始化
    const initializeNetwork = () => {
      // 清除现有的SVG
      if (networkContainer.value) {
        d3.select(networkContainer.value).selectAll("*").remove()
      }

      // 生成网络数据
      generateSmallWorldNetwork()

      // 创建SVG元素
      svg = d3.select(networkContainer.value)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', [-width/2, -height/2, width, height])

      // 创建一个容器组来包含所有网络元素
      const container = svg.append('g')

      // 添加缩放功能
      const zoom = d3.zoom()
        .scaleExtent([0.2, 3]) // 设置缩放范围
        .on('zoom', (event) => {
          container.attr('transform', event.transform)
        })

      svg.call(zoom)
        .call(zoom.transform, d3.zoomIdentity) // 设置初始缩放状态

      // 创建箭头标记
      container.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', NODE_RADIUS + 9)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#999')

      // 创建力导向图
      simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links)
          .id(d => d.id)
          .distance(LINK_DISTANCE))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter())
        .force('collision', d3.forceCollide().radius(NODE_RADIUS * 1.5))

      // 添加连接
      linkElements = container.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', '#999')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.6)
        .attr('marker-end', 'url(#arrowhead)')

      // 添加节点
      nodeElements = container.append('g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', NODE_RADIUS)
        .attr('fill', d => getNodeColor(d.state))
        .call(drag(simulation))

      // 添加节点悬停效果
      nodeElements
        .append('title')
        .text(d => `节点 ${d.id}\n状态: ${getStateText(d.state)}\n邻居数: ${d.neighbors.length}`)

      // 更新力导向图
      simulation.on('tick', () => {
        linkElements
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)

        nodeElements
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
      })

      // 添加缩放提示
      const zoomHint = svg.append('text')
        .attr('class', 'zoom-hint')
        .attr('x', -width/2 + 20)
        .attr('y', -height/2 + 30)
        .text('使用鼠标滚轮进行缩放')
        .style('font-size', '14px')
        .style('fill', '#666')
        .style('opacity', 0.8)

      // 3秒后淡出提示
      zoomHint.transition()
        .duration(3000)
        .style('opacity', 0)
        .remove()
    }

    // 拖拽功能
    const drag = (simulation) => {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event) {
        // 获取当前的缩放变换
        const transform = d3.zoomTransform(svg.node())
        // 根据缩放比例调整拖拽位置
        event.subject.fx = (event.x - transform.x) / transform.k
        event.subject.fy = (event.y - transform.y) / transform.k
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }

    // 状态文本转换
    const getStateText = (state) => {
      const stateTexts = {
        'unaware': '未知晓',
        'aware': '已知晓',
        'adopted': '已采纳'
      }
      return stateTexts[state] || '未知'
    }

    // 更新网络
    const updateNetwork = () => {
      if (simulation) {
        simulation.stop()
      }
      initializeNetwork()
    }

    // 获取节点颜色
    const getNodeColor = (state) => {
      const colors = {
        'unaware': '#cccccc',
        'aware': '#ffd700',
        'adopted': '#ff4444'
      }
      return colors[state]
    }

    // 监听网络大小变化
    watch(networkSize, () => {
      updateNetwork()
    })

    // 图表初始化
    const initializeCharts = () => {
      initializeGrowthChart()
      initializeStateChart()
    }

    // 初始化增长曲线图
    const initializeGrowthChart = () => {
      // 清除现有的SVG
      if (growthChart.value) {
        d3.select(growthChart.value).selectAll("*").remove()
      }

      // 创建SVG
      growthSvg = d3.select(growthChart.value)
        .append('svg')
        .attr('width', CHART_WIDTH)
        .attr('height', CHART_HEIGHT)
        .append('g')
        .attr('transform', `translate(${CHART_MARGIN.left},${CHART_MARGIN.top})`)

      // 创建比例尺
      const xScale = d3.scaleLinear()
        .range([0, INNER_WIDTH])
      
      const yScale = d3.scaleLinear()
        .range([INNER_HEIGHT, 0])

      // 创建坐标轴
      growthXAxis = growthSvg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${INNER_HEIGHT})`)

      growthYAxis = growthSvg.append('g')
        .attr('class', 'y-axis')

      // 创建线条生成器
      const lineGenerator = d3.line()
        .x(d => xScale(d.step))
        .y(d => yScale(d.adopted))
        .curve(d3.curveMonotoneX)

      // 添加线条路径
      growthLine = growthSvg.append('path')
        .attr('class', 'growth-line')
        .attr('fill', 'none')
        .attr('stroke', '#409EFF')
        .attr('stroke-width', 2)

      // 添加标题
      growthSvg.append('text')
        .attr('class', 'chart-title')
        .attr('x', INNER_WIDTH / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .text('采纳率增长曲线')

      // 添加坐标轴标签
      growthSvg.append('text')
        .attr('class', 'axis-label')
        .attr('x', INNER_WIDTH / 2)
        .attr('y', INNER_HEIGHT + 25)
        .attr('text-anchor', 'middle')
        .text('步数')

      growthSvg.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -INNER_HEIGHT / 2)
        .attr('y', -30)
        .attr('text-anchor', 'middle')
        .text('采纳节点数')
    }

    // 初始化状态分布图
    const initializeStateChart = () => {
      // 清除现有的SVG
      if (stateChart.value) {
        d3.select(stateChart.value).selectAll("*").remove()
      }

      // 创建SVG
      stateSvg = d3.select(stateChart.value)
        .append('svg')
        .attr('width', CHART_WIDTH)
        .attr('height', CHART_HEIGHT)
        .append('g')
        .attr('transform', `translate(${CHART_WIDTH/2},${CHART_HEIGHT/2})`)

      // 设置饼图半径
      const radius = Math.min(CHART_WIDTH, CHART_HEIGHT) / 2 - 40

      // 创建饼图生成器
      pieChart = d3.pie()
        .value(d => d.value)
        .sort(null)

      // 创建弧形生成器
      const arc = d3.arc()
        .innerRadius(radius * 0.6) // 设置为环形图
        .outerRadius(radius)

      // 添加初始的空弧形
      stateSvg.selectAll('path')
        .data(pieChart([
          { state: 'unaware', value: 1 },
          { state: 'aware', value: 0 },
          { state: 'adopted', value: 0 }
        ]))
        .enter()
        .append('path')
        .attr('class', d => `arc-${d.data.state}`)
        .attr('fill', d => getNodeColor(d.data.state))
        .attr('d', arc)

      // 添加标题
      stateSvg.append('text')
        .attr('class', 'chart-title')
        .attr('y', -radius - 10)
        .attr('text-anchor', 'middle')
        .text('状态分布')

      // 添加中心文本
      stateSvg.append('text')
        .attr('class', 'center-text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
    }

    // 更新增长曲线
    const updateGrowthChart = () => {
      if (!growthSvg || stateData.value.history.length === 0) return

      const data = stateData.value.history

      // 更新比例尺
      const xScale = d3.scaleLinear()
        .domain([0, Math.max(10, d3.max(data, d => d.step))])
        .range([0, INNER_WIDTH])

      const yScale = d3.scaleLinear()
        .domain([0, nodes.length])
        .range([INNER_HEIGHT, 0])

      // 更新坐标轴
      growthXAxis.call(d3.axisBottom(xScale))
      growthYAxis.call(d3.axisLeft(yScale))

      // 更新线条
      const lineGenerator = d3.line()
        .x(d => xScale(d.step))
        .y(d => yScale(d.adopted))
        .curve(d3.curveMonotoneX)

      growthLine
        .datum(data)
        .transition()
        .duration(300)
        .attr('d', lineGenerator)
    }

    // 更新状态分布图
    const updateStateChart = () => {
      if (!stateSvg) return

      const radius = Math.min(CHART_WIDTH, CHART_HEIGHT) / 2 - 40
      const arc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius)

      const data = [
        { state: 'unaware', value: stateData.value.unaware },
        { state: 'aware', value: stateData.value.aware },
        { state: 'adopted', value: stateData.value.adopted }
      ]

      // 更新饼图
      const paths = stateSvg.selectAll('path')
        .data(pieChart(data))

      paths.transition()
        .duration(300)
        .attrTween('d', function(d) {
          const interpolate = d3.interpolate(this._current || d, d)
          this._current = interpolate(0)
          return function(t) {
            return arc(interpolate(t))
          }
        })

      // 更新中心文本
      const total = nodes.length
      const adoptedPercentage = ((stateData.value.adopted / total) * 100).toFixed(1)
      stateSvg.select('.center-text')
        .text(`${adoptedPercentage}%`)
    }

    // 扩展updateStateData函数
    const updateStateData = () => {
      const counts = nodes.reduce((acc, node) => {
        acc[node.state]++
        return acc
      }, { unaware: 0, aware: 0, adopted: 0 })

      stateData.value = {
        ...counts,
        history: [...stateData.value.history, {
          step: simulationStep.value,
          ...counts
        }]
      }

      // 更新图表
      updateGrowthChart()
      updateStateChart()
    }

    // 监听自动更新开关
    watch(autoUpdate, (newValue) => {
      if (newValue && isSimulating.value) {
        updateStateData()
      }
    })

    // 开始模拟
    const startSimulation = () => {
      if (isSimulating.value) return

      // 如果是重新开始，先重置
      if (simulationStep.value === 0) {
        // 选择初始种子节点
        const seedNodes = selectSeedNodes()
        initializeSeeds(seedNodes)
      }

      isSimulating.value = true
      simulationInterval.value = setInterval(() => {
        const hasChanges = simulateOneStep()
        if (!hasChanges) {
          pauseSimulation()
          ElMessage.success('模拟完成！')
        }
      }, SIMULATION_SPEED)
    }

    // 暂停模拟
    const pauseSimulation = () => {
      if (!isSimulating.value) return
      
      isSimulating.value = false
      if (simulationInterval.value) {
        clearInterval(simulationInterval.value)
        simulationInterval.value = null
      }
      
      // 如果模拟已经开始且有节点采纳，设置为稳定状态
      if (simulationStep.value > 0 && stateData.value.adopted > 0) {
        teachingStep.value = 3
        updateVisualization()
      }
    }

    // 重置模拟
    const resetSimulation = () => {
      pauseSimulation()
      simulationStep.value = 0
      
      // 重置节点状态
      nodes.forEach(node => {
        node.state = 'unaware'
        node.awarenessTime = null
        node.adoptionTime = null
        node.delay = Math.floor(Math.random() * propagationDelay.value) + 1
      })

      // 更新可视化
      updateVisualization()
      
      // 重置统计数据
      stateData.value = {
        unaware: nodes.length,
        aware: 0,
        adopted: 0,
        history: []
      }
      
      // 重置教学步骤到初始状态
      teachingStep.value = 0
      
      // 更新指标
      updateMetrics()
      resetTeachingState()
    }

    // 选择种子节点
    const selectSeedNodes = () => {
      const seeds = new Set()
      while (seeds.size < seedCount.value) {
        const randomIndex = Math.floor(Math.random() * nodes.length)
        seeds.add(randomIndex)
      }
      return Array.from(seeds)
    }

    // 初始化种子节点
    const initializeSeeds = (seedNodes) => {
      seedNodes.forEach(nodeId => {
        const node = nodes[nodeId]
        node.state = 'adopted'
        node.adoptionTime = 0
        node.awarenessTime = 0
      })
      updateVisualization()
      updateStateData()
    }

    // 模拟一步
    const simulateOneStep = () => {
      simulationStep.value++
      let hasChanges = false

      // 第一阶段：检查知晓节点是否达到采纳条件
      nodes.forEach(node => {
        if (node.state === 'aware' && 
            simulationStep.value - node.awarenessTime >= node.delay) {
          node.state = 'adopted'
          node.adoptionTime = simulationStep.value
          hasChanges = true
        }
      })

      // 第二阶段：传播给邻居节点
      const newlyAwareNodes = new Set()
      nodes.forEach(node => {
        if (node.state === 'adopted') {
          node.neighbors.forEach(neighborId => {
            const neighbor = nodes[neighborId]
            if (neighbor.state === 'unaware') {
              const adoptedNeighbors = neighbor.neighbors.filter(nId => 
                nodes[nId].state === 'adopted'
              ).length
              const adoptionRatio = adoptedNeighbors / neighbor.neighbors.length
              
              if (adoptionRatio >= adoptionThreshold.value) {
                newlyAwareNodes.add(neighborId)
              }
            }
          })
        }
      })

      // 更新新知晓的节点
      newlyAwareNodes.forEach(nodeId => {
        const node = nodes[nodeId]
        if (node.state === 'unaware') {
          node.state = 'aware'
          node.awarenessTime = simulationStep.value
          hasChanges = true
        }
      })

      // 更新可视化和统计
      if (hasChanges) {
        updateVisualization()
        updateStateData()
        updateMetrics()
        updateTeachingStep()
      } else {
        // 没有更多变化，进入稳定状态
        teachingStep.value = 3
        updateVisualization()
        updateStateData()
        updateMetrics()
        
        // 计算最终的模拟结果
        calculateSimulationResults()
        
        // 显示结果对话框
        showResultDialog.value = true
        
        // 停止模拟
        pauseSimulation()
      }

      return hasChanges
    }

    // 更新可视化
    const updateVisualization = () => {
      if (!nodeElements || !linkElements) return

      // 更新节点样式
      nodeElements
        .transition()
        .duration(300)
        .attr('fill', d => {
          if (visualMode.value === 'community') {
            const communityInfo = communityData.value.find(c => c.nodeId === d.id)
            if (communityInfo) {
              return VIVID_COLORS[(communityInfo.community - 1) % VIVID_COLORS.length]
            }
            return '#ccc'
          } else {
            return getNodeColor(d.state)
          }
        })
        .attr('r', d => {
          const baseRadius = visualMode.value === 'community' 
            ? NODE_RADIUS + (d.neighbors.length / 2)
            : NODE_RADIUS
          return d.state === 'adopted' ? baseRadius * 1.2 : baseRadius
        })
        .attr('stroke', d => {
          if (visualMode.value === 'community') {
            switch(d.state) {
              case 'adopted':
                return '#ff4444'
              case 'aware':
                return '#ffd700'
              default:
                return '#fff'
            }
          }
          return highlightedNodes.value.has(d.id) ? '#000' : 'none'
        })
        .attr('stroke-width', d => {
          if (visualMode.value === 'community') {
            return d.state === 'unaware' ? 1 : 2
          }
          return highlightedNodes.value.has(d.id) ? 2 : 0
        })

      // 更新连接样式
      linkElements
        .transition()
        .duration(300)
        .attr('stroke', d => {
          if (visualMode.value === 'community') {
            const sourceCommunity = communityData.value.find(c => c.nodeId === d.source.id)?.community
            const targetCommunity = communityData.value.find(c => c.nodeId === d.target.id)?.community
            if (sourceCommunity === targetCommunity) {
              return VIVID_COLORS[(sourceCommunity - 1) % VIVID_COLORS.length]
            }
            return '#ddd'
          }
          return '#999'
        })
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.6)

      // 更新图例
      const legendContainer = d3.select('.legend')
      legendContainer.selectAll('*').remove()

      if (visualMode.value === 'community') {
        // 获取所有社区编号并排序
        const uniqueCommunities = [...new Set(communityData.value.map(d => d.community))].sort((a, b) => a - b)
        
        const legendWrapper = legendContainer.append('div')
          .attr('class', 'legend-wrapper')
          .style('display', 'flex')
          .style('gap', '20px')
          .style('justify-content', 'center')
          .style('align-items', 'center')
          .style('background-color', 'white')
          .style('padding', '8px 16px')
          .style('border-radius', '4px')
          .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')

        uniqueCommunities.forEach(community => {
          const legendItem = legendWrapper.append('div')
            .attr('class', 'legend-item')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('gap', '8px')

          // 创建一个SVG来显示节点示意图
          const nodeSvg = legendItem.append('svg')
            .attr('width', '40')
            .attr('height', '30')
            .style('overflow', 'visible')

          // 添加连接示意
          nodeSvg.append('line')
            .attr('x1', '5')
            .attr('y1', '15')
            .attr('x2', '35')
            .attr('y2', '15')
            .attr('stroke', VIVID_COLORS[(community - 1) % VIVID_COLORS.length])
            .attr('stroke-width', '2')
            .attr('stroke-opacity', '0.6')

          // 添加两个节点示意
          nodeSvg.append('circle')
            .attr('cx', '10')
            .attr('cy', '15')
            .attr('r', '6')
            .attr('fill', VIVID_COLORS[(community - 1) % VIVID_COLORS.length])
            .style('stroke', 'white')
            .style('stroke-width', '2')

          nodeSvg.append('circle')
            .attr('cx', '30')
            .attr('cy', '15')
            .attr('r', '6')
            .attr('fill', VIVID_COLORS[(community - 1) % VIVID_COLORS.length])
            .style('stroke', 'white')
            .style('stroke-width', '2')

          // 添加社区文字
          legendItem.append('span')
            .style('font-size', '14px')
            .style('color', '#333')
            .text(`社区 ${community}`)

          // 添加分隔符（除了最后一项）
          if (community !== uniqueCommunities[uniqueCommunities.length - 1]) {
            legendWrapper.append('div')
              .style('width', '1px')
              .style('height', '30px')
              .style('background-color', '#ddd')
          }
        })

        // 添加状态说明
        const stateIndicator = legendContainer.append('div')
          .attr('class', 'state-indicator')
          .style('margin-top', '10px')
          .style('display', 'flex')
          .style('justify-content', 'center')
          .style('gap', '20px')
          .style('background-color', 'white')
          .style('padding', '8px 16px')
          .style('border-radius', '4px')
          .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')

        // 添加状态示例
        const states = [
          { label: '未知晓', opacity: 0.5 },
          { label: '已知晓', opacity: 0.8 },
          { label: '已采纳', opacity: 1 }
        ]

        states.forEach(({ label, opacity }) => {
          const stateItem = stateIndicator.append('div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('gap', '8px')

          const stateSvg = stateItem.append('svg')
            .attr('width', '20')
            .attr('height', '20')

          stateSvg.append('circle')
            .attr('cx', '10')
            .attr('cy', '10')
            .attr('r', '6')
            .attr('fill', '#666')
            .style('opacity', opacity)
            .style('stroke', 'white')
            .style('stroke-width', '2')

          stateItem.append('span')
            .style('font-size', '12px')
            .style('color', '#666')
            .text(label)
        })
      } else {
        // 在网络视图模式下显示状态图例
        const states = [
          { state: 'unaware', label: '未知晓', color: '#cccccc' },
          { state: 'aware', label: '已知晓', color: '#ffd700' },
          { state: 'adopted', label: '已采纳', color: '#ff4444' }
        ]

        const legendWrapper = legendContainer.append('div')
          .attr('class', 'legend-wrapper')
          .style('display', 'flex')
          .style('gap', '20px')
          .style('justify-content', 'center')
          .style('align-items', 'center')
          .style('background-color', 'white')
          .style('padding', '8px 16px')
          .style('border-radius', '4px')
          .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')

        states.forEach(({ state, label, color }) => {
          const legendItem = legendWrapper.append('div')
            .attr('class', 'legend-item')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('gap', '8px')

          // 添加颜色示意圆点
          legendItem.append('div')
            .attr('class', 'legend-color')
            .style('width', '16px')
            .style('height', '16px')
            .style('border-radius', '50%')
            .style('background-color', color)
            .style('border', '2px solid white')
            .style('box-shadow', '0 0 2px rgba(0,0,0,0.2)')

          // 添加状态文字
          legendItem.append('span')
            .style('font-size', '14px')
            .style('color', '#333')
            .text(label)

          // 添加分隔符（除了最后一项）
          if (state !== 'adopted') {
            legendWrapper.append('div')
              .style('width', '1px')
              .style('height', '20px')
              .style('background-color', '#ddd')
          }
        })
      }
    }

    // 更新关键指标
    const updateMetrics = () => {
      // 计算传播速度（每步平均新增采纳节点数）
      const adoptedCount = stateData.value.adopted
      propagationSpeed.value = simulationStep.value > 0 
        ? (adoptedCount / simulationStep.value).toFixed(2)
        : 0

      // 计算采纳率
      adoptionRate.value = ((adoptedCount / nodes.length) * 100).toFixed(1)

      // 预估完成步数
      if (adoptedCount > 0 && adoptedCount < nodes.length) {
        const rate = adoptedCount / simulationStep.value
        estimatedCompletion.value = Math.ceil((nodes.length - adoptedCount) / rate)
      } else {
        estimatedCompletion.value = 0
      }
    }

    // 更新教学步骤
    const updateTeachingStep = () => {
      // 如果模拟已经结束，保持在稳定状态
      if (!isSimulating.value && simulationStep.value > 0 && stateData.value.adopted > 0) {
        teachingStep.value = 3
        return
      }

      const { unaware, aware, adopted } = stateData.value
      const total = nodes.length
      const awareRatio = (aware + adopted) / total
      const adoptedRatio = adopted / total

      if (simulationStep.value === 0 || unaware === total) {
        teachingStep.value = 0 // 初始状态
      } else if (awareRatio > 0 && adoptedRatio < 0.1) {
        teachingStep.value = 1 // 知晓阶段
      } else if (adoptedRatio >= 0.1 && adoptedRatio < 0.8) {
        teachingStep.value = 2 // 采纳过程
      } else {
        teachingStep.value = 3 // 稳定状态
      }
    }

    // 监听参数变化
    watch([adoptionThreshold, propagationDelay], () => {
      if (!isSimulating.value) {
        resetSimulation()
      }
    })

    // 教学功能函数
    const highlightInfluencers = () => {
      if (teachingMode.value === 'influencers') {
        // 取消高亮
        teachingMode.value = ''
        highlightedNodes.value.clear()
      } else {
        teachingMode.value = 'influencers'
        // 计算节点影响力
        const influencers = calculateInfluencers()
        highlightedNodes.value = new Set(influencers)
      }
      updateVisualization()
    }

    // 计算影响力节点
    const calculateInfluencers = () => {
      // 计算每个节点的影响力指标
      const influence = nodes.map((node, index) => {
        const metrics = {
          degree: node.neighbors.length,
          adoptedNeighbors: node.neighbors.filter(n => nodes[n].state === 'adopted').length,
          awarenessTime: node.awarenessTime || Infinity,
          adoptionTime: node.adoptionTime || Infinity
        }
        
        // 综合评分
        const score = (metrics.degree * 0.3) + 
                     (metrics.adoptedNeighbors * 0.4) + 
                     (metrics.awarenessTime === Infinity ? 0 : (1 / metrics.awarenessTime) * 0.3)
        
        return { index, score }
      })

      // 返回前20%的高影响力节点
      return influence
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(1, Math.floor(nodes.length * 0.2)))
        .map(n => n.index)
    }

    // 切换社区视图
    const toggleCommunityView = () => {
      if (visualMode.value === 'community') {
        // 如果已经在社区视图，切换回网络视图
        visualMode.value = 'network'
        teachingMode.value = ''
      } else {
        // 切换到社区视图
        visualMode.value = 'community'
        teachingMode.value = 'community'
        if (communityData.value.length === 0) {
          detectCommunities()
        }
      }
      // 添加提示信息
      ElMessage({
        message: visualMode.value === 'network' 
          ? '已切换到网络视图，展示节点的传播状态' 
          : '已切换到社区视图，展示网络的社区结构',
        type: 'info'
      })
      updateVisualization()
    }

    // 社区检测
    const detectCommunities = () => {
      // 使用改进的社区检测算法
      const communities = new Map()
      const nodeDegrees = new Map()
      const modularity = new Map()
      
      // 计算节点度数和初始化社区
      nodes.forEach((node, i) => {
        nodeDegrees.set(i, node.neighbors.length)
        communities.set(i, i) // 初始时每个节点是独立社区
        modularity.set(i, 0)
      })

      // 计算总边数
      const totalEdges = links.length * 2 // 无向图中每个边计算两次

      // 计算节点的社区得分
      const calculateModularity = (nodeId, communityId) => {
        let score = 0
        const nodeNeighbors = nodes[nodeId].neighbors
        
        // 计算节点与社区内其他节点的连接强度
        nodeNeighbors.forEach(neighborId => {
          if (communities.get(neighborId) === communityId) {
            score += 1
          }
        })

        // 考虑节点度数的影响
        const penalty = (nodeDegrees.get(nodeId) * nodeDegrees.get(communityId)) / totalEdges
        return score - penalty
      }

      // 迭代优化社区结构
      const maxIterations = 5
      for (let iter = 0; iter < maxIterations; iter++) {
        let changed = false
        
        // 随机打乱节点顺序
        const shuffledNodes = [...nodes.keys()].sort(() => Math.random() - 0.5)
        
        for (const i of shuffledNodes) {
          const currentCommunity = communities.get(i)
          let bestCommunity = currentCommunity
          let bestModularity = calculateModularity(i, currentCommunity)
          
          // 检查邻居所在的社区
          const neighborCommunities = new Set()
          nodes[i].neighbors.forEach(neighborId => {
            neighborCommunities.add(communities.get(neighborId))
          })
          
          // 评估每个候选社区
          neighborCommunities.forEach(candidateCommunity => {
            const modularityGain = calculateModularity(i, candidateCommunity)
            if (modularityGain > bestModularity) {
              bestModularity = modularityGain
              bestCommunity = candidateCommunity
            }
          })
          
          // 如果找到更好的社区，则更新
          if (bestCommunity !== currentCommunity) {
            communities.set(i, bestCommunity)
            changed = true
          }
        }
        
        // 如果没有节点改变社区，则提前结束
        if (!changed) break
      }

      // 重新编号社区，确保编号连续
      const uniqueCommunities = [...new Set(communities.values())]
      const validCommunities = new Set()
      const communitySizes = new Map()
      
      // 计算每个社区的大小
      communities.forEach((communityId) => {
        communitySizes.set(communityId, (communitySizes.get(communityId) || 0) + 1)
      })

      // 按社区大小排序，确保大社区获得较小的编号
      const sortedCommunities = [...communitySizes.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => id)

      // 创建新的编号映射（从1开始）
      const communityMap = new Map()
      let newId = 1
      sortedCommunities.forEach(oldId => {
        const size = communitySizes.get(oldId)
        if (size >= Math.max(3, Math.floor(nodes.length * 0.05))) {
          communityMap.set(oldId, newId++)
          validCommunities.add(oldId)
        }
      })

      // 处理小社区的节点
      communities.forEach((oldCommunityId, nodeId) => {
        if (!validCommunities.has(oldCommunityId)) {
          // 将节点分配到最相连的有效社区
          let bestCommunity = null
          let maxConnections = -1
          
          nodes[nodeId].neighbors.forEach(neighborId => {
            const neighborCommunityId = communities.get(neighborId)
            if (validCommunities.has(neighborCommunityId)) {
              const connections = nodes[nodeId].neighbors.filter(n => 
                communities.get(n) === neighborCommunityId
              ).length
              if (connections > maxConnections) {
                maxConnections = connections
                bestCommunity = neighborCommunityId
              }
            }
          })
          
          if (bestCommunity !== null) {
            communities.set(nodeId, bestCommunity)
          } else {
            // 如果没有连接到任何有效社区，分配到最大的社区
            communities.set(nodeId, sortedCommunities[0])
          }
        }
      })

      // 更新社区数据
      communityData.value = Array.from(communities.entries()).map(([nodeId, oldCommunityId]) => ({
        nodeId,
        community: communityMap.get(oldCommunityId)
      }))
    }

    // 重置教学状态
    const resetTeachingState = () => {
      teachingMode.value = ''
      visualMode.value = 'network' // 重置时切换回网络视图
      highlightedNodes.value.clear()
      communityData.value = []
      updateVisualization()
    }

    // 视图切换处理
    const handleViewChange = (newMode) => {
      visualMode.value = newMode
      if (newMode === 'community') {
        // 切换到社区视图时，同步更新教学模式
        teachingMode.value = 'community'
        if (communityData.value.length === 0) {
          detectCommunities()
        }
      } else {
        // 切换回网络视图时，清除教学模式
        teachingMode.value = ''
      }
      updateVisualization()
    }

    // 监听视图模式变化
    watch(visualMode, handleViewChange)

    // 添加计算模拟结果的方法
    const calculateSimulationResults = () => {
      const { history, adopted } = stateData.value
      const total = nodes.length

      // 计算采纳率变化
      const adoptionRates = history.map(h => h.adopted / total)
      
      // 找出增长最快的时期
      const rateChanges = adoptionRates.map((rate, i) => 
        i > 0 ? rate - adoptionRates[i-1] : rate
      )
      const peakChangeIndex = rateChanges.indexOf(Math.max(...rateChanges))

      // 计算社区统计
      const communityStats = []
      if (communityData.value.length > 0) {
        const communitySizes = new Map()
        const communityAdopted = new Map()
        
        communityData.value.forEach(({ nodeId, community }) => {
          communitySizes.set(community, (communitySizes.get(community) || 0) + 1)
          if (nodes[nodeId].state === 'adopted') {
            communityAdopted.set(community, (communityAdopted.get(community) || 0) + 1)
          }
        })
        
        communitySizes.forEach((size, community) => {
          communityStats.push({
            id: community,
            size,
            adopted: communityAdopted.get(community) || 0,
            adoptionRate: ((communityAdopted.get(community) || 0) / size * 100).toFixed(1)
          })
        })
      }

      // 计算节点影响力
      const nodeInfluence = nodes.map((node, index) => {
        // 如果节点未采纳，不计算影响力
        if (!node.adoptionTime) return null

        // 直接影响：计算在此节点采纳后知晓或采纳的邻居数量
        const directInfluence = node.neighbors.filter(nId => {
          const neighbor = nodes[nId]
          // 邻居在此节点采纳后知晓或采纳
          return (neighbor.awarenessTime && neighbor.awarenessTime > node.adoptionTime) ||
                 (neighbor.adoptionTime && neighbor.adoptionTime > node.adoptionTime)
        })

        // 计算影响力得分
        const influenceScore = directInfluence.reduce((score, nId) => {
          const neighbor = nodes[nId]
          // 根据影响类型给予不同权重
          if (neighbor.adoptionTime && neighbor.adoptionTime > node.adoptionTime) {
            // 如果邻居最终采纳，给予更高权重
            const timeGap = neighbor.adoptionTime - node.adoptionTime
            // 时间间隔越短，影响力越大
            score += 1 + 1 / (1 + timeGap * 0.1)
          } else if (neighbor.awarenessTime && neighbor.awarenessTime > node.adoptionTime) {
            // 如果邻居只是知晓，给予基础权重
            score += 0.5
          }
          return score
        }, 0)

        return {
          id: index,
          adoptionTime: node.adoptionTime,
          neighbors: node.neighbors.length,
          influenced: directInfluence.length,
          influenceScore: influenceScore,
          // 计算影响效率（影响邻居比例）
          efficiency: directInfluence.length / node.neighbors.length,
          // 统计影响的具体结果
          influenceDetails: {
            adopted: directInfluence.filter(nId => nodes[nId].adoptionTime > node.adoptionTime).length,
            aware: directInfluence.filter(nId => 
              nodes[nId].awarenessTime > node.adoptionTime && 
              (!nodes[nId].adoptionTime || nodes[nId].adoptionTime > node.adoptionTime)
            ).length
          }
        }
      }).filter(Boolean) // 移除未采纳节点的null值

      // 根据综合得分排序
      const influentialNodes = nodeInfluence
        .sort((a, b) => b.influenceScore - a.influenceScore)
        .slice(0, 5)
        .map(node => ({
          ...node,
          // 添加影响详情的文字描述
          influenceText: `影响了${node.influenced}个邻居 (采纳${node.influenceDetails.adopted}个, 知晓${node.influenceDetails.aware}个)`
        }))

      // 更新结果
      simulationResults.value = {
        totalSteps: simulationStep.value,
        adoptionRate: (adopted / total * 100).toFixed(1),
        averageSpeed: (adopted / simulationStep.value).toFixed(2),
        peakStep: peakChangeIndex,
        peakRate: (rateChanges[peakChangeIndex] * 100).toFixed(1),
        communityStats,
        influentialNodes
      }
    }

    return {
      // 状态
      networkSize,
      adoptionThreshold,
      propagationDelay,
      seedCount,
      visualMode,
      autoUpdate,
      teachingStep,
      propagationSpeed,
      adoptionRate,
      estimatedCompletion,
      activeTheorySection,
      
      // DOM引用
      networkContainer,
      growthChart,
      stateChart,

      // 方法
      startSimulation,
      pauseSimulation,
      resetSimulation,
      highlightInfluencers,
      toggleCommunityView,
      updateNetwork,
      getNodeColor,
      getStateText,
      isSimulating,
      simulationStep,
      stateData,
      teachingMode,
      communityData,
      handleViewChange,

      // 对话框相关的状态
      showResultDialog,
      simulationResults
    }
  }
}
</script>

<style scoped>
.network-cascade-container {
  padding: 20px;
  background-color: #fff;
}

/* 理论卡片基础样式 */
.theory-card {
  margin-bottom: 20px;
}

.theory-header h1 {
  font-size: 32px !important;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #303133;
}

.theory-content h3 {
  font-size: 24px !important;
  margin: 15px 0;
  color: #303133;
}

.theory-text {
  font-size: 18px !important;
  line-height: 1.8;
  margin: 15px 0;
  color: #606266;
}

.theory-list li {
  font-size: 18px !important;
  margin: 12px 0;
  padding-left: 25px;
  line-height: 1.8;
}

.theory-list li strong {
  font-size: 18px !important;
  color: #409EFF;
}

.cascade-illustration {
  padding: 15px;
}

.cascade-boxes {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.cascade-box {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #e4e7ed;
}

.cascade-box h4 {
  margin: 0 0 10px 0;
  color: #409EFF;
}

.cascade-box p {
  margin: 5px 0;
  color: #606266;
}

.arrow {
  text-align: center;
  color: #409EFF;
  font-size: 20px;
}

/* 网络类型卡片样式 */
.network-type-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  height: 100%;
  border: 1px solid #e4e7ed;
}

.network-type-card h3 {
  font-size: 24px !important;
  margin: 0 0 15px 0;
  color: #303133;
}

.algorithm-name {
  font-size: 20px !important;
  color: #409EFF;
  font-weight: 600;
  margin: 10px 0 20px 0;
}

.network-features h4 {
  font-size: 22px !important;
  margin: 20px 0 15px 0;
  color: #303133;
}

.network-features li {
  font-size: 18px !important;
  margin: 12px 0;
  color: #606266;
  line-height: 1.8;
}

.network-features strong {
  font-size: 18px !important;
  color: #409EFF;
}

/* 卡片样式 */
.el-card {
  background: #fff !important;
  border: 1px solid #e4e7ed !important;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease;
}

.el-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

/* 折叠面板样式 */
.theory-collapse {
  border: none;
}

:deep(.el-collapse-item__header) {
  font-size: 20px !important;  /* 增大折叠面板标题字体 */
  font-weight: 600;
  color: #303133;
  padding: 20px 0;
  line-height: 1.6;
}

:deep(.el-collapse-item__header i) {
  font-size: 20px !important;  /* 增大箭头图标大小 */
  margin-right: 15px;
}

:deep(.el-collapse-item__content) {
  padding: 25px;
}

/* 保持其他现有样式不变 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.control-buttons {
  display: flex;
  gap: 10px;
}

/* 表单元素样式 */
.el-form-item {
  margin-bottom: 20px;
}

.el-slider__runway {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.el-slider__bar {
  background-color: #409EFF !important;
}

/* 按钮样式 */
.el-button {
  border-radius: 12px !important;  /* 增大圆角 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.el-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.el-button:active {
  transform: translateY(1px) scale(0.98);
}

/* 主要按钮样式 */
.el-button--primary {
  background: linear-gradient(135deg, #409EFF, #2c89ff) !important;
  border: none !important;
}

.el-button--primary:hover {
  background: linear-gradient(135deg, #66b1ff, #409EFF) !important;
}

/* 警告按钮样式 */
.el-button--warning {
  background: linear-gradient(135deg, #E6A23C, #d48b1f) !important;
  border: none !important;
}

.el-button--warning:hover {
  background: linear-gradient(135deg, #ebb563, #E6A23C) !important;
}

/* 默认按钮样式 */
.el-button--default {
  background: linear-gradient(135deg, #ffffff, #f5f7fa) !important;
  border: 2px solid #dcdfe6 !important;
}

.el-button--default:hover {
  border-color: #409EFF !important;
  color: #409EFF !important;
}

/* 按钮内容布局 */
.el-button {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
}

/* 按钮图标样式 */
.el-button i {
  transition: transform 0.3s ease !important;
}

.el-button:hover i {
  transform: scale(1.2) !important;
}

/* 禁用状态样式 */
.el-button.is-disabled {
  opacity: 0.7 !important;
  cursor: not-allowed !important;
  background: #f5f7fa !important;
  border-color: #e4e7ed !important;
  color: #c0c4cc !important;
}

/* 波纹效果 */
.el-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease-out, height 0.6s ease-out;
}

.el-button:active::after {
  width: 200%;
  height: 200%;
  opacity: 0;
}

/* 特殊按钮组样式 */
.el-button-group {
  display: inline-flex !important;
  gap: 8px !important;
}

.el-button-group .el-button {
  border-radius: 12px !important;
}

/* 控制面板按钮特殊样式 */
.control-buttons .el-button {
  min-width: 120px !important;
}

/* 教学工具按钮特殊样式 */
.teaching-tools .el-button {
  height: 48px !important;
  font-size: 16px !important;
}

.teaching-tools .el-button .el-icon {
  font-size: 20px !important;
}

/* 加载状态动画 */
.el-button.is-loading {
  position: relative;
  pointer-events: none;
}

.el-button.is-loading::before {
  content: '';
  position: absolute;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

/* 图标悬停效果 */
.el-icon-connection,
.el-icon-cpu,
.el-icon-setting,
.el-icon-share,
.el-icon-pie-chart,
.el-icon-data-line,
.el-icon-magic-stick {
  transition: all 0.3s ease;
  cursor: pointer;
}

.el-icon-connection:hover {
  color: #FFD700 !important;
  transform: scale(1.2) rotate(10deg);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.el-icon-cpu:hover {
  color: #ff6b6b !important;
  transform: scale(1.2);
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
}

.el-icon-setting:hover {
  color: #4ecdc4 !important;
  transform: scale(1.2) rotate(45deg);
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
}

/* 图表容器样式 */
.chart-container {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  min-height: 200px;
}

/* 图例样式 */
.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

/* 提示框样式 */
.el-tooltip__popper {
  background: rgba(0, 0, 0, 0.9) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(5px);
  max-width: 300px;
  line-height: 1.5;
}

/* 网络可视化容器样式 */
.network-container {
  height: 500px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
}

/* 统计卡片样式 */
.stats-card {
  margin-bottom: 20px;
}

/* 教学工具样式 */
.teaching-tools {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 步骤条样式 */
.el-steps {
  margin-top: 15px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.el-step__title {
  color: #606266 !important;
}

.el-step__title.is-process {
  color: #409EFF !important;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-content .el-col {
    width: 100% !important;
    margin-bottom: 20px;
  }
  
  .network-container {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .network-cascade-container {
    padding: 10px;
  }
  
  .card-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .control-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .network-container {
    height: 300px;
  }
  
  .chart-container {
    min-height: 150px;
  }
}

/* D3图表tooltip样式 */
.d3-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.4;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  z-index: 1000;
  max-width: 250px;
}

/* 图表悬停效果 */
.chart svg {
  overflow: visible;
}

.chart .bar,
.chart .arc path {
  transition: all 0.2s ease;
}

.legend-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 16px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid #e4e7ed;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  font-size: 13px;
  color: #606266;
  font-weight: 500;
}

.state-indicator {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 8px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e4e7ed;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  flex-shrink: 0;
}

.key-metrics {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-top: 10px;
  height: auto;
}

.key-metrics .el-row {
  margin: 0;
}

.key-metrics .el-col {
  padding: 0 5px;
}

.metric-item {
  text-align: center;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60px;
}

.metric-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  white-space: nowrap;
  text-align: center;
}

.metric-value {
  font-size: 20px;
  font-weight: bold;
  color: #409EFF;
  line-height: 1;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.metric-value .number {
  line-height: 1;
  display: inline-block;
}

.metric-value .unit {
  font-size: 14px;
  margin-left: 2px;
  line-height: 1;
}

.teaching-tools {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
}

.teaching-tools .el-button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 5px;  /* 减小底部边距 */
}

.teaching-tools .el-button {
  flex: 1;
  max-width: 180px;  /* 增加按钮最大宽度 */
  height: 48px;  /* 增加按钮高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;  /* 增大按钮文字大小 */
  padding: 12px 20px;  /* 增加按钮内边距 */
}

.teaching-tools .el-button .el-icon {
  font-size: 20px;  /* 增大图标大小 */
}

.teaching-progress {
  margin-top: 10px;  /* 减小顶部边距 */
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.node-transition {
  transition: all 0.3s ease;
}

.link-transition {
  transition: all 0.3s ease;
}

.growth-line {
  fill: none;
  stroke-width: 2;
}

.x-axis, .y-axis {
  font-size: 12px;
}

.chart-title {
  font-size: 14px;
  font-weight: bold;
}

.axis-label {
  font-size: 12px;
  fill: #666;
}

.center-text {
  font-size: 24px;
  font-weight: bold;
  fill: #409EFF;
}

.arc-unaware { fill: #cccccc; }
.arc-aware { fill: #ffd700; }
.arc-adopted { fill: #ff4444; }

.node-label {
  font-size: 12px;
  pointer-events: none;
  fill: #333;
}

.teaching-tools .el-button {
  position: relative;
  overflow: hidden;
}

.teaching-tools .el-button.active {
  background-color: #409EFF;
  color: white;
}

.teaching-tools .el-button:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}

.el-steps {
  margin-top: 15px;
}

.view-icon {
  margin-right: 4px;
  vertical-align: middle;
}

.el-radio-button {
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
}

.el-tooltip__content {
  max-width: 300px;
  line-height: 1.5;
}

.el-tooltip__content p {
  margin: 8px 0;
}

.el-tooltip__content b {
  color: #409EFF;
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.help-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  font-size: 12px;
}

.community-help {
  padding: 8px;
  max-width: 400px;
}

.community-help h4 {
  margin: 12px 0 8px;
  color: #409EFF;
  font-size: 14px;
}

.community-help p {
  margin: 8px 0;
  line-height: 1.5;
  color: #606266;
}

.community-help ul {
  margin: 8px 0;
  padding-left: 16px;
  color: #606266;
}

.community-help li {
  margin: 4px 0;
  line-height: 1.4;
}

.community-help b {
  color: #409EFF;
}

.cascade-help {
  padding: 12px;
  max-width: 400px;
}

.cascade-help h4 {
  margin: 12px 0 8px;
  color: #409EFF;
  font-size: 14px;
}

.cascade-help p {
  margin: 8px 0;
  line-height: 1.5;
  color: #606266;
}

.cascade-help ul {
  margin: 8px 0;
  padding-left: 16px;
  color: #606266;
}

.cascade-help li {
  margin: 4px 0;
  line-height: 1.4;
}

.cascade-help b {
  color: #409EFF;
}

.teaching-progress {
  margin-top: 20px;
}

.step-tooltip {
  padding: 8px;
  max-width: 200px;
}

.step-tooltip p {
  margin: 4px 0;
  line-height: 1.4;
}

.current-step {
  color: #409EFF;
  font-weight: bold;
}

.simulation-results {
  padding: 20px;
}

.result-section {
  margin-bottom: 24px;
}

.result-section h4 {
  margin: 0 0 16px;
  color: #409EFF;
  font-size: 16px;
}

.result-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-section li {
  margin: 8px 0;
  line-height: 1.5;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-content .el-col:first-child {
    width: 100% !important;
    margin-bottom: 20px;
  }
  
  .main-content .el-col:last-child {
    width: 100% !important;
  }
  
  .network-container {
    height: 350px;
  }
  
  .visualization-card {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .network-cascade-container {
    padding: 10px;
  }
  
  .control-panel .el-col {
    margin-bottom: 10px;
  }
  
  .control-panel .el-row {
    margin: 0 -5px;
  }
  
  .control-panel .el-col {
    padding: 0 5px;
  }
  
  .network-container {
    height: 250px;
  }
  
  .visualization-card {
    min-height: 300px;
  }
  
  .chart-container {
    padding: 8px;
    height: 150px;
  }
  
  .key-metrics {
    padding: 8px;
    height: auto;
  }
  
  .metric-item {
    padding: 4px;
    min-height: 50px;
  }
  
  .metric-value {
    font-size: 18px;
  }
  
  .metric-value .number {
    font-size: 18px;
  }
  
  .metric-value .unit {
    font-size: 12px;
  }
  
  .teaching-tools {
    padding: 8px;
    gap: 10px;
  }
  
  .teaching-tools .el-button {
    font-size: 11px;
    padding: 6px 8px;
  }
}

@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .control-buttons {
    width: 100%;
    justify-content: flex-end;
  }
  
  .view-controls {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  
  .legend-wrapper {
    flex-direction: column;
    gap: 10px;
  }
  
  .network-container {
    height: 250px;
  }
}

/* 控制面板样式 */
.control-panel {
  margin-bottom: 40px !important;
}

/* 控制面板卡片样式 */
.control-card {
  background: #fff !important;
}

.control-card .card-header h3 {
  font-size: 24px !important;  /* 增大标题字体 */
  font-weight: 600;
}

/* 表单元素样式 */
.control-card .el-form-item__label {
  font-size: 18px !important;  /* 增大标签文字 */
  line-height: 2;
  font-weight: 500;
}

.control-card .el-slider__input-number {
  font-size: 16px !important;  /* 增大数字输入框字体 */
}

.control-card .el-input-number__decrease,
.control-card .el-input-number__increase {
  font-size: 16px !important;  /* 增大加减按钮字体 */
}

.control-card .el-button {
  font-size: 18px !important;  /* 增大按钮文字 */
  padding: 12px 24px;  /* 增大按钮内边距 */
  height: auto;
}

.control-card .el-slider__marks-text {
  font-size: 16px !important;  /* 增大滑块标记文字 */
}

.control-card .el-form-item {
  margin-bottom: 25px;  /* 增加表单项之间的间距 */
}

/* 视图控制按钮组样式 */
.view-controls {
  display: flex;
  align-items: center;
  gap: 16px !important;
}

.view-controls .el-radio-group {
  display: flex;
  gap: 12px;
}

.el-radio-button__inner {
  border-radius: 12px !important;
  padding: 12px 24px !important;
  font-size: 16px !important;
  height: auto !important;
  line-height: 1.5 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
  border: 2px solid #dcdfe6 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: linear-gradient(135deg, #ffffff, #f5f7fa) !important;
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: linear-gradient(135deg, #409EFF, #2c89ff) !important;
  border-color: transparent !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3) !important;
}

.el-radio-button:first-child .el-radio-button__inner,
.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 12px !important;
}

.el-radio-button__inner:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.el-radio-button__inner:active {
  transform: translateY(1px) scale(0.98);
}

/* 视图按钮图标样式 */
.view-icon {
  font-size: 18px !important;
  margin-right: 6px !important;
  transition: transform 0.3s ease !important;
}

.el-radio-button__inner:hover .view-icon {
  transform: scale(1.2) rotate(10deg) !important;
}

/* 波纹效果 */
.el-radio-button__inner::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease-out, height 0.6s ease-out;
}

.el-radio-button__inner:active::after {
  width: 200%;
  height: 200%;
  opacity: 0;
}

/* 选中状态特效 */
@keyframes selected-pulse {
  0% {
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(64, 158, 255, 0.5);
  }
  100% {
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  }
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  animation: selected-pulse 2s infinite;
}

/* 禁用状态样式 */
.el-radio-button.is-disabled .el-radio-button__inner {
  opacity: 0.7 !important;
  cursor: not-allowed !important;
  background: #f5f7fa !important;
  border-color: #e4e7ed !important;
  color: #c0c4cc !important;
  box-shadow: none !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .view-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .el-radio-button__inner {
    padding: 10px 20px !important;
    font-size: 14px !important;
  }

  .view-icon {
    font-size: 16px !important;
  }
}

/* 添加新的样式 */
.scenario-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  height: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scenario-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.scenario-card h3 {
  font-size: 24px !important;
  margin: 0 0 20px 0;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 8px;
}

.scenario-content h4 {
  font-size: 18px !important;
  margin: 15px 0 10px;
  color: #409EFF;
}

.scenario-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.scenario-content li {
  margin: 8px 0;
  padding-left: 20px;
  position: relative;
  font-size: 16px;
  color: #606266;
}

.scenario-content li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #409EFF;
}

.scenario-content strong {
  color: #409EFF;
}

.scenario-card.positive {
  border-left: 4px solid #67C23A;
}

.scenario-card.negative {
  border-left: 4px solid #F56C6C;
}

.scenario-card.complex {
  border-left: 4px solid #E6A23C;
}

/* 应用卡片样式 */
.application-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  height: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.application-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.app-icon {
  font-size: 32px;
  margin-bottom: 15px;
  text-align: center;
}

.application-card h3 {
  font-size: 20px !important;
  margin: 0 0 15px 0;
  color: #303133;
  text-align: center;
}

.app-content h4 {
  font-size: 16px !important;
  margin: 10px 0;
  color: #409EFF;
}

.app-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.app-content li {
  margin: 6px 0;
  padding-left: 16px;
  position: relative;
  font-size: 14px;
  color: #606266;
}

.app-content li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #409EFF;
}

.app-insight {
  background: #f5f7fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #606266;
  margin-top: auto;
}

.app-insight strong {
  color: #409EFF;
  display: block;
  margin-bottom: 4px;
}
</style>