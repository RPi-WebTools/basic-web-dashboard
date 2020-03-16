<template>
    <div>
        <div class="chartContainer">
            <div class="md-layout md-alignment-center">
                <div class="md-layout-item md-size-30">
                    <md-card>
                        <md-card-header style="font-size: 20px;">Used memory:</md-card-header>
                        <md-card-content style="font-size: 20px;font-weight: bold;">{{ curMemUsed }} %</md-card-content>
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
    name: 'CurMemUsage',
    components: {
        DoughnutChart
    },
    data () {
        return {
            curMemUsed: 25,
            doughnutChartData: {
                labels: ['Used', 'Buffered', 'Cached', 'Free'],
                datasets: [
                    {
                        backgroundColor: [
                            '#8BC34A', // used mem
                            '#29B6F6', // buffered mem
                            '#FFCA28', // cached mem
                            '#607D8B' // free mem
                        ],
                        data: [25, 10, 45, 20]
                    }
                ]
            },
            doughnutOptions: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                title: {
                    display: true,
                    text: 'Latest memory usage in %',
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
