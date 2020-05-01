<template>
    <!-- <div class="storage-medium">
        <h1>Filesystem Details</h1>
        <div class="grid">
            <div class="item icon">
                <div>
                    <md-icon class="md-size-4x md-layout-item"
                        v-if="fsDetails.removable"
                        :class="{
                            'filter-green':(fsDetails.smart === 'Ok'),
                            'filter-orange':(fsDetails.smart === 'unknown'),
                            'filter-red':(fsDetails.smart === 'Predicted Failure')
                        }"
                        :md-src="require('@/assets/usbdrive.svg')"
                    ></md-icon>
                    <md-icon class="md-size-4x md-layout-item"
                        v-else
                        :class="{
                            'filter-green':(fsDetails.smart === 'Ok'),
                            'filter-orange':(fsDetails.smart === 'unknown'),
                            'filter-red':(fsDetails.smart === 'Predicted Failure')
                        }"
                        :md-src="require('@/assets/harddrive.svg')"
                    ></md-icon>
                    <md-tooltip md-direction="bottom">{{ fsDetails.smart }}</md-tooltip>
                </div>
            </div>
            <div class="item label">
                <md-toolbar class="md-medium">
                    <div class="md-toolbar-row">
                        <h3 class="md-title">
                            <span class="text-title">Label:</span>
                            <br>
                            {{ fsDetails.label }}
                        </h3>
                    </div>
                </md-toolbar>
            </div>
            <div class="item mount">
                <md-toolbar class="md-medium">
                    <div class="md-toolbar-row">
                        <h3 class="md-title">
                            <span class="text-title">Mounting point:</span>
                            <br>
                            {{ fsDetails.mount }}
                        </h3>
                    </div>
                </md-toolbar>
            </div>
            <div class="item name">
                <md-toolbar class="md-dense">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Name:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ fsDetails.name }}</h3>
                    </div>
                </md-toolbar>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Formatting:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ fsDetails.fsType }}</h3>
                    </div>
                </md-toolbar>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Size:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ bytesToGbytes(fsDetails.size) }} GB</h3>
                    </div>
                </md-toolbar>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Free space:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ bytesToGbytes(fsDetails.size - fsDetails.used) }} GB</h3>
                    </div>
                </md-toolbar>
                <br>
                <md-divider class="gap-above"></md-divider>
                <br>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Vendor:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ fsDetails.vendor }}</h3>
                    </div>
                </md-toolbar>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Internal name:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ fsDetails.modelName }}</h3>
                    </div>
                </md-toolbar>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">UUID:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ fsDetails.uuid }}</h3>
                    </div>
                </md-toolbar>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Interface:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ fsDetails.interface }}</h3>
                    </div>
                </md-toolbar>
                <md-toolbar class="md-dense gap-above">
                    <div class="md-toolbar-section-start">
                        <h3 class="md-title">
                            <span class="text-title">Type:</span>
                        </h3>
                    </div>
                    <div class="md-toolbar-section-end">
                        <h3>{{ fsDetails.diskType }}</h3>
                    </div>
                </md-toolbar>
            </div>
            <div class="item charts">
                <div class="chart-container">
                    <md-card>
                        <md-card-header class="text-title" style="font-size: 20px;">Used capacity in %</md-card-header>
                        <md-card-content>
                            <DoughnutChart :chartData="datasetCap" :options="doughnutOptions" :styles="doughnutStyles"/>
                        </md-card-content>
                    </md-card>
                    <md-card>
                        <md-card-header class="text-title" style="font-size: 20px;">Disk partitions:</md-card-header>
                        <md-card-content>
                            <DoughnutChart :chartData="datasetPart" :options="doughnutOptions" :styles="doughnutStyles"/>
                        </md-card-content>
                    </md-card>
                </div>
            </div>
            <div class="item fs-io">
                <div class="chart-container">
                    <md-card>
                        <md-card-header class="text-title" style="font-size: 20px;">Read operations:</md-card-header>
                        <md-card-content>
                            <FsReadHist :uuid="uuid"/>
                        </md-card-content>
                    </md-card>
                    <md-card>
                        <md-card-header class="text-title" style="font-size: 20px;">Write operations:</md-card-header>
                        <md-card-content>
                            <FsWriteHist :uuid="uuid"/>
                        </md-card-content>
                    </md-card>
                </div>
            </div>
        </div>
    </div> -->
    <!-- TODO -->
    <v-card class="px-2 pb-3 pt-1" tile>
        <p class="headline pl-3 pt-3">Filesystem Details</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="2">
                    <v-btn icon>
                        <v-icon v-text="iconHardDrive"></v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
