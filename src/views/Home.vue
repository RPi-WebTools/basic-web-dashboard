<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1 cols-first-row-min-height" height="100%" tile>
                    <DeviceInfo />
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="px-2 pb-3 pt-1 cols-first-row-min-height" height="100%" tile>
                    <FsOverview />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <UserInfo />
                </v-card>
            </v-col>
        </v-row>

        <FabDataRefresh :latestTimestamp="latestTimestamp" />
    </v-container>
</template>

<script>
import FabDataRefresh from '@/components/FabDataRefresh.vue'
import DeviceInfo from '@/components/DeviceInfo.vue'
import UserInfo from '@/components/UserInfo.vue'
import FsOverview from '@/components/FsOverview.vue'

export default {
    name: 'Home',
    components: {
        FabDataRefresh,
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

<style lang="scss" scoped>
.cols-first-row-min-height {
    min-height: 420px;
}
</style>
