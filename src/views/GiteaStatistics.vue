<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <p>{{ version }}</p>
                </v-card>
            </v-col>
        </v-row>
        <!-- <FabDataRefresh :latestTimestamp="latestTimestamp" /> -->
    </v-container>
</template>

<script>
// import FabDataRefresh from '@/components/FabDataRefresh.vue'
import { mapState } from 'vuex'

export default {
    name: 'GiteaStatistics',
    components: {
        // FabDataRefresh
    },
    data () {
        return {
            latestTimestamp: '07.03.20 13:00',
            test: null
        }
    },
    mounted () {
        this.$store.dispatch('GITEA/STATS/GET_VERSION')
    },
    computed: {
        ...mapState('GITEA/STATS', ['version'])
    }
}
</script>

<style lang="scss" scoped>

</style>
