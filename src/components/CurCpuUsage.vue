<template>
    <div>
        <p class="headline pl-3 pt-3">Latest CPU usage</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="4" align-self="center">
                    <v-card outlined>
                        <v-card-title class="primary--text">CPU load:</v-card-title>
                        <v-card-subtitle class="headline">{{ +cpuInfo.curCpuLoad.toFixed(2) }} %</v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="12" md="8">
                    <DoughnutChart :chartData="dataset" :options="doughnutOptions" :styles="styles"></DoughnutChart>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import DoughnutChart from '../charts/DoughnutChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'CurCpuUsage',
    components: {
        DoughnutChart
    },
    data () {
        return {
            styles: {
                height: '250px'
            }
        }
    },
    created () {
        this.$store.dispatch('SYSMON/CPUINFO/GET_CPU_INFO')
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
                labels: ['Used', 'Unused'],
                datasets: [
                    {
                        backgroundColor: [
                            this.$vuetify.theme.themes[this.theme].secondary, // used
                            this.$vuetify.theme.themes[this.theme].success // free
                        ],
                        data: [this.cpuInfo.curCpuLoad, 100 - this.cpuInfo.curCpuLoad],
                        borderColor: this.chartFontColour
                    }
                ]
            }
        },
        doughnutOptions () {
            return {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                title: {
                    display: false
                },
                legend: {
                    labels: {
                        fontColor: this.chartFontColour
                    },
                    position: 'right',
                    align: 'middle'
                },
                tooltips: {
                    callbacks: {
                        label (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex]
                            const meta = dataset._meta[Object.keys(dataset._meta)[0]]
                            const percentage = +(dataset.data[tooltipItem.index] / meta.total * 100).toFixed(2)
                            return percentage + ' %'
                        },
                        title (tooltipItem, data) {
                            return data.labels[tooltipItem[0].index]
                        }
                    }
                },
                animation: {
                    duration: 0
                }
            }
        },
        ...mapState('SYSMON/CPUINFO', ['cpuInfo'])
    }
}
</script>

<style scoped>
</style>
