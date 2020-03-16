import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Base',
        redirect: 'home',
        component: () => import('../components/BaseLayout.vue'),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('../views/Home.vue')
            },
            {
                path: 'cpumem',
                name: 'CpuAndMemory',
                component: () => import('../views/CpuAndMemory.vue')
            },
            {
                path: 'network',
                name: 'Network',
                component: () => import('../views/Network.vue')
            },
            {
                path: 'storage',
                name: 'Filesystem',
                component: () => import('../views/Filesystem.vue'),
                children: [
                    {
                        path: ':uuid',
                        component: () => import('../views/StorageMedium.vue'),
                        props: true
                    }
                ]
            },
            {
                path: 'docker',
                name: 'Docker',
                component: () => import('../views/Docker.vue')
            },
            {
                path: 'about',
                name: 'About',
                component: () => import('../views/About.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
