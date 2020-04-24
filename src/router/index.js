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
                        name: 'DockerManage',
                        component: () => import('../views/DockerManage.vue')
                    },
                    {
                        path: 'baikal',
                        name: 'Baikal',
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
                        name: 'GiteaStatistics',
                        component: () => import('../views/GiteaStatistics.vue')
                    },
                    {
                        path: 'configuration',
                        name: 'GiteaConfig',
                        component: () => import('../views/GiteaConfig.vue')
                    }
                ]
            },
            {
                path: 'sysserv',
                name: 'SysServ',
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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
