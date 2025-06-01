import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FriendshipParadox from '../views/FriendshipParadox.vue'
import SchellingModel from '../views/SchellingModel.vue'
import PageRank from '../views/PageRank.vue'
import NetworkCascade from '../views/NetworkCascade.vue'
import VotingProblem from '../views/VotingProblem.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/friendship-paradox',
    name: 'FriendshipParadox',
    component: FriendshipParadox
  },
  {
    path: '/schelling-model',
    name: 'SchellingModel',
    component: SchellingModel
  },
  {
    path: '/pagerank',
    name: 'PageRank',
    component: PageRank
  },
  {
    path: '/cascade',
    name: 'NetworkCascade',
    component: NetworkCascade
  },
  {
    path: '/voting',
    name: 'VotingProblem',
    component: VotingProblem
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 