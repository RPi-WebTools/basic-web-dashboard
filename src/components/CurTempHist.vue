<template>
    <div>
        <h2>CPU temperature history in °C</h2>
        <div class="chartContainer">
            <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item md-size-30">
                    <md-card>
                        <md-card-header style="font-size: 20px;">CPU temperature:</md-card-header>
                        <md-card-content style="font-size: 20px;font-weight: bold;">{{ cpuInfo.curCpuTemp }} °C</md-card-content>
                    </md-card>
                </div>
                <line-chart class="md-layout-item" :chartData="dataset" :options="lineOptions" :styles="styles"></line-chart>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'CurTempHist',
    components: {
        LineChart
    },
    data () {
        return {
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: '#fafafa'
                        },
                        gridLines: {
                            color: '#fafafa'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: '#fafafa'
                        },
                        gridLines: {
                            color: '#fafafa',
                            borderDash: [4, 15]
                        }
                    }]
                }
            },
            styles: {
                height: '300px'
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/CPUINFO/GET_CPU_INFO')
        this.$store.dispatch('SYSMON/CPUHIST/GET_CPU_HIST')
    },
    computed: {
        dataset () {
            return {
                labels: this.cpuHist.timestamps,
                datasets: [
                    {
                        fill: false,
                        backgroundColor: '#ff9800',
                        borderColor: '#ff9800',
                        data: this.cpuHist.temperature
                    }
                ]
            }
        },
        ...mapState('SYSMON/CPUINFO', ['cpuInfo']),
        ...mapState('SYSMON/CPUHIST', ['cpuHist'])
    }
}
</script>

<style scoped>
/*.chartContainer {
    max-width: 650px;
    position: relative;
}*/
</style>
