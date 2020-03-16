<template>
    <div class="md-layout md-gutter md-alignment-center">
        <div class="md-layout-item">
            <md-table v-model="latestUserInfo" md-sort="num" md-sort-order="asc">
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
            <bar-chart :chartData="barChartData" :options="barOptions" :styles="styles"></bar-chart>
        </div>
    </div>
</template>

<script>
import BarChart from '../charts/BarChart.vue'

export default {
    name: 'UserInfo',
    components: {
        BarChart
    },
    data () {
        return {
            latestUserInfo: [
                {
                    num: 1,
                    user: 'pi',
                    terminal: 'ttyBla',
                    loginDate: '07.03.20',
                    loginTime: '13:00',
                    ip: '192.168.100.100',
                    lastCmd: 'htop'
                },
                {
                    num: 2,
                    user: 'raspi',
                    terminal: 'ttyBlub',
                    loginDate: '10.03.80',
                    loginTime: '17:00',
                    ip: '192.168.6.30',
                    lastCmd: 'nope'
                }
            ],
            barChartData: {
                labels: ['1', '2', '3', '4', '5', '5', '5'],
                datasets: [
                    {
                        label: 'pi',
                        backgroundColor: '#8BC34A',
                        data: [1, 3, 2]
                    },
                    {
                        label: 'raspi',
                        backgroundColor: '#29B6F6',
                        data: [0, 6, 2]
                    }
                ]
            },
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
    }
}
</script>
