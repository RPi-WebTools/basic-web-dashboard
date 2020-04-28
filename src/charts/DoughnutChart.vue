<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: {
        options: {
            type: Object,
            default: null
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    },
    watch: {
        options () {
            this.$data._chart.options = this.options
            this.$data._chart.update()
        }
    }
}
</script>
