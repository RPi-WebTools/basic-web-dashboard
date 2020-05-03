<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <FsInfo @selected="updateSelected" />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <router-view :key="$route.path" :fsDetails="selectedFsDetails" @created="childCreated" />
            </v-col>
        </v-row>

        <FabDataRefresh :latestTimestamp="latestTimestamp" />
    </v-container>
</template>

<script>
import FabDataRefresh from '@/components/FabDataRefresh.vue'
import FsInfo from '@/components/FsInfo.vue'

export default {
    name: 'Filesystem',
    components: {
        FabDataRefresh,
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
                if (this.$route.name !== 'Storage') this.$router.push({ name: 'Storage' })
            } else {
                this.showFsDetails = true
                if (this.$route.name !== 'UUID' || this.$route.path !== ('/dashboard/storage/' + data.uuid)) this.$router.push('/dashboard/storage/' + data.uuid)
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