// import DoughnutChart from '@/charts/DoughnutChart.vue'
// import FsReadHist from '@/components/FsReadHist.vue'
// import FsWriteHist from '@/components/FsWriteHist.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'StorageMedium',
    props: {
        fsDetails: Object,
        uuid: String
    },
    // components: {
    //     DoughnutChart,
    //     FsReadHist,
    //     FsWriteHist
    // },
    data () {
        return {
            iconHardDrive: '$vuetify.icons.hardDrive',
            iconUsbDrive: '$vuetify.icons.usbDrive',
            doughnutOptions: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                title: {
                    display: false
                },
                legend: {
                    labels: {
                        fontColor: '#fafafa'
                    },
                    position: 'bottom',
                    align: 'middle'
                }
            },
            doughnutStyles: {
                // height: '300px'
            }
        }
    },
    created () {
        this.$emit('created', this.$props.uuid)
    },
    /* mounted () {
        this.$store.dispatch('SYSMON/FSINFO/GET_FS_INFO')
    }, */
    computed: {
        datasetCap () {
            const item = this.fsInfoByUuid(this.$props.uuid)[0]
            return {
                labels: ['Used', 'Free'],
                datasets: [
                    {
                        backgroundColor: [
                            '#607D8B', // used
                            '#29B6F6' // free
                        ],
                        data: [item.usedPercentage, 100 - item.usedPercentage]
                    }
                ]
            }
        },
        datasetPart () {
            const item = this.fsInfoByUuid(this.$props.uuid)[0]
            let partitioning = []
            if (item.partitions.length > 1) {
                let totalPartitionSize = 0
                item.partitions.forEach(element => {
                    partitioning.push(element)
                    totalPartitionSize += element
                })
                if ((item.size - totalPartitionSize) > 10) partitioning.push(item.size - totalPartitionSize)
            } else if (item.partitions > 0) {
                if (item.partitions[0] === item.size) partitioning = item.partitions
                else {
                    partitioning.push(item.partitions[0])
                    partitioning.push(item.size - item.partitions[0])
                }
            }

            const partLabels = item.partitionLabels
            if (item.partitionLabels.length !== partitioning.length) {
                const diff = partitioning.length - item.partitionLabels.length
                for (let i = 0; i < diff; i++) {
                    partLabels.push('Empty')
                }
            }

            const bgColors = [
                '#f44336',
                '#8BC34A',
                '#FFCA28',
                '#607D8B',
                '#ff9800'
            ]
            for (let i = 0; i < (partitioning.length - 6); i++) {
                bgColors.push(this.getRandomColor())
            }
            bgColors.push('#29B6F6')
            return {
                labels: partLabels,
                datasets: [
                    {
                        backgroundColor: bgColors,
                        data: partitioning
                    }
                ]
            }
        },
        ...mapGetters('SYSMON/FSINFO', ['fsInfoByUuid'])
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
.icon {
    pointer-events: none;
}

.filter-green {
    filter: brightness(0) saturate(100%) invert(77%) sepia(34%) saturate(744%) hue-rotate(39deg) brightness(89%) contrast(84%);
}

.filter-red {
    filter: brightness(0) saturate(100%) invert(43%) sepia(90%) saturate(4351%) hue-rotate(342deg) brightness(99%) contrast(94%);
}

.filter-orange {
    filter: brightness(0) saturate(100%) invert(72%) sepia(79%) saturate(3637%) hue-rotate(359deg) brightness(101%) contrast(105%);
}

/* .vertical-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

.gap-above {
    margin-top: 10px;
}

.text-title {
    font-style: italic;
    color: #ff9800;
}

.grid {
    display: grid;
    gap: 10px;
    grid-template-columns: 150px repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: repeat(auto-fill, auto);
}

.item {
    color: #fafafa;
    border-radius: 5px;
    padding: 20px;
    border: 1px dashed #fafafa;
}

.icon {
    grid-column: 1;
    grid-row: 1;
    border: 2px solid #fafafa;
}

.status-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.label {
    grid-column: 2 / span 3;
    grid-row: 1;
}

.mount {
    grid-column: 5 / span 3;
    grid-row: 1;
}

.name {
    grid-column: 1 / span 2;
    grid-row: 2;
}

.charts {
    grid-column: 3;
    grid-row: 2;
}

.chart-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.fs-io {
    grid-column: 4 / span 4;
    grid-row: 2;
}

table {
    border: 1px solid #fafafa;
    border-collapse: collapse;
}

td {
    padding: 5px;
} */

.empty-row {
    border-top: 1px solid #fafafa;
    border-bottom: 1px solid #fafafa;
}
.empty::after {
    content: "\00a0";
}
</style>
