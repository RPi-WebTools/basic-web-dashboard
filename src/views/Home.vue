<template>
    <div class="home">
        <div class="md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item">Home</h1>
            <div class="md-layout-item" style="display: flex; align-items: center;">
                <span style="flex-grow: 1;"></span>
                <md-button class="md-icon-button md-primary">
                    <md-icon :md-src="require('../assets/sync-solid.svg')"></md-icon>
                    <md-tooltip md-direction="bottom">Request new data</md-tooltip>
                </md-button>
                <md-chip class="md-primary">Data from: {{ latestTimestamp }}</md-chip>
            </div>
        </div>

        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <device-info/>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <FsOverview/>
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <br>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <user-info/>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import DeviceInfo from '@/components/DeviceInfo.vue'
import UserInfo from '@/components/UserInfo.vue'
import FsOverview from '@/components/FsOverview.vue'

export default {
    name: 'Home',
    components: {
        DeviceInfo,
        UserInfo,
        FsOverview
    },
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    }
}
</script>
