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
                }
            }
        },
        ...mapState('SYSMON/CPUHIST', ['cpuHist'])
    }
}
</script>

<style scoped>
</style>
