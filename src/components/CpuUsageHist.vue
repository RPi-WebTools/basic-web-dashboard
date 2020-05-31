<template>
    <div>
        <p class="headline pl-3 pt-3">CPU usage history</p>
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
    name: 'CpuUsageHist',
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
        this.$store.dispatch('SYSMON/CPUHIST/GET_CPU_HIST')
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        chartFontColour () {
            return (this.$vuetify.theme.dark) ? '#ffffff' : '#616161'
        },
        dataset () {
            return {
                labels: this.cpuHist.timestamps,
                datasets: [
                    {
                        label: 'Used',
                        fill: false,
                        lineTension: 0,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].success,
                        borderColor: this.$vuetify.theme.themes[this.theme].success,
                        showLine: true,
                        data: this.cpuHist.usage
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
                            maxTicksLimit: 20,
                            callback: (value, index, values) => {
                                return this.formatDate(value)
                            }
                        },
                        gridLines: {
                            color: this.chartFontColour
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
                hover: {
                    animationDuration: 0
                },
                tooltips: {
                    callbacks: {
                        label (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex]
                            return +(dataset.data[tooltipItem.index]).toFixed(2) + ' %'
                        },
                        title: (tooltipItem, data) => {
                            return this.formatDate(data.labels[tooltipItem[0].index])
                        }
                    }
                }
            }
        },
        ...mapState('SYSMON/CPUHIST', ['cpuHist'])
    },
    methods: {
        formatDate (ms) {
            // localised somthing along 01.01.20 13:00:00
            return this.moment(ms).format(this.moment.localeData().longDateFormat('L').replace(/YYYY/g, 'YY') + ' LTS')
        }
    }
}
</script>

<style scoped>
</style>
