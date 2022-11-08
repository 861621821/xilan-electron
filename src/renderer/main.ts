import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './src/assets/style/index.scss'
// import 'element-plus/dist/index.css'
import './src/assets/style/element.scss'
import './src/assets/iconfont/iconfont.css'
import './src/assets/js/index.js'
import router from './src/router'

createApp(App).use(ElementPlus).use(router).mount('#app');
