<template>
    <div>
        <p class="headline pl-3 pt-3">Memory usage history</p>
        <v-row>
            <v-col cols="12">
                <LineChart :chartData="dataset" :options="lineOptions" :styles="styles"></LineChart>
            </v-col>
        </v-row>
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
            styles: {
                height: '300px'
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/MEMHIST/GET_MEM_HIST')
        this.$store.dispatch('SYSMON/DEVINFO/GET_DEV_INFO')
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        chartFontColour () {
            return (this.$vuetify.theme.dark) ? '#ffffff' : '#616161'
        },
        freeMem () {
            const sumUsedBuffered = [...this.memHist.used].map((e, i) => e + this.memHist.buffered[i])
            const sumUsedBufferedCached = [...sumUsedBuffered].map((e, i) => e + this.memHist.cached[i])

            const free = [...sumUsedBufferedCached].map(e => this.devInfo.memory - e)
            return free
        },
        dataset () {
            return {
                labels: this.memHist.timestamps,
                datasets: [
                    {
                        label: 'Used',
                        fill: false,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].secondary,
                        borderColor: this.$vuetify.theme.themes[this.theme].secondary,
                        data: this.getMemPercentage(this.memHist.used)
                    },
                    {
                        label: 'Buffered',
                        fill: false,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].accent,
                        borderColor: this.$vuetify.theme.themes[this.theme].accent,
                        data: this.getMemPercentage(this.memHist.buffered)
                    },
                    {
                        label: 'Cached',
                        fill: false,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].warning,
                        borderColor: this.$vuetify.theme.themes[this.theme].warning,
                        data: this.getMemPercentage(this.memHist.cached)
                    },
                    {
                        label: 'Free',
                        fill: false,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].success,
                        borderColor: this.$vuetify.theme.themes[this.theme].success,
                        data: this.getMemPercentage(this.freeMem)
                    },
                    {
                        label: 'In Swap',
                        fill: false,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].error,
                        borderColor: this.$vuetify.theme.themes[this.theme].error,
                        data: this.getSwapPercentage(this.memHist.swap)
                    }
                ]
            }
        },
        lineOptions () {
            return {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    labels: {
                        fontColor: this.chartFontColour
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: this.chartFontColour,
                            maxTicksLimit: 20
                        },
                        gridLines: {
                            color: this.chartFontColour
                        },
                        type: 'time',
                        time: {
                            unit: 'minute',
                            displayFormats: {
                                minute: 'MMM DD HH:mm'
                            },
                            parser: 'x'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            fontColor: this.chartFontColour,
                            callback: (value, index, values) => {
                                return value + ' %'
                            }
                        },
                        gridLines: {
                            color: this.chartFontColour,
                            borderDash: [4, 15]
                        }
                    }]
                },
                animation: {
                    duration: 0
                },
                tooltips: {
                    callbacks: {
                        label (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex]
                            return +(dataset.data[tooltipItem.index]).toFixed(2) + ' %'
                        }
                    }
                }
            }
        },
        ...mapState('SYSMON/MEMHIST', ['memHist']),
        ...mapState('SYSMON/DEVINFO', ['devInfo'])
    },
    methods: {
        getMemPercentage (value) {
            if (Array.isArray(value)) {
                const raw = []
                value.forEach(element => {
                    raw.push(+(element / this.devInfo.memory * 100).toFixed(2))
                })
                return raw
            } else {
                const raw = (value / this.devInfo.memory) * 100
                return +raw.toFixed(2)
            }
        },
        getSwapPercentage (value) {
            if (Array.isArray(value)) {
                const raw = []
                value.forEach(element => {
                    raw.push(+(element / this.memHist.swapTotal * 100).toFixed(2))
                })
                return raw
            } else {
                const raw = (value / this.memHist.swapTotal) * 100
                return +raw.toFixed(2)
            }
        }
    }
}
</script>

<style scoped>
</style>
