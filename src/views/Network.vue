<template>
    <div class="network">
        <div class="md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item">Network</h1>
            <div class="md-layout-item" style="display: flex; align-items: center;">
                <span style="flex-grow: 1;"></span>
                <md-button class="md-icon-button md-primary">
                    <md-icon :md-src="require('../assets/sync-solid.svg')"></md-icon>
                    <md-tooltip md-direction="bottom">Request new data</md-tooltip>
                </md-button>
                <md-chip class="md-primary">Data from: {{ latestTimestamp }}</md-chip>
            </div>
        </div>
        <md-card>
            <md-card-content>
                <network-info/>
            </md-card-content>
        </md-card>
        <br>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <network-usage/>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item">
            </div>
        </div>
    </div>
</template>

<script>
import NetworkUsage from '@/components/NetworkUsage.vue'
import NetworkInfo from '@/components/NetworkInfo.vue'

export default {
    name: 'Network',
    components: {
        NetworkUsage,
        NetworkInfo
    },
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    }
}
</script>
