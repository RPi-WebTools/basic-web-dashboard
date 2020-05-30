<template>
    <div>
        <line-chart :chartData="dataset" :options="lineOptions" :styles="styles"></line-chart>
        <p>If this shows anything but a straight line at 'unknown' or 'Ok', you should probably check your hard drive.</p>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'FsSmartHist',
    components: {
        LineChart
    },
    props: {
        uuid: String
    },
    data () {
        return {
            styles: {
                height: '300px'
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
            const data = []
            item.smart.forEach((status) => {
                switch (status) {
                    case 'Predicted Failure':
                        data.push(2)
                        break
                    case 'Ok':
                        data.push(1)
                        break
                    case 'unknown':
                    default:
                        data.push(0)
                        break
                }
            })

            return {
                labels: item.timestamps,
                datasets: [
                    {
                        fill: false,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].primary,
                        borderColor: this.$vuetify.theme.themes[this.theme].primary,
                        steppedLine: 'middle',
                        data: data
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
                            precision: 0,
                            max: 2,
                            fontColor: this.chartFontColour,
                            callback: (value, index, values) => {
                                if (value === 2) {
                                    return 'Predicted Failure'
                                } else if (value === 1) {
                                    return 'Ok'
                                } else {
                                    return 'unknown'
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
                            if (dataset.data[tooltipItem.index] === 2) {
                                return 'Predicted Failure'
                            } else if (dataset.data[tooltipItem.index] === 1) {
                                return 'Ok'
                            } else {
                                return 'unknown'
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
