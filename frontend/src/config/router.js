import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'
import About from '@/components/about/About'
import { userCredential } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'about',
    path: '/about',
    component: About
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

// Este evento sempre é disparado quando precisa navegar de uma rota para outra
router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userCredential)
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        // Validar se o usuário é admin para não permitir navegar nas paginas não autorizadas
        const user = JSON.parse(json) // valida pelo user do localStorage mas pode ser feito nova requisição na api!
        user && user.admin ? next() : next({ path: '/'})
    } else {
        next()
    }
})

export default router