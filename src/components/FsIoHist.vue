<template>
    <div>
        <div class="chartContainer">
            <line-chart class="md-layout-item" :chartData="lineChartData" :options="lineOptions" :styles="styles"></line-chart>
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
                    display: false
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
                // height: '300px'
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
