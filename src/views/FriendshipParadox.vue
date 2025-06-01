<template>
  <div class="friendship-paradox">
    <!-- 理论说明卡片 -->
    <el-card class="theory-card">
      <template #header>
        <div class="theory-header">
          <h1>
            <i class="el-icon-connection"></i> 朋友悖论 (Friendship Paradox)
          </h1>
        </div>
        <p class="developer-signature" style="text-align: center;"> 开发者：丁家超</p>

      </template>

      <el-collapse v-model="activeTheorySection" class="theory-collapse">
        <el-collapse-item name="concept" title="📚 基础概念与机制">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="theory-content">
                <h3>📚 什么是朋友悖论？</h3>
                <p class="theory-text">
                  朋友悖论是指：<strong>平均而言，你的朋友比你拥有更多的朋友</strong>。
                  这个看似矛盾的现象实际上是统计学上的必然结果。
                </p>

                <h3>🔍 悖论的核心机制</h3>
                <ul class="theory-list">
                  <li>
                    <strong>采样偏差</strong
                    >：朋友多的人更容易被选中成为别人的朋友
                  </li>
                  <li>
                    <strong>度分布偏移</strong>：高连接度节点在观察中被过度代表
                  </li>
                  <li><strong>网络效应</strong>：少数"社交明星"影响整体统计</li>
                </ul>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="paradox-illustration">
                <h3>🎯 悖论体现</h3>
                <div class="paradox-boxes">
                  <div class="paradox-box intuition">
                    <h4>直觉预期</h4>
                    <p>我的朋友圈应该是"正常"分布</p>
                    <p>朋友的社交能力与我相似</p>
                  </div>
                  <div class="arrow">⇕</div>
                  <div class="paradox-box reality">
                    <h4>统计现实</h4>
                    <p>朋友平均比我更受欢迎</p>
                    <p>这是网络结构的必然</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        
        <el-collapse-item name="networks" title="🌐 网络类型与算法原理">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="network-type-card random">
                <h3>🎲 随机网络</h3>
                <p class="algorithm-name">Erdős–Rényi 模型</p>
                <div class="network-features">
                  <h4>📊 特征</h4>
                  <ul>
                    <li>度分布：<strong>泊松分布</strong></li>
                    <li>聚类系数：<strong>较低</strong></li>
                    <li>路径长度：<strong>较短</strong></li>
                  </ul>
                  
                  <h4>⚙️ 算法</h4>
                  <p>每对节点以固定概率p独立连接</p>
                  
                  <h4>🌍 现实应用</h4>
                  <ul>
                    <li>理论基准网络</li>
                    <li>完全随机社交</li>
                    <li>传染病早期传播</li>
                  </ul>
                </div>
              </div>
            </el-col>
            
            <el-col :span="8">
              <div class="network-type-card small-world">
                <h3>🌍 小世界网络</h3>
                <p class="algorithm-name">Watts-Strogatz 模型</p>
                <div class="network-features">
                  <h4>📊 特征</h4>
                  <ul>
                    <li>聚类系数：<strong>较高</strong></li>
                    <li>路径长度：<strong>较短</strong></li>
                    <li>局部性+全局性：<strong>兼具</strong></li>
                  </ul>
                  
                  <h4>⚙️ 算法</h4>
                  <p>1. 构建规则环形网络<br>2. 随机重连部分边</p>
                  
                  <h4>🌍 现实应用</h4>
                  <ul>
                    <li>真实社交网络</li>
                    <li>神经网络结构</li>
                    <li>科学合作网络</li>
                  </ul>
                </div>
              </div>
            </el-col>
            
            <el-col :span="8">
              <div class="network-type-card scale-free">
                <h3>📈 无标度网络</h3>
                <p class="algorithm-name">Barabási–Albert 模型</p>
                <div class="network-features">
                  <h4>📊 特征</h4>
                  <ul>
                    <li>度分布：<strong>幂律分布</strong></li>
                    <li>枢纽节点：<strong>少数高度数</strong></li>
                    <li>增长性：<strong>动态演化</strong></li>
                  </ul>
                  
                  <h4>⚙️ 算法</h4>
                  <p>1. 初始完全连接<br>2. 优先连接机制添加节点</p>
                  
                  <h4>🌍 现实应用</h4>
                  <ul>
                    <li>互联网拓扑</li>
                    <li>学术引用网络</li>
                    <li>生物蛋白质网络</li>
                  </ul>
                </div>
              </div>
            </el-col>
          </el-row>
          
          <div class="algorithm-comparison">
            <h3>🔍 朋友悖论在不同网络中的表现</h3>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="paradox-performance random">
                  <h4>随机网络</h4>
                  <p>悖论效应相对<strong>温和</strong>，因为度分布相对均匀</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="paradox-performance small-world">
                  <h4>小世界网络</h4>
                  <p>悖论效应<strong>适中</strong>，局部聚集增强了效应</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="paradox-performance scale-free">
                  <h4>无标度网络</h4>
                  <p>悖论效应<strong>最强</strong>，少数枢纽节点主导统计</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <!-- 主要实验区域 -->
    <el-card>
      <template #header>
        <div class="experiment-header">
          <h2><i class="el-icon-cpu"></i> 交互式验证实验</h2>
          <p>通过网络模拟验证朋友悖论的普遍性</p>
        </div>
      </template>

      <!-- 核心概念说明 -->
      <el-alert
        title="🎯 什么是符合悖论的节点？"
        type="info"
        :closable="false"
        class="concept-alert"
      >
        <template #default>
          <div class="concept-explanation">
            <p>
              <strong>符合悖论的节点</strong>是指那些<span
                class="highlight-text"
                >朋友们的平均度数大于自己度数</span
              >的节点。
            </p>
            <div class="formula-box">
              <p>
                <strong>🧮 计算公式</strong>：如果节点A的朋友平均度数 >
                节点A的度数，则节点A符合朋友悖论
              </p>
              <p>
                <strong>📝 举例说明</strong
                >：节点A有3个朋友，度数为3；这3个朋友的度数分别是5、7、6，平均度数=(5+7+6)/3=6。因为6>3，所以节点A符合悖论。
              </p>
            </div>
          </div>
        </template>
      </el-alert>

      <el-row :gutter="20">
        <!-- 左侧控制面板 -->
        <el-col :span="6">
          <el-card shadow="never" class="control-panel">
            <h3><i class="el-icon-setting"></i> 参数设置</h3>
            <el-form label-width="100px">
              <el-form-item label="节点数量">
                <el-slider
                  v-model="nodeCount"
                  :min="10"
                  :max="100"
                  show-input
                />
                <el-text size="small" type="info"
                  >{{ nodeCount }}个用户</el-text
                >
              </el-form-item>

              <el-form-item label="连接概率">
                <el-slider
                  v-model="probability"
                  :min="0.1"
                  :max="0.9"
                  :step="0.1"
                  show-input
                />
                <el-text size="small" type="info"
                  >{{ (probability * 100).toFixed(0) }}% 连接率</el-text
                >
              </el-form-item>

              <el-form-item label="网络类型">
                <el-select v-model="graphType" @change="generateGraph" placeholder="选择网络生成算法">
                  <el-option 
                    label="随机网络" 
                    value="random"
                    title="Erdős–Rényi随机图：节点间随机连接，度分布服从泊松分布，聚类系数低。代表完全随机的社交网络。" />
                  <el-option 
                    label="小世界网络" 
                    value="small-world"
                    title="Watts-Strogatz小世界网络：高聚类系数+短路径长度，先建规则环形网络再随机重连。代表现实中的社交网络结构。" />
                  <el-option 
                    label="无标度网络" 
                    value="scale-free"
                    title="Barabási–Albert无标度网络：优先连接机制，少数节点度数极高，度分布服从幂律。代表互联网、学术引用等网络。" />
                </el-select>
              </el-form-item>
            </el-form>

            <!-- 实时统计卡片 -->
            <div class="stats-cards">
              <div class="stat-card total">
                <div class="stat-number">{{ nodeCount }}</div>
                <div class="stat-label">总节点数</div>
              </div>

              <div
                class="stat-card paradox"
                :class="{ highlight: paradoxRatio > 50 }"
              >
                <div class="stat-number">{{ paradoxNodes }}</div>
                <div class="stat-label">符合悖论</div>
              </div>

              <div class="stat-card ratio">
                <div class="stat-number">{{ paradoxRatio }}%</div>
                <div class="stat-label">悖论比例</div>
              </div>

              <div class="stat-card degree">
                <div class="stat-number">{{ averageDegree }}</div>
                <div class="stat-label">平均度数</div>
              </div>
            </div>
            <!-- 悖论强度指标 -->
            <div class="paradox-metrics">
              <el-descriptions :column="1" size="small" border>
                <el-descriptions-item label="网络密度"
                  >{{ networkDensity }}%</el-descriptions-item
                >
                <el-descriptions-item label="聚类系数">{{
                  clusteringCoefficient
                }}</el-descriptions-item>
                <el-descriptions-item label="最大度数">{{
                  maxDegree
                }}</el-descriptions-item>
                <el-descriptions-item label="度数方差">{{
                  degreeVariance
                }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </el-col>

        <!-- 中间网络可视化 -->
        <el-col :span="12">
          <el-card shadow="never" class="network-card">
            <template #header>
              <div class="network-header">
                <h3><i class="el-icon-share"></i> 网络拓扑图</h3>
                <div class="network-controls">
                  <el-radio-group v-model="layoutType" size="small">
                    <el-radio-button value="force">力导向</el-radio-button>
                    <el-radio-button value="circle">圆形</el-radio-button>
                    <el-radio-button value="grid">网格</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </template>

            <div ref="networkContainer" class="network-container">
              <div v-if="!hasGraph" class="network-placeholder">
                <i class="el-icon-connection"></i>
                <p>点击"生成网络"开始实验</p>
              </div>
            </div>

            <!-- 网络图例 -->
            <div class="network-legend">
              <div class="legend-item">
                <div class="legend-color paradox-color"></div>
                <span>符合悖论节点</span>
              </div>
              <div class="legend-item">
                <div class="legend-color normal-color"></div>
                <span>普通节点</span>
              </div>
              <div class="legend-item">
                <div class="legend-color hub-color"></div>
                <span>高度数节点</span>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 右侧分析面板 -->
        <el-col :span="6">
          <el-card shadow="never" class="analysis-panel">
            <h3><i class="el-icon-pie-chart"></i> 统计分析</h3>

            <!-- 悖论比例环形图 -->
            <div class="chart-container">
              <div ref="pieChart" class="chart pie-chart"></div>
              <div class="chart-title">悖论分布</div>
            </div>

            <!-- 度数分布直方图 -->
            <div class="chart-container">
              <div ref="histogramChart" class="chart histogram-chart"></div>
              <div class="chart-title">度数分布</div>
            </div>
            
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 详细分析面板 -->
    <el-card v-if="hasAnalysis">
      <template #header>
        <h2><i class="el-icon-data-line"></i> 深度分析仪表盘</h2>
      </template>

      <el-row :gutter="20">
        <!-- 散点图分析 -->
        <el-col :span="12">
          <div class="chart-container large">
            <h3>个体度数 vs 朋友平均度数</h3>
            <div ref="scatterChart" class="chart scatter-chart"></div>
            <p class="chart-description">
              对角线上方的点表示符合朋友悖论的节点（朋友平均度数 > 个体度数）
            </p>
          </div>
        </el-col>

        <!-- 热力图分析 -->
        <el-col :span="12">
          <div class="chart-container large">
            <h3>邻接矩阵热力图</h3>
            <div ref="heatmapChart" class="chart heatmap-chart"></div>
            <p class="chart-description">
              展示网络的连接模式，亮色表示连接，暗色表示无连接
            </p>
          </div>
        </el-col>
      </el-row>

      <!-- 悖论强度分布 -->
      <el-row style="margin-top: 20px">
        <el-col :span="24">
          <div class="chart-container large">
            <h3>悖论强度分布</h3>
            <div ref="strengthChart" class="chart strength-chart"></div>
            <p class="chart-description">
              悖论强度 = (朋友平均度数 - 个体度数) / 个体度数，正值表示符合悖论
            </p>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 结论与启发 -->
    <el-card class="conclusion-card">
      <template #header>
        <h2><i class="el-icon-magic-stick"></i> 实验结论与现实启发</h2>
      </template>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="insight-box">
            <h3>🔬 数学洞察</h3>
            <ul>
              <li>朋友悖论是<strong>网络结构的必然结果</strong></li>
              <li>高度数节点的<strong>采样偏差</strong>导致统计偏移</li>
              <li>悖论强度与<strong>度分布的不均匀性</strong>相关</li>
            </ul>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="insight-box">
            <h3>🌐 现实应用</h3>
            <ul>
              <li><strong>社交媒体</strong>：为什么总觉得别人更受欢迎</li>
              <li><strong>流行病学</strong>：通过社交活跃者监测疾病传播</li>
              <li><strong>市场营销</strong>：识别影响者进行精准推广</li>
            </ul>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="insight-box">
            <h3>🧠 认知启发</h3>
            <ul>
              <li>避免基于<strong>局部观察</strong>的错误判断</li>
              <li>理解<strong>统计偏差</strong>对认知的影响</li>
              <li>用<strong>科学思维</strong>分析社会现象</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import * as d3 from "d3";

// 响应式数据
const nodeCount = ref(30);
const probability = ref(0.3);
const graphType = ref("random");
const layoutType = ref("force");
const nodes = ref([]);
const links = ref([]);
const paradoxNodes = ref(0);
const paradoxRatio = ref(0);
const averageDegree = ref(0);
const isGenerating = ref(false);
const hasGraph = ref(false);
const hasAnalysis = ref(false);

// 新增统计指标
const networkDensity = ref(0);
const clusteringCoefficient = ref(0);
const maxDegree = ref(0);
const degreeVariance = ref(0);

// 理论面板折叠控制
const activeTheorySection = ref([]);

// DOM引用
const networkContainer = ref(null);
const pieChart = ref(null);
const histogramChart = ref(null);
const scatterChart = ref(null);
const heatmapChart = ref(null);
const strengthChart = ref(null);

// D3相关变量
let simulation = null;
let linkSelection = null;
let nodeSelection = null;

// 监听参数变化自动重新生成
watch([nodeCount, probability, graphType], () => {
  if (hasGraph.value && !isGenerating.value) {
    generateGraph();
  }
});

// 监听布局类型变化
watch(layoutType, () => {
  if (hasGraph.value && !isGenerating.value) {
    // 如果切换到力导向布局，先清除所有固定位置
    if (layoutType.value === "force") {
      nodes.value.forEach((d) => {
        d.fx = null;
        d.fy = null;
      });
    }
    
    renderNetwork();
    if (hasAnalysis.value) {
      updateVisualization();
    }
  }
});

// 生成网络图
const generateGraph = async () => {
  if (isGenerating.value) return;

  isGenerating.value = true;
  hasAnalysis.value = false;

  try {
    // 停止之前的模拟
    if (simulation) {
      simulation.stop();
      simulation = null;
    }

    // 生成节点
    nodes.value = Array.from({ length: nodeCount.value }, (_, i) => ({
      id: i,
      degree: 0,
      friendsAverageDegree: 0,
      satisfiesParadox: false,
      paradoxStrength: 0,
      x: null,
      y: null,
      fx: null,
      fy: null,
    }));

    // 生成连接
    links.value = [];
    switch (graphType.value) {
      case "random":
        generateRandomGraph();
        break;
      case "small-world":
        generateSmallWorldGraph();
        break;
      case "scale-free":
        generateScaleFreeGraph();
        break;
    }

    // 确保有连接才继续
    if (links.value.length === 0) {
      console.warn("生成的网络没有连接，调整参数重试");
      return;
    }

    calculateNetworkMetrics();
    hasGraph.value = true;

    // 等待Vue更新完成再渲染
    await nextTick();

    // 渲染网络
    renderNetwork();

    // 延迟进行悖论分析
    setTimeout(() => {
      if (hasGraph.value && !isGenerating.value) {
        analyzeParadox();
      }
    }, 300);
  } catch (error) {
    console.error("生成网络时出错:", error);
    hasGraph.value = false;
  } finally {
    isGenerating.value = false;
  }
};

// 生成随机图 (Erdős–Rényi model)
const generateRandomGraph = () => {
  for (let i = 0; i < nodeCount.value; i++) {
    for (let j = i + 1; j < nodeCount.value; j++) {
      if (Math.random() < probability.value) {
        links.value.push({ source: i, target: j });
      }
    }
  }
};

// 生成小世界网络 (Watts-Strogatz model)
const generateSmallWorldGraph = () => {
  const k = Math.max(
    2,
    Math.floor((nodeCount.value * probability.value) / 2) * 2
  );

  // 创建规则环形网络
  for (let i = 0; i < nodeCount.value; i++) {
    for (let j = 1; j <= k / 2; j++) {
      const target = (i + j) % nodeCount.value;
      links.value.push({ source: i, target });
    }
  }

  // 随机重连 (rewiring)
  const rewireProb = 0.3;
  const newLinks = [];
  links.value.forEach((link) => {
    if (Math.random() < rewireProb) {
      let newTarget;
      do {
        newTarget = Math.floor(Math.random() * nodeCount.value);
      } while (
        newTarget === link.source ||
        newLinks.some(
          (l) =>
            (l.source === link.source && l.target === newTarget) ||
            (l.source === newTarget && l.target === link.source)
        )
      );
      newLinks.push({ source: link.source, target: newTarget });
    } else {
      newLinks.push(link);
    }
  });
  links.value = newLinks;
};

// 生成无标度网络 (Barabási–Albert model)
const generateScaleFreeGraph = () => {
  const m = Math.max(1, Math.floor((nodeCount.value * probability.value) / 4));

  // 初始完全连接的小网络
  const initialNodes = Math.min(m + 1, nodeCount.value);
  for (let i = 0; i < initialNodes; i++) {
    for (let j = i + 1; j < initialNodes; j++) {
      links.value.push({ source: i, target: j });
    }
  }

  // 优先连接机制添加新节点
  for (let i = initialNodes; i < nodeCount.value; i++) {
    const degrees = new Array(i).fill(0);
    links.value.forEach((link) => {
      if (link.source < i) degrees[link.source]++;
      if (link.target < i) degrees[link.target]++;
    });

    const totalDegree = degrees.reduce((sum, d) => sum + d, 0);
    const targets = new Set();

    while (targets.size < Math.min(m, i)) {
      let cumProb = 0;
      const rand = Math.random() * totalDegree;

      for (let j = 0; j < i; j++) {
        cumProb += degrees[j];
        if (rand <= cumProb && !targets.has(j)) {
          targets.add(j);
          break;
        }
      }
    }

    targets.forEach((target) => {
      links.value.push({ source: i, target });
    });
  }
};

// 计算网络指标
const calculateNetworkMetrics = () => {
  // 重置度数
  nodes.value.forEach((node) => {
    if (node) {
      node.degree = 0;
    }
  });

  // 计算度数 - 添加安全检查
  links.value.forEach((link) => {
    // 获取正确的ID，处理D3转换后的情况
    let sourceId, targetId;

    if (typeof link.source === "object" && link.source !== null) {
      sourceId =
        link.source.id !== undefined ? link.source.id : link.source.index;
    } else {
      sourceId = link.source;
    }

    if (typeof link.target === "object" && link.target !== null) {
      targetId =
        link.target.id !== undefined ? link.target.id : link.target.index;
    } else {
      targetId = link.target;
    }

    // 安全地增加度数
    if (nodes.value[sourceId] !== undefined) {
      nodes.value[sourceId].degree++;
    }
    if (nodes.value[targetId] !== undefined) {
      nodes.value[targetId].degree++;
    }
  });

  // 基本统计
  const degrees = nodes.value
    .map((n) => (n ? n.degree : 0))
    .filter((d) => d !== undefined);

  if (degrees.length > 0) {
    averageDegree.value = (
      degrees.reduce((sum, d) => sum + d, 0) / degrees.length
    ).toFixed(2);
    maxDegree.value = Math.max(...degrees);

    // 度数方差
    const avgDeg = parseFloat(averageDegree.value);
    degreeVariance.value = (
      degrees.reduce((sum, d) => sum + Math.pow(d - avgDeg, 2), 0) /
      degrees.length
    ).toFixed(2);
  } else {
    averageDegree.value = 0;
    maxDegree.value = 0;
    degreeVariance.value = 0;
  }

  // 网络密度
  const maxPossibleEdges = (nodeCount.value * (nodeCount.value - 1)) / 2;
  networkDensity.value =
    maxPossibleEdges > 0
      ? ((links.value.length / maxPossibleEdges) * 100).toFixed(1)
      : 0;

  // 聚类系数 (简化计算)
  let totalClusteringCoeff = 0;
  let validNodes = 0;

  nodes.value.forEach((node) => {
    if (!node) return;

    const neighbors = getNeighbors(node.id);
    if (neighbors.length < 2) return;

    let triangles = 0;
    for (let i = 0; i < neighbors.length; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        if (areConnected(neighbors[i], neighbors[j])) {
          triangles++;
        }
      }
    }

    const possibleTriangles = (neighbors.length * (neighbors.length - 1)) / 2;
    if (possibleTriangles > 0) {
      totalClusteringCoeff += triangles / possibleTriangles;
      validNodes++;
    }
  });

  clusteringCoefficient.value =
    validNodes > 0 ? (totalClusteringCoeff / validNodes).toFixed(3) : 0;
};

