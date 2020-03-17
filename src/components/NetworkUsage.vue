<template>
    <div>
        <div class="chartContainer">
            <bar-chart :chartData="barChartData" :options="barOptions" :styles="styles"></bar-chart>
        </div>
    </div>
</template>

<script>
import BarChart from '../charts/BarChart.vue'

export default {
    name: 'NetworkUsage',
    components: {
        BarChart
    },
    data () {
        return {
            barChartData: {
                labels: ['1', '2', '3'],
                datasets: [
                    {
                        label: 'Network input per day',
                        backgroundColor: '#8BC34A',
                        data: [25, 16, 24]
                    },
                    {
                        label: 'Network output per day',
                        backgroundColor: '#29B6F6',
                        data: [5, 6, 2]
                    }
                ]
            },
            barOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Network usage',
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
                            color: '#fafafa'
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
.chartContainer {
    max-height: 300px;
    position: relative;
}
</style>