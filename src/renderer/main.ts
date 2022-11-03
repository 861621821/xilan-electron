import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './src/assets/js/index.js'
import './src/assets/style/index.scss'

const app = createApp(App);
app.use(ElementPlus)
app.mount('#app');
