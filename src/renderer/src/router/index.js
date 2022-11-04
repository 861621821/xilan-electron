import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Test from '../views/test/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router