<template>
    <div>
        <div class="chartContainer">
            <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item md-size-30">
                    <md-card>
                        <md-card-header style="font-size: 20px;">CPU temperature:</md-card-header>
                        <md-card-content style="font-size: 20px;font-weight: bold;">{{ curCpuTemp }} °C</md-card-content>
                    </md-card>
                </div>
                <line-chart class="md-layout-item" :chartData="lineChartData" :options="lineOptions" :styles="styles"></line-chart>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'

export default {
    name: 'CurTempHist',
    components: {
        LineChart
    },
    data () {
        return {
            curCpuTemp: 40,
            lineChartData: {
                labels: ['1', '2', '3', '4'],
                datasets: [
                    {
                        fill: false,
                        backgroundColor: '#ff9800',
                        borderColor: '#ff9800',
                        data: [25, 10, 45, 20]
                    }
                ]
            },
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'CPU temperature history in °C',
                    fontColor: '#fafafa',
                    fontSize: 20
                },
                legend: {
                    display: false
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

<style scoped>
/*.chartContainer {
    max-width: 650px;
    position: relative;
}*/
</style>
