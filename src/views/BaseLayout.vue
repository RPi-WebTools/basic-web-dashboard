<template>
    <div id="layout">
        <v-navigation-drawer app clipped :src="require('../assets/sidebarBG.png')" v-model="state">
            <sidebar/>
        </v-navigation-drawer>

        <v-content>
            <v-container fluid>
                <v-fade-transition mode="out-in">
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
    components: {
        Sidebar
    },
    props: [
        'navState'
    ],
    data: () => {
        return {
            state: true
        }
    },
    watch: {
        navState () {
            this.state = this.navState
        }
    }
}
</script>

<style scoped>
</style>
