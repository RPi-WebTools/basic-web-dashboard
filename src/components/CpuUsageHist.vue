<template>
    <div>
        <div class="chartContainer">
            <line-chart :chartdata="lineChartData" :options="lineOptions" :styles="styles"></line-chart>
        </div>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'

export default {
    name: 'CpuUsageHist',
    components: {
        LineChart
    },
    data () {
        return {
            lineChartData: {
                labels: ['1', '2', '3', '4'],
                datasets: [
                    {
                        label: 'Used',
                        fill: false,
                        backgroundColor: '#8BC34A',
                        borderColor: '#8BC34A',
                        data: [25, 10, 45, 20]
                    }
                ]
            },
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'CPU usage history in %',
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
                            max: 100,
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
    max-height: 300px;
    position: relative;
}*/
</style>
