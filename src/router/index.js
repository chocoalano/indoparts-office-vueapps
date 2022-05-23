import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        { 
            path: "*", 
            name: '404',
            component: () => import('../views/errors/404') 
        },
        {
            path: '/401',
            name: 'unautorized',
            component: () => import('../views/errors/401'),
            meta: {
                requiresAuth: true,
                title: 'FORBIDDEN'
            }
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('../views/auth')
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home'),
            meta: {
                requiresAuth: true,
                title: 'Home'
            }
        },
        {
            path: '/apps',
            name: 'apps',
            component: () => import('../views/apps'),
            meta: {
                requiresAuth: true,
                title: 'Home'
            }
        },
        {
            path: '/notifikasi',
            name: 'notifikasi',
            component: () => import('../views/notifikasi'),
            meta: {
                requiresAuth: true,
                title: 'Pemberitahuan'
            }
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth = store.getters.isAuth
        if (!auth) {
            next({ name: 'auth' })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router