// 获取邻居节点 - 增强版本
const getNeighbors = (nodeId) => {
  const neighbors = [];

  if (!links.value || !Array.isArray(links.value)) {
    return neighbors;
  }

  links.value.forEach((link) => {
    if (!link) return;

    // D3会将source和target转换为对象，所以需要获取id属性
    let sourceId, targetId;

    if (typeof link.source === "object" && link.source !== null) {
      sourceId =
        link.source.id !== undefined ? link.source.id : link.source.index;
    } else {
      sourceId = link.source;
    }

    if (typeof link.target === "object" && link.target !== null) {
      targetId =
        link.target.id !== undefined ? link.target.id : link.target.index;
    } else {
      targetId = link.target;
    }

    if (sourceId === nodeId && targetId !== undefined) {
      neighbors.push(targetId);
    }
    if (targetId === nodeId && sourceId !== undefined) {
      neighbors.push(sourceId);
    }
  });

  return [...new Set(neighbors)]; // 去重
};

// 检查两个节点是否连接 - 增强版本
const areConnected = (nodeA, nodeB) => {
  if (!links.value || !Array.isArray(links.value)) {
    return false;
  }

  return links.value.some((link) => {
    if (!link) return false;

    let sourceId, targetId;

    if (typeof link.source === "object" && link.source !== null) {
      sourceId =
        link.source.id !== undefined ? link.source.id : link.source.index;
    } else {
      sourceId = link.source;
    }

    if (typeof link.target === "object" && link.target !== null) {
      targetId =
        link.target.id !== undefined ? link.target.id : link.target.index;
    } else {
      targetId = link.target;
    }

    return (
      (sourceId === nodeA && targetId === nodeB) ||
      (sourceId === nodeB && targetId === nodeA)
    );
  });
};

