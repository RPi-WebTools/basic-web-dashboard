<template>
    <div>
        <md-table :value="fsInfo" md-sort="num" md-sort-order="asc" @md-selected="onSelect">
            <md-table-toolbar>
                <h2 class="md-title">Filesystem Info</h2>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell md-label="No" md-sort-by="num" md-numeric>{{ item.num }}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Label" md-sort-by="label">{{ item.label }}</md-table-cell>
                <md-table-cell md-label="FS Type" md-sort-by="fsType">{{ item.fsType }}</md-table-cell>
                <md-table-cell md-label="Mounted at" md-sort-by="mount">{{ item.mount }}</md-table-cell>
                <md-table-cell md-label="Usage" md-sort-by="usedPercentage">
                    <table>
                        <tr>
                            <td style="width: 30px; border: 0;">
                                <md-icon :md-src="require('../assets/hdd-regular.svg')"></md-icon>
                            </td>
                            <td style="border: 0; padding-left: 5px;">
                                <md-progress-bar md-mode="determinate" :md-value="item.usedPercentage" style="height: 10px;"></md-progress-bar>
                            </td>
                        </tr>
                    </table>
                </md-table-cell>
                <md-table-cell md-label="UUID" md-sort-by="uuid">{{ item.uuid }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'FsInfo',
    methods: {
        onSelect (item) {
            this.$emit('selected', item)
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/FSINFO/GET_FS_INFO')
    },
    computed: {
        ...mapState('SYSMON/FSINFO', ['fsInfo'])
    }
}
</script>

<style scoped>
td {
    text-align: left;
    vertical-align: middle;
}
</style>
