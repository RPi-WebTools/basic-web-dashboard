<template>
    <md-list :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: 'center center' }">
        <md-list-item>
            <md-avatar>
                <img src="@/assets/rpi-webtools.png" alt="Logo">
            </md-avatar>
            <span class="md-list-item-text">{{ title }}</span>
        </md-list-item>
        <br>
        <md-divider></md-divider>
        <md-list-item v-for="link in links" v-bind:key="link.id" :to="{ name: link.to }" :md-expand="link.expandable">
            <md-icon :md-src="link.src"></md-icon>
            <span class="md-list-item-text">{{ link.title }}</span>

            <md-list v-if="link.expandable" slot="md-expand" style="background: none;">
                <md-list-item v-for="sub in link.sub" v-bind:key="sub.id" :to="{ name: sub.to }">
                    <md-icon :md-src="sub.src"></md-icon>
                    <span class="md-list-item-text">{{ sub.title }}</span>
                </md-list-item>
            </md-list>
        </md-list-item>
    </md-list>
</template>

<script>
export default {
    name: 'Sidebar',
    props: [
        'title'
    ],
    data () {
        return {
            image: require('../assets/sidebarBG.png'),
            links: [
                {
                    id: 0,
                    title: 'Home',
                    to: 'Home',
                    src: require('../assets/home-solid.svg'),
                    expandable: false
                },
                {
                    id: 1,
                    title: 'Dashboard',
                    src: require('../assets/chart-pie-solid.svg'),
                    expandable: true,
                    sub: [
                        {
                            id: 0,
                            title: 'CPU & Memory',
                            to: 'CpuAndMemory',
                            src: require('../assets/microchip-solid.svg'),
                            expandable: false
                        },
                        {
                            id: 1,
                            title: 'Network',
                            to: 'Network',
                            src: require('../assets/network-wired-solid.svg'),
                            expandable: false
                        },
                        {
                            id: 2,
                            title: 'Storage',
                            to: 'Filesystem',
                            src: require('../assets/hdd-solid.svg'),
                            expandable: false
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Docker',
                    src: require('../assets/docker-brands.svg'),
                    expandable: true,
                    sub: [
                        {
                            id: 0,
                            title: 'Manage',
                            to: 'DockerManage',
                            src: require('../assets/tasks-solid.svg'),
                            expandable: false
                        },
                        {
                            id: 1,
                            title: 'Baïkal',
                            to: 'Baikal',
                            src: require('../assets/calendar-alt-solid.svg'),
                            expandable: false
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Gitea',
                    src: require('../assets/git-square-brands.svg'),
                    expandable: true,
                    sub: [
                        {
                            id: 0,
                            title: 'Statistics',
                            to: 'GiteaStatistics',
                            src: require('../assets/clipboard-list-solid.svg'),
                            expandable: false
                        },
                        {
                            id: 1,
                            title: 'Configuration',
                            to: 'GiteaConfig',
                            src: require('../assets/cogs-solid.svg'),
                            expandable: false
                        }
                    ]
                },
                {
                    id: 4,
                    title: 'System Services',
                    to: 'SysServ',
                    src: require('../assets/server-solid.svg'),
                    expandable: false
                },
                {
                    id: 5,
                    title: 'TVspotter',
                    src: require('../assets/tmdb-logo-square.svg'),
                    expandable: true,
                    sub: [
                        {
                            id: 0,
                            title: 'Movies',
                            to: 'Movies',
                            src: require('../assets/film-solid.svg'),
                            expandable: false
                        },
                        {
                            id: 1,
                            title: 'TV shows',
                            to: 'TV',
                            src: require('../assets/tv-solid.svg'),
                            expandable: false
                        }
                    ]
                },
                {
                    id: 6,
                    title: 'About',
                    to: 'About',
                    src: require('../assets/flag-solid.svg'),
                    expandable: false,
                    divider: true
                }
            ]
        }
    }
}
</script>

<style scoped>
</style>
