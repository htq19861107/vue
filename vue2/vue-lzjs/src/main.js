import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ElementUI, { Aside, Container, Header,Menu,MenuItem, Submenu } from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
Vue.use(ElementUI).use(Header).use(Aside).use(Container).use(Menu).use(MenuItem).use(Submenu)
new Vue({
  render: h => h(App),
}).$mount('#app')
