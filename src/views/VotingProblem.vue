<template>
  <div class="voting-problem">
    <el-card>
      <template #header>
        <h2>表决问题</h2>
        <p>分析投票中的孔多塞悖论和单峰性质</p>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never">
            <h3>投票设置</h3>
            <el-form label-width="120px">
              <el-form-item label="投票人数">
                <el-slider v-model="voterCount" :min="3" :max="20" show-input />
              </el-form-item>
              <el-form-item label="候选项数">
                <el-slider v-model="candidateCount" :min="3" :max="10" show-input />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="generateVotes">生成投票</el-button>
                <el-button @click="analyzeVotes">分析投票</el-button>
                <el-button @click="removeInvalidVotes">移除废票</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>分析结果</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="是否有孔多塞悖论">{{ hasCondorcetParadox ? '是' : '否' }}</el-descriptions-item>
              <el-descriptions-item label="废票数量">{{ invalidVotes }}</el-descriptions-item>
              <el-descriptions-item label="有效投票">{{ validVotes }}</el-descriptions-item>
              <el-descriptions-item label="群体排序">{{ groupRanking }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card shadow="never">
            <h3>投票矩阵</h3>
            <div class="vote-matrix">
              <el-table :data="voteData" border size="small">
                <el-table-column prop="voter" label="投票人" width="80" />
                <el-table-column 
                  v-for="(candidate, index) in candidates" 
                  :key="candidate"
                  :prop="`rank${index}`" 
                  :label="`第${index + 1}位`" 
                  width="60"
                />
                <el-table-column prop="valid" label="有效" width="60">
                  <template #default="scope">
                    <el-tag :type="scope.row.valid ? 'success' : 'danger'" size="small">
                      {{ scope.row.valid ? '是' : '否' }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
          
          <el-card shadow="never" style="margin-top: 20px;">
            <h3>两两比较矩阵</h3>
            <div ref="comparisonMatrix" class="comparison-matrix"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'VotingProblem',
  data() {
    return {
      voterCount: 5,
      candidateCount: 4,
      votes: [],
      candidates: [],
      voteData: [],
      hasCondorcetParadox: false,
      invalidVotes: 0,
      validVotes: 0,
      groupRanking: '',
      comparisonMatrix: []
    }
  },
  mounted() {
    this.generateVotes()
  },
  methods: {
    generateVotes() {
      // 生成候选项
      this.candidates = Array.from({ length: this.candidateCount }, (_, i) => 
        String.fromCharCode(65 + i) // A, B, C, D...
      )
      
      // 生成投票
      this.votes = []
      for (let i = 0; i < this.voterCount; i++) {
        const vote = [...this.candidates].sort(() => Math.random() - 0.5)
        this.votes.push({
          voter: i + 1,
          ranking: vote,
          valid: true
        })
      }
      
      this.updateVoteData()
      this.renderComparisonMatrix()
    },
    
    updateVoteData() {
      this.voteData = this.votes.map(vote => {
        const data = { voter: `投票人${vote.voter}`, valid: vote.valid }
        vote.ranking.forEach((candidate, index) => {
          data[`rank${index}`] = candidate
        })
        return data
      })
    },
    
    analyzeVotes() {
      // 构建两两比较矩阵
      this.buildComparisonMatrix()
      
      // 检查孔多塞悖论
      this.checkCondorcetParadox()
      
      // 检查单峰性质
      this.checkSinglePeakedness()
      
      // 计算群体排序
      this.calculateGroupRanking()
      
      this.updateVoteData()
      this.renderComparisonMatrix()
    },
    
    buildComparisonMatrix() {
      const n = this.candidateCount
      this.comparisonMatrix = Array(n).fill().map(() => Array(n).fill(0))
      
      // 只考虑有效投票
      const validVotes = this.votes.filter(vote => vote.valid)
      
      validVotes.forEach(vote => {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (i !== j) {
              const candidateI = this.candidates[i]
              const candidateJ = this.candidates[j]
              const posI = vote.ranking.indexOf(candidateI)
              const posJ = vote.ranking.indexOf(candidateJ)
              
              if (posI < posJ) { // candidateI 排在 candidateJ 前面
                this.comparisonMatrix[i][j]++
              }
            }
          }
        }
      })
    },
    
    checkCondorcetParadox() {
      // 检查是否存在循环
      const n = this.candidateCount
      const graph = Array(n).fill().map(() => [])
      
      // 构建有向图
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i !== j && this.comparisonMatrix[i][j] > this.comparisonMatrix[j][i]) {
            graph[i].push(j)
          }
        }
      }
      
      // 尝试拓扑排序
      const inDegree = Array(n).fill(0)
      graph.forEach((neighbors, i) => {
        neighbors.forEach(j => inDegree[j]++)
      })
      
      const queue = []
      for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
          queue.push(i)
        }
      }
      
      let processed = 0
      while (queue.length > 0) {
        const node = queue.shift()
        processed++
        
        graph[node].forEach(neighbor => {
          inDegree[neighbor]--
          if (inDegree[neighbor] === 0) {
            queue.push(neighbor)
          }
        })
      }
      
      this.hasCondorcetParadox = processed < n
    },
    
    checkSinglePeakedness() {
      // 简化的单峰性检查
      // 这里使用一个启发式方法：检查投票的一致性
      const validVotes = this.votes.filter(vote => vote.valid)
      
      // 计算每个投票与其他投票的相似度
      this.votes.forEach(vote => {
        let similarity = 0
        validVotes.forEach(otherVote => {
          if (vote !== otherVote) {
            similarity += this.calculateSimilarity(vote.ranking, otherVote.ranking)
          }
        })
        
        // 如果相似度太低，标记为废票
        const avgSimilarity = similarity / (validVotes.length - 1)
        if (avgSimilarity < 0.3) {
          vote.valid = false
        }
      })
      
      this.invalidVotes = this.votes.filter(vote => !vote.valid).length
      this.validVotes = this.votes.filter(vote => vote.valid).length
    },
    
    calculateSimilarity(ranking1, ranking2) {
      let matches = 0
      const n = ranking1.length
      
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const pos1_i = ranking1.indexOf(ranking1[i])
          const pos1_j = ranking1.indexOf(ranking1[j])
          const pos2_i = ranking2.indexOf(ranking1[i])
          const pos2_j = ranking2.indexOf(ranking1[j])
          
          if ((pos1_i < pos1_j && pos2_i < pos2_j) || 
              (pos1_i > pos1_j && pos2_i > pos2_j)) {
            matches++
          }
        }
      }
      
      return matches / (n * (n - 1) / 2)
    },
    
    calculateGroupRanking() {
      if (this.hasCondorcetParadox) {
        // 使用中位项定理
        this.groupRanking = this.calculateMedianRanking()
      } else {
        // 使用孔多塞胜者
        this.groupRanking = this.calculateCondorcetRanking()
      }
    },
    
    calculateCondorcetRanking() {
      const n = this.candidateCount
      const scores = Array(n).fill(0)
      
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i !== j && this.comparisonMatrix[i][j] > this.comparisonMatrix[j][i]) {
            scores[i]++
          }
        }
      }
      
      const ranking = this.candidates
        .map((candidate, index) => ({ candidate, score: scores[index] }))
        .sort((a, b) => b.score - a.score)
        .map(item => item.candidate)
      
      return ranking.join(' > ')
    },
    
    calculateMedianRanking() {
      const validVotes = this.votes.filter(vote => vote.valid)
      const n = this.candidateCount
      const positions = Array(n).fill().map(() => [])
      
      // 收集每个候选项在各投票中的位置
      validVotes.forEach(vote => {
        vote.ranking.forEach((candidate, position) => {
          const index = this.candidates.indexOf(candidate)
          positions[index].push(position)
        })
      })
      
      // 计算中位数位置
      const medianPositions = positions.map(pos => {
        pos.sort((a, b) => a - b)
        const mid = Math.floor(pos.length / 2)
        return pos.length % 2 === 0 ? 
          (pos[mid - 1] + pos[mid]) / 2 : pos[mid]
      })
      
      const ranking = this.candidates
        .map((candidate, index) => ({ candidate, position: medianPositions[index] }))
        .sort((a, b) => a.position - b.position)
        .map(item => item.candidate)
      
      return ranking.join(' > ')
    },
    
    removeInvalidVotes() {
      this.votes = this.votes.filter(vote => vote.valid)
      this.voterCount = this.votes.length
      this.analyzeVotes()
    },
    
    renderComparisonMatrix() {
      const container = this.$refs.comparisonMatrix
      d3.select(container).selectAll("*").remove()
      
      if (this.comparisonMatrix.length === 0) return
      
      const margin = { top: 50, right: 50, bottom: 50, left: 50 }
      const cellSize = 40
      const width = cellSize * this.candidateCount + margin.left + margin.right
      const height = cellSize * this.candidateCount + margin.top + margin.bottom
      
      const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
      
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
      
      // 绘制矩阵
      const maxValue = d3.max(this.comparisonMatrix.flat())
      const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, maxValue])
      
      for (let i = 0; i < this.candidateCount; i++) {
        for (let j = 0; j < this.candidateCount; j++) {
          g.append("rect")
            .attr("x", j * cellSize)
            .attr("y", i * cellSize)
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", i === j ? "#f0f0f0" : colorScale(this.comparisonMatrix[i][j]))
            .attr("stroke", "#333")
            .attr("stroke-width", 1)
          
          if (i !== j) {
            g.append("text")
              .attr("x", j * cellSize + cellSize / 2)
              .attr("y", i * cellSize + cellSize / 2)
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .attr("font-size", "12px")
              .text(this.comparisonMatrix[i][j])
          }
        }
      }
      
      // 添加标签
      g.selectAll(".row-label")
        .data(this.candidates)
        .enter()
        .append("text")
        .attr("class", "row-label")
        .attr("x", -10)
        .attr("y", (d, i) => i * cellSize + cellSize / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-weight", "bold")
        .text(d => d)
      
      g.selectAll(".col-label")
        .data(this.candidates)
        .enter()
        .append("text")
        .attr("class", "col-label")
        .attr("x", (d, i) => i * cellSize + cellSize / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-weight", "bold")
        .text(d => d)
    }
  }
}
</script>

<style scoped>
.voting-problem {
  padding: 20px;
}

.vote-matrix {
  max-height: 300px;
  overflow-y: auto;
}

.comparison-matrix {
  width: 100%;
  height: 300px;
  border: 1px solid #dd1;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-card {
  margin-bottom: 20px;
}
</style> 