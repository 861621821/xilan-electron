import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './assets/style/index.scss'
// import 'element-plus/dist/index.css'
import './assets/style/element.scss'
import './assets/iconfont/iconfont.css'
import './utils/index.js'
import router from './router'

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';

VMdEditor.use(githubTheme);
VMdPreview.use(githubTheme);

createApp(App).use(ElementPlus).use(router).use(VMdEditor).use(VMdPreview).mount('#app');
