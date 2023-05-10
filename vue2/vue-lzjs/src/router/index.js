import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/Login';
import home from '../components/Home';
import home1 from '../components/Home1';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/home',
      name:'home',
      component: home,
    },
    {
      path: '/home1',
      name:'home1',
      component: home1,
    },
    {
      path: '/login',
      name:'login',
      component: login,
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
      if(token === 'null' || token === ''){
        next('/login');
      }else{
        next();
      }
    }
  } );
export default router;
