<template>
    <div>
        <h2>Device Info</h2>
        <div class="md-layout md-gutter md-alignment-top-space-around">
            <div class="md-layout-item">
                <table>
                    <tr>
                        <td><md-icon :md-src="require('@/assets/raspberry-pi-brands.svg')"></md-icon></td>
                        <td><strong>Manufacturer:</strong></td>
                        <td>{{ devInfo.manufacturer }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><strong>Model:</strong></td>
                        <td>{{ devInfo.model }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><strong>Version:</strong></td>
                        <td>{{ devInfo.version }}</td>
                    </tr>
                    <tr class="empty-row">
                        <td class="empty"></td>
                        <td class="empty"></td>
                        <td class="empty"></td>
                    </tr>
                    <tr>
                        <td><md-icon :md-src="require('@/assets/linux-brands.svg')"></md-icon></td>
                        <td><strong>OS:</strong></td>
                        <td>{{ devInfo.osDistro }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><strong>OS Code:</strong></td>
                        <td>{{ devInfo.osCode }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><strong>OS Hostname:</strong></td>
                        <td>{{ devInfo.osHostname }}</td>
                    </tr>
                </table>
            </div>
            <div class="md-layout-item">
                <table>
                    <tr>
                        <td><md-icon :md-src="require('@/assets/microchip-solid.svg')"></md-icon></td>
                        <td><strong>CPU manufacturer:</strong></td>
                        <td>{{ devInfo.cpuManufacturer }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><strong>CPU cores:</strong></td>
                        <td>{{ devInfo.cpuCores }}</td>
                    </tr>
                    <tr class="empty-row">
                        <td class="empty"></td>
                        <td class="empty"></td>
                        <td class="empty"></td>
                    </tr>
                    <tr>
                        <td><md-icon :md-src="require('@/assets/memory-solid.svg')"></md-icon></td>
                        <td><strong>Total memory:</strong></td>
                        <td>{{ devInfo.memory }}</td>
                    </tr>
                    <tr class="empty-row">
                        <td class="empty"></td>
                        <td class="empty"></td>
                        <td class="empty"></td>
                    </tr>
                    <tr>
                        <td><md-icon :md-src="require('@/assets/clock-regular.svg')"></md-icon></td>
                        <td><strong>System uptime:</strong></td>
                        <td>{{ devInfo.uptime }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'DeviceInfo',
    methods: {
        fetchDeviceData () {
            this.$store.dispatch('GET_DEV_INFO')
        }
    },
    mounted () {
        this.fetchDeviceData()
    },
    computed: {
        ...mapState(['devInfo'])
    }
}
</script>

<style scoped>
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
