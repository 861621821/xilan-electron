import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Test from '../views/test/index.vue'
import Message from '../views/message/index.vue'

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
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router