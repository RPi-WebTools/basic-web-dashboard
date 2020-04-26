<template>
    <!--<md-list :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: 'center center' }">
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
    </md-list>-->
    <v-list rounded>
        <v-list-group color="primary" v-for="(link, index) in links" :key="index" v-model="link.active">
            <!--<v-list-group v-if="link.expandable">
                <v-icon slot="prependIcon" v-text="link.src" style="max-width: 24px;"></v-icon>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="(sub, subIndex) in link.sub" :key="subIndex" :to="sub.to">
                    <v-list-item-icon>
                        <v-icon v-text="sub.src" style="max-width: 24px;"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="sub.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>

            <v-list-group v-else append-icon="">
                <v-icon slot="prependIcon" v-text="link.src" style="max-width: 24px;"></v-icon>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-group>-->
            <v-list-tile slot="link" :to="link.to">
                <v-list-tile-action>
                    <v-icon v-text="link.src" style="max-width: 24px;"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >{{ link.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="link.sub.length > 0">
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
    </v-list>
</template>

<script>
export default {
    name: 'Sidebar',
    data () {
        return {
            links: [
                {
                    title: 'Home',
                    to: 'Home',
                    // src: require('../assets/home-solid.svg'),
                    src: 'fas fa-home',
                    expandable: false,
                    sub: []
                },
                {
                    title: 'Dashboard',
                    // src: require('../assets/chart-pie-solid.svg'),
                    src: 'fas fa-chart-pie',
                    expandable: true,
                    sub: [
                        {
                            title: 'CPU & Memory',
                            to: 'CpuAndMemory',
                            // src: require('../assets/microchip-solid.svg'),
                            src: 'fas fa-microchip',
                            expandable: false
                        },
                        {
                            title: 'Network',
                            to: 'Network',
                            // src: require('../assets/network-wired-solid.svg'),
                            src: 'fas fa-network-wired',
                            expandable: false
                        },
                        {
                            title: 'Storage',
                            to: 'Filesystem',
                            // src: require('../assets/hdd-solid.svg'),
                            src: 'fas fa-hdd',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'Docker',
                    // src: require('../assets/docker-brands.svg'),
                    src: 'fab fa-docker',
                    expandable: true,
                    sub: [
                        {
                            title: 'Manage',
                            to: 'DockerManage',
                            // src: require('../assets/tasks-solid.svg'),
                            src: 'fas fa-tasks',
                            expandable: false
                        },
                        {
                            title: 'Baïkal',
                            to: 'Baikal',
                            // src: require('../assets/calendar-alt-solid.svg'),
                            src: 'fas fa-calendar-alt',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'Gitea',
                    // src: require('../assets/git-square-brands.svg'),
                    src: 'fab fa-git-square',
                    expandable: true,
                    sub: [
                        {
                            title: 'Statistics',
                            to: 'GiteaStatistics',
                            // src: require('../assets/clipboard-list-solid.svg'),
                            src: 'fas fa-clipboard-list',
                            expandable: false
                        },
                        {
                            title: 'Configuration',
                            to: 'GiteaConfig',
                            // src: require('../assets/cogs-solid.svg'),
                            src: 'fas fa-cogs',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'System Services',
                    to: 'SysServ',
                    // src: require('../assets/server-solid.svg'),
                    src: 'fas fa-server',
                    expandable: false,
                    sub: []
                },
                {
                    title: 'TVspotter',
                    // src: require('../assets/tmdb-logo-square.svg'),
                    src: '$vuetify.icons.tmdbLogoSquare',
                    expandable: true,
                    sub: [
                        {
                            title: 'Movies',
                            to: 'Movies',
                            // src: require('../assets/film-solid.svg'),
                            src: 'fas fa-film',
                            expandable: false
                        },
                        {
                            title: 'TV shows',
                            to: 'TV',
                            // src: require('../assets/tv-solid.svg'),
                            src: 'fas fa-tv',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'About',
                    to: 'About',
                    // src: require('../assets/flag-solid.svg'),
                    src: 'fas fa-flag',
                    expandable: false,
                    divider: true,
                    sub: []
                }
            ]
        }
    }
}
</script>

<style scoped>
</style>
