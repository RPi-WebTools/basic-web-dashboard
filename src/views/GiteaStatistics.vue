<template>
    <v-container fluid class="py-0">
        <v-row>
        </v-row>
        <FabDataRefresh :latestTimestamp="latestTimestamp" />
    </v-container>
</template>

<script>
import FabDataRefresh from '@/components/FabDataRefresh.vue'

export default {
    name: 'GiteaStatistics',
    components: {
        FabDataRefresh
    },
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
