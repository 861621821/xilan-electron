import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Script from '../views/script/index.vue'
import Message from '../views/message/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/script',
    name: 'Script',
    component: Script
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
