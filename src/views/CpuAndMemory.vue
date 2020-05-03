<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-toolbar color="primary" light>
                    <v-btn icon class="non-clickable"><v-icon>fas fa-microchip</v-icon></v-btn>
                    <v-toolbar-title>CPU statistics</v-toolbar-title>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1" height="100%" tile>
                    <CurCpuUsage />
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <CpuUsageHist />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-toolbar color="primary" light>
                    <v-btn icon class="non-clickable"><v-icon>fas fa-memory</v-icon></v-btn>
                    <v-toolbar-title>Memory statistics</v-toolbar-title>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1" height="100%" tile>
                    <CurMemUsage />
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <MemUsageHist />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-toolbar color="primary" light>
                    <v-btn icon class="non-clickable"><v-icon>fas fa-thermometer-three-quarters</v-icon></v-btn>
                    <v-toolbar-title>Temperature statistics</v-toolbar-title>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <CurTempHist />
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1" tile>
                </v-card>
            </v-col>
        </v-row>

        <FabDataRefresh :latestTimestamp="latestTimestamp" />
    </v-container>
</template>

<script>
import FabDataRefresh from '@/components/FabDataRefresh.vue'
import CurCpuUsage from '@/components/CurCpuUsage.vue'
import CpuUsageHist from '@/components/CpuUsageHist.vue'
import CurMemUsage from '@/components/CurMemUsage.vue'
import MemUsageHist from '@/components/MemUsageHist.vue'
import CurTempHist from '@/components/CurTempHist.vue'

export default {
    name: 'CpuAndMemory',
    components: {
        CurCpuUsage,
        CpuUsageHist,
        CurMemUsage,
        MemUsageHist,
        CurTempHist,
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
.non-clickable {
    pointer-events: none;
}
</style>
