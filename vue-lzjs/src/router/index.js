import {createRouter,createWebHashHistory} from 'vue-router'
import lzjshome from '../pages/LzjsHome'
import lzjscompute from '../pages/LzjsCompute'
import lzjslogin from '../pages/LzjsLogin'
import lzjsnews from '../pages/LzjsNews'
const router = createRouter({
    routes:[
        {
            path:'/lzjshome',
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
    ],
    history:createWebHashHistory(),
});

export default router;