// 分析朋友悖论 - 优化版本
const analyzeParadox = () => {
  try {
    // 先确保度数计算正确
    calculateNetworkMetrics();

    // 重置悖论相关属性
    nodes.value.forEach((node) => {
      if (node) {
        node.friendsAverageDegree = 0;
        node.satisfiesParadox = false;
        node.paradoxStrength = 0;
      }
    });

    let totalParadoxNodes = 0;

    nodes.value.forEach((node) => {
      if (!node) return;

      const friends = getNeighbors(node.id);

      // 添加调试信息
      console.log(
        `节点 ${node.id}: 度数=${node.degree}, 朋友=[${friends.join(",")}]`
      );

      if (friends.length > 0) {
        const friendsDegreeSum = friends.reduce((sum, friendId) => {
          const friendNode = nodes.value.find((n) => n && n.id === friendId);
          return (
            sum +
            (friendNode && friendNode.degree !== undefined
              ? friendNode.degree
              : 0)
          );
        }, 0);

        node.friendsAverageDegree = friendsDegreeSum / friends.length;
        node.satisfiesParadox = node.friendsAverageDegree > node.degree;

        if (node.degree > 0) {
          node.paradoxStrength =
            (node.friendsAverageDegree - node.degree) / node.degree;
        } else {
          node.paradoxStrength = 0;
        }

        if (node.satisfiesParadox) {
          totalParadoxNodes++;
        }

        // 添加调试信息
        console.log(
          `  朋友平均度数=${node.friendsAverageDegree.toFixed(2)}, 符合悖论=${
            node.satisfiesParadox
          }`
        );
      } else {
        node.friendsAverageDegree = 0;
        node.satisfiesParadox = false;
        node.paradoxStrength = 0;
        console.log(`  孤立节点`);
      }
    });

    // 统计符合悖论的节点
    paradoxNodes.value = totalParadoxNodes;
    paradoxRatio.value =
      nodeCount.value > 0
        ? ((totalParadoxNodes / nodeCount.value) * 100).toFixed(1)
        : 0;

    console.log(
      `总计: ${totalParadoxNodes}/${nodeCount.value} 个节点符合悖论 (${paradoxRatio.value}%)`
    );

    hasAnalysis.value = true;

    // 延迟渲染避免DOM冲突
    nextTick(() => {
      setTimeout(() => {
        try {
          updateVisualization();
          renderPieChart();
          renderHistogram();
          renderScatterPlot();
          if (nodeCount.value <= 50) {
            // 只有节点数较少时才渲染热力图
            renderHeatmap();
          }
          renderStrengthChart();
        } catch (error) {
          console.error("渲染图表时出错:", error);
        }
      }, 100);
    });
  } catch (error) {
    console.error("分析悖论时出错:", error);
  }
};

