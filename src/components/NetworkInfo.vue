<template>
    <div>
        <p class="headline pl-3 pt-3">Network Info</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-data-table :headers="headers" :items="netInfo" :items-per-page="-1" class="elevation-0">
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NetworkInfo',
    data () {
        return {
            headers: [
                { text: 'No.', value: 'num' },
                { text: 'Interface', value: 'iface' },
                { text: 'IP', value: 'ip' },
                { text: 'MAC', value: 'mac' },
                { text: 'Type', value: 'type' },
                { text: 'Speed', value: 'speed' },
                { text: 'DHCP', value: 'dhcp' },
                { text: 'Bytes received', value: 'rx' },
                { text: 'Bytes sent', value: 'tx' }
            ]
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/NETINFO/GET_NET_INFO')
    },
    computed: {
        ...mapState('SYSMON/NETINFO', ['netInfo'])
    }
}
</script>

<style lang="scss" scoped>
</style>
