<template>
    <v-list rounded dark>
        <template v-for="(link, i) in links">
            <v-divider v-if="link.divider" :key="'dividier-' + i"/>
            <v-list-group v-if="link.expandable" :key="i" style="margin-top: 5px; margin-bottom: 5px;">
                <v-icon slot="prependIcon" v-text="link.src" style="max-width: 24px;"></v-icon>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="(sub, subIndex) in link.sub"
                    :key="subIndex"
                    :to="{ name: sub.to }"
                    router
                    color="primary"
                >
                    <v-list-item-icon>
                        <v-icon v-text="sub.src" style="max-width: 24px;"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="sub.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
            <v-list-item
                v-else
                :key="i"
                :to="{ name: link.to }"
                router
                exact
                style="margin-top: 5px;"
                color="primary"
            >
                <v-list-item-icon>
                    <v-icon v-text="link.src" style="max-width: 24px;"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="link.title" />
                </v-list-item-content>
            </v-list-item>
        </template>
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
                    src: 'fas fa-home',
                    expandable: false,
                    sub: []
                },
                {
                    title: 'Dashboard',
                    src: 'fas fa-chart-pie',
                    expandable: true,
                    divider: true,
                    sub: [
                        {
                            title: 'CPU & Memory',
                            to: 'CPU & Memory',
                            src: 'fas fa-microchip',
                            expandable: false
                        },
                        {
                            title: 'Network',
                            to: 'Network',
                            src: 'fas fa-network-wired',
                            expandable: false
                        },
                        {
                            title: 'Storage',
                            to: 'Storage',
                            src: 'fas fa-hdd',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'Docker',
                    src: 'fab fa-docker',
                    expandable: true,
                    sub: [
                        {
                            title: 'Manage',
                            to: 'Manage Docker',
                            src: 'fas fa-tasks',
                            expandable: false
                        },
                        {
                            title: 'Baïkal',
                            to: 'Baïkal',
                            src: 'fas fa-calendar-alt',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'Gitea',
                    src: 'fab fa-git-square',
                    expandable: true,
                    sub: [
                        {
                            title: 'Statistics',
                            to: 'Gitea Statistics',
                            src: 'fas fa-clipboard-list',
                            expandable: false
                        },
                        {
                            title: 'Configuration',
                            to: 'Gitea Config',
                            src: 'fas fa-cogs',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'System Services',
                    to: 'System Services',
                    src: 'fas fa-server',
                    expandable: false,
                    sub: []
                },
                {
                    title: 'TVspotter',
                    src: '$vuetify.icons.tmdbLogoSquare',
                    expandable: true,
                    sub: [
                        {
                            title: 'Movies',
                            to: 'Movies',
                            src: 'fas fa-film',
                            expandable: false
                        },
                        {
                            title: 'TV shows',
                            to: 'TV',
                            src: 'fas fa-tv',
                            expandable: false
                        }
                    ]
                },
                {
                    title: 'About',
                    to: 'About',
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
