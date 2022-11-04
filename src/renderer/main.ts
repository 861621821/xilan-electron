import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './src/assets/js/index.js'
import './src/assets/style/index.scss'
import router from './src/router/index.js'

createApp(App).use(ElementPlus).mount('#app');
