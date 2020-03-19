<template>
    <div>
        <div class="chartContainer">
            <line-chart class="md-layout-item" :chartData="dataset" :options="lineOptions" :styles="styles"></line-chart>
        </div>
    </div>
</template>

<script>
import LineChart from '../charts/LineChart.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'FswriteHist',
    components: {
        LineChart
    },
    props: {
        uuid: String
    },
    data () {
        return {
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
                height: '202px'
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/FSHIST/GET_FS_HIST')
    },
    computed: {
        dataset () {
            const item = this.fsHistByUuid(this.$props.uuid)[0]
            return {
                labels: item.timestamps,
                datasets: [
                    {
                        fill: false,
                        backgroundColor: '#8BC34A',
                        borderColor: '#8BC34A',
                        data: item.tx
                    }
                ]
            }
        },
        ...mapGetters('SYSMON/FSHIST', ['fsHistByUuid'])
    }
}
</script>

<style scoped>
/*.chartContainer {
    max-width: 650px;
    position: relative;
}*/
</style>
