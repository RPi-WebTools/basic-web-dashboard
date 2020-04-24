<template>
    <div class="Filesystem">
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

        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <FsInfo @selected="updateSelected" />
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <br>
        <div v-show="showFsDetails" style="border: 1px solid #ff9800; padding: 10px;">
            <transition name="slide">
                <router-view :key="$route.path" :fsDetails="selectedFsDetails" @created="childCreated" />
            </transition>
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
            latestTimestamp: '07.03.20 13:00',
            showFsDetails: false,
            childUuid: null,
            selectedFsDetails: {}
        }
    },
    methods: {
        updateSelected (data) {
            this.selectedFsDetails = data
            if (data == null || Object.keys(data).length === 0) {
                this.showFsDetails = false
                if (this.$route.path !== '/storage') this.$router.push('/storage')
            } else {
                this.showFsDetails = true
                if (this.$route.path !== ('/storage/' + data.uuid)) this.$router.push('/storage/' + data.uuid)
            }
        },
        childCreated (data) {
            this.childUuid = data
        }
    },
    mounted () {
        if (this.childUuid !== null) {
            console.log('CHILD DONE')
            this.showFsDetails = true
            // TODO: need to get data here too
            this.selectedFsDetails = {
                num: 1,
                name: '/dev/sda',
                fsType: 'vfat',
                label: 'Ext HDD',
                mount: '/home/pi/ext',
                size: 1000200990720,
                used: 794093477888,
                usedPercentage: 79.3933904540894,
                uuid: 'eluwgg-398z93',
                smart: 'Ok',
                vendor: 'TOSHIBA',
                modelName: 'External_USB_3.0',
                interface: 'USB',
                diskType: 'HD',
                removable: false,
                partitionLabels: ['Part1', 'Part2', 'Part3'],
                partitions: [264697825962, 264697825962, 264125442752]
            }
        }
    }
}
</script>
