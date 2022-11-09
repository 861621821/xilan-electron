import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './assets/style/index.scss'
// import 'element-plus/dist/index.css'
import './assets/style/element.scss'
import './assets/iconfont/iconfont.css'
import './assets/js/index.js'
import router from './router'

createApp(App).use(ElementPlus).use(router).mount('#app');
