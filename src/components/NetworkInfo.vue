<template>
    <div>
        <md-table v-model="interfaces" md-sort="num" md-sort-order="asc">
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
export default {
    name: 'NetworkInfo',
    data () {
        return {
            interfaces: [
                {
                    num: 1,
                    iface: 'eth0',
                    ip: '192.168.100.100',
                    mac: '00ebfedasvdewieuvfavea',
                    type: 'wired',
                    speed: '1000',
                    dhcp: 'true',
                    rx: 203754,
                    tx: 295352
                },
                {
                    num: 2,
                    iface: 'eth1',
                    ip: '192.168.52.40',
                    mac: '0998gqaw98gf8o47v',
                    type: 'wireless',
                    speed: '100',
                    dhcp: 'false',
                    rx: 27833,
                    tx: 69829
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
