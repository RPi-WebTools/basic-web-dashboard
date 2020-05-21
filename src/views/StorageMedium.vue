<template>
    <v-card class="px-2 pb-3 pt-1" tile>
        <p class="headline pl-3 pt-3">Filesystem Details</p>
        <v-container fluid class="pt-0">
            <v-row>
                <v-col cols="12" md="1">
                    <v-btn block icon disabled min-height="120px">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    v-if="fsDetails.removable"
                                    v-text="iconUsbDrive"
                                    :class="{
                                        'filter-green': (fsDetails.smart === 'Ok'),
                                        'filter-orange': (fsDetails.smart === 'unknown'),
                                        'filter-red': (fsDetails.smart === 'Predicted Failure')
                                    }"
                                    v-on="on"
                                    size="96"
                                ></v-icon>
                                <v-icon
                                    v-else
                                    v-text="iconHardDrive"
                                    :class="{
                                        'filter-green':(fsDetails.smart === 'Ok'),
                                        'filter-orange':(fsDetails.smart === 'unknown'),
                                        'filter-red':(fsDetails.smart === 'Predicted Failure')
                                    }"
                                    v-on="on"
                                    size="96"
                                ></v-icon>
                            </template>
                            <span>{{ fsDetails.smart }}</span>
                        </v-tooltip>
                    </v-btn>
                </v-col>
                <v-col cols="12" md="5" align-self="center">
                    <v-card color="background" height="100%">
                        <div class="d-flex justify-space-between">
                            <div>
                                <v-card-title class="primary--text">Label</v-card-title>
                                <v-card-subtitle class="headline">{{ fsDetails.label }}</v-card-subtitle>
                            </div>
                            <v-icon class="ma-3" large>fas fa-tag</v-icon>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" align-self="center">
                    <v-card color="background" height="100%">
                        <div class="d-flex justify-space-between">
                            <div>
                                <v-card-title class="primary--text">Mounting point</v-card-title>
                                <v-card-subtitle class="headline">{{ fsDetails.mount }}</v-card-subtitle>
                            </div>
                            <v-icon class="ma-3" large>fas fa-at</v-icon>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-sheet height="100%">
                        <v-row class="pt-0 mt-0">
                            <v-col class="pt-0 mt-0">
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Name</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ fsDetails.name }}</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-col>
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Formatting</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ fsDetails.fsType }}</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Size</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ bytesToGbytes(fsDetails.size) }} GB</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="pb-0 mb-0">
                            <v-col class="pb-0 mb-0">
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Free space</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ bytesToGbytes(fsDetails.size - fsDetails.used) }} GB</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card class="background" height="100%">
                        <v-card-title class="primary--text">Used capacity</v-card-title>
                        <DoughnutChart class="mb-3" :chartData="datasetCap" :options="doughnutOptions" :styles="doughnutStyles" />
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="background" height="100%">
                        <v-card-title class="primary--text">Usage history</v-card-title>
                        <v-card-text>
                            <FsUsageHist :uuid="uuid" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="3">
                    <v-sheet height="100%">
                        <v-row class="pt-0 mt-0">
                            <v-col class="pt-0 mt-0">
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Vendor</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ fsDetails.vendor }}</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-spacer></v-spacer>
                        <v-row>
                            <v-col>
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Internal name</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ fsDetails.modelName }}</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">UUID</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ fsDetails.uuid }}</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Interface</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ fsDetails.interface }}</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="pb-0 mb-0">
                            <v-col class="pb-0 mb-0">
                                <v-card color="background">
                                    <v-card-title>
                                        <span class="primary--text">Type</span>
                                        <v-spacer></v-spacer>
                                        <span class="subtitle-1">{{ fsDetails.diskType }}</span>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-sheet>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card class="background" height="100%">
                        <v-card-title class="primary--text">Disk partitions</v-card-title>
                        <DoughnutChart class="mb-3" :chartData="datasetPart" :options="doughnutOptions" :styles="doughnutStyles" />
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="background" height="100%">
                        <v-card-title class="primary--text">SMART history</v-card-title>
                        <v-card-text>
                            <FsSmartHist :uuid="uuid" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import DoughnutChart from '@/charts/DoughnutChart.vue'
