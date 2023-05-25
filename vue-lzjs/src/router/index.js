import {createRouter,createWebHashHistory} from 'vue-router'
import lzjshome from '../pages/LzjsHome'
import lzjscompute from '../pages/LzjsCompute'
import lzjslogin from '../pages/LzjsLogin'
import lzjsnews from '../pages/LzjsNews'
const router = createRouter({
    routes:[
        {
            path:'/',
            component:lzjshome,
        },
        {
            path:'/lzjscompute',
            component:lzjscompute,
        },
        {
            path:'/lzjslogin',
            component:lzjslogin,
        },
        {
            path:'/lzjsnews',
            component:lzjsnews,
        },
        {
            path:'/lzjshome',
            component:lzjshome,
        },
    ],
    history:createWebHashHistory(),
});

export default router;