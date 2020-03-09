<template>
    <div class="CpuAndMemory">
        <div class="md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item">CPU & Memory</h1>
            <div class="md-layout-item" style="display: flex; align-items: center;">
                <span style="flex-grow: 1;"></span>
                <md-button class="md-icon-button md-primary">
                    <md-icon :md-src="require('../assets/sync-solid.svg')"></md-icon>
                    <md-tooltip md-direction="bottom">Request new data</md-tooltip>
                </md-button>
                <md-chip class="md-primary">Data from: {{ latestTimestamp }}</md-chip>
            </div>
        </div>

        <md-toolbar class="md-primary">
            <md-icon :md-src="require('@/assets/microchip-solid.svg')"></md-icon>
            <h3 class="md-title" style="flex: 1;">CPU statistics</h3>
        </md-toolbar>
        <br>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <CurCpuUsage/>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <CpuUsageHist/>
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <br>
        <md-toolbar class="md-primary">
            <md-icon :md-src="require('@/assets/memory-solid.svg')"></md-icon>
            <h3 class="md-title" style="flex: 1;">Memory statistics</h3>
        </md-toolbar>
        <br>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <CurMemUsage/>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <MemUsageHist/>
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <br>
        <md-toolbar class="md-primary">
            <md-icon :md-src="require('@/assets/thermometer-three-quarters-solid.svg')"></md-icon>
            <h3 class="md-title" style="flex: 1;">Temperature statistics</h3>
        </md-toolbar>
        <br>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <CurTempHist/>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                    </md-card-content>
                </md-card>
            </div>
        </div>

    </div>
</template>

<script>
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
        CurTempHist
    },
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    }
}
</script>
