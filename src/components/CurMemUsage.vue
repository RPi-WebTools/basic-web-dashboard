<template>
    <div>
        <p class="headline pl-3 pt-3">Latest memory usage</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="4" align-self="center">
                    <v-card outlined>
                        <v-card-title class="primary--text">Used memory:</v-card-title>
                        <v-card-subtitle class="headline">{{ bytesToGbytes(memInfo.curMemUsed) }} GB</v-card-subtitle>
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
    name: 'CurMemUsage',
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
    mounted () {
        this.$store.dispatch('SYSMON/MEMINFO/GET_MEM_INFO')
        this.$store.dispatch('SYSMON/DEVINFO/GET_DEV_INFO')
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
                labels: ['Used', 'Buffered', 'Cached', 'Free'],
                datasets: [
                    {
                        backgroundColor: [
                            this.$vuetify.theme.themes[this.theme].secondary, // used mem
                            this.$vuetify.theme.themes[this.theme].accent, // buffered mem
                            this.$vuetify.theme.themes[this.theme].warning, // cached mem
                            this.$vuetify.theme.themes[this.theme].success // free mem
                        ],
                        data: [
                            this.getMemPercentage(this.memInfo.curMemUsed),
                            this.getMemPercentage(this.memInfo.curMemBuffered),
                            this.getMemPercentage(this.memInfo.curMemCached),
                            (100 - this.getMemPercentage(this.memInfo.curMemUsed + this.memInfo.curMemBuffered + this.memInfo.curMemCached))
                        ],
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
        ...mapState('SYSMON/MEMINFO', ['memInfo']),
        ...mapState('SYSMON/DEVINFO', ['devInfo'])
    },
    methods: {
        bytesToGbytes (bytes) {
            const raw = bytes / Math.pow(1024, 3)
            return +raw.toFixed(2)
        },
        getMemPercentage (value) {
            const raw = (value / this.devInfo.memory) * 100
            return +raw.toFixed(2)
        }
    }
}
</script>

<style scoped>
</style>
