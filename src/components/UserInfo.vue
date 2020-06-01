<template>
    <div>
        <p class="headline pl-3 pt-3">User Info</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="6">
                    <v-data-table :headers="headers" :items="userInfo" :items-per-page="-1" class="elevation-0">
                    </v-data-table>
                </v-col>
                <v-col cols="12" md="6">
                    <BarChart :chartData="dataset" :options="barOptions" :styles="styles"></BarChart>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import BarChart from '../charts/BarChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'UserInfo',
    components: {
        BarChart
    },
    data () {
        return {
            headers: [
                { text: 'No.', value: 'num' },
                { text: 'User', value: 'user' },
                { text: 'Terminal', value: 'terminal' },
                { text: 'Last Login Date', value: 'loginDate' },
                { text: 'IP', value: 'ip' },
                { text: 'Last Command', value: 'lastCmd' }
            ],
            styles: {
                height: '300px'
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/USERINFO/GET_USER_INFO')
        this.$store.dispatch('SYSMON/USERHIST/GET_USER_HIST')
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        chartFontColour () {
            return (this.$vuetify.theme.dark) ? '#ffffff' : '#616161'
        },
        dataset () {
            const bgColors = [
                this.$vuetify.theme.themes[this.theme].success,
                this.$vuetify.theme.themes[this.theme].accent,
                this.$vuetify.theme.themes[this.theme].warning,
                this.$vuetify.theme.themes[this.theme].error,
                this.$vuetify.theme.themes[this.theme].primary
            ]
            for (let i = 0; i < (this.userHist.users.length - 6); i++) {
                bgColors.push(this.getRandomColor())
            }
            bgColors.push(this.$vuetify.theme.themes[this.theme].secondary)

            const datasets = []
            let i = 0
            for (const [key, val] of Object.entries(this.userHist.users)) {
                datasets.push({
                    label: key,
                    backgroundColor: bgColors[i],
                    data: val
                })
                i += 1
            }

            return {
                labels: this.userHist.timestamps,
                datasets: datasets
            }
        },
        barOptions () {
            return {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'User login count history',
                    fontColor: this.chartFontColour,
                    fontSize: 20
                },
                legend: {
                    labels: {
                        fontColor: this.chartFontColour
                    }
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
                            fontColor: this.chartFontColour
                        },
                        gridLines: {
                            color: this.chartFontColour,
                            borderDash: [4, 15]
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: (tooltipItem, data) => {
                            return this.formatDate(data.labels[tooltipItem[0].index])
                        }
                    }
                }
            }
        },
        ...mapState('SYSMON/USERINFO', ['userInfo']),
        ...mapState('SYSMON/USERHIST', ['userHist'])
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
        formatDate (ms) {
            // localised something along 01.01.20
            return this.moment(ms).format(this.moment.localeData().longDateFormat('L').replace(/YYYY/g, 'YY'))
        }
    }
}
</script>
