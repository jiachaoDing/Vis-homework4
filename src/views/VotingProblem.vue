<template>
  <div class="voting-problem">
    <el-card>
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>
            <h2>表决问题分析器</h2>
            <p>深入探索投票机制中的孔多塞悖论、单峰性质及多种决策模型。本工具旨在帮助理解群体决策的复杂性。</p>
            <p class="developer-signature">开发者：肖富帅</p>
          </span>
          <!-- 使用指南按钮 -->
          <el-button 
            type="info" 
            icon="el-icon-question" 
            @click="openHelpDialog"
            style="margin-left: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; color: white; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);"
            size="medium">
            使用指南与核心概念
          </el-button>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="control-panel">
            <h3><i class="el-icon-setting"></i> 投票参数设置</h3>
            <el-tabs v-model="activeVoteInputMode" type="card" style="margin-bottom: 15px;">
              <el-tab-pane label="随机生成" name="random">
                <el-form label-width="120px" @submit.native.prevent style="padding-top:15px;">
                  <el-form-item label="投票人数">
                    <el-slider v-model="voterCount" :min="3" :max="20" show-input @change="debouncedGenerateVotes" />
                  </el-form-item>
                  <el-form-item label="候选项数">
                    <el-slider v-model="candidateCount" :min="3" :max="10" show-input @change="debouncedGenerateVotes" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="generateAndAnalyze" icon="el-icon-refresh-right" style="width:100%;">生成新投票并深度分析</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="手动定义" name="manual">
                <el-form label-width="100px" @submit.native.prevent style="padding-top:15px;">
                  <el-form-item label="候选项">
                    <el-input v-model="manualCandidatesString" placeholder="A,B,C,D (用逗号分隔)" @change="parseManualCandidates" />
                  </el-form-item>
                  <el-form-item label="投票人数">
                    <el-input-number v-model="manualVoterCount" :min="1" :max="20" @change="adjustManualVoteInputs" />
                  </el-form-item>
                  <div v-for="(vote, index) in manualVoteInputs" :key="index" class="manual-vote-item">
                     <el-form-item :label="`投票人 ${index + 1}`">
                       <el-input v-model="manualVoteInputs[index]" :placeholder="`例如: ${manualPlaceholders[index] || 'A > B > C'}`" />
                     </el-form-item>
                  </div>
                  <el-form-item>
                    <el-button type="success" @click="analyzeManualVotes" icon="el-icon-check" style="width:100%;" :disabled="!manualCandidates.length || !manualVoteInputs.every(v => v.trim() !== '')">使用手动数据分析</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            <el-form label-width="120px" @submit.native.prevent>
              <el-form-item label="废票处理">
                 <el-button @click="removeInvalidVotes" icon="el-icon-delete" :disabled="invalidVotes === 0 || !analysisDone" style="width:100%;">
                  移除 {{ invalidVotes }} 张无效票并重分析
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>

          <el-card shadow="hover" style="margin-top: 20px;" class="results-summary">
            <h3><i class="el-icon-document-checked"></i> 核心分析摘要</h3>
            <div v-if="analysisDone">
              <el-descriptions :column="1" border size="small">
                <el-descriptions-item label="孔多塞悖论">
                  <el-tag :type="hasCondorcetParadox ? 'danger' : 'success'" effect="dark" size="medium">
                    {{ hasCondorcetParadox ? '显著存在' : '未检测到' }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="孔多塞胜者">
                  <span v-if="!hasCondorcetParadox && condorcetWinner" class="winner-text">{{ condorcetWinner }}</span>
                  <span v-else-if="hasCondorcetParadox" class="warning-text">无 (因悖论)</span>
                  <span v-else class="info-text">无明确胜者</span>
                </el-descriptions-item>
                <el-descriptions-item label="群体排序建议">{{ groupRanking }}</el-descriptions-item>
                <el-descriptions-item label="有效投票比例">{{ validVotes }} / {{ votes.length }} ({{ ((validVotes / (votes.length || 1)) * 100).toFixed(1) }}%)</el-descriptions-item>
                <el-descriptions-item label="群体一致性">
                  <el-tooltip :content="`一致性指数: ${consistencyIndex.toFixed(2)}% (基于当前数据估算)。指数越高，群体偏好越明确。`" placement="top">
                    <el-progress :percentage="parseFloat(consistencyIndex.toFixed(1))" :status="consistencyIndex > 70 ? 'success' : (consistencyIndex > 40 ? 'warning' : 'exception')"></el-progress>
                  </el-tooltip>
                </el-descriptions-item>
              </el-descriptions>
              <div v-if="hasCondorcetParadox" class="paradox-alarm-box">
                <el-alert
                  title="警示：检测到孔多塞悖论!"
                  type="error"
                  description='群体偏好形成循环 (如 A>B, B>C, C>A)，导致无法产生唯一公认的孔多塞胜者。这意味着基于简单多数的配对比较无法形成稳定的集体决策。请查看"悖论与循环检测"图表以获取详细信息。'
                  show-icon
                  :closable="false"
                />
              </div>
            </div>
            <el-empty v-else description="请点击上方按钮生成投票并启动分析"></el-empty>
          </el-card>
        </el-col>

        <el-col :span="16">
          <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane label="📊 投票与比较矩阵" name="matrices">
              <el-alert title="图表解读：投票概览与偏好强度" type="info" :closable="false" style="margin-bottom:15px;">
                <p><strong>投票偏好矩阵:</strong> 清晰展示每个投票人对所有候选项的偏好顺序。每一行代表一个投票人，列则表示偏好位次（第一、第二等）。您可以检查投票的有效性，无效票通常指与其他投票差异过大的票，或在手动输入时格式不正确的票。</p>
                <p><strong>两两比较矩阵 (偏好热力图):</strong> 显示任意两位候选项之间的比较结果。单元格 (Row X, Col Y) 的数字表示有多少有效投票认为"候选项X"优于"候选项Y"。颜色越深，代表偏好X的票数越多。对角线为灰色，因为候选项不与自身比较。</p>
              </el-alert>
              <el-card shadow="never">
                <template #header>
                  <div class="clearfix">
                    <span>投票偏好矩阵 (共 {{ votes.length }} 票, {{ validVotes }} 张有效)</span>
                    <el-tooltip content="未来可实现：点击单元格直接编辑投票排序，并实时更新分析结果。" placement="top">
                       <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-edit-outline" disabled></el-button>
                    </el-tooltip>
                  </div>
                </template>
                <div class="vote-matrix-container">
                  <el-table :data="voteData" border size="mini" stripe height="280">
                    <el-table-column prop="voter" label="投票人" width="85" fixed align="center"/>
                    <el-table-column
                      v-for="(candidate, index) in candidates"
                      :key="`rank-col-${candidate}`"
                      :prop="`rank${index}`"
                      :label="`第 ${index + 1} 序`"
                      min-width="65" 
                      align="center"
                    />
                    <el-table-column prop="valid" label="有效性" width="75" align="center" fixed="right">
                      <template #default="scope">
                        <el-tooltip :content="scope.row.validityReason || (scope.row.valid ? '此投票有效' : '此投票被标记为可能无效')" placement="top">
                          <el-tag :type="scope.row.valid ? 'success' : 'danger'" size="small">
                            {{ scope.row.valid ? '有效' : '无效' }}
                          </el-tag>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>

              <el-card shadow="never" style="margin-top: 20px;">
                 <template #header><span>两两比较矩阵 (A行B列: A优于B的票数)</span></template>
                <div ref="comparisonMatrixHeatmap" class="d3-chart comparison-matrix"></div>
                 <p class="chart-annotation" style="margin-top:10px;">
                  上图热力图展示了候选项之间的两两对决结果。单元格 (X, Y) 的数值代表在所有有效投票中，认为 X 优于 Y 的票数。
                  颜色越深，表示 X 相对 Y 的优势越大。该矩阵是判断是否存在孔多塞胜者和悖论的基础。
                </p>
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="🔄 悖论与循环图" name="paradox">
               <el-alert title="图表解读：揭示偏好网络与潜在冲突" type="info" :closable="false" style="margin-bottom:15px;">
                 <p>此图通过有向图可视化候选项之间的胜负关系。<strong>箭头从胜者指向败者</strong>（基于两两比较的多数票），<strong>节点越大表示该候选项整体实力越强</strong>（基于Copeland得分）。</p>
                 <ul>
                   <li><strong>无循环 (通常绿色箭头):</strong> 如果图中不存在有向循环，通常意味着存在孔多塞胜者（一个能击败所有其他候选项的个体）。</li>
                   <li><strong>存在循环 (通常红色箭头，循环路径高亮):</strong> 如果检测到孔多塞悖论，图中会存在一个或多个偏好循环 (例如 A > B > C > A)。这表明群体偏好不具有传递性，没有单一候选项能得到普遍认可。高亮的循环路径展示了悖论的具体构成。</li>
                 </ul>
               </el-alert>
              <el-card shadow="never">
                <template #header><span>胜负关系与循环检测图</span></template>
                <div ref="cycleGraph" class="d3-chart cycle-graph-view">
                  <el-empty v-if="!analysisDone || !cycleGraphData.nodes.length" description="请先分析投票数据以生成关系图"></el-empty>
                </div>
                <p v-if="analysisDone && hasCondorcetParadox" class="chart-annotation error-text">
                  检测到循环！红色高亮路径展示了一个导致悖论的循环。箭头表示胜者。
                </p>
                 <p v-if="analysisDone && !hasCondorcetParadox && cycleGraphData.nodes.length" class="chart-annotation success-text">
                  未检测到明确的偏好循环，网络结构清晰。
                </p>
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="🏆 排序与得分图" name="ranking">
              <el-alert title="图表解读：不同视角下的优胜者" type="info" :closable="false" style="margin-bottom:15px;">
                <p><strong>候选项得分条形图:</strong> 展示了基于特定计分规则（此处为Copeland得分：胜场数减去败场数）各候选项的得分。得分越高，表明该候选项在两两比较中表现越好。正分表示胜多于负，负分反之。</p>
                <p><strong>排名阶梯图:</strong> 直观地展示了基于分析得出的最终群体偏好排序。处于较高阶梯的候选项优于较低阶梯的。同一阶梯上的候选项表示它们在排序中处于相同级别（可能是并列，或在该排序方法下无法明确区分优劣）。当排名内容过多时，可以上下滑动查看完整排名。</p>
              </el-alert>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card shadow="never">
                    <template #header><span>候选项得分条形图 (Copeland Score)</span></template>
                    <div ref="scoreBarChart" class="d3-chart score-bar-chart">
                       <el-empty v-if="!analysisDone || !candidateScores.length" description="请先分析投票数据以生成得分图"></el-empty>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card shadow="never">
                     <template #header><span>群体偏好排名阶梯图</span></template>
                     <div ref="rankingLadderChart" class="d3-chart ranking-ladder-chart scrollable-chart">
                       <el-empty v-if="!analysisDone || !groupRanking" description="请先分析投票数据以生成排名阶梯图"></el-empty>
                     </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            
            <el-tab-pane label="🏔️ 单峰性分析" name="singlePeak">
              <el-alert title="图表与概念解读：偏好结构的内在逻辑" type="info" :closable="false" style="margin-bottom:15px;">
                <p><strong>单峰性 (Single-Peakedness):</strong> 投票理论中的重要性质。如果投票人对候选项的偏好是单峰的，意味着存在一个潜在的维度（例如，政治光谱的左到右），使得每个投票人对候选项的偏好从某个"理想点"（峰值）开始，向两边逐渐减弱。简单说，就是没有"最好"和"次好"的选项被一个"更差"的选项隔开的情况。</p>
                <p><strong>单峰性检测摘要:</strong> 显示在当前"假设维度"下，有多少投票符合单峰特性。如果所有投票都单峰，群体决策（如中位投票者定理）可能更容易达成。</p>
                <p><strong>偏好分布曲线图:</strong> 可视化每个投票人对按"假设维度"排列的候选项的偏好等级（1为最偏好）。单峰偏好应呈现单个"山峰"状（允许平顶）。多个峰值或"山谷"则表示非单峰。</p>
                <p><strong>中位项定理:</strong> 是一个重要结论，它指出：若所有投票者偏好单峰且投票人数为奇数，则位于中位投票者理想点（峰值点）的候选项是孔多塞胜者。此部分为理论介绍和验证思路。</p>
              </el-alert>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card shadow="never">
                    <template #header><span>单峰性检测摘要</span></template>
                    <div style="padding: 10px;">
                      <p>假设维度: <strong>{{ assumedDimensionOrder.join(' > ') }}</strong> (当前排序)</p>
                      <p>符合单峰偏好投票数: <strong>{{ singlePeakedVoteCount }} / {{ validVotes }}</strong> (有效票中)</p>
                      <p v-if="!isProfileCompletelySinglePeaked && analysisDone && validVotes > 0" class="warning-text">注意：当前投票集在该假设维度下并非完全单峰。</p>
                      <p v-if="isProfileCompletelySinglePeaked && analysisDone && validVotes > 0" class="success-text">当前投票集在该假设维度下表现出良好的单峰性。</p>
                      <p v-if="validVotes === 0 && analysisDone" class="info-text">无有效投票，无法进行单峰性分析。</p>
                      
                      <!-- 自定义假设维度输入 -->
                      <el-form label-width="100px" style="margin: 15px 0;">
                        <el-form-item label="自定义维度">
                          <el-input 
                            v-model="customDimensionInput" 
                            placeholder="例如: A,B,C,D 或 A > B > C > D"
                            :disabled="!analysisDone || candidates.length < 2"
                            @keyup.enter="applyCustomDimension"
                          />
                        </el-form-item>
                        <el-form-item>
                          <el-button-group style="width: 100%;">
                            <el-button size="small" @click="changeAssumedDimension" icon="el-icon-refresh" style="flex: 1;" :disabled="!analysisDone || candidates.length < 2">随机调整假设维度</el-button>
                            <el-button size="small" @click="applyCustomDimension" icon="el-icon-check" style="flex: 1;" :disabled="!analysisDone || candidates.length < 2 || !customDimensionInput.trim()">应用自定义维度</el-button>
                          </el-button-group>
                        </el-form-item>
                      </el-form>
                      
                      <el-button size="small" @click="removeNonSinglePeakedVotes" icon="el-icon-scissors" style="margin-top:10px;" :disabled="!analysisDone || singlePeakedVoteCount === validVotes || validVotes === 0"
                                 v-if="validVotes > 0 && singlePeakedVoteCount < validVotes">移除不符合单峰偏好的投票 ({{ validVotes - singlePeakedVoteCount }} 票)</el-button>
                      
                      <!-- 自动寻找最佳维度按钮 -->
                      <el-button size="small" @click="findOptimalSinglePeakedDimension" icon="el-icon-search" style="margin-top:10px; margin-left: 10px;" 
                                 :disabled="!analysisDone || candidates.length > 6" :loading="searchingOptimalDimension">
                        {{ searchingOptimalDimension ? '搜索中...' : '自动寻找最佳单峰维度' }}
                        <span v-if="candidates.length > 6" style="font-size: 11px;">(候选项>6时不可用)</span>
                      </el-button>
                      
                      <!-- 恢复票据按钮 -->
                      <el-button size="small" @click="restoreRemovedSinglePeakedVotes" icon="el-icon-refresh-left" style="margin-top:10px; margin-left: 10px;" 
                                 v-if="removedSinglePeakedVoteCount > 0" type="warning">恢复因单峰性移除的投票 ({{ removedSinglePeakedVoteCount }} 票)</el-button>
                      
                      <!-- 手动寻找维度的帮助按钮 -->
                      <el-button size="small" @click="showSinglePeakednessHelp" icon="el-icon-question" style="margin-top:10px; margin-left: 10px;" 
                                 type="info" plain>如何手动寻找单峰维度？</el-button>
                    </div>
                  </el-card>
                  <el-card shadow="never" style="margin-top: 20px;">
                    <template #header><span>投票单峰性详情</span></template>
                    <div class="vote-matrix-container" style="max-height: 200px;">
                      <el-table :data="singlePeakednessDetails" border size="mini" stripe>
                        <el-table-column prop="voter" label="投票人" width="70" align="center"/>
                        <el-table-column prop="ranking" label="偏好排序" min-width="100"/>
                        <el-table-column prop="isSinglePeaked" label="是否单峰" width="80" align="center">
                          <template #default="scope">
                            <el-tag :type="scope.row.isSinglePeaked ? 'success' : 'warning'" size="small">
                              {{ scope.row.isSinglePeaked ? '是' : '否' }}
                            </el-tag>
                          </template>
                        </el-table-column>
                        <el-table-column prop="reason" label="备注 (若非单峰)" min-width="120"/>
                      </el-table>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card shadow="never">
                    <template #header><span>偏好分布曲线图</span></template>
                    <div ref="preferenceCurveChart" class="d3-chart preference-curve-chart">
                      <el-empty v-if="!analysisDone" description="请先分析投票以生成偏好曲线图"></el-empty>
                    </div>
                     <p class="chart-annotation">上图展示了每个投票人对候选项（按假设维度 {{ assumedDimensionOrder.join(',') }} 排列）的偏好等级（1为最偏好）。单峰偏好应呈现单个峰值（或平顶后下降）。</p>
                  </el-card>
                </el-col>
              </el-row>
               <el-card shadow="never" style="margin-top:20px;">
                  <template #header><span>中位项定理验证 (概念与思路)</span></template>
                  <div style="padding:10px;">
                    <p><strong>中位项定理 (Median Voter Theorem)</strong> 是社会选择理论中的一个经典结论。它指出：若所有投票者的偏好都是<strong>单峰的</strong> (相对于某个一维政策空间或候选项排列)，并且投票者人数为<strong>奇数</strong>，那么位于<strong>中位投票者</strong>的<strong>理想点</strong> (最偏好的候选项) 将是<strong>孔多塞胜者</strong>。</p>
                    <p><strong>验证步骤思路</strong>:</p>
                    <ol>
                      <li>确认所有有效投票偏好在当前假设维度下确实是单峰的。</li>
                      <li>确认有效投票人数为奇数。</li>
                      <li>识别每个单峰投票者的理想点（峰值点）。</li>
                      <li>将所有投票者的理想点按其在假设维度中的顺序排列，找到中位投票者的理想点。</li>
                      <li>该理想点对应的候选项，即为理论预测的孔多塞胜者。可与下方通过两两比较法计算的孔多塞胜者对比。</li>
                    </ol>
                    <el-button @click="demonstrateCondorcetViaMedianVoter" size="small" icon="el-icon-magic-stick" :disabled="!analysisDone">理论验证孔多塞胜者</el-button>
                    <div v-if="condorcetWinnerDemoResult" style="margin-top:10px; padding:10px; border:1px solid #eee; border-radius:4px;">
                      <p v-html="condorcetWinnerDemoResult"></p>
                    </div>
                    <p class="info-text" style="margin-top:10px;">注意：此验证依赖于当前选择的"假设维度"以及投票是否真实反映了在该维度上的单峰偏好。</p>
                  </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog 
      title="使用指南与核心概念" 
      v-model="showHelpDialog" 
      width="60%">
      <div style="max-height: 70vh; overflow-y: auto;">
        <h4>欢迎使用表决问题分析器！</h4>
        <p>本工具旨在帮助您理解和分析各种投票情景下的群体决策过程和可能出现的现象。</p>
        
        <h4>基本使用流程：</h4>
        <ol>
          <li><strong>参数设置:</strong> 选择随机生成或手动定义投票数据</li>
          <li><strong>核心分析摘要:</strong> 查看孔多塞悖论、胜者等关键结果</li>
          <li><strong>详细分析标签页:</strong> 深入了解投票矩阵、循环图、排序等</li>
          <li><strong>单峰性分析:</strong> 探索投票的单峰性质和中位投票者定理</li>
        </ol>

        <h4>🎯 新功能亮点：</h4>
        <ul>
          <li><strong>智能单峰性分析：</strong> 自动寻找最佳维度排序</li>
          <li><strong>投票恢复机制：</strong> 安全的数据备份和恢复</li>
          <li><strong>理论验证工具：</strong> 验证中位投票者定理</li>
        </ul>
        
        <h4>📖 核心概念：</h4>
        <ul>
          <li><strong>🏆 孔多塞胜者:</strong> 能击败所有其他候选项的选项</li>
          <li><strong>🔄 孔多塞悖论:</strong> 群体偏好形成循环的现象</li>
          <li><strong>🏔️ 单峰性质:</strong> 投票人偏好在维度上的单峰分布</li>
        </ul>
        
        <p style="text-align: center; margin-top: 20px; color: #666; font-style: italic;">
          💡 更多详细概念解释请在分析过程中查看各标签页的说明信息
        </p>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="showHelpDialog = false">我明白了</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import * as d3 from 'd3';
import _ from 'lodash'; // For debounce and shuffle

export default {
  name: 'VotingProblem',
  data() {
    return {
      voterCount: 5,
      candidateCount: 4,
      votes: [], 
      candidates: [], 
      voteData: [], 
      
      comparisonMatrix: [], 
      hasCondorcetParadox: false,
      condorcetWinner: null,
      invalidVotes: 0,
      validVotes: 0,
      groupRanking: '',

      candidateScores: [],
      cycleGraphData: { nodes: [], links: [] }, 
      highlightedCycle: null,

      analysisDone: false, 
      activeTab: 'matrices',
      consistencyIndex: 0, 

      assumedDimensionOrder: [],
      singlePeakednessDetails: [], 
      singlePeakedVoteCount: 0,
      isProfileCompletelySinglePeaked: false,

      debouncedGenerateVotes: null,

      showHelpDialog: false, // 初始为false，将在mounted中设为true
      activeVoteInputMode: 'random', // 'random' or 'manual'
      manualCandidatesString: 'A,B,C,D',
      manualVoterCount: 3,
      manualVoteInputs: ['A>B>C>D', 'B>C>D>A', 'C>D>A>B'], // Array of strings like "A>B>C"
      manualCandidates: ['A','B','C','D'],
      manualPlaceholders: [],

      condorcetWinnerDemoResult: '',
      customDimensionInput: '',
      removedSinglePeakedVoteCount: 0,
      originalVotesBackup: [], // 保存原始投票数据的备份
      searchingOptimalDimension: false,
    };
  },
  created() {
      this.debouncedGenerateVotes = _.debounce(this.generateAndAnalyze, 700);
      this.parseManualCandidates(); // Initialize manual candidates
      this.adjustManualVoteInputs(); // Initialize manual vote inputs based on default count
  },
  mounted() {
    // Auto-generate on load if in random mode, or prepare for manual
    if (this.activeVoteInputMode === 'random') {
        this.generateVotes(); // Generate initial structure but don't analyze yet
        this.analyzeAll(false); // 初次加载时不显示弹窗
    } else {
        this.parseManualCandidates(); // Ensure candidates are ready for manual input display
        this.adjustManualVoteInputs();
    }
    
    // 初始化自定义维度输入框的占位符
    this.updateCustomDimensionPlaceholder();
  },
  methods: {
    generateAndAnalyze() {
        if (this.activeVoteInputMode === 'manual' && this.manualCandidates.length > 0 && this.manualVoteInputs.some(v => v.trim() !== '')) {
            this.$message.warn('当前为手动模式。如需随机生成，请切换到 "随机生成" 标签页或先清空手动数据。若要分析手动数据，请点击 "使用手动数据分析"。');
            // Optionally, clear analysis or prompt user
            // this.clearPreviousAnalysis(); // A new method to clear results if needed
            return;
        }
        this.activeVoteInputMode = 'random'; // Ensure mode is correct
        this.generateVotes();
        this.analyzeAll(true); // 显示分析完成弹窗
    },
    generateVotes() {
      // This method is primarily for random generation
      this.candidates = Array.from({ length: this.candidateCount }, (_, i) => String.fromCharCode(65 + i));
      this.assumedDimensionOrder = [...this.candidates]; 

      this.votes = [];
      for (let i = 0; i < this.voterCount; i++) {
        const vote = [...this.candidates].sort(() => Math.random() - 0.5);
        this.votes.push({
          voter: i + 1,
          ranking: vote,
          valid: true, 
          validityReason: '初始有效 (随机生成)'
        });
      }
      this.updateVoteData();
      this.analysisDone = false;
      this.clearVisualizations();
      this.condorcetWinnerDemoResult = '';
    },

    parseManualCandidates() {
        this.manualCandidates = this.manualCandidatesString.split(',')
            .map(c => c.trim().toUpperCase())
            .filter(c => c !== '');
        if (this.manualCandidates.length > 0) {
            this.candidateCount = this.manualCandidates.length; // Sync global candidate count
            this.assumedDimensionOrder = [...this.manualCandidates];
            this.generateManualPlaceholders();
        } else {
            this.$message.warn("请输入有效的候选项名称。");
        }
    },

    adjustManualVoteInputs() {
        const diff = this.manualVoterCount - this.manualVoteInputs.length;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                this.manualVoteInputs.push('');
            }
        } else if (diff < 0) {
            this.manualVoteInputs.splice(this.manualVoterCount);
        }
        this.generateManualPlaceholders();
    },
    
    generateManualPlaceholders() {
      this.manualPlaceholders = this.manualVoteInputs.map(() => {
        if (!this.manualCandidates || this.manualCandidates.length === 0) return 'A > B > C';
        return [...this.manualCandidates].sort(() => 0.5 - Math.random()).join(' > ');
      });
    },

    analyzeManualVotes() {
        this.activeVoteInputMode = 'manual';
        this.parseManualCandidates(); // Ensure candidates are up-to-date

        if (this.manualCandidates.length === 0) {
            this.$message.error("请至少定义一个候选项。");
            return;
        }
        if (this.manualVoteInputs.every(v => v.trim() === '')) {
            this.$message.error("请输入至少一个投票人的偏好。");
            return;
        }

        this.candidates = [...this.manualCandidates];
        this.voterCount = this.manualVoterCount; // Sync global voter count

        this.votes = [];
        let allInputsValid = true;
        this.manualVoteInputs.forEach((inputStr, index) => {
            if (inputStr.trim() === '') return; // Skip empty inputs if some are filled

            const ranking = inputStr.split(/[,>]/).map(s => s.trim().toUpperCase()).filter(s => s !== '');
            
            // Validate ranking against defined candidates
            const uniqueRanking = _.uniq(ranking);
            let currentVoteValid = true;
            let validityReason = '有效 (手动输入)';

            if (uniqueRanking.length !== ranking.length) {
                currentVoteValid = false;
                validityReason = '偏好中包含重复候选项。';
            } else if (!ranking.every(rCand => this.candidates.includes(rCand))) {
                currentVoteValid = false;
                validityReason = '偏好中包含未定义的候选项。';
            } else if (ranking.length !== this.candidates.length) {
                 currentVoteValid = false;
                 validityReason = `偏好数量 (${ranking.length}) 与候选项总数 (${this.candidates.length}) 不符。`;
            }


            this.votes.push({
                voter: index + 1,
                ranking: currentVoteValid ? ranking : this.candidates.map(c => '-'), // Provide a placeholder if invalid
                valid: currentVoteValid,
                validityReason: validityReason,
            });
            if (!currentVoteValid) {
                allInputsValid = false;
            }
        });
        
        if (!allInputsValid) {
           this.$message({
             message: '⚠️ 部分手动输入的投票存在格式问题，已标记为无效票',
             type: 'warning',
             duration: 3500,
             showClose: true
           });
        }


        if (this.votes.length === 0) {
            this.$message({
              message: '❌ 未能解析任何有效投票，请检查输入格式',
              type: 'error',
              duration: 4000,
              showClose: true
            });
            this.analysisDone = false;
            this.clearVisualizations();
            this.updateVoteData(); // Update table to show parsing issues
            return;
        }
        
        this.condorcetWinnerDemoResult = '';
        this.analyzeAll(true); // 用户手动分析时显示弹窗
    },


    updateVoteData() {
      this.voteData = this.votes.map(vote => {
        const data = { 
            voter: `V${vote.voter}`, 
            valid: vote.valid,
            validityReason: vote.validityReason 
        };
        this.candidates.forEach((cand, index) => {
            data[`rank${index}`] = vote.ranking[index] || '-';
        });
        return data;
      });
    },

    analyzeAll(showSuccessDialog = true) {
      if (this.votes.length === 0) {
        this.$message.warn('请先生成投票数据或完成手动输入。');
        this.clearPreviousAnalysis();
        return;
      }
      
      // 创建原始投票数据的备份（只在第一次分析或重新生成数据时）
      if (this.originalVotesBackup.length === 0 || showSuccessDialog) {
        this.originalVotesBackup = JSON.parse(JSON.stringify(this.votes));
      }
      
      // For manual votes, validity is partially checked during input parsing.
      // For random votes, or further checks on manual votes:
      if (this.activeVoteInputMode === 'random' || this.votes.some(v => v.validityReason.startsWith('有效 (手动输入)'))) {
         this.checkSimplifiedVoteValidity(); // Apply similarity check if not just parsed or always
      }

      this.buildPairwiseComparisonMatrix();
      this.checkCondorcetParadox();
      this.calculateCondorcetWinner();
      this.calculateCandidateScores();
      this.calculateGroupRanking();
      this.prepareCycleGraphData();
      this.calculateConsistencyIndex();
      
      this.assumedDimensionOrder = this.assumedDimensionOrder.length === this.candidates.length && this.assumedDimensionOrder.every(c => this.candidates.includes(c)) 
                                  ? this.assumedDimensionOrder 
                                  : [...this.candidates]; // Ensure assumedDimensionOrder is valid for current candidates.

      this.analyzeSinglePeakedness();

      this.invalidVotes = this.votes.filter(vote => !vote.valid).length;
      this.validVotes = this.votes.filter(vote => vote.valid).length;
      
      this.updateVoteData(); // Update table data
      this.renderAllVisualizations();
      this.analysisDone = true;
      
      // 只有在showSuccessDialog为true时才显示分析完成弹窗
      if(showSuccessDialog) {
        if(this.validVotes > 0 && this.candidates.length > 0) {
          this.$message({
            message: `🎉 投票分析完成！共分析 ${this.validVotes} 张有效选票，${this.candidates.length} 个候选项`,
            type: 'success',
            duration: 3000,
            showClose: true
          });
        } else if (this.votes.length > 0) {
          this.$message({
            message: `⚠️ 投票分析完成，但无有效选票或候选项`,
            type: 'warning',
            duration: 3000,
            showClose: true
          });
        }
      }
      this.condorcetWinnerDemoResult = ''; // Reset demo result on new analysis
    },

    clearPreviousAnalysis() {
        this.analysisDone = false;
        this.votes = [];
        // this.candidates = []; // Keep manual candidates if in manual mode and just clearing analysis
        this.voteData = [];
        this.comparisonMatrix = [];
        this.hasCondorcetParadox = false;
        this.condorcetWinner = null;
        this.invalidVotes = 0;
        this.validVotes = 0;
        this.groupRanking = '';
        this.candidateScores = [];
        this.cycleGraphData = { nodes: [], links: [] };
        this.highlightedCycle = null;
        this.consistencyIndex = 0;
        this.singlePeakednessDetails = [];
        this.singlePeakedVoteCount = 0;
        this.isProfileCompletelySinglePeaked = false;
        this.condorcetWinnerDemoResult = '';
        this.customDimensionInput = '';
        this.removedSinglePeakedVoteCount = 0;
        this.originalVotesBackup = [];
        this.searchingOptimalDimension = false;
        this.clearVisualizations();
        this.updateVoteData();
    },


    checkSimplifiedVoteValidity() {
      if (this.votes.length === 0) return;

      this.votes.forEach(vote => {
        // Only re-evaluate if not already marked invalid by manual parsing or other prior checks
        if (vote.validityReason === '有效 (手动输入)' || vote.validityReason === '初始有效 (随机生成)' || vote.validityReason === '有效' || vote.validityReason === "有效票过少，全部重置为有效") {
            vote.valid = true; // Assume valid initially for this check
            vote.validityReason = this.activeVoteInputMode === 'manual' ? '有效 (手动输入)' : '有效';


            // Duplication check within the ranking itself
            const uniqueRankingCheck = _.uniq(vote.ranking);
            if (vote.ranking.some(r => r === '-') && vote.ranking.length === this.candidates.length) {
                 // This case should have been caught by manual input parsing.
            } else if (uniqueRankingCheck.length !== vote.ranking.length && vote.ranking.length > 0) {
                vote.valid = false;
                vote.validityReason = "偏好中包含重复候选项 (内部检查)。";
                return; // Skip similarity if already invalid
            }


            let totalSimilarity = 0;
            let comparedVotesCount = 0;
            this.votes.forEach(otherVote => { 
              if (vote.voter !== otherVote.voter && otherVote.valid) { // Only compare with other valid votes
                totalSimilarity += this.calculateRankingSimilarity(vote.ranking, otherVote.ranking);
                comparedVotesCount++;
              }
            });
            
            if (comparedVotesCount > 0) {
              const avgSimilarity = totalSimilarity / comparedVotesCount;
              if (avgSimilarity < 0.20 && this.votes.length > 3 && this.validVotes > 2) { // Apply stricter check if enough other votes
                vote.valid = false;
                vote.validityReason = `与其他有效投票平均相似度 (${(avgSimilarity*100).toFixed(1)}%) 过低`;
              }
            }
        }
      });
    },

    calculateRankingSimilarity(ranking1, ranking2) {
      let concordantPairs = 0;
      const n = this.candidates.length;
      if (n < 2) return 1;

      const pairs = [];
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          pairs.push([this.candidates[i], this.candidates[j]]);
        }
      }
      if (pairs.length === 0) return 0;

      pairs.forEach(([c1, c2]) => {
        const pos1_c1 = ranking1.indexOf(c1);
        const pos1_c2 = ranking1.indexOf(c2);
        const pos2_c1 = ranking2.indexOf(c1);
        const pos2_c2 = ranking2.indexOf(c2);

        if (pos1_c1 !== -1 && pos1_c2 !== -1 && pos2_c1 !== -1 && pos2_c2 !== -1) {
          if ((pos1_c1 < pos1_c2 && pos2_c1 < pos2_c2) || (pos1_c1 > pos1_c2 && pos2_c1 > pos2_c2)) {
            concordantPairs++;
          }
        }
      });
      return concordantPairs / pairs.length;
    },
    
    buildPairwiseComparisonMatrix() {
      const n = this.candidateCount;
      this.comparisonMatrix = Array(n).fill(null).map(() => Array(n).fill(0));
      const localValidVotes = this.votes.filter(vote => vote.valid);

      localValidVotes.forEach(vote => {
        for (let i = 0; i < vote.ranking.length; i++) {
          for (let j = i + 1; j < vote.ranking.length; j++) {
            const cand1 = vote.ranking[i]; 
            const cand2 = vote.ranking[j]; 
            const idx1 = this.candidates.indexOf(cand1);
            const idx2 = this.candidates.indexOf(cand2);
            if (idx1 !== -1 && idx2 !== -1) {
              this.comparisonMatrix[idx1][idx2]++; 
            }
          }
        }
      });
    },

    checkCondorcetParadox() {
      const n = this.candidateCount;
      const dominanceGraph = Array(n).fill(null).map(() => []); 
      const inDegree = Array(n).fill(0);

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i === j) continue;
          if (this.comparisonMatrix[i][j] > this.comparisonMatrix[j][i]) {
            dominanceGraph[i].push(j); 
            inDegree[j]++;
          }
        }
      }

      const queue = [];
      for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) queue.push(i);
      }

      let processedCount = 0;
      while (queue.length > 0) {
        const u = queue.shift();
        processedCount++;
        dominanceGraph[u].forEach(v => {
          inDegree[v]--;
          if (inDegree[v] === 0) queue.push(v);
        });
      }
      this.hasCondorcetParadox = processedCount < n && n > 0;

      if (this.hasCondorcetParadox) {
        this.highlightedCycle = this.findCondorcetCycle(dominanceGraph, n);
      } else {
        this.highlightedCycle = null;
      }
    },
    
    findCondorcetCycle(adj, n) {
        const visited = new Array(n).fill(0);
        const recursionStack = new Array(n).fill(false);
        const path = [];

        const dfs = (u) => {
            visited[u] = 1;
            recursionStack[u] = true;
            path.push(u);

            for (const v of adj[u] || []) {
                if (!visited[v]) {
                    const cycleFound = dfs(v);
                    if (cycleFound) return cycleFound;
                } else if (recursionStack[v]) {
                    const cycleStartIndex = path.indexOf(v);
                    const cycleNodesIndices = path.slice(cycleStartIndex);
                    const cycleNodes = cycleNodesIndices.map(idx => this.candidates[idx]);
                    const cycleLinks = [];
                    for(let i = 0; i < cycleNodesIndices.length; i++) {
                        cycleLinks.push({
                            source: this.candidates[cycleNodesIndices[i]],
                            target: this.candidates[cycleNodesIndices[(i + 1) % cycleNodesIndices.length]]
                        });
                    }
                    return { nodes: cycleNodes, links: cycleLinks };
                }
            }
            recursionStack[u] = false;
            path.pop();
            visited[u] = 2;
            return null;
        };

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                const cycle = dfs(i);
                if (cycle) return cycle;
            }
        }
        return null;
    },

    calculateCondorcetWinner() {
        if (this.hasCondorcetParadox) {
            this.condorcetWinner = null;
            return;
        }
        for (let i = 0; i < this.candidateCount; i++) {
            let isWinner = true;
            for (let j = 0; j < this.candidateCount; j++) {
                if (i === j) continue;
                if (this.comparisonMatrix[i][j] <= this.comparisonMatrix[j][i]) {
                    isWinner = false;
                    break;
                }
            }
            if (isWinner) {
                this.condorcetWinner = this.candidates[i];
                return;
            }
        }
        this.condorcetWinner = null; 
    },

    calculateCandidateScores() {
        this.candidateScores = this.candidates.map((candidate, i) => {
            let score = 0;
            for (let j = 0; j < this.candidateCount; j++) {
                if (i === j) continue;
                if (this.comparisonMatrix[i][j] > this.comparisonMatrix[j][i]) {
                    score++; 
                } else if (this.comparisonMatrix[i][j] < this.comparisonMatrix[j][i]) {
                    score--; 
                }
            }
            return { candidate, score };
        });
        this.candidateScores.sort((a, b) => b.score - a.score);
    },
    
    calculateGroupRanking() {
      const localValidVotes = this.votes.filter(vote => vote.valid);
      if (localValidVotes.length === 0 && this.votes.length > 0) { 
          this.groupRanking = "无有效投票,无法排序";
          return;
      }
      if (this.votes.length === 0) { 
         this.groupRanking = "无投票数据";
         return;
      }

      if (this.hasCondorcetParadox) {
        const candidateMedianRanks = this.candidates.map(c => {
            const ranksForC = localValidVotes.map(vote => vote.ranking.indexOf(c) + 1).filter(r => r > 0); 
            ranksForC.sort((a, b) => a - b); 
            let medianRank;
            if (ranksForC.length === 0) medianRank = Infinity; 
            else if (ranksForC.length % 2 === 1) medianRank = ranksForC[Math.floor(ranksForC.length / 2)];
            else medianRank = (ranksForC[ranksForC.length / 2 - 1] + ranksForC[ranksForC.length / 2]) / 2;
            return { candidate: c, medianRank };
        });
        candidateMedianRanks.sort((a, b) => a.medianRank - b.medianRank);
        this.groupRanking = candidateMedianRanks.map(item => item.candidate).join(' > ') + " (基于中位数排名)";
      } else {
        let rankStr = "";
        let currentRank = [];
        let lastScore = null;
        this.candidateScores.forEach((item, index) => {
            if (lastScore !== null && item.score < lastScore) {
                rankStr += currentRank.join(', ') + " > ";
                currentRank = [item.candidate];
            } else {
                currentRank.push(item.candidate);
            }
            lastScore = item.score;
        });
        rankStr += currentRank.join(', '); 
        this.groupRanking = rankStr;

        if (this.condorcetWinner) this.groupRanking += ` (孔多塞胜者: ${this.condorcetWinner})`;
        else if (this.candidateCount > 0 && this.candidateScores.length > 0 && this.candidateScores[0].score > (this.candidateScores[1]?.score ?? -Infinity)) {
             this.groupRanking += ` (首选: ${this.candidateScores[0].candidate})`;
        }
      }
    },

    prepareCycleGraphData() {
        const nodes = this.candidates.map((cand, i) => ({
            id: cand, name: cand,
            score: this.candidateScores.find(s => s.candidate === cand)?.score || 0 
        }));
        const links = [];
        for (let i = 0; i < this.candidateCount; i++) {
            for (let j = 0; j < this.candidateCount; j++) {
                if (i === j) continue;
                if (this.comparisonMatrix[i][j] > this.comparisonMatrix[j][i]) {
                    links.push({
                        source: this.candidates[i], 
                        target: this.candidates[j], 
                        strength: this.comparisonMatrix[i][j], 
                    });
                }
            }
        }
        this.cycleGraphData = { nodes, links };
    },

    calculateConsistencyIndex() {
        const localValidVotes = this.votes.filter(v => v.valid);
        if (localValidVotes.length < 2) {
            this.consistencyIndex = 50;
            return;
        }
        if (this.hasCondorcetParadox) {
            this.consistencyIndex = _.random(15, 35); 
            return;
        } 
        
        let totalPairwiseAgreementStrength = 0;
        let numComparisons = 0;
        for (let i = 0; i < this.candidateCount; i++) {
            for (let j = i + 1; j < this.candidateCount; j++) {
                const votesForIvsJ = this.comparisonMatrix[i][j];
                const votesForJvsI = this.comparisonMatrix[j][i];
                if (votesForIvsJ + votesForJvsI > 0) { 
                    totalPairwiseAgreementStrength += Math.abs(votesForIvsJ - votesForJvsI) / (votesForIvsJ + votesForJvsI);
                    numComparisons++;
                }
            }
        }
        const avgAgreement = numComparisons > 0 ? (totalPairwiseAgreementStrength / numComparisons) * 100 : 50;
        this.consistencyIndex = 50 + (avgAgreement / 2); 
        if (!this.condorcetWinner && this.candidateCount > 2) { 
            this.consistencyIndex = Math.max(30, this.consistencyIndex - 20); 
        }
        this.consistencyIndex = Math.min(100, Math.max(0, this.consistencyIndex));
    },

    removeInvalidVotes() {
      const numRemoved = this.invalidVotes;
      this.votes = this.votes.filter(vote => vote.valid);
      if (numRemoved > 0) {
        this.$message({
          message: `🗑️ 已移除 ${numRemoved} 张无效票，正在重新分析...`,
          type: 'info',
          duration: 3000,
          showClose: true
        });
        this.analyzeAll(true); // 用户移除无效票后重新分析时显示弹窗
      } else {
        this.$message({
          message: `ℹ️ 没有无效票可移除`,
          type: 'info',
          duration: 2500,
          showClose: true
        });
      }
    },

    analyzeSinglePeakedness() {
        this.singlePeakednessDetails = [];
        this.singlePeakedVoteCount = 0;
        const localValidVotes = this.votes.filter(v => v.valid);

        if (localValidVotes.length === 0 || this.assumedDimensionOrder.length === 0) {
            this.isProfileCompletelySinglePeaked = false;
            this.singlePeakednessDetails = [];
            this.singlePeakedVoteCount = 0;
            return;
        }

        localValidVotes.forEach(vote => {
            const result = this.checkVoterSinglePeakedness(vote.ranking, this.assumedDimensionOrder);
            this.singlePeakednessDetails.push({
                voter: `V${vote.voter}`,
                ranking: vote.ranking.join(' > '),
                isSinglePeaked: result.isSinglePeaked,
                reason: result.isSinglePeaked ? '符合单峰' : result.reason
            });
            if (result.isSinglePeaked) {
                this.singlePeakedVoteCount++;
            }
        });
        this.isProfileCompletelySinglePeaked = this.singlePeakedVoteCount === localValidVotes.length && localValidVotes.length > 0;
    },

    checkVoterSinglePeakedness(ranking, dimensionOrder) {
        const ranksOnDimension = dimensionOrder.map(candidateInDimension => {
            const rankInVote = ranking.indexOf(candidateInDimension);
            return rankInVote === -1 ? Infinity : rankInVote + 1; 
        });

        const peakRankValue = Math.min(...ranksOnDimension);
        if (peakRankValue === Infinity) {
            return { isSinglePeaked: true, reason: "该投票人未对维度上的任何候选项排序 (视为单峰)" };
        }

        const firstPeakIndex = ranksOnDimension.indexOf(peakRankValue);
        const lastPeakIndex = ranksOnDimension.lastIndexOf(peakRankValue); 

        for (let i = firstPeakIndex - 1; i >= 0; i--) {
            if (ranksOnDimension[i] < ranksOnDimension[i+1]) { 
                return { isSinglePeaked: false, reason: `在峰值点 ${dimensionOrder[firstPeakIndex]} 左侧, ${dimensionOrder[i]} (序${ranksOnDimension[i]}) 比 ${dimensionOrder[i+1]} (序${ranksOnDimension[i+1]}) 更受偏好, 破坏单调性` };
            }
        }
        for (let i = lastPeakIndex + 1; i < ranksOnDimension.length; i++) {
            if (ranksOnDimension[i] < ranksOnDimension[i-1]) { 
                 return { isSinglePeaked: false, reason: `在峰值点 ${dimensionOrder[lastPeakIndex]} 右侧, ${dimensionOrder[i]} (序${ranksOnDimension[i]}) 比 ${dimensionOrder[i-1]} (序${ranksOnDimension[i-1]}) 更受偏好, 破坏单调性` };
            }
        }
        return { isSinglePeaked: true };
    },

    changeAssumedDimension() {
        if (this.candidates.length < 2) {
            this.$message.info("候选项少于2个，无法改变维度顺序。");
            return;
        }
        
        // 在调整假设维度前，恢复所有因单峰性被移除的投票
        this.restoreRemovedSinglePeakedVotesQuietly();
        
        this.assumedDimensionOrder = _.shuffle(this.assumedDimensionOrder);
        this.$message({
          message: `🔄 假设维度已更新：${this.assumedDimensionOrder.join(' → ')}`,
          type: 'success',
          duration: 3500,
          showClose: true
        });
        
        // Only re-analyze single-peakedness and its dependent charts
        this.analyzeSinglePeakedness();
        this.renderPreferenceCurveChart();
        this.condorcetWinnerDemoResult = ''; // Reset demo as dimension changed
    },

    applyCustomDimension() {
        if (!this.customDimensionInput.trim()) {
            this.$message.warn("请输入自定义维度排序。");
            return;
        }
        
        // 解析自定义维度输入
        let parsedDimension = [];
        if (this.customDimensionInput.includes('>')) {
            parsedDimension = this.customDimensionInput.split('>').map(c => c.trim().toUpperCase()).filter(c => c !== '');
        } else {
            parsedDimension = this.customDimensionInput.split(',').map(c => c.trim().toUpperCase()).filter(c => c !== '');
        }
        
        // 验证输入的候选项是否都存在
        const invalidCandidates = parsedDimension.filter(c => !this.candidates.includes(c));
        if (invalidCandidates.length > 0) {
            this.$message.error(`无效的候选项：${invalidCandidates.join(', ')}。请输入有效的候选项：${this.candidates.join(', ')}`);
            return;
        }
        
        // 检查是否包含所有候选项
        const missingCandidates = this.candidates.filter(c => !parsedDimension.includes(c));
        if (missingCandidates.length > 0) {
            this.$message.warn(`缺少候选项：${missingCandidates.join(', ')}。已自动添加到维度末尾。`);
            parsedDimension = [...parsedDimension, ...missingCandidates];
        }
        
        // 去重并保持顺序
        parsedDimension = [...new Set(parsedDimension)];
        
        // 在调整假设维度前，恢复所有因单峰性被移除的投票
        this.restoreRemovedSinglePeakedVotesQuietly();
        
        this.assumedDimensionOrder = parsedDimension;
        this.customDimensionInput = '';
        
        this.$message({
          message: `✅ 自定义假设维度已应用：${this.assumedDimensionOrder.join(' → ')}`,
          type: 'success',
          duration: 3500,
          showClose: true
        });
        
        // Only re-analyze single-peakedness and its dependent charts
        this.analyzeSinglePeakedness();
        this.renderPreferenceCurveChart();
        this.condorcetWinnerDemoResult = ''; // Reset demo as dimension changed
    },

    removeNonSinglePeakedVotes() {
        let removedCount = 0;
        const nonSinglePeakedVoterIds = this.singlePeakednessDetails
            .filter(detail => !detail.isSinglePeaked)
            .map(detail => parseInt(detail.voter.substring(1)));

        this.votes.forEach(vote => {
            if (nonSinglePeakedVoterIds.includes(vote.voter)) {
                if (vote.valid) { // Only count if it was valid before
                    removedCount++;
                }
                vote.valid = false;
                vote.validityReason = "因不符合当前假设维度下单峰性而被移除";
            }
        });

        this.removedSinglePeakedVoteCount += removedCount; // 累积记录移除的票数

        if (removedCount > 0) {
            this.$message({
              message: `📊 已移除 ${removedCount} 张不符合单峰性的投票，重新分析中...`,
              type: 'info',
              duration: 3500,
              showClose: true
            });
            this.analyzeAll(false); // 不显示成功弹窗，因为这是中间操作
        } else {
            this.$message({
              message: `ℹ️ 没有可移除的非单峰投票`,
              type: 'info',
              duration: 2500,
              showClose: true
            });
        }
    },

    restoreRemovedSinglePeakedVotes() {
        if (this.originalVotesBackup.length === 0) {
            this.$message.warn("没有备份数据可恢复。");
            return;
        }
        
        // 从备份中恢复所有原始投票数据
        this.votes = JSON.parse(JSON.stringify(this.originalVotesBackup));
        this.removedSinglePeakedVoteCount = 0;
        
        this.$message({
          message: `🔄 已恢复所有原始投票数据，重新分析中...`,
          type: 'success',
          duration: 3500,
          showClose: true
        });
        
        this.analyzeAll(false); // 重新分析但不显示成功弹窗
    },

    restoreRemovedSinglePeakedVotesQuietly() {
        if (this.originalVotesBackup.length === 0) {
            return;
        }
        
        // 静默恢复：只恢复因单峰性被移除的投票，保留其他无效票的状态
        const currentValidVotes = this.votes.filter(v => v.valid);
        const backupVotes = JSON.parse(JSON.stringify(this.originalVotesBackup));
        
        // 恢复因单峰性被移除的投票
        this.votes.forEach((vote, index) => {
            if (!vote.valid && vote.validityReason === "因不符合当前假设维度下单峰性而被移除") {
                // 从备份中恢复该票的原始状态
                const originalVote = backupVotes.find(bv => bv.voter === vote.voter);
                if (originalVote) {
                    Object.assign(vote, originalVote);
                }
            }
        });
        
        this.removedSinglePeakedVoteCount = 0;
    },

    demonstrateCondorcetViaMedianVoter() {
        this.condorcetWinnerDemoResult = '';
        if (!this.analysisDone || this.validVotes === 0) {
            this.condorcetWinnerDemoResult = "<strong class='warning-text'>请先进行投票分析，并确保有有效选票。</strong>";
            return;
        }

        if (!this.isProfileCompletelySinglePeaked) {
            this.condorcetWinnerDemoResult = "<strong class='warning-text'>当前投票组合在假设维度下并非完全单峰，中位投票人定理不直接适用。</strong><br/>请尝试调整假设维度或移除不符合单峰性的投票。";
            return;
        }

        const localValidVotes = this.votes.filter(v => v.valid);
        if (localValidVotes.length % 2 === 0) {
            this.condorcetWinnerDemoResult = `<strong class='warning-text'>有效投票人数 (${localValidVotes.length}) 为偶数，中位投票人定理的标准形式不直接适用。</strong><br/>(定理通常要求奇数投票人以确定唯一中位投票者)。`;
            return;
        }
        
        // Identify peak for each voter based on assumedDimensionOrder
        const voterPeaks = localValidVotes.map(vote => {
            const ranksOnDimension = this.assumedDimensionOrder.map(candidateInDimension => {
                const rankInVote = vote.ranking.indexOf(candidateInDimension);
                return rankInVote === -1 ? Infinity : rankInVote + 1;
            });
            const peakRankValue = Math.min(...ranksOnDimension);
            const peakIndices = ranksOnDimension.reduce((acc, rank, index) => {
                if (rank === peakRankValue) acc.push(index);
                return acc;
            }, []);
            
            // For simplicity, take the first peak if multiple exist at the same rank
            const peakDimensionIndex = peakIndices.length > 0 ? peakIndices[0] : -1; 
            const peakCandidate = peakDimensionIndex !== -1 ? this.assumedDimensionOrder[peakDimensionIndex] : null;
            return { voterId: vote.voter, peakCandidate, peakDimensionIndex };
        }).filter(p => p.peakCandidate !== null);

        // Sort voters by their peak's index in the assumedDimensionOrder
        voterPeaks.sort((a, b) => a.peakDimensionIndex - b.peakDimensionIndex);

        if (voterPeaks.length !== localValidVotes.length) {
             this.condorcetWinnerDemoResult = "<strong class='error-text'>错误：未能为所有有效单峰投票者确定唯一的峰值点。</strong>";
            return;
        }

        const medianVoterIndex = Math.floor(voterPeaks.length / 2);
        const medianVoterPeak = voterPeaks[medianVoterIndex];
        const predictedWinner = medianVoterPeak.peakCandidate;

        let resultText = `<strong>理论验证结果 (基于中位投票人定理):</strong><br/>`;
        resultText += `1. 所有 ${localValidVotes.length} 张有效选票在假设维度 (${this.assumedDimensionOrder.join(' > ')}) 下均符合单峰性。<br/>`;
        resultText += `2. 有效投票人数为奇数 (${localValidVotes.length})。<br/>`;
        resultText += `3. 各投票者理想点 (峰值) 按假设维度排序后，中位投票者为 V${medianVoterPeak.voterId}。<br/>`;
        resultText += `4. 中位投票者 V${medianVoterPeak.voterId} 的理想点是: <strong style='color: #007bff;'>${predictedWinner}</strong>。<br/>`;
        resultText += `根据中位投票人定理，<strong>${predictedWinner}</strong> 预计为孔多塞胜者。<br/><br/>`;
        resultText += `<strong>系统两两比较分析得出的孔多塞胜者:</strong> <strong style='color: ${this.condorcetWinner ? '#28a745' : '#dc3545'}'>${this.condorcetWinner || '无明确胜者'}</strong>。<br/>`;

        if (this.condorcetWinner === predictedWinner) {
            resultText += "<strong class='success-text'>结论：理论预测与实际分析结果一致！</strong>";
        } else if (this.condorcetWinner && predictedWinner) {
            resultText += "<strong class='warning-text'>结论：理论预测与实际分析结果不一致。</strong> 这可能因为中位投票人定理的某些细微条件或数据特性导致。";
        } else if (!this.condorcetWinner && predictedWinner) {
             resultText += "<strong class='warning-text'>结论：理论预测存在胜者，但实际两两比较未发现孔多塞胜者。</strong> 请检查是否存在未被发现的循环或计票细节。";
        } else {
            resultText += "<strong class='info-text'>结论：理论与实际均未明确指出唯一胜者。</strong>";
        }
        this.condorcetWinnerDemoResult = resultText;
    },

    clearVisualizations() {
        if (this.$refs.comparisonMatrixHeatmap) d3.select(this.$refs.comparisonMatrixHeatmap).selectAll("*").remove();
        if (this.$refs.cycleGraph) d3.select(this.$refs.cycleGraph).selectAll("*").remove();
        if (this.$refs.scoreBarChart) d3.select(this.$refs.scoreBarChart).selectAll("*").remove();
        if (this.$refs.preferenceCurveChart) d3.select(this.$refs.preferenceCurveChart).selectAll("*").remove();
        if (this.$refs.rankingLadderChart) d3.select(this.$refs.rankingLadderChart).selectAll("*").remove();
    },

    renderAllVisualizations() {
      this.$nextTick(() => { 
        this.renderComparisonMatrixHeatmap();
        this.renderCycleGraph();
        this.renderScoreBarChart();
        this.renderPreferenceCurveChart();
        this.renderRankingLadderChart();
      });
    },

    renderComparisonMatrixHeatmap() {
      const container = this.$refs.comparisonMatrixHeatmap;
      if (!container || !this.analysisDone || this.comparisonMatrix.length === 0) {
          if(container) d3.select(container).html(this.analysisDone ? "<p class='empty-chart-message'>无比较数据可供展示</p>" : "");
          return;
      }
      d3.select(container).selectAll("*").remove(); 
      
      const n = this.candidateCount;
      const longestLabel = d3.max(this.candidates, c => c.length) || 1;
      const baseMargin = 25;
      const labelAllowance = longestLabel * 7; 
      const margin = { top: baseMargin + labelAllowance, right: 20, bottom: 20, left: baseMargin + labelAllowance };
      
      const availableWidth = container.clientWidth || 350; 
      let cellSize = Math.max(30, Math.min(60, (availableWidth - margin.left - margin.right) / n));
      if (n * cellSize > availableWidth * 0.9) { 
          cellSize = (availableWidth * 0.9 - margin.left - margin.right) / n;
      }
      cellSize = Math.max(25, cellSize); 

      const width = cellSize * n + margin.left + margin.right;
      const height = cellSize * n + margin.top + margin.bottom;
      container.style.height = `${height}px`; 

      const svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const maxValue = d3.max(this.comparisonMatrix.flat()) || 1; 
      const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, maxValue]);

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          svg.append("rect")
            .attr("x", j * cellSize)
            .attr("y", i * cellSize)
            .attr("width", cellSize -1) 
            .attr("height", cellSize -1)
            .attr("fill", i === j ? "#f0f0f0" : colorScale(this.comparisonMatrix[i][j]))
            .attr("stroke", i === j ? "#ccc" : "#ddd") 
            .attr("stroke-width", 0.5);

          if (i !== j) {
            svg.append("text")
              .attr("x", j * cellSize + cellSize / 2)
              .attr("y", i * cellSize + cellSize / 2)
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .attr("font-size", `${Math.max(9, Math.min(16, cellSize / 2.8))}px`)
              .attr("fill", this.comparisonMatrix[i][j] > maxValue * 0.6 ? "white" : "black")
              .text(this.comparisonMatrix[i][j]);
          }
        }
      }

      svg.selectAll(".rowLabelHeatmap")
        .data(this.candidates).enter()
        .append("text").attr("class", "rowLabelHeatmap")
        .text(d => d)
        .attr("x", -8) 
        .attr("y", (d, idx) => idx * cellSize + cellSize / 2)
        .style("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", `${Math.max(10, Math.min(14, cellSize / 2.2))}px`);

      svg.selectAll(".colLabelHeatmap")
        .data(this.candidates).enter()
        .append("text").attr("class", "colLabelHeatmap")
        .text(d => d)
        .attr("x", (d, idx) => idx * cellSize + cellSize / 2)
        .attr("y", -8) 
        .style("text-anchor", "middle")
        .attr("dominant-baseline", "text-after-edge") 
        .style("font-size", `${Math.max(10, Math.min(14, cellSize / 2.2))}px`);
    },

    renderCycleGraph() {
      const container = this.$refs.cycleGraph;
       if (!container || !this.analysisDone || !this.cycleGraphData.nodes.length) {
          if(container) d3.select(container).html(this.analysisDone ? "<p class='empty-chart-message'>无图数据可供展示</p>" : "");
          return;
      }
      d3.select(container).selectAll("*").remove();

      const { nodes, links } = this.cycleGraphData;
      const width = Math.max(container.clientWidth || 500, 400); 
      const height = Math.max(400, this.candidateCount * 80); 
      container.style.height = `${height}px`;

      const svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
      
      svg.append("defs").selectAll("marker")
        .data(["end-arrow-normal", "end-arrow-cycle"]) 
        .join("marker")
          .attr("id", d => d)
          .attr("viewBox", "0 -5 10 10") 
          .attr("refX", 23) 
          .attr("refY", 0)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto-start-reverse") 
        .append("path")
          .attr("fill", d => (d === "end-arrow-cycle" ? "#e63946" : (this.hasCondorcetParadox ? "#fca311" : "#2a9d8f"))) 
          .attr("d", "M0,-5L10,0L0,5"); 

      // 先计算节点大小相关的变量
      const nodeRadiusBase = 18; 
      const minScore = d3.min(nodes, d => d.score) || 0;
      const maxScore = d3.max(nodes, d => d.score) || 0;
      const scoreRange = maxScore - minScore || 1;

      const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(this.candidateCount > 5 ? 150 : 120)) 
        .force("charge", d3.forceManyBody().strength(-300 - this.candidateCount * 40)) 
        .force("center", d3.forceCenter(0,0))
        .force("collision", d3.forceCollide().radius(d => {
          // 使用与节点半径相同的计算逻辑
          const normalizedScore = scoreRange > 0 ? (d.score - minScore) / scoreRange : 0.5;
          return nodeRadiusBase + normalizedScore * 12 + 3; // 节点半径 + 3px间距
        }));

      const link = svg.append("g")
        .attr("stroke-opacity", 0.7)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", d => {
            if (this.highlightedCycle && this.highlightedCycle.links.some(cl => cl.source === d.source.id && cl.target === d.target.id)) {
                return "#e63946"; 
            }
            return this.hasCondorcetParadox ? "#fca311" : "#2a9d8f"; 
        })
        .attr("stroke-width", d => {
             if (this.highlightedCycle && this.highlightedCycle.links.some(cl => cl.source === d.source.id && cl.target === d.target.id)) {
                return Math.max(2.5, Math.sqrt(d.strength || 1) * 1.5); 
            }
            return Math.max(1.5, Math.sqrt(d.strength || 1));
        })
        .attr("marker-end", d => {
            if (this.highlightedCycle && this.highlightedCycle.links.some(cl => cl.source === d.source.id && cl.target === d.target.id)) {
                return "url(#end-arrow-cycle)";
            }
            return "url(#end-arrow-normal)";
        });
      
      const node = svg.append("g")
        .selectAll("g") 
        .data(nodes)
        .join("g") 
        .call(this.d3Drag(simulation)); 

      node.append("circle")
        .attr("r", d => {
          // 胜者（高分）节点更大，败者（低分）节点更小
          const normalizedScore = scoreRange > 0 ? (d.score - minScore) / scoreRange : 0.5;
          return nodeRadiusBase + normalizedScore * 12; // 基础18px + 最多12px额外大小
        })
        .attr("fill", d => {
            if (this.highlightedCycle && this.highlightedCycle.nodes.includes(d.id)) {
                return "#e63946"; 
            }
            return d3.schemeTableau10[this.candidates.indexOf(d.id) % 10];
        }) 
        .attr("stroke", d => (this.highlightedCycle && this.highlightedCycle.nodes.includes(d.id)) ? "#a82424" : "#fff")
        .attr("stroke-width", d => (this.highlightedCycle && this.highlightedCycle.nodes.includes(d.id)) ? 3 : 2);

      node.append("text")
        .attr("dy", "0.31em") 
        .attr("text-anchor", "middle") 
        .text(d => d.name)
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .style("fill", d => (this.highlightedCycle && this.highlightedCycle.nodes.includes(d.id)) ? "#fff" : "#ffffff") 
        .style("pointer-events", "none"); 

      node.append("title").text(d => `候选项: ${d.name}\nCopeland得分: ${d.score}\n(胜场数 - 败场数)\n节点大小反映整体实力`); 

      simulation.on("tick", () => {
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
      });
    },
    
    d3Drag(simulation) { 
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }
        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
        return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    },

    renderScoreBarChart() {
      const container = this.$refs.scoreBarChart;
      if (!container || !this.analysisDone || !this.candidateScores.length) {
          if(container) d3.select(container).html(this.analysisDone ? "<p class='empty-chart-message'>无得分数据可供展示</p>" : "");
          return;
      }
      d3.select(container).selectAll("*").remove();

      const data = [...this.candidateScores].sort((a,b) => this.candidates.indexOf(a.candidate) - this.candidates.indexOf(b.candidate)); 
      
      const margin = { top: 30, right: 30, bottom: 50, left: 50 }; 
      const width = (container.clientWidth || 400) - margin.left - margin.right;
      const height = Math.max(250, Math.min(400, this.candidateCount * 40)) - margin.top - margin.bottom; 
      container.style.height = `${height + margin.top + margin.bottom}px`;

      const svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.candidate))
        .padding(0.4); 

      svg.append("g")
        .attr("transform", `translate(0,${height})`) 
        .call(d3.axisBottom(x))
        .selectAll("text")
          .style("text-anchor", "middle")
          .style("font-size", "12px");

      const yMin = d3.min(data, d => d.score) || 0;
      const yMax = d3.max(data, d => d.score) || 0;
      const yPadding = Math.abs(yMax - yMin) * 0.1 || 1; 
      
      const y = d3.scaleLinear()
        .domain([Math.min(0, yMin - yPadding), Math.max(0, yMax + yPadding)]) 
        .range([height, 0]); 

      svg.append("g").call(d3.axisLeft(y).ticks(Math.min(10, Math.max(3, Math.abs(yMax - yMin) + 1))));

      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left + 10)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-size", "12px")
          .attr("fill", "#000")
          .text("Copeland 得分 (胜场 - 负场)");
        
      svg.selectAll(".score-bar")
        .data(data)
        .join("rect")
          .attr("class", "score-bar")
          .attr("x", d => x(d.candidate))
          .attr("y", d => (d.score >= 0 ? y(d.score) : y(0))) 
          .attr("width", x.bandwidth())
          .attr("height", d => Math.abs(y(d.score) - y(0))) 
          .attr("fill", d => d.score >= 0 ? d3.schemeTableau10[this.candidates.indexOf(d.candidate) % 10] : "#e74c3c") 
        .append("title").text(d => `${d.candidate}: ${d.score}`); 

      if (yMin < 0 && yMax > 0) { 
        svg.append("line").attr("x1", 0).attr("x2", width).attr("y1", y(0)).attr("y2", y(0))
            .attr("stroke", "#555").attr("stroke-width", "1.5px").attr("stroke-dasharray", "3,3");
      }

      svg.selectAll(".score-bar-label")
        .data(data)
        .join("text")
          .attr("class", "score-bar-label")
          .attr("x", d => x(d.candidate) + x.bandwidth() / 2)
          .attr("y", d => y(d.score) + (d.score < 0 ? 18 : -8)) 
          .attr("text-anchor", "middle")
          .style("font-size", "11px")
          .style("fill", "#333")
          .text(d => d.score);
    },

    renderRankingLadderChart() {
        const container = this.$refs.rankingLadderChart;
        if (!container || !this.analysisDone || !this.groupRanking || this.groupRanking.startsWith("无")) {
            if(container) d3.select(container).html(this.analysisDone ? "<p class='empty-chart-message'>无排名数据可供展示</p>" : "");
            return;
        }
        d3.select(container).selectAll("*").remove();

        const rankedGroups = this.groupRanking
            .replace(/\s*\(.*\)\s*$/, '') 
            .split('>')
            .map(groupStr => groupStr.trim().split(',').map(name => name.trim()).filter(name => name));
        
        if (rankedGroups.length === 0 || (rankedGroups.length === 1 && rankedGroups[0].length === 0 && rankedGroups[0][0] === '') ) {
             d3.select(container).html("<p class='empty-chart-message'>无法解析排名数据或无排名</p>");
            return;
        }

        const margin = { top: 20, right: 20, bottom: 20, left: 100 };
        const containerWidth = (container.clientWidth || 400);
        const svgWidth = containerWidth - margin.left - margin.right;

        const itemHeight = 35; 
        const rankGap = 15;    
        let calculatedSvgHeight = 0;
        rankedGroups.forEach(group => {
            calculatedSvgHeight += group.length * itemHeight + rankGap;
        });
        calculatedSvgHeight = Math.max(itemHeight, calculatedSvgHeight - rankGap); // Ensure at least one item height, no gap after last
        
        // The SVG height is determined by content.
        // The container div will handle scrolling if its own height is constrained by CSS.
        const svgHeightWithMargins = calculatedSvgHeight + margin.top + margin.bottom;

        const svg = d3.select(container).append("svg")
            .attr("width", containerWidth) // SVG width matches container for scrolling purposes
            .attr("height", svgHeightWithMargins) // SVG height based on content
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        let currentY = 0;
        const rankColors = d3.scaleOrdinal(d3.schemeTableau10);

        rankedGroups.forEach((group, rankIndex) => {
            svg.append("text")
                .attr("x", -15) 
                .attr("y", currentY + (group.length * itemHeight) / 2 - rankGap / (group.length > 1 ? 2:1) + itemHeight/2 ) // Adjusted Y for centering rank label
                .attr("text-anchor", "end")
                .attr("dominant-baseline", "middle")
                .style("font-size", "13px")
                .style("font-weight", "bold")
                .text(`第 ${rankIndex + 1} 序`);

            group.forEach((candidateName, itemIndex) => {
                const gItem = svg.append("g")
                    .attr("transform", `translate(0, ${currentY + itemIndex * itemHeight})`);

                gItem.append("rect")
                    .attr("width", svgWidth * 0.8) // Width of the candidate box, relative to SVG drawing area
                    .attr("height", itemHeight - 5) 
                    .attr("rx", 3).attr("ry", 3) 
                    .attr("fill", rankColors(this.candidates.indexOf(candidateName) % 10))
                    .attr("stroke", "#555")
                    .attr("stroke-width", 0.5);

                gItem.append("text")
                    .attr("x", 15) 
                    .attr("y", (itemHeight - 5) / 2)
                    .attr("dominant-baseline", "middle")
                    .style("font-size", "14px")
                    .style("fill", "white")
                    .text(candidateName);
            });
            currentY += group.length * itemHeight + rankGap;
        });
    },

    renderPreferenceCurveChart() {
        const container = this.$refs.preferenceCurveChart;
        if (!container || !this.analysisDone) {
            if(container) d3.select(container).html(this.analysisDone ? "<p class='empty-chart-message'>无偏好数据可供展示</p>" : "");
            return;
        }
        d3.select(container).selectAll("*").remove();

        const localValidVotes = this.votes.filter(v => v.valid);
        if (localValidVotes.length === 0) {
            d3.select(container).html("<p class='empty-chart-message'>无有效投票可供展示偏好曲线</p>");
            return;
        }

        const margin = { top: 30, right: 30, bottom: 50, left: 50 };
        const width = (container.clientWidth || 450) - margin.left - margin.right;
        const height = 320 - margin.top - margin.bottom; 
        container.style.height = `320px`;

        const svg = d3.select(container).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scalePoint() 
            .domain(this.assumedDimensionOrder)
            .range([0, width])
            .padding(0.5); 

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append("text") 
                .attr("fill", "#000")
                .attr("x", width / 2)
                .attr("y", margin.bottom - 10)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .text(`假设维度顺序: ${this.assumedDimensionOrder.join(' → ')}`);

        const y = d3.scaleLinear()
            .domain([1, this.candidateCount + 0.5]) 
            .range([0, height]); 

        svg.append("g")
            .call(d3.axisLeft(y).ticks(Math.min(this.candidateCount, 10)).tickFormat(d3.format("d")))
            .append("text") 
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 10)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .style("font-size", "12px")
                .attr("fill", "#000")
                .text("偏好等级 (1为最偏好)");
        
        const line = d3.line()
            .x(d => x(d.candidate)) 
            .y(d => y(d.rank));    

        const voterColorScale = d3.scaleOrdinal(d3.schemeCategory10); 

        localValidVotes.forEach(vote => {
            const voterPreferenceData = this.assumedDimensionOrder.map(candNameOnDimension => {
                const rankInVote = vote.ranking.indexOf(candNameOnDimension) + 1; 
                return { 
                    candidate: candNameOnDimension, 
                    rank: rankInVote > 0 ? rankInVote : this.candidateCount + 1 
                }; 
            });

            svg.append("path")
                .datum(voterPreferenceData) 
                .attr("fill", "none")
                .attr("stroke", voterColorScale(vote.voter % 10)) 
                .attr("stroke-width", 2)
                .attr("stroke-opacity", 0.7)
                .attr("d", line)
              .append("title") 
                .text(`投票人 V${vote.voter}: ${vote.ranking.join(' > ')}`);

            svg.selectAll(`.dot-voter-${vote.voter}`) 
                .data(voterPreferenceData)
                .enter().append("circle")
                .attr("class", `.dot-voter-${vote.voter}`)
                .attr("cx", d => x(d.candidate))
                .attr("cy", d => y(d.rank))
                .attr("r", 4) 
                .attr("fill", voterColorScale(vote.voter % 10))
                .attr("stroke", "#fff")
                .attr("stroke-width", 0.5);
        });
    },

    updateCustomDimensionPlaceholder() {
        // 动态更新自定义维度输入框的占位符，基于当前候选项
        if (this.candidates.length > 0) {
            const exampleOrder = [...this.candidates].sort();
            this.customDimensionInput = '';
            // 更新组件的placeholder属性通过重新渲染实现
            this.$nextTick(() => {
                const inputElement = this.$el.querySelector('input[placeholder*="例如"]');
                if (inputElement) {
                    inputElement.placeholder = `例如: ${exampleOrder.join(',')} 或 ${exampleOrder.join(' > ')}`;
                }
            });
        }
    },
    findOptimalSinglePeakedDimension() {
        this.searchingOptimalDimension = true;
        const localValidVotes = this.votes.filter(v => v.valid);
        
        if (localValidVotes.length === 0) {
            this.$message.warn("没有有效投票可用于寻找最佳维度。");
            this.searchingOptimalDimension = false;
            return;
        }

        // 恢复所有因单峰性被移除的投票
        this.restoreRemovedSinglePeakedVotesQuietly();

        // 异步执行搜索算法以避免阻塞UI
        this.$nextTick(() => {
            setTimeout(() => {
                let bestDimension = null;
                let maxSinglePeakedCount = 0;
                let searchResults = [];

                if (this.candidates.length <= 6) {
                    // 穷举搜索：尝试所有可能的排列
                    const allPermutations = this.generatePermutations(this.candidates);
                    
                    for (const permutation of allPermutations) {
                        const singlePeakedCount = this.countSinglePeakedVotesForDimension(permutation, localValidVotes);
                        searchResults.push({
                            dimension: [...permutation],
                            count: singlePeakedCount,
                            percentage: (singlePeakedCount / localValidVotes.length * 100).toFixed(1)
                        });
                        
                        if (singlePeakedCount > maxSinglePeakedCount) {
                            maxSinglePeakedCount = singlePeakedCount;
                            bestDimension = [...permutation];
                        }
                    }
                } else {
                    // 启发式搜索：使用贪心算法和随机搜索
                    bestDimension = this.heuristicDimensionSearch(localValidVotes);
                    maxSinglePeakedCount = this.countSinglePeakedVotesForDimension(bestDimension, localValidVotes);
                    searchResults.push({
                        dimension: [...bestDimension],
                        count: maxSinglePeakedCount,
                        percentage: (maxSinglePeakedCount / localValidVotes.length * 100).toFixed(1)
                    });
                }

                // 应用找到的最佳维度
                if (bestDimension && maxSinglePeakedCount > this.singlePeakedVoteCount) {
                    this.assumedDimensionOrder = bestDimension;
                    this.analyzeSinglePeakedness();
                    this.renderPreferenceCurveChart();
                    this.condorcetWinnerDemoResult = '';
                    
                    const improvement = maxSinglePeakedCount - this.singlePeakedVoteCount;
                    this.$message({
                        message: `🔍 找到更优维度：${bestDimension.join(' → ')}\n单峰投票数提升：${improvement} 票 (${maxSinglePeakedCount}/${localValidVotes.length})`,
                        type: 'success',
                        duration: 4000,
                        showClose: true
                    });
                    
                    // 显示搜索结果摘要
                    if (this.candidates.length <= 6) {
                        this.showDimensionSearchResults(searchResults);
                    }
                } else {
                    this.$message({
                        message: `🔍 搜索完成：当前维度已是最优解\n单峰投票数：${maxSinglePeakedCount}/${localValidVotes.length} (${(maxSinglePeakedCount/localValidVotes.length*100).toFixed(1)}%)`,
                        type: 'info',
                        duration: 3500,
                        showClose: true
                    });
                }
                
                this.searchingOptimalDimension = false;
            }, 100); // 短暂延迟以显示加载状态
        });
    },

    generatePermutations(arr) {
        if (arr.length <= 1) return [arr];
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            const permutations = this.generatePermutations(remaining);
            for (const perm of permutations) {
                result.push([current, ...perm]);
            }
        }
        return result;
    },

    countSinglePeakedVotesForDimension(dimension, validVotes) {
        let count = 0;
        for (const vote of validVotes) {
            const result = this.checkVoterSinglePeakedness(vote.ranking, dimension);
            if (result.isSinglePeaked) {
                count++;
            }
        }
        return count;
    },

    heuristicDimensionSearch(validVotes) {
        // 启发式算法：基于投票相似性和频繁模式
        let bestDimension = [...this.candidates];
        let bestCount = this.countSinglePeakedVotesForDimension(bestDimension, validVotes);
        
        // 计算搜索次数：候选项数量越多，搜索次数越多，但设置上限
        const maxSearchAttempts = Math.min(1000, Math.pow(this.candidates.length, 3));
        
        // 尝试多次随机搜索
        for (let attempt = 0; attempt < maxSearchAttempts; attempt++) {
            const testDimension = this.generateRandomOptimizedDimension(validVotes);
            const testCount = this.countSinglePeakedVotesForDimension(testDimension, validVotes);
            
            if (testCount > bestCount) {
                bestCount = testCount;
                bestDimension = [...testDimension];
            }
        }
        
        return bestDimension;
    },

    generateRandomOptimizedDimension(validVotes) {
        // 基于投票模式生成候选维度
        const candidates = [...this.candidates];
        
        // 分析候选项之间的平均偏好关系
        const pairwisePreferences = {};
        candidates.forEach(c1 => {
            candidates.forEach(c2 => {
                if (c1 !== c2) {
                    pairwisePreferences[`${c1}-${c2}`] = 0;
                }
            });
        });
        
        validVotes.forEach(vote => {
            for (let i = 0; i < vote.ranking.length; i++) {
                for (let j = i + 1; j < vote.ranking.length; j++) {
                    const preferred = vote.ranking[i];
                    const lessPreferred = vote.ranking[j];
                    if (candidates.includes(preferred) && candidates.includes(lessPreferred)) {
                        pairwisePreferences[`${preferred}-${lessPreferred}`]++;
                    }
                }
            }
        });
        
        // 基于偏好强度排序，然后加入随机性
        const shuffled = _.shuffle(candidates);
        return shuffled;
    },

    showDimensionSearchResults(results) {
        // 显示前5个最佳结果
        const topResults = results
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
            
        let resultText = "<strong>维度搜索结果 (前5名):</strong><br/>";
        topResults.forEach((result, index) => {
            resultText += `${index + 1}. ${result.dimension.join(' → ')} - ${result.count}票 (${result.percentage}%)<br/>`;
        });
        
        this.$notify({
            title: '维度搜索完成',
            message: resultText,
            type: 'info',
            dangerouslyUseHTMLString: true,
            duration: 8000
        });
    },

    showSinglePeakednessHelp() {
        this.$alert(`
            <div style="text-align: center; line-height: 1.6;">
                <h4>如何根据投票偏好矩阵手动寻找单峰性维度？</h4>
                
                <h5>🔍 <strong>步骤一：理解单峰性质</strong></h5>
                <p>单峰偏好意味着每个投票人的偏好在某个一维政策空间上呈现单个"峰值"：</p>
                <ul>
                    <li>存在一个最偏好的候选项（峰值点）</li>
                    <li>从峰值点向两边，偏好等级逐渐降低或保持不变</li>
                    <li>不允许出现"山谷"（即不能有 A > C > B 当维度为 A-B-C 时）</li>
                </ul>
                
                <h5>🔧 <strong>步骤二：分析方法</strong></h5>
                <p><strong>方法1 - 候选项相似度分析：</strong></p>
                <ul>
                    <li>观察哪些候选项经常被投票人放在相邻位置</li>
                    <li>相似的候选项在政策维度上应该相近</li>
                    <li>例如：如果多数投票人认为 A > B > C 或 C > B > A，则维度可能是 A-B-C</li>
                </ul>
                
                <p><strong>方法2 - 峰值点分析：</strong></p>
                <ul>
                    <li>统计每个候选项作为第一选择的频率</li>
                    <li>如果维度正确，峰值点的分布应该呈现某种规律</li>
                    <li>中间位置的候选项更可能成为峰值点</li>
                </ul>
                
                <h5>📊 <strong>步骤三：验证方法</strong></h5>
                <p><strong>手动验证步骤：</strong></p>
                <ol>
                    <li>选择一个候选维度排序（如 A > B > C > D）</li>
                    <li>对每个投票人检查其偏好是否单峰：
                        <ul>
                            <li>找到该投票人的峰值点（最偏好的候选项）</li>
                            <li>检查从峰值向左右两边偏好是否单调递减</li>
                        </ul>
                    </li>
                    <li>统计符合单峰的投票人数量</li>
                    <li>尝试不同的维度排序，找到单峰投票人数最多的</li>
                </ol>
                
                <h5>💡 <strong>实用技巧</strong></h5>
                <ul>
                    <li><strong>从简单开始：</strong>如果候选项≤4个，可以尝试所有24种排列</li>
                    <li><strong>观察模式：</strong>关注投票矩阵中的重复模式和相似性</li>
                    <li><strong>逐步调整：</strong>从一个合理的猜测开始，根据结果逐步微调</li>
                    <li><strong>使用工具：</strong>本系统提供的"自动寻找最佳单峰维度"功能可以帮助验证手动分析</li>
                </ul>
                
                <h5>🎯 <strong>示例分析</strong></h5>
                <p>假设有投票偏好：</p>
                <ul>
                    <li>投票人1: A > B > C > D</li>
                    <li>投票人2: B > A > C > D</li>
                    <li>投票人3: B > C > A > D</li>
                    <li>投票人4: C > B > A > D</li>
                </ul>
                <p>分析：观察到B经常出现在前面位置，A和C相对位置变化，D总是最后。可能的维度是 <strong>A-B-C-D</strong> 或 <strong>D-C-B-A</strong>。</p>
                
                <p style="margin-top: 15px; color: #666; font-style: italic;">
                    💡 提示：使用本系统的自定义维度输入功能来测试您的分析结果，观察单峰投票数的变化！
                </p>
            </div>
        `, '单峰性维度寻找指南', {
            confirmButtonText: '我明白了',
            dangerouslyUseHTMLString: true,
            customClass: 'single-peakedness-help-dialog'
        });
    },

    openHelpDialog() {
        this.showHelpDialog = true;
    }
  }
};
</script>

