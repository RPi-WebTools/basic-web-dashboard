<template>
    <div class="CpuAndMemory">
        <div class="md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item">Storage</h1>
            <div class="md-layout-item" style="display: flex; align-items: center;">
                <span style="flex-grow: 1;"></span>
                <md-button class="md-icon-button md-primary">
                    <md-icon :md-src="require('../assets/sync-solid.svg')"></md-icon>
                    <md-tooltip md-direction="bottom">Request new data</md-tooltip>
                </md-button>
                <md-chip class="md-primary">Data from: {{ latestTimestamp }}</md-chip>
            </div>
        </div>

        <br>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <FsInfo/>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import FsInfo from '@/components/FsInfo.vue'

export default {
    name: 'Filesystem',
    components: {
        FsInfo
    },
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    }
}
</script>
