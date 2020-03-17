<template>
    <div>
        <h2>Storage capacity</h2>
        <div class="grid">
            <div class="item table">
                <md-table v-model="fsInfo">
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
import { mapState } from 'vuex'

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
            }
        }
    },
    mounted () {
        this.$store.dispatch('GET_FS_INFO')
    },
    computed: {
        ...mapState(['fsInfo'])
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