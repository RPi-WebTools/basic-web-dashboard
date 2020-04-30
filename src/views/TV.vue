<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-sheet class="px-2 text-right" color="background" elevation="0">
                    <span>Data obtained from:</span>
                    <v-icon v-text="logo" id="tmdb-logo"></v-icon>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'TV',
    data () {
        return {
            latestTimestamp: '07.03.20 13:00',
            logo: '$vuetify.icons.tmdbLogo'
        }
    }
}
</script>

<style lang="scss" scoped>
#tmdb-logo {
    height: 20px;
    width: auto;
    padding-left: 10px;
}
</style>
