
import {createRouter,createWebHistory} from 'vue-router';
import home from '../components/Home';
import home1 from '../components/Home1';


const router = createRouter({
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
  ],
  history:createWebHistory()
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
