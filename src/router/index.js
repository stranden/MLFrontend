import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Scoreboard from '@/views/Scoreboard.vue';
import Leaderboard from '@/views/Leaderboard.vue';
import IndividualFinal from '@/views/IndividualFinal.vue';
import MixedFinal from '@/views/MixedFinal.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/scoreboard', component: Scoreboard },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/final', component: IndividualFinal },
  { path: '/mixed', component: MixedFinal }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;