// 渲染主网络图
const renderNetwork = () => {
  const container = networkContainer.value;
  if (!container) return;

  try {
    // 清理现有内容
    d3.select(container).selectAll("*").remove();

    const width = container.clientWidth || 600;
    const height = 400;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // 创建缩放行为
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const g = svg.append("g");

    // 根据布局类型设置力模拟
    simulation = d3
      .forceSimulation(nodes.value)
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 2, height / 2));

    if (layoutType.value === "force") {
      simulation.force(
        "link",
        d3
          .forceLink(links.value)
          .id((d) => d.id)
          .distance(30)
      );
    }

    // 绘制连接线
    linkSelection = g
      .append("g")
      .selectAll("line")
      .data(links.value)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1);

    // 绘制节点
    nodeSelection = g
      .append("g")
      .selectAll("circle")
      .data(nodes.value)
      .enter()
      .append("circle")
      .attr("r", (d) => Math.max(3, Math.sqrt(d.degree || 1) * 3))
      .attr("fill", (d) => getNodeColor(d))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // 添加节点标签
    const labels = g
      .append("g")
      .selectAll("text")
      .data(nodes.value)
      .enter()
      .append("text")
      .text((d) => d.id)
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#333");

    // 悬浮提示
    nodeSelection
      .append("title")
      .text(
        (d) =>
          `节点 ${d.id}\n度数: ${d.degree || 0}\n朋友平均度数: ${(
            d.friendsAverageDegree || 0
          ).toFixed(2)}\n悖论强度: ${(d.paradoxStrength || 0).toFixed(2)}`
      );

    // 力模拟更新
    simulation.on("tick", () => {
      linkSelection
        .attr("x1", (d) => d.source.x || 0)
        .attr("y1", (d) => d.source.y || 0)
        .attr("x2", (d) => d.target.x || 0)
        .attr("y2", (d) => d.target.y || 0);

      nodeSelection.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0);

      labels.attr("x", (d) => d.x || 0).attr("y", (d) => d.y || 0);
    });

    // 特殊布局处理
    if (layoutType.value === "circle") {
      const radius = Math.min(width, height) / 2 - 50;
      nodes.value.forEach((d, i) => {
        const angle = (i / nodes.value.length) * 2 * Math.PI;
        d.fx = width / 2 + radius * Math.cos(angle);
        d.fy = height / 2 + radius * Math.sin(angle);
      });
    } else if (layoutType.value === "grid") {
      const cols = Math.ceil(Math.sqrt(nodes.value.length));
      const cellWidth = width / cols;
      const cellHeight = height / Math.ceil(nodes.value.length / cols);

      nodes.value.forEach((d, i) => {
        d.fx = (i % cols) * cellWidth + cellWidth / 2;
        d.fy = Math.floor(i / cols) * cellHeight + cellHeight / 2;
      });
    } else if (layoutType.value === "force") {
      // 切换到力导向布局时，清除所有固定位置
      nodes.value.forEach((d) => {
        d.fx = null;
        d.fy = null;
      });
      // 重新启动力模拟以激活动画
      if (simulation) {
        simulation.alpha(1).restart();
      }
    }
  } catch (error) {
    console.error("渲染网络时出错:", error);
  }
};

