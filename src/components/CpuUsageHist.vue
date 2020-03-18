<template>
    <div>
        <h2>CPU usage history in %</h2>
        <div class="chartContainer">
            <line-chart :chartData="dataset" :options="lineOptions" :styles="styles"></line-chart>
        </div>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'CpuUsageHist',
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
                            beginAtZero: true,
                            max: 100,
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
        this.$store.dispatch('SYSMON/CPUHIST/GET_CPU_HIST')
    },
    computed: {
        dataset () {
            return {
                labels: this.cpuHist.timestamps,
                datasets: [
                    {
                        label: 'Used',
                        fill: false,
                        backgroundColor: '#8BC34A',
                        borderColor: '#8BC34A',
                        data: this.cpuHist.usage
                    }
                ]
            }
        },
        ...mapState('SYSMON/CPUHIST', ['cpuHist'])
    }
}
</script>

<style scoped>
/*.chartContainer {
    max-height: 300px;
    position: relative;
}*/
</style>
