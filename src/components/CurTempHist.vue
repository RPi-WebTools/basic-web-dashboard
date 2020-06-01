<template>
    <div>
        <p class="headline pl-3 pt-3">CPU temperature history</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="4" align-self="center">
                    <v-card outlined>
                        <v-card-title class="primary--text">Latest temperature:</v-card-title>
                        <v-card-subtitle class="headline">{{ cpuInfo.curCpuTemp }} °C</v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="12" md="8">
                    <LineChart :chartData="dataset" :options="lineOptions" :styles="styles"></LineChart>
                </v-col>
            </v-row>
        </v-container>
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
                        fill: false,
                        lineTension: 0,
                        backgroundColor: this.$vuetify.theme.themes[this.theme].primary,
                        borderColor: this.$vuetify.theme.themes[this.theme].primary,
                        data: this.cpuHist.temperature
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
                            maxTicksLimit: 10,
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
                            fontColor: this.chartFontColour,
                            callback: (value, index, values) => {
                                return value + ' °C'
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
                            return +(dataset.data[tooltipItem.index]).toFixed(2) + ' °C'
                        },
                        title: (tooltipItem, data) => {
                            return this.formatDate(data.labels[tooltipItem[0].index])
                        }
                    }
                }
            }
        },
        ...mapState('SYSMON/CPUINFO', ['cpuInfo']),
        ...mapState('SYSMON/CPUHIST', ['cpuHist'])
    },
    methods: {
        formatDate (ms) {
            // localised something along 01.01.20 13:00:00
            return this.moment(ms).format(this.moment.localeData().longDateFormat('L').replace(/YYYY/g, 'YY') + ' LT')
        }
    }
}
</script>

<style scoped>
</style>
