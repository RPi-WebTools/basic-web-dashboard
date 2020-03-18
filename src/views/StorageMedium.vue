<template>
    <div class="storage-medium">
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
                            <DoughnutChart :chartData="doughnutChartData" :options="doughnutOptions" :styles="doughnutStyles"/>
                        </md-card-content>
                    </md-card>
                    <md-card>
                        <md-card-header class="text-title" style="font-size: 20px;">Disk partitions:</md-card-header>
                        <md-card-content>
                            <DoughnutChart :chartData="doughnutChartData" :options="doughnutOptions" :styles="doughnutStyles"/>
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
    </div>
</template>

<script>
import DoughnutChart from '@/charts/DoughnutChart.vue'
import FsReadHist from '@/components/FsReadHist.vue'
import FsWriteHist from '@/components/FsWriteHist.vue'

export default {
    name: 'StorageMedium',
    props: {
        fsDetails: Object,
        uuid: String
    },
    components: {
        DoughnutChart,
        FsReadHist,
        FsWriteHist
    },
    data () {
        return {
            doughnutChartData: null,
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
        this.setChartData()
    },
    methods: {
        setChartData () {
            this.doughnutChartData = {
                labels: ['Used', 'Free'],
                datasets: [
                    {
                        backgroundColor: [
                            '#607D8B', // used
                            '#29B6F6' // free
                        ],
                        data: [this.$props.fsDetails.usedPercentage, 100 - this.$props.fsDetails.usedPercentage]
                    }
                ]
            }
        },
        bytesToGbytes (bytes) {
            const raw = bytes / Math.pow(1024, 3)
            return +raw.toFixed(2)
        }
    }
}
</script>

<style scoped>
.filter-green {
    filter: brightness(0) saturate(100%) invert(77%) sepia(34%) saturate(744%) hue-rotate(39deg) brightness(89%) contrast(84%);
}

.filter-red {
    filter: brightness(0) saturate(100%) invert(43%) sepia(90%) saturate(4351%) hue-rotate(342deg) brightness(99%) contrast(94%);
}

.filter-orange {
    filter: brightness(0) saturate(100%) invert(72%) sepia(79%) saturate(3637%) hue-rotate(359deg) brightness(101%) contrast(105%);
}

.vertical-center {
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
}

.empty-row {
    border-top: 1px solid #fafafa;
    border-bottom: 1px solid #fafafa;
}
.empty::after {
    content: "\00a0";
}
</style>
