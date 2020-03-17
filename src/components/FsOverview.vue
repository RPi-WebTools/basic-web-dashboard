<template>
    <div>
        <h2>Storage capacity</h2>
        <div class="grid">
            <div class="item table">
                <md-table v-model="latestFsInfo">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Label">{{ item.label }}</md-table-cell>
                        <md-table-cell md-label="Usage">
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
                    </md-table-row>
                </md-table>
            </div>
            <div class="item chart">
                <DoughnutChart :chartData="doughnutChartData" :options="doughnutOptions" :styles="styles"></DoughnutChart>
            </div>
        </div>
    </div>
</template>

<script>
import DoughnutChart from '@/charts/DoughnutChart.vue'

export default {
    name: 'FsOverview',
    components: {
        DoughnutChart
    },
    data () {
        return {
            doughnutChartData: {
                labels: ['Used', 'Unused'],
                datasets: [
                    {
                        backgroundColor: [
                            '#8BC34A', // used
                            '#607D8B' // free
                        ],
                        data: [66, 34]
                    }
                ]
            },
            doughnutOptions: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                title: {
                    display: false
                },
                legend: {
                    labels: {
                        fontColor: '#fafafa'
                    },
                    position: 'right',
                    align: 'middle'
                }
            },
            styles: {
                height: '200px'
            },
            latestFsInfo: [
                {
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
                    removable: false
                },
                {
                    num: 2,
                    name: '/dev/sdb',
                    fsType: 'ext4',
                    label: 'HDD',
                    mount: '/home/pi/hdd',
                    size: 999955562496,
                    used: 218658373632,
                    usedPercentage: 21.8668090696155,
                    uuid: 'uibiu-39aasdz93',
                    smart: 'Predicted Failure',
                    vendor: 'Seagate',
                    modelName: 'ST1000DM003-1CH162',
                    interface: 'USB',
                    diskType: 'HD',
                    removable: false
                },
                {
                    num: 3,
                    name: '/dev/sdc',
                    fsType: 'ext4',
                    label: 'HDD',
                    mount: '/home/pi/hdd',
                    size: 3000574668800,
                    used: 1638683799552,
                    usedPercentage: 54.6123319839712,
                    uuid: '6357s-398z93',
                    smart: 'unknown',
                    vendor: 'Intenso',
                    modelName: 'USB_3.0_Device',
                    interface: 'USB',
                    diskType: 'HD',
                    removable: false
                },
                {
                    num: 4,
                    name: '/dev/sdd',
                    fsType: 'ext4',
                    label: 'Thumb Drive',
                    mount: '/home/pi/usb',
                    size: 15916335104,
                    used: 10312435104,
                    usedPercentage: 64.7915178752949,
                    uuid: 'fubwligo8aasd',
                    smart: 'unknown',
                    vendor: 'General',
                    modelName: 'USB_Flash_Disk',
                    interface: 'USB',
                    diskType: 'HD',
                    removable: true
                }
            ]
        }
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(auto-fill, auto);
}

.item {
    color: #fafafa;
}

.table {
    grid-column: 1;
    grid-row: 1;
}
</style>
