import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ElementUI, { Aside, Container, Header } from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
Vue.use(ElementUI).use(Header).use(Aside).use(Container)
new Vue({
  render: h => h(App),
}).$mount('#app')
