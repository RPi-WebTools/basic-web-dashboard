<template>
    <div>
        <md-table v-model="latestFsInfo" md-sort="num" md-sort-order="asc" @md-selected="onSelect">
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
export default {
    name: 'FsInfo',
    data () {
        return {
            latestFsInfo: [
                {
                    num: 1,
                    name: 'sda',
                    fsType: 'vfat',
                    label: 'Ext HDD',
                    mount: '/home/pi/ext',
                    size: 1000200990720,
                    used: 794093477888,
                    usedPercentage: 79.3933904540894,
                    uuid: 'eluwgg-398z93'
                },
                {
                    num: 2,
                    name: 'sdb',
                    fsType: 'ext4',
                    label: 'HDD',
                    mount: '/home/pi/hdd',
                    size: 999955562496,
                    used: 218658373632,
                    usedPercentage: 21.8668090696155,
                    uuid: 'uibiu-39aasdz93'
                },
                {
                    num: 3,
                    name: 'sdc',
                    fsType: 'ext4',
                    label: 'HDD',
                    mount: '/home/pi/hdd',
                    size: 3000574668800,
                    used: 1638683799552,
                    usedPercentage: 54.6123319839712,
                    uuid: '6357s-398z93'
                }
            ]
        }
    },
    methods: {
        onSelect (item) {
            this.$emit('selected', item)
        }
    }
}
</script>

<style scoped>
td {
    text-align: left;
    vertical-align: middle;
}
</style>
