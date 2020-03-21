<template>
    <div>
        <h2>Memory usage history in %</h2>
        <div class="chartContainer">
            <line-chart :chartData="dataset" :options="lineOptions" :styles="styles"></line-chart>
        </div>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'CurMemUsage',
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
        this.$store.dispatch('SYSMON/MEMHIST/GET_MEM_HIST')
    },
    computed: {
        dataset () {
            return {
                labels: this.memHist.timestamps,
                datasets: [
                    {
                        label: 'Used',
                        fill: true,
                        backgroundColor: '#8BC34A',
                        borderColor: '#8BC34A',
                        data: this.memHist.used
                    },
                    {
                        label: 'Buffered',
                        fill: false,
                        backgroundColor: '#29B6F6',
                        borderColor: '#29B6F6',
                        data: this.memHist.buffered
                    },
                    {
                        label: 'Cached',
                        fill: false,
                        backgroundColor: '#FFCA28',
                        borderColor: '#FFCA28',
                        data: this.memHist.cached
                    },
                    {
                        label: 'Free',
                        fill: false,
                        backgroundColor: '#607D8B',
                        borderColor: '#607D8B',
                        data: this.memHist.free
                    },
                    {
                        label: 'In Swap',
                        fill: false,
                        backgroundColor: '#f44336',
                        borderColor: '#f44336',
                        data: this.memHist.swap
                    }
                ]
            }
        },
        ...mapState('SYSMON/MEMHIST', ['memHist'])
    }
}
</script>

<style scoped>
/*.chartContainer {
    max-height: 300px;
    position: relative;
}*/
</style>