// 获取节点颜色
const getNodeColor = (node) => {
  if (!hasAnalysis.value) return "#69b3a2";

  if (node.degree > averageDegree.value * 2) return "#ff9f43"; // 高度数节点
  if (node.satisfiesParadox) return "#ff6b6b"; // 悖论节点
  return "#69b3a2"; // 普通节点
};

// 更新可视化
const updateVisualization = () => {
  if (nodeSelection) {
    nodeSelection
      .attr("fill", (d) => getNodeColor(d))
      .attr("r", (d) => Math.max(3, Math.sqrt(d.degree) * 3))
      .select("title")
      .text(
        (d) =>
          `节点 ${d.id}\n度数: ${
            d.degree
          }\n朋友平均度数: ${d.friendsAverageDegree.toFixed(2)}\n符合悖论: ${
            d.satisfiesParadox ? "是" : "否"
          }\n悖论强度: ${d.paradoxStrength.toFixed(2)}`
      );
  }
};

// 渲染饼图
const renderPieChart = () => {
  const container = pieChart.value;
  if (!container) return;

  d3.select(container).selectAll("*").remove();

  const width = 200;
  const height = 200;
  const radius = Math.min(width, height) / 2 - 10;

  const data = [
    { label: "符合悖论", value: paradoxNodes.value, color: "#ff6b6b" },
    {
      label: "不符合",
      value: nodeCount.value - paradoxNodes.value,
      color: "#69b3a2",
    },
  ];

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const pie = d3.pie().value((d) => d.value);
  const arc = d3.arc().innerRadius(30).outerRadius(radius);
  const arcHover = d3.arc().innerRadius(30).outerRadius(radius + 8);

  // 创建tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "pie-tooltip")
    .style("position", "absolute")
    .style("background", "rgba(0, 0, 0, 0.9)")
    .style("color", "white")
    .style("padding", "12px 16px")
    .style("border-radius", "8px")
    .style("font-size", "13px")
    .style("line-height", "1.4")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("z-index", 10000)
    .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.3)")
    .style("border", "1px solid rgba(255, 255, 255, 0.2)");

  const arcs = g
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  const paths = arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => d.data.color)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .style("cursor", "pointer");

  // 添加事件监听
  paths
    .on("mouseover", function(event, d) {
      console.log("鼠标悬停在饼图上", d); // 调试信息
      
      // 放大效果
      d3.select(this)
        .transition()
        .duration(200)
        .attr("d", arcHover);
      
      // 显示tooltip
      const percentage = ((d.data.value / nodeCount.value) * 100).toFixed(1);
      tooltip
        .style("opacity", 1)
        .html(`
          <div style="font-weight: bold; color: ${d.data.color}; margin-bottom: 8px;">
            🥧 ${d.data.label}节点
          </div>
          <div><strong>数量:</strong> ${d.data.value} 个</div>
          <div><strong>比例:</strong> ${percentage}%</div>
          <div style="margin-top: 8px; font-size: 12px; color: #ccc;">
            ${d.data.label === '符合悖论' 
              ? '这些节点的朋友平均度数大于自己的度数' 
              : '这些节点的朋友平均度数小于或等于自己的度数'}
          </div>
        `)
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mousemove", function(event) {
      tooltip
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function(event, d) {
      console.log("鼠标离开饼图"); // 调试信息
      
      // 恢复原大小
      d3.select(this)
        .transition()
        .duration(200)
        .attr("d", arc);
      
      // 隐藏tooltip
      tooltip.style("opacity", 0);
    });

  arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#fff")
    .attr("font-weight", "bold")
    .text((d) => `${d.data.value}`)
    .style("pointer-events", "none");
};

