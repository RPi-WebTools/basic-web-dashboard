<template>
    <md-list>
        <md-list-item>
            <md-avatar>
                <img src="@/assets/rpi-webtools.png" alt="Logo">
            </md-avatar>
            <span class="md-list-item-text">{{ title }}</span>
        </md-list-item>
        <br>
        <md-divider></md-divider>
        <md-list-item v-for="link in links" v-bind:key="link.id" :to="{ name: link.to }">
            <md-icon v-if="link.icon">{{ link.icon }}</md-icon>
            <md-icon v-if="link.title == 'Docker'" :md-src="require('../assets/docker-brands.svg')"></md-icon>
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
            links: [
                {
                    id: 0,
                    title: 'Home',
                    to: 'Home',
                    icon: 'home',
                    expandable: false
                },
                {
                    id: 1,
                    title: 'Docker',
                    to: 'Docker',
                    expandable: false
                },
                {
                    id: 2,
                    title: 'About',
                    to: 'About',
                    icon: 'flag',
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
