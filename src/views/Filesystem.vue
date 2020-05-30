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
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <FsIoHist />
                </v-card>
            </v-col>
        </v-row>

        <FabDataRefresh :latestTimestamp="latestTimestamp" />
    </v-container>
</template>

<script>
import FabDataRefresh from '@/components/FabDataRefresh.vue'
import FsInfo from '@/components/FsInfo.vue'
import FsIoHist from '@/components/FsIoHist.vue'
import { mapState } from 'vuex'

export default {
    name: 'Filesystem',
    components: {
        FabDataRefresh,
        FsInfo,
        FsIoHist
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
            this.showFsDetails = true
            this.$store.dispatch('SYSMON/FSINFO/GET_FS_INFO').then(data => {
                this.$store.dispatch('SYSMON/FSHIST/GET_FS_HIST').then(() => {
                    this.selectedFsDetails = this.fsInfo.filter(item => item.uuid === this.childUuid)[0]
                })
            })
        }
    },
    computed: {
        ...mapState('SYSMON/FSINFO', ['fsInfo'])
    }
}
</script>
