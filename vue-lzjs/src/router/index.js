import {createRouter,createWebHashHistory} from 'vue-router'
import lzjshome from '../pages/LzjsHome'
import lzjscompute from '../pages/compute/LzjsCompute'
import lzjslogin from '../pages/login/LzjsLogin'
import lzjsnews from '../pages/LzjsNews'
import dragtest from '../pages/DragTest'
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
        {
            path:'/dragtest',
            component:dragtest,
        },
    ],
    history:createWebHashHistory(),
});

export default router;