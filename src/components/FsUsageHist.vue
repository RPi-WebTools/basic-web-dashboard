<template>
    <line-chart :chartData="dataset" :options="lineOptions" :styles="styles"></line-chart>
</template>

<script>
import LineChart from '../charts/LineChart.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'FsUsageHist',
    components: {
        LineChart
    },
    props: {
        uuid: String
    },
    data () {
        return {
            styles: {
                height: '245px'
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/FSHIST/GET_FS_HIST')
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        chartFontColour () {
            return (this.$vuetify.theme.dark) ? '#ffffff' : '#616161'
        },
        dataset () {
            const item = this.fsHistByUuid(this.uuid)[0]
            return {
                labels: item.timestamps,
                datasets: [
                    {
                        fill: false,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].accent,
                        borderColor: this.$vuetify.theme.themes[this.theme].accent,
                        data: item.used
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
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: this.chartFontColour,
                            callback: (value, index, values) => {
                                return this.formatDate(values[index].value)
                            }
                        },
                        gridLines: {
                            color: this.chartFontColour
                        },
                        type: 'time'
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: this.chartFontColour,
                            callback: (value, index, values) => {
                                if (value > Math.pow(1024, 3)) {
                                    return (value / 1000000000) + ' GB'
                                } else if (value > Math.pow(1024, 2)) {
                                    return (value / 1000000) + ' MB'
                                } else if (value > 1024) {
                                    return (value / 1000) + ' kB'
                                } else if (value > -1) {
                                    return value + ' B'
                                }
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
                hover: {
                    animationDuration: 0
                },
                tooltips: {
                    callbacks: {
                        label (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex]
                            if (dataset.data[tooltipItem.index] > Math.pow(1024, 3)) {
                                return +(dataset.data[tooltipItem.index] / Math.pow(1024, 3)).toFixed(2) + ' GB'
                            } else if (dataset.data[tooltipItem.index] > Math.pow(1024, 2)) {
                                return +(dataset.data[tooltipItem.index] / Math.pow(1024, 2)).toFixed(2) + ' MB'
                            } else if (dataset.data[tooltipItem.index] > 1024) {
                                return +(dataset.data[tooltipItem.index] / 1024).toFixed(2) + 'kB'
                            } else if (dataset.data[tooltipItem.index] > -1) {
                                return +(dataset.data[tooltipItem.index]).toFixed(2) + ' B'
                            }
                        },
                        title: (tooltipItem, data) => {
                            return this.formatDate(data.labels[tooltipItem[0].index])
                        }
                    }
                }
            }
        },
        ...mapGetters('SYSMON/FSHIST', ['fsHistByUuid'])
    },
    methods: {
        formatDate (ms) {
            // localised something along 01.01.20
            return this.moment(ms).format(this.moment.localeData().longDateFormat('L').replace(/YYYY/g, 'YY'))
        }
    }
}
</script>

<style scoped>
</style>
