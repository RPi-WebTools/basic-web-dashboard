<template>
    <div>
        <md-table :value="netInfo" md-sort="num" md-sort-order="asc">
            <md-table-toolbar>
                <h2 class="md-title">Network Info</h2>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="No" md-sort-by="num" md-numeric>{{ item.num }}</md-table-cell>
                <md-table-cell md-label="Interface" md-sort-by="iface">{{ item.iface }}</md-table-cell>
                <md-table-cell md-label="IP" md-sort-by="ip">{{ item.ip }}</md-table-cell>
                <md-table-cell md-label="MAC" md-sort-by="mac">{{ item.mac }}</md-table-cell>
                <md-table-cell md-label="Type" md-sort-by="type">{{ item.type }}</md-table-cell>
                <md-table-cell md-label="Speed" md-sort-by="speed">{{ item.speed }} Mbit</md-table-cell>
                <md-table-cell md-label="DHCP" md-sort-by="dhcp">{{ item.dhcp }}</md-table-cell>
                <md-table-cell md-label="Bytes received" md-sort-by="rx">{{ item.rx }}</md-table-cell>
                <md-table-cell md-label="Bytes sent" md-sort-by="tx">{{ item.tx }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NetworkInfo',
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
