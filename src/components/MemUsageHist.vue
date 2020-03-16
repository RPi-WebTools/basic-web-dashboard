<template>
    <div>
        <div class="chartContainer">
            <line-chart :chartData="lineChartData" :options="lineOptions" :styles="styles"></line-chart>
        </div>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'

export default {
    name: 'CurMemUsage',
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
                        fill: true,
                        backgroundColor: '#8BC34A',
                        borderColor: '#8BC34A',
                        data: [25, 10, 45, 20]
                    },
                    {
                        label: 'Buffered',
                        fill: true,
                        backgroundColor: '#29B6F6',
                        borderColor: '#29B6F6',
                        data: [13, 20, 40, 10]
                    },
                    {
                        label: 'Cached',
                        fill: true,
                        backgroundColor: '#FFCA28',
                        borderColor: '#FFCA28',
                        data: [30, 70, 20, 50]
                    },
                    {
                        label: 'Free',
                        fill: true,
                        backgroundColor: '#607D8B',
                        borderColor: '#607D8B',
                        data: [75, 90, 55, 80]
                    },
                    {
                        label: 'In Swap',
                        fill: false,
                        backgroundColor: '#f44336',
                        borderColor: '#f44336',
                        data: [1, 5, 2, 10]
                    }
                ]
            },
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Memory usage history in %',
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
