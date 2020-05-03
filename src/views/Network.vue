<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <NetworkInfo />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <NetworkUsage />
                </v-card>
            </v-col>
        </v-row>

        <FabDataRefresh :latestTimestamp="latestTimestamp" @click="requestNewData" />
    </v-container>
</template>

<script>
import FabDataRefresh from '@/components/FabDataRefresh.vue'
import NetworkUsage from '@/components/NetworkUsage.vue'
import NetworkInfo from '@/components/NetworkInfo.vue'

export default {
    name: 'Network',
    components: {
        FabDataRefresh,
        NetworkUsage,
        NetworkInfo
    },
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    },
    methods: {
        requestNewData () {
            setTimeout(function () {
                alert('Test')
            }, 3000)
        }
    }
}
</script>
