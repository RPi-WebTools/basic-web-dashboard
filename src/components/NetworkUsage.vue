<template>
    <div>
        <p class="headline pl-3 pt-3">Network Usage</p>

        <p class="title pl-3 pt-3">Bytes received</p>
        <div class="px-3">
            <BarChart :chartData="datasetRx" :options="barOptions"></BarChart>
        </div>

        <p class="title pl-3 pt-3">Bytes transmitted</p>
        <div class="px-3">
            <BarChart :chartData="datasetTx" :options="barOptions"></BarChart>
        </div>
    </div>
</template>

<script>
import BarChart from '../charts/BarChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'NetworkUsage',
    components: {
        BarChart
    },
    data () {
        return {
            styles: {
                height: '500px'
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/NETHIST/GET_NET_HIST')
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        chartFontColour () {
            return (this.$vuetify.theme.dark) ? '#ffffff' : '#616161'
        },
        datasetRx () {
            const processedData = this.sumDataPerDay(this.netHist)

            const bgColors = [
                this.$vuetify.theme.themes[this.theme].success,
                this.$vuetify.theme.themes[this.theme].accent,
                this.$vuetify.theme.themes[this.theme].warning,
                this.$vuetify.theme.themes[this.theme].error,
                this.$vuetify.theme.themes[this.theme].primary
            ]
            for (let i = 0; i < (processedData.rx.length - 6); i++) {
                bgColors.push(this.getRandomColor())
            }
            bgColors.push(this.$vuetify.theme.themes[this.theme].secondary)

            const datasets = []
            let i = 0
            for (const [key, val] of Object.entries(processedData.rx)) {
                datasets.push({
                    label: key,
                    backgroundColor: bgColors[i],
                    data: val
                })
                i += 1
            }
            return {
                labels: processedData.timestamps,
                datasets: datasets
            }
        },
        datasetTx () {
            const processedData = this.sumDataPerDay(this.netHist)

            const bgColors = [
                this.$vuetify.theme.themes[this.theme].success,
                this.$vuetify.theme.themes[this.theme].accent,
                this.$vuetify.theme.themes[this.theme].warning,
                this.$vuetify.theme.themes[this.theme].error,
                this.$vuetify.theme.themes[this.theme].primary
            ]
            for (let i = 0; i < (processedData.tx.length - 6); i++) {
                bgColors.push(this.getRandomColor())
            }
            bgColors.push(this.$vuetify.theme.themes[this.theme].secondary)

            const datasets = []
            let i = 0
            for (const [key, val] of Object.entries(processedData.tx)) {
                datasets.push({
                    label: key,
                    backgroundColor: bgColors[i],
                    data: val
                })
                i += 1
            }

            return {
                labels: processedData.timestamps,
                datasets: datasets
            }
        },
        barOptions () {
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
                        },
                        stacked: true
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            fontColor: this.chartFontColour,
                            callback: (value, index, values) => {
                                if (value > 1000000000) {
                                    return (value / 1000000000) + ' GB'
                                } else if (value > 1000000) {
                                    return (value / 1000000) + ' MB'
                                } else if (value > 1000) {
                                    return (value / 1000) + ' kB'
                                } else if (value > -1) {
                                    return value + ' B'
                                }
                            }
                        },
                        gridLines: {
                            color: this.chartFontColour,
                            borderDash: [4, 15]
                        },
                        stacked: true
                    }]
                }
            }
        },
        ...mapState('SYSMON/NETHIST', ['netHist'])
    },
    methods: {
        getRandomColor () {
            const letters = '0123456789ABCDEF'.split('')
            let color = '#'
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)]
            }
            return color
        },
        sumDataPerDay (netItems) {
            const result = {
                timestamps: [],
                rx: {},
                tx: {}
            }
            Object.keys(netItems.rx).forEach(iface => {
                result.rx[iface] = []
                result.tx[iface] = []
            })

            const dates = []
            netItems.timestamps.forEach((timestamp, index) => {
                const date = new Date(timestamp)
                const yyyyMMdd = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                if (!dates.includes(yyyyMMdd)) {
                    dates.push(yyyyMMdd)
                    result.timestamps.push(timestamp)
                    Object.keys(netItems.rx).forEach(iface => {
                        result.rx[iface].push(netItems.rx[iface][index])
                        result.tx[iface].push(netItems.tx[iface][index])
                    })
                } else {
                    const existingIndex = dates.indexOf(yyyyMMdd)
                    Object.keys(netItems.rx).forEach(iface => {
                        result.rx[iface][existingIndex] += netItems.rx[iface][index]
                        result.tx[iface][existingIndex] += netItems.tx[iface][index]
                    })
                }
            })
            return result
        }
    }
}
</script>

<style scoped>
.chartContainer {
    max-height: 300px;
    position: relative;
}
</style>
