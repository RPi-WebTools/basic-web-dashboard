<template>
    <div>
        <p class="headline pl-3 pt-3">Device Info</p>
        <v-container fluid class="pb-0">
            <v-row>
                <v-col align-self="center">
                    <v-simple-table dense>
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td><v-icon>fab fa-raspberry-pi</v-icon></td>
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
                                    <td><v-icon>fab fa-linux</v-icon></td>
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
                                <tr class="empty-row">
                                    <td class="empty"></td>
                                    <td class="empty"></td>
                                    <td class="empty"></td>
                                </tr>
                                <tr>
                                    <td><v-icon>fas fa-microchip</v-icon></td>
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
                                    <td><v-icon>fas fa-memory</v-icon></td>
                                    <td><strong>Total memory:</strong></td>
                                    <td>{{ bytesToGbytes(devInfo.memory) + ' GB' }}</td>
                                </tr>
                                <tr class="empty-row">
                                    <td class="empty"></td>
                                    <td class="empty"></td>
                                    <td class="empty"></td>
                                </tr>
                                <tr>
                                    <td><v-icon>far fa-clock</v-icon></td>
                                    <td><strong>System uptime:</strong></td>
                                    <td>{{ +(devInfo.uptime / 3600).toFixed(4) + ' h' }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'DeviceInfo',
    methods: {
        fetchDeviceData () {
            this.$store.dispatch('SYSMON/DEVINFO/GET_DEV_INFO')
        },
        bytesToGbytes (bytes) {
            const raw = bytes / Math.pow(1024, 3)
            return +raw.toFixed(2)
        }
    },
    mounted () {
        this.fetchDeviceData()
    },
    computed: {
        ...mapState('SYSMON/DEVINFO', ['devInfo'])
    }
}
</script>

<style scoped>
</style>
