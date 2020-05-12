import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Base',
        redirect: 'home',
        component: () => import('../views/BaseLayout.vue'),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('../views/Home.vue')
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                redirect: 'home',
                component: () => import('../views/Dashboard.vue'),
                children: [
                    {
                        path: 'cpumem',
                        name: 'CPU & Memory',
                        component: () => import('../views/CpuAndMemory.vue')
                    },
                    {
                        path: 'network',
                        name: 'Network',
                        component: () => import('../views/Network.vue')
                    },
                    {
                        path: 'storage',
                        name: 'Storage',
                        component: () => import('../views/Filesystem.vue'),
                        children: [
                            {
                                path: ':uuid',
                                name: 'UUID',
                                component: () => import('../views/StorageMedium.vue'),
                                props: true
                            }
                        ]
                    }
                ]
            },
            {
                path: 'docker',
                name: 'Docker',
                redirect: 'home',
                component: () => import('../views/Docker.vue'),
                children: [
                    {
                        path: 'manage',
                        name: 'Manage Docker',
                        component: () => import('../views/DockerManage.vue')
                    },
                    {
                        path: 'baikal',
                        name: 'Baïkal',
                        component: () => import('../views/Baikal.vue')
                    }
                ]
            },
            {
                path: 'gitea',
                name: 'Gitea',
                redirect: 'home',
                component: () => import('../views/Gitea.vue'),
                children: [
                    {
                        path: 'statistics',
                        name: 'Gitea Statistics',
                        component: () => import('../views/GiteaStatistics.vue')
                    },
                    {
                        path: 'configuration',
                        name: 'Gitea Config',
                        component: () => import('../views/GiteaConfig.vue')
                    }
                ]
            },
            {
                path: 'sysserv',
                name: 'System Services',
                component: () => import('../views/SystemServices.vue')
            },
            {
                path: 'tvspotter',
                name: 'TVspotter',
                redirect: 'home',
                component: () => import('../views/TVspotter.vue'),
                children: [
                    {
                        path: 'movies',
                        name: 'Movies',
                        component: () => import('../views/Movies.vue')
                    },
                    {
                        path: 'tv',
                        name: 'TV',
                        component: () => import('../views/TV.vue')
                    }
                ]
            },
            {
                path: 'about',
                name: 'About',
                component: () => import('../views/About.vue')
            }
        ]
    },
    {
        path: '*',
        component: () => import('../views/PageNotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
