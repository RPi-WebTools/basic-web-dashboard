<template>
    <div>
        <p class="headline pl-3 pt-3">Storage capacity</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12" lg="6" align-self="center">
                    <v-simple-table class="elevation-0">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Label</th>
                                    <th class="text-left">Usage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(info, index) in fsInfo" :key="index">
                                    <td>{{ info.label }}</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="width: 30px; border: 0;">
                                                    <v-icon>fas fa-hdd</v-icon>
                                                </td>
                                                <td style="border: 0; padding-left: 5px;">
                                                    <v-progress-linear :value="info.usedPercentage" height="10"></v-progress-linear>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col cols="12" lg="6" align-self="center">
                    <DoughnutChart :chartData="dataset" :options="doughnutOptions" :styles="styles"></DoughnutChart>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import DoughnutChart from '@/charts/DoughnutChart.vue'
import { mapState } from 'vuex'

export default {
    name: 'FsOverview',
    components: {
        DoughnutChart
    },
    data () {
        return {
            headers: [
                { text: 'Label', value: 'label' },
                { text: 'Usage', value: 'usedPercentage' }
            ],
            styles: {
                height: '250px'
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/FSINFO/GET_FS_INFO')
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        chartFontColour () {
            return (this.$vuetify.theme.dark) ? '#ffffff' : '#616161'
        },
        dataset () {
            let usedSpace = 0
            let totalSpace = 0
            this.fsInfo.forEach(disk => {
                usedSpace += disk.used
                totalSpace += disk.size
            })
            return {
                labels: ['Used', 'Unused'],
                datasets: [
                    {
                        backgroundColor: [
                            this.$vuetify.theme.themes[this.theme].secondary, // used
                            this.$vuetify.theme.themes[this.theme].success // free
                        ],
                        data: [
                            +((usedSpace / totalSpace) * 100).toFixed(2),
                            +(100 - (usedSpace / totalSpace) * 100).toFixed(2)
                        ],
                        borderColor: this.chartFontColour
                    }
                ]
            }
        },
        doughnutOptions () {
            return {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                title: {
                    display: false
                },
                legend: {
                    labels: {
                        fontColor: this.chartFontColour
                    },
                    position: 'bottom',
                    align: 'middle'
                },
                tooltips: {
                    callbacks: {
                        label (tooltipItem, data) {
                            const dataset = data.datasets[tooltipItem.datasetIndex]
                            const meta = dataset._meta[Object.keys(dataset._meta)[0]]
                            const percentage = +(dataset.data[tooltipItem.index] / meta.total * 100).toFixed(2)
                            return percentage + ' %'
                        },
                        title (tooltipItem, data) {
                            return data.labels[tooltipItem[0].index]
                        }
                    }
                }
            }
        },
        ...mapState('SYSMON/FSINFO', ['fsInfo'])
    }
}
</script>

<style scoped>
</style>
