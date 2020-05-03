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
                }
            }
        },
        ...mapState('SYSMON/CPUINFO', ['cpuInfo']),
        ...mapState('SYSMON/CPUHIST', ['cpuHist'])
    }
}
</script>

<style scoped>
</style>