// 渲染直方图
const renderHistogram = () => {
  const container = histogramChart.value;
  if (!container) return;

  d3.select(container).selectAll("*").remove();

  const margin = { top: 10, right: 10, bottom: 30, left: 30 };
  const width = 200 - margin.left - margin.right;
  const height = 150 - margin.top - margin.bottom;

  const degrees = nodes.value.map((n) => n.degree);
  const maxDeg = Math.max(...degrees);

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, maxDeg]).range([0, width]);

  const histogram = d3
    .histogram()
    .value((d) => d)
    .domain(x.domain())
    .thresholds(Math.min(10, maxDeg));

  const bins = histogram(degrees);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range([height, 0]);

  // 创建tooltip - 使用body而不是container
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "histogram-tooltip")
    .style("position", "absolute")
    .style("background", "rgba(0, 0, 0, 0.9)")
    .style("color", "white")
    .style("padding", "12px 16px")
    .style("border-radius", "8px")
    .style("font-size", "13px")
    .style("line-height", "1.4")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .style("z-index", 10000)
    .style("max-width", "300px")
    .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.3)")
    .style("border", "1px solid rgba(255, 255, 255, 0.2)");

  const bars = g.selectAll(".bar")
    .data(bins)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.x0))
    .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1))
    .attr("y", (d) => y(d.length))
    .attr("height", (d) => height - y(d.length))
    .attr("fill", "#69b3a2")
    .attr("opacity", 0.8)
    .style("cursor", "pointer");

  // 添加事件监听
  bars
    .on("mouseover", function(event, d) {
      console.log("鼠标悬停在直方图上", d); // 调试信息
      
      // 高亮效果
      d3.select(this)
        .transition()
        .duration(200)
        .attr("fill", "#4ecdc4")
        .attr("opacity", 1)
        .attr("stroke", "#2c3e50")
        .attr("stroke-width", 2);
      
      // 计算显示信息
      const degreeRange = d.x1 > d.x0 + 1 ? `${Math.floor(d.x0)}-${Math.floor(d.x1)}` : `${Math.floor(d.x0)}`;
      const nodeCount = d.length;
      const percentage = ((nodeCount / nodes.value.length) * 100).toFixed(1);
      
      // 获取具体节点ID
      const nodeIds = d.map(degreeValue => {
        // 找到具有该度数的节点
        const node = nodes.value.find(n => n.degree === degreeValue);
        return node ? node.id : degreeValue;
      });
      
      const nodeList = nodeIds.length > 10 
        ? nodeIds.slice(0, 10).join(', ') + '...' 
        : nodeIds.join(', ');
      
      // 显示tooltip
      tooltip
        .style("opacity", 1)
        .html(`
          <div style="font-weight: bold; color: #4ecdc4; margin-bottom: 8px;">
            📊 度数分布详情
          </div>
          <div><strong>度数范围:</strong> ${degreeRange}</div>
          <div><strong>节点数量:</strong> ${nodeCount} 个</div>
          <div><strong>占比:</strong> ${percentage}%</div>
          <div style="margin-top: 8px;"><strong>节点列表:</strong></div>
          <div style="font-size: 12px; color: #ccc;">${nodeList}</div>
        `)
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mousemove", function(event) {
      tooltip
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
      console.log("鼠标离开直方图"); // 调试信息
      
      // 恢复原样
      d3.select(this)
        .transition()
        .duration(200)
        .attr("fill", "#69b3a2")
        .attr("opacity", 0.8)
        .attr("stroke", "none");
      
      // 隐藏tooltip
      tooltip.style("opacity", 0);
    });

  // 清理函数 - 组件卸载时移除tooltip
  const cleanup = () => {
    d3.select(".histogram-tooltip").remove();
  };
  
  // 保存清理函数以便后续调用
  if (!window.histogramCleanup) {
    window.histogramCleanup = cleanup;
  }

  // 添加坐标轴
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(5));

  g.append("g").call(d3.axisLeft(y).ticks(5));
};

// 渲染散点图
const renderScatterPlot = () => {
  const container = scatterChart.value;
  if (!container) return;

  d3.select(container).selectAll("*").remove();

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const maxVal = Math.max(
    d3.max(nodes.value, (d) => d.degree),
    d3.max(nodes.value, (d) => d.friendsAverageDegree)
  );

  const x = d3.scaleLinear().domain([0, maxVal]).range([0, width]);

  const y = d3.scaleLinear().domain([0, maxVal]).range([height, 0]);

  // 绘制对角线
  g.append("line")
    .attr("x1", 0)
    .attr("y1", height)
    .attr("x2", width)
    .attr("y2", 0)
    .attr("stroke", "#999")
    .attr("stroke-dasharray", "3,3")
    .attr("opacity", 0.7);

  // 绘制点
  g.selectAll(".dot")
    .data(nodes.value)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => x(d.degree))
    .attr("cy", (d) => y(d.friendsAverageDegree))
    .attr("r", 4)
    .attr("fill", (d) => (d.satisfiesParadox ? "#ff6b6b" : "#69b3a2"))
    .attr("opacity", 0.7)
    .append("title")
    .text(
      (d) =>
        `节点 ${d.id}\n个体度数: ${
          d.degree
        }\n朋友平均: ${d.friendsAverageDegree.toFixed(2)}`
    );

  // 添加坐标轴
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 35)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("个体度数");

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -30)
    .attr("x", -height / 2)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("朋友平均度数");
};

