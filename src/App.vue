<template>
    <v-app>
        <v-app-bar app light color="primary" dense clipped-left>
            <v-app-bar-nav-icon @click.stop="navState = !navState">
            </v-app-bar-nav-icon>

            <v-img alt="Logo" class="mx-2 hidden-sm-and-down" contain max-width="40" max-height="40" src="@/assets/rpi-webtools.png"/>
            <v-toolbar-title class="ml-2">RPi Dashboard</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn target="_blank" text>
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view :navState="navState"></router-view>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        navState: true
    })
}
</script>