import FsSmartHist from '@/components/FsSmartHist.vue'
import FsUsageHist from '@/components/FsUsageHist.vue'

export default {
    name: 'StorageMedium',
    props: {
        fsDetails: Object,
        uuid: String
    },
    components: {
        DoughnutChart,
        FsSmartHist,
        FsUsageHist
    },
    data () {
        return {
            iconHardDrive: '$vuetify.icons.hardDrive',
            iconUsbDrive: '$vuetify.icons.usbDrive',
            doughnutStyles: {
                height: '250px'
            }
        }
    },
    created () {
        this.$emit('created', this.uuid)
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        chartFontColour () {
            return (this.$vuetify.theme.dark) ? '#ffffff' : '#616161'
        },
        datasetCap () {
            return {
                labels: ['Used', 'Free'],
                datasets: [
                    {
                        backgroundColor: [
                            this.$vuetify.theme.themes[this.theme].secondary, // used
                            this.$vuetify.theme.themes[this.theme].success // free
                        ],
                        data: [this.fsDetails.usedPercentage, 100 - this.fsDetails.usedPercentage],
                        borderColor: this.chartFontColour
                    }
                ]
            }
        },
        datasetPart () {
            let partitioning = []
            if (this.fsDetails.partitions.length > 1) {
                let totalPartitionSize = 0
                this.fsDetails.partitions.forEach(element => {
                    partitioning.push(element)
                    totalPartitionSize += element
                })
                if ((this.fsDetails.size - totalPartitionSize) > 10) partitioning.push(this.fsDetails.size - totalPartitionSize)
            } else if (this.fsDetails.partitions > 0) {
                if (this.fsDetails.partitions[0] === this.fsDetails.size) partitioning = this.fsDetails.partitions
                else {
                    partitioning.push(this.fsDetails.partitions[0])
                    partitioning.push(this.fsDetails.size - this.fsDetails.partitions[0])
                }
            }

            const partLabels = this.fsDetails.partitionLabels
            if (this.fsDetails.partitionLabels.length !== partitioning.length) {
                const diff = partitioning.length - this.fsDetails.partitionLabels.length
                for (let i = 0; i < diff; i++) {
                    partLabels.push('Empty')
                }
            }

            const bgColors = [
                this.$vuetify.theme.themes[this.theme].error,
                this.$vuetify.theme.themes[this.theme].accent,
                this.$vuetify.theme.themes[this.theme].warning,
                this.$vuetify.theme.themes[this.theme].success,
                this.$vuetify.theme.themes[this.theme].primary
            ]
            for (let i = 0; i < (partitioning.length - 6); i++) {
                bgColors.push(this.getRandomColor())
            }
            bgColors.push(this.$vuetify.theme.themes[this.theme].info)
            return {
                labels: partLabels,
                datasets: [
                    {
                        backgroundColor: bgColors,
                        data: partitioning,
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
        }
    },
    methods: {
        bytesToGbytes (bytes) {
            const raw = bytes / Math.pow(1024, 3)
            return +raw.toFixed(2)
        },
        getRandomColor () {
            const letters = '0123456789ABCDEF'.split('')
            let color = '#'
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)]
            }
            return color
        }
    }
}
</script>

<style scoped>
.filter-green {
    filter: invert(70%) sepia(18%) saturate(3896%) hue-rotate(71deg) brightness(93%) contrast(54%);
}

.filter-red {
    filter: invert(48%) sepia(56%) saturate(6999%) hue-rotate(342deg) brightness(99%) contrast(94%);
}

.filter-orange {
    filter: invert(72%) sepia(36%) saturate(6980%) hue-rotate(2deg) brightness(106%) contrast(104%);
}
</style>