// 渲染热力图
const renderHeatmap = () => {
  const container = heatmapChart.value;
  if (!container) {
    console.warn("热力图容器未找到");
    return;
  }

  try {
    d3.select(container).selectAll("*").remove();

    if (nodeCount.value > 50) {
      d3.select(container)
        .append("div")
        .style("text-align", "center")
        .style("padding", "50px")
        .style("color", "#666")
        .text("节点数过多，跳过热力图显示");
      return;
    }

    const size = 300;
    const cellSize = size / nodeCount.value;

    // 创建邻接矩阵 - 增强安全性
    const matrix = Array(nodeCount.value)
      .fill()
      .map(() => Array(nodeCount.value).fill(0));

    if (links.value && Array.isArray(links.value)) {
      links.value.forEach((link) => {
        if (!link) return;

        // 安全获取链接的源和目标ID
        let sourceId, targetId;

        if (typeof link.source === "object" && link.source !== null) {
          sourceId =
            link.source.id !== undefined ? link.source.id : link.source.index;
        } else {
          sourceId = link.source;
        }

        if (typeof link.target === "object" && link.target !== null) {
          targetId =
            link.target.id !== undefined ? link.target.id : link.target.index;
        } else {
          targetId = link.target;
        }

        // 验证索引范围
        if (
          sourceId >= 0 &&
          sourceId < nodeCount.value &&
          targetId >= 0 &&
          targetId < nodeCount.value &&
          matrix[sourceId] &&
          matrix[targetId]
        ) {
          matrix[sourceId][targetId] = 1;
          matrix[targetId][sourceId] = 1;
        }
      });
    }

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", size)
      .attr("height", size);

    const colorScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range(["#f8f9fa", "#69b3a2"]);

    // 使用更安全的数据绑定方式
    const rows = svg
      .selectAll(".row")
      .data(matrix)
      .enter()
      .append("g")
      .attr("class", "row");

    rows.each(function (rowData, rowIndex) {
      if (!rowData || !Array.isArray(rowData)) return;

      d3.select(this)
        .selectAll(".cell")
        .data(rowData)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("x", (d, colIndex) => colIndex * cellSize)
        .attr("y", rowIndex * cellSize)
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("fill", (d) => colorScale(d || 0))
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .append("title")
        .text(
          (d, colIndex) =>
            `连接 ${rowIndex} ↔ ${colIndex}: ${d ? "已连接" : "未连接"}`
        );
    });
  } catch (error) {
    console.error("渲染热力图时出错:", error);
    d3.select(container).selectAll("*").remove();
    d3.select(container)
      .append("div")
      .style("text-align", "center")
      .style("padding", "50px")
      .style("color", "#ff6b6b")
      .text("热力图渲染失败");
  }
};

// 渲染悖论强度图
const renderStrengthChart = () => {
  const container = strengthChart.value;
  if (!container) return;

  d3.select(container).selectAll("*").remove();

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 800 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleLinear()
    .domain([0, nodeCount.value - 1])
    .range([0, width]);

  const strengthValues = nodes.value.map((n) => n.paradoxStrength);
  const yExtent = d3.extent(strengthValues);
  const yMax = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));

  const y = d3.scaleLinear().domain([-yMax, yMax]).range([height, 0]);

  // 绘制零线
  g.append("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", y(0))
    .attr("y2", y(0))
    .attr("stroke", "#333")
    .attr("stroke-width", 1);

  // 绘制柱状图
  g.selectAll(".strength-bar")
    .data(nodes.value)
    .enter()
    .append("rect")
    .attr("class", "strength-bar")
    .attr("x", (d) => x(d.id))
    .attr("width", (width / nodeCount.value) * 0.8)
    .attr("y", (d) => (d.paradoxStrength >= 0 ? y(d.paradoxStrength) : y(0)))
    .attr("height", (d) => Math.abs(y(d.paradoxStrength) - y(0)))
    .attr("fill", (d) => (d.paradoxStrength >= 0 ? "#ff6b6b" : "#69b3a2"))
    .attr("opacity", 0.8)
    .append("title")
    .text((d) => `节点 ${d.id}: ${d.paradoxStrength.toFixed(3)}`);

  // 添加坐标轴
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat((d) => d))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 35)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("节点ID");

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -30)
    .attr("x", -height / 2)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("悖论强度");
};

// 拖拽事件处理
const dragstarted = (event, d) => {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
};

const dragged = (event, d) => {
  d.fx = event.x;
  d.fy = event.y;
};

const dragended = (event, d) => {
  if (!event.active) simulation.alphaTarget(0);
  if (layoutType.value === "force") {
    d.fx = null;
    d.fy = null;
  }
};

// 组件挂载时初始化
onMounted(() => {
  // 确保DOM完全准备好后再初始化
  nextTick(() => {
    generateGraph();
  });
});

// 组件卸载时清理
onUnmounted(() => {
  if (simulation) {
    simulation.stop();
  }

  // 清理DOM
  const containers = [
    networkContainer.value,
    pieChart.value,
    histogramChart.value,
    scatterChart.value,
    heatmapChart.value,
    strengthChart.value,
  ];

  containers.forEach((container) => {
    if (container) {
      d3.select(container).selectAll("*").remove();
    }
  });
  
  // 清理tooltips
  d3.selectAll(".pie-tooltip, .histogram-tooltip").remove();
  
  // 清理全局清理函数
  if (window.histogramCleanup) {
    window.histogramCleanup();
    delete window.histogramCleanup;
  }
});
</script>

