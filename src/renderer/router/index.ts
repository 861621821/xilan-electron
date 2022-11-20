import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Script from '../views/script/index.vue'
import Logo from '../views/logo/index.vue'
import Message from '../views/message/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/script',
    name: 'Script',
    component: Script,
    meta: {
      title: '脚本'
    }
  },
  {
    path: '/logo',
    name: 'Logo',
    component: Logo,
    meta: {
      title: 'Logo'
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {
      title: '消息'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