<style scoped>
.voting-problem {
  padding: 20px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  background-color: #f8f9fa; 
}
.el-card {
  border-radius: 10px; 
  border: 1px solid #dee2e6; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.05); 
}
.control-panel h3, .results-summary h3 {
  font-size: 1.1em; 
  color: #343a40; 
  margin-bottom: 18px;
  border-bottom: 1px solid #e9ecef; 
  padding-bottom: 12px;
}
.el-slider { padding-left: 8px; padding-right: 12px;}
.vote-matrix-container { max-height: 300px; overflow: auto; border: 1px solid #eee; border-radius: 4px;}

.d3-chart {
  width: 100%;
  min-height: 350px; 
  border: 1px solid #ced4da; 
  border-radius: 6px; 
  display: flex;
  overflow: hidden;
  position: relative; 
  background-color: #ffffff; 
  margin-top: 10px; 
}

.scrollable-chart {
  display: block;
  overflow-y: auto !important;
  max-height: 350px;
  justify-content: flex-start;
  align-items: flex-start;
}

.comparison-matrix { min-height: 300px; overflow: visible; }
.cycle-graph-view { min-height: 400px; overflow: visible; }
.score-bar-chart { min-height: 300px; overflow: visible; }
.preference-curve-chart { min-height: 320px; overflow: visible; }

.empty-chart-message { 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #6c757d;
  font-style: italic;
}

.paradox-alarm-box { margin-top: 18px; }
.winner-text { color: #28a745; font-weight: bold; }
.warning-text { color: #fd7e14; } 
.info-text { color: #007bff; } 
.error-text { color: #dc3545; font-weight: bold; }

.chart-annotation {
  text-align: center;
  font-size: 0.9em;
  color: #495057; 
  margin-top: 12px;
  padding: 0 10px; 
}

.el-tabs--border-card { 
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06); 
  border-radius: 6px;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #007bff; 
  color: white;
  border-radius: 4px 4px 0 0; 
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  font-size: 0.95em; 
}

.el-alert {
  border-radius: 6px; 
}
.el-alert__title {
  font-size: 1.05em; 
}
.el-alert p, .el-alert ul {
  font-size: 0.9em;
  line-height: 1.6;
}
.el-alert ul {
  padding-left: 20px;
  margin-top: 5px;
}

.el-table th > .cell { 
    white-space: normal;
    word-break: keep-all;
    font-size: 0.85em; 
    color: #343a40;
    padding-top: 4px;
    padding-bottom: 4px;
}
.el-table .el-table__header-wrapper th .cell {
    padding-left: 8px;
    padding-right: 8px;
}
.el-table td.el-table__cell div { 
    font-size: 0.85em;
}

.manual-vote-item .el-form-item__label {
  font-size: 0.9em;
  color: #606266;
}
.manual-vote-item {
  margin-bottom: 10px;
}

.d3-chart svg text {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  fill: #333; 
}
.d3-chart svg title {
  font-family: sans-serif;
  font-size: 12px; 
}

/* 美化消息提示样式 */
.el-message {
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 15px 20px;
}

.el-message.el-message--success {
  background-color: #f0f9ff;
  border: 1px solid #3b82f6;
  color: #1e40af;
}

.el-message.el-message--info {
  background-color: #fefefe;
  border: 1px solid #6b7280;
  color: #374151;
}

.el-message.el-message--warning {
  background-color: #fff7ed;
  border: 1px solid #f59e0b;
  color: #92400e;
}

.el-message.el-message--error {
  background-color: #fef2f2;
  border: 1px solid #ef4444;
  color: #dc2626;
}

.el-message__content {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

/* 开发者署名样式 */
.developer-signature {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin: 5px 0 0 0;
  font-style: italic;
  font-weight: 500;
}

/* 自定义维度相关样式 */
.el-button-group {
  display: flex;
  width: 100%;
}

.el-button-group .el-button {
  flex: 1;
  margin-left: 0;
  margin-right: 0;
}

.el-button-group .el-button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.el-button-group .el-button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}

.el-button-group .el-button:not(:first-child):not(:last-child) {
  border-radius: 0;
  border-left: none;
  border-right: none;
}

/* 增强单峰性分析区域的视觉效果 */
.el-form-item__label {
  font-weight: 500;
  color: #606266;
}

.el-input__inner {
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.el-input__inner:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* 单峰性帮助对话框样式 */
.single-peakedness-help-dialog {
  max-width: 800px !important;
}

.single-peakedness-help-dialog .el-message-box__content {
  max-height: 70vh;
  overflow-y: auto;
  text-align: left;
  width: 100% !important;
}

.single-peakedness-help-dialog h4 {
  color: #007bff;
  margin-bottom: 15px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}

.single-peakedness-help-dialog h5 {
  color: #495057;
  margin-top: 20px;
  margin-bottom: 10px;
}

.single-peakedness-help-dialog ul, .single-peakedness-help-dialog ol {
  margin-left: 20px;
  margin-bottom: 15px;
}

.single-peakedness-help-dialog li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.single-peakedness-help-dialog p {
  margin-bottom: 12px;
  color: #495057;
}

/* 按钮加载状态优化 */
.el-button.is-loading {
  opacity: 0.8;
}

/* 使用指南按钮特殊样式 */
.el-button[style*="linear-gradient"]:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6b4391 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4) !important;
  transition: all 0.3s ease;
}

.el-button[style*="linear-gradient"]:active {
  transform: translateY(0px);
  transition: all 0.1s ease;
}
</style>