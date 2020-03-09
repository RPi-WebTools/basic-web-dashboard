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
        <md-list-item v-for="link in links" v-bind:key="link.id" :to="{ name: link.to }">
            <md-icon :md-src="link.src"></md-icon>
            <span class="md-list-item-text">{{ link.title }}</span>
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
                    title: 'CPU & Memory',
                    to: 'CpuAndMemory',
                    src: require('../assets/microchip-solid.svg'),
                    expandable: false
                },
                {
                    id: 2,
                    title: 'Network',
                    to: 'Network',
                    src: require('../assets/network-wired-solid.svg'),
                    expandable: false
                },
                {
                    id: 3,
                    title: 'Storage',
                    to: 'Filesystem',
                    src: require('../assets/hdd-solid.svg'),
                    expandable: false
                },
                {
                    id: 4,
                    title: 'Docker',
                    to: 'Docker',
                    src: require('../assets/docker-brands.svg'),
                    expandable: false
                },
                {
                    id: 5,
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
