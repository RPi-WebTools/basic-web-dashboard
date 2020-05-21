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
                            fontColor: this.chartFontColour
                        },
                        gridLines: {
                            color: this.chartFontColour
                        },
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                hour: 'MMM DD HH:mm'
                            },
                            parser: 'x'
                        }
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
                        }
                    }
                }
            }
        },
        ...mapGetters('SYSMON/FSHIST', ['fsHistByUuid'])
    }
}
</script>

<style scoped>
</style>
