<template>
    <div>
        <div class="chartContainer">
            <bar-chart :chartData="dataset" :options="barOptions" :styles="styles"></bar-chart>
        </div>
    </div>
</template>

<script>
import BarChart from '../charts/BarChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'NetworkUsage',
    components: {
        BarChart
    },
    data () {
        return {
            barOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Network usage',
                    fontColor: '#fafafa',
                    fontSize: 20
                },
                legend: {
                    labels: {
                        fontColor: '#fafafa'
                    }
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
        this.$store.dispatch('SYSMON/NETHIST/GET_NET_HIST')
    },
    computed: {
        dataset () {
            return {
                labels: this.netHist.timestamps,
                datasets: [
                    {
                        label: 'Network input per day',
                        backgroundColor: '#8BC34A',
                        data: this.netHist.rx
                    },
                    {
                        label: 'Network output per day',
                        backgroundColor: '#29B6F6',
                        data: this.netHist.tx
                    }
                ]
            }
        },
        ...mapState('SYSMON/NETHIST', ['netHist'])
    }
}
</script>

<style scoped>
.chartContainer {
    max-height: 300px;
    position: relative;
}
</style>
