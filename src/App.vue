<template>
    <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import 'animate.css'

export default {
    name: 'App',
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        }
    }
}
</script>
