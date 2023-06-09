import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from "echarts"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
const app = createApp(App);

app.config.globalProperties.$echarts = echarts;


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router);
app.use(ElementPlus)
app.use(store)
app.mount('#app');
