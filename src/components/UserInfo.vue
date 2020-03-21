<template>
    <div class="md-layout md-gutter md-alignment-center">
        <div class="md-layout-item">
            <md-table :value="userInfo" md-sort="num" md-sort-order="asc">
                <md-table-toolbar>
                    <h2 class="md-title">User Info</h2>
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="No" md-sort-by="num" md-numeric>{{ item.num }}</md-table-cell>
                    <md-table-cell md-label="User" md-sort-by="user">{{ item.user }}</md-table-cell>
                    <md-table-cell md-label="Terminal" md-sort-by="terminal">{{ item.terminal }}</md-table-cell>
                    <md-table-cell md-label="Last Login Date" md-sort-by="loginDate">{{ item.loginDate }} {{ item.loginTime }}</md-table-cell>
                    <md-table-cell md-label="IP" md-sort-by="ip">{{ item.ip }}</md-table-cell>
                    <md-table-cell md-label="Last Command" md-sort-by="lastCmd">{{ item.lastCmd }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <div class="md-layout-item">
            <bar-chart :chartData="dataset" :options="barOptions" :styles="styles"></bar-chart>
        </div>
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
            barOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'User login count history',
                    fontColor: '#fafafa',
                    fontSize: 20
                },
                legend: {
                    labels: {
                        fontColor: '#fafafa'
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: '#fafafa'
                        },
                        gridLines: {
                            color: '#fafafa'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#fafafa'
                        },
                        gridLines: {
                            color: '#fafafa',
                            borderDash: [4, 15]
                        }
                    }]
                }
            },
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
        dataset () {
            const bgColors = [
                '#8BC34A',
                '#29B6F6',
                '#FFCA28',
                '#f44336',
                '#ff9800'
            ]
            for (let i = 0; i < (this.userHist.users.length - 6); i++) {
                bgColors.push(this.getRandomColor())
            }
            bgColors.push('#29B6F6')

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
        }
    }
}
</script>
