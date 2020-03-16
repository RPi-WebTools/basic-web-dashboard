<template>
    <div>
        <div class="chartContainer">
            <div class="md-layout md-alignment-center">
                <div class="md-layout-item md-size-30">
                    <md-card>
                        <md-card-header style="font-size: 20px;">CPU load:</md-card-header>
                        <md-card-content style="font-size: 20px;font-weight: bold;">{{ curCpuLoad }} %</md-card-content>
                    </md-card>
                </div>
                <doughnut-chart class="md-layout-item" :chartData="doughnutChartData" :options="doughnutOptions" :styles="styles"></doughnut-chart>
            </div>
        </div>
    </div>
</template>

<script>
import DoughnutChart from '../charts/DoughnutChart.vue'

export default {
    name: 'CurCpuUsage',
    components: {
        DoughnutChart
    },
    data () {
        return {
            curCpuLoad: 50,
            doughnutChartData: {
                labels: ['Used', 'Unused'],
                datasets: [
                    {
                        backgroundColor: [
                            '#8BC34A', // used
                            '#607D8B' // free
                        ],
                        data: [13, 87]
                    }
                ]
            },
            doughnutOptions: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                title: {
                    display: true,
                    text: 'Latest CPU usage in %',
                    fontColor: '#fafafa',
                    fontSize: 20
                },
                legend: {
                    labels: {
                        fontColor: '#fafafa'
                    },
                    position: 'right',
                    align: 'middle'
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
    max-width: 650px;
    position: relative;
}
</style>
