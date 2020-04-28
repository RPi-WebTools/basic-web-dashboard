<template>
    <div>
        <v-app-bar app light color="primary" dense clipped-left>
            <v-app-bar-nav-icon @click.stop="navState = !navState">
            </v-app-bar-nav-icon>

            <v-img alt="Logo" class="mx-2 hidden-sm-and-down" contain max-width="40" max-height="40" src="@/assets/rpi-webtools-border.png"/>
            <!--<v-img alt="Dashboard" class="mx-2 hidden-sm-and-down" contain max-height="25" src="@/assets/rpi-dashboard.png"/>-->
            <v-toolbar-title class="ml-2 hidden-sm-and-down">RPi Dashboard</v-toolbar-title>
            <v-toolbar-title class="ml-2 hidden-md-and-up">{{ curRouteName }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text @click="toggleTheme">
                <span class="mr-2 hidden-sm-and-down">Toggle theme</span>
                <v-icon>fas fa-adjust</v-icon>
            </v-btn>
            <v-btn text>
                <span class="mr-2 hidden-sm-and-down">Sign in (coming later)</span>
                <v-icon>fas fa-sign-in-alt</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app clipped :src="require('../assets/sidebarBG.png')" v-model="navState">
            <sidebar/>
        </v-navigation-drawer>

        <v-content class="pa-7">
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
    components: {
        Sidebar
    },
    data: () => {
        return {
            navState: true
        }
    },
    computed: {
        curRouteName () {
            return this.$route.name
        }
    },
    methods: {
        toggleTheme () {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        }
    }
}
</script>

<style scoped>
</style>
