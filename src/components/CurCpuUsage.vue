<template>
    <div>
        <h2>Latest CPU usage in %</h2>
        <div class="chartContainer">
            <div class="md-layout md-alignment-center">
                <div class="md-layout-item md-size-30">
                    <md-card>
                        <md-card-header style="font-size: 20px;">CPU load:</md-card-header>
                        <md-card-content style="font-size: 20px;font-weight: bold;">{{ cpuInfo.curCpuLoad }} %</md-card-content>
                    </md-card>
                </div>
                <doughnut-chart class="md-layout-item" :chartData="dataset" :options="doughnutOptions" :styles="styles"></doughnut-chart>
            </div>
        </div>
    </div>
</template>

<script>
import DoughnutChart from '../charts/DoughnutChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'CurCpuUsage',
    components: {
        DoughnutChart
    },
    data () {
        return {
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
                height: '300px'
            }
        }
    },
    created () {
        this.$store.dispatch('SYSMON/CPUINFO/GET_CPU_INFO')
    },
    computed: {
        dataset () {
            return {
                labels: ['Used', 'Unused'],
                datasets: [
                    {
                        backgroundColor: [
                            '#8BC34A', // used
                            '#607D8B' // free
                        ],
                        data: [this.cpuInfo.curCpuLoad, 100 - this.cpuInfo.curCpuLoad]
                    }
                ]
            }
        },
        ...mapState('SYSMON/CPUINFO', ['cpuInfo'])
    }
}
</script>

<style scoped>
.chartContainer {
    max-width: 650px;
    position: relative;
}
</style>