<style scoped>
/* 全局布局 */
.friendship-paradox {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* 理论说明卡片 */
.theory-card {
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
}

.theory-card :deep(.el-card__body) {
  padding: 20px !important;
  background: transparent !important;
}

.theory-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.theory-header h1 {
  align-items: center;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.theory-content {
  padding: 20px 0;
  color: white;
}

.theory-content h3 {
  color: #fff;
  margin: 20px 0 10px 0;
  font-size: 18px;
}

.theory-text {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: white;
}

.theory-list {
  list-style: none;
  padding: 0;
}

.theory-list li {
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: white;
}

/* 理论折叠面板 */
.theory-collapse {
  background: transparent !important;
  border: none !important;
}

.theory-collapse :deep(.el-collapse) {
  background: transparent !important;
  border: none !important;
}

.theory-collapse :deep(.el-collapse-item) {
  background: transparent !important;
  border: none !important;
}

.theory-collapse :deep(.el-collapse-item__header) {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 15px 20px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 10px !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.theory-collapse :deep(.el-collapse-item__header:hover) {
  background: rgba(255, 255, 255, 0.15) !important;
}

.theory-collapse :deep(.el-collapse-item__content) {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  color: white !important;
}

.theory-collapse :deep(.el-collapse-item__wrap) {
  background: transparent !important;
  border: none !important;
}

.theory-collapse :deep(.el-collapse-item__arrow) {
  color: white !important;
}

/* 确保所有子元素继承白色文字 */
.theory-collapse * {
  color: white !important;
}

/* 实验头部 */
.experiment-header {
  text-align: center;
}

.experiment-header h2 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.experiment-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

/* 概念说明Alert */
.concept-alert {
  margin-bottom: 25px;
  border-radius: 12px;
  border: 2px solid #e1f3ff;
  background: linear-gradient(135deg, #e1f3ff 0%, #f0f9ff 100%);
}

.concept-alert :deep(.el-alert__title) {
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 10px;
}

.concept-explanation {
  color: #333;
}

.concept-explanation p {
  margin: 8px 0;
  font-size: 15px;
  line-height: 1.6;
}

.concept-explanation p:first-child {
  font-size: 16px;
  margin-bottom: 15px;
}

.highlight-text {
  background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  color: #333;
}

.formula-box {
  background: rgba(24, 144, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  border-left: 4px solid #1890ff;
}

.formula-box p {
  margin: 8px 0 !important;
  font-size: 14px !important;
}

.formula-box p:last-child {
  margin-bottom: 0 !important;
}

/* 悖论图解 */
.paradox-illustration {
  padding: 20px 0;
}

.paradox-boxes {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.paradox-box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
}

.paradox-box h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
}

.paradox-box p {
  margin: 5px 0;
  font-size: 14px;
  opacity: 0.9;
}

.arrow {
  font-size: 24px;
  color: #ffd700;
  font-weight: bold;
}

/* 控制面板 */
.control-panel {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  border: none !important;
}

.control-panel h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

/* 统计卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.stat-card.highlight {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.8;
}

/* 网络可视化 */
.network-card {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  border: none !important;
}

.network-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.network-container {
  width: 100%;
  height: 400px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  position: relative;
  overflow: hidden;
}

.network-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 16px;
}

.network-placeholder i {
  font-size: 48px;
  margin-bottom: 20px;
}

.network-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.paradox-color {
  background: #ff6b6b;
}
.normal-color {
  background: #69b3a2;
}
.hub-color {
  background: #ff9f43;
}

/* 分析面板 */
.analysis-panel {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border: none !important;
}

.analysis-panel h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

/* 图表容器 */
.chart-container {
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-container.large {
  margin-bottom: 30px;
}

.chart-container h3 {
  margin: 0;
  padding: 15px 20px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.chart {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart.pie-chart {
  height: 200px;
}

.chart.histogram-chart {
  height: 180px;
}

.chart.scatter-chart {
  height: 320px;
}

.chart.heatmap-chart {
  height: 320px;
}

.chart.strength-chart {
  height: 240px;
}

.chart-title {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  background: #f8f9fa;
}

.chart-description {
  padding: 10px 15px;
  font-size: 12px;
  color: #666;
  background: #f8f9fa;
  margin: 0;
  line-height: 1.4;
}

/* 指标面板 */
.paradox-metrics {
  margin-top: 20px;
}

.paradox-metrics .el-descriptions {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

/* 结论卡片 */
.conclusion-card {
  margin-top: 30px;
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  border: none !important;
}

.conclusion-card h2 {
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.insight-box {
  background: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.insight-box h3 {
  color: #333;
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
}

.insight-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.insight-box li {
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  border-bottom: 1px solid #eee;
}

.insight-box li:last-child {
  border-bottom: none;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .friendship-paradox {
    padding: 15px;
  }

  .theory-header {
    flex-direction: column;
    gap: 15px;
  }

  .network-header {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .friendship-paradox {
    padding: 10px;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }

  .network-container {
    height: 300px;
  }

  .paradox-boxes {
    gap: 10px;
  }

  .chart.scatter-chart,
  .chart.heatmap-chart {
    height: 250px;
  }
}

/* 加载动画 */
.el-button.is-loading {
  position: relative;
}

/* 高亮效果 */
.highlight-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Element Plus 组件样式覆盖 */
.el-card__header {
  padding: 20px !important;
}

.el-card__body {
  padding: 20px !important;
}

.el-slider__runway {
  margin: 16px 0 !important;
}

.el-form-item {
  margin-bottom: 20px !important;
}

.el-button + .el-button {
  margin-left: 8px !important;
}

/* SVG 图表样式 */
.chart svg {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.chart .axis {
  font-size: 12px;
}

.chart .axis text {
  fill: #666;
}

.chart .axis line,
.chart .axis path {
  stroke: #ddd;
  stroke-width: 1;
}

/* 工具提示样式 */
.d3-tip {
  line-height: 1.4;
  font-size: 12px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  pointer-events: none;
}

/* 网络类型卡片样式 */
.network-type-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%;
  transition: all 0.3s ease;
}

.network-type-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.network-type-card h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 700;
  color: white !important;
}

.algorithm-name {
  font-size: 14px;
  color: #FFD700 !important;
  font-weight: 600;
  margin-bottom: 20px;
  font-style: italic;
}

.network-features h4 {
  margin: 20px 0 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #E8F4FD !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 8px;
}

.network-features ul {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.network-features li {
  padding: 6px 0;
  font-size: 14px;
  color: white !important;
  position: relative;
  padding-left: 20px;
}

.network-features li:before {
  content: "▸";
  position: absolute;
  left: 0;
  color: #FFD700;
  font-weight: bold;
}

.network-features p {
  font-size: 14px;
  line-height: 1.6;
  color: white !important;
  margin: 10px 0;
}

/* 不同网络类型的特色样式 */
.network-type-card.random {
  border-left: 4px solid #ff6b6b;
}

.network-type-card.small-world {
  border-left: 4px solid #4ecdc4;
}

.network-type-card.scale-free {
  border-left: 4px solid #45b7d1;
}

/* 算法比较部分 */
.algorithm-comparison {
  margin-top: 30px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.algorithm-comparison h3 {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: white !important;
  text-align: center;
}

.paradox-performance {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;
}

.paradox-performance:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.paradox-performance h4 {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: white !important;
}

.paradox-performance p {
  font-size: 14px;
  line-height: 1.6;
  color: white !important;
  margin: 0;
}

.paradox-performance.random {
  border-top: 3px solid #ff6b6b;
}

.paradox-performance.small-world {
  border-top: 3px solid #4ecdc4;
}

.paradox-performance.scale-free {
  border-top: 3px solid #45b7d1;
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

.el-icon-share:hover {
  color: #45b7d1 !important;
  transform: scale(1.2);
  text-shadow: 0 0 10px rgba(69, 183, 209, 0.5);
}

.el-icon-pie-chart:hover {
  color: #96ceb4 !important;
  transform: scale(1.2) rotate(-10deg);
  text-shadow: 0 0 10px rgba(150, 206, 180, 0.5);
}

.el-icon-data-line:hover {
  color: #feca57 !important;
  transform: scale(1.2);
  text-shadow: 0 0 10px rgba(254, 202, 87, 0.5);
}

.el-icon-magic-stick:hover {
  color: #ff9ff3 !important;
  transform: scale(1.2) rotate(15deg);
  text-shadow: 0 0 10px rgba(255, 159, 243, 0.5);
}

/* 标题整体悬停效果 */
h1:hover, h2:hover, h3:hover {
  transform: translateX(5px);
  transition: all 0.3s ease;
}

/* 网络占位图标特殊效果 */
.network-placeholder i {
  animation: pulse-icon 2s infinite;
}

@keyframes pulse-icon {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.7;
  }
  50% { 
    transform: scale(1.1);
    opacity: 1;
  }
}

/* D3图表tooltip样式 */
.chart-container {
  position: relative;
}

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

/* 图表悬停效果增强 */
.chart svg {
  overflow: visible;
}

.chart .bar,
.chart .arc path {
  transition: all 0.2s ease;
}
</style>
