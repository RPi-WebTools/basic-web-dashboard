<template>
     <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <p>There should be data coming your way...watch out!</p>
                    <p>{{ testData }}</p>

                    <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'About',
    mounted () {
        this.$store.dispatch('SYSSERV/TESTTHING/GET_TEST_DATA')
    },
    computed: {
        ...mapState('SYSSERV/TESTTHING', ['testData'])
    }
}
</script>
