<template>
    <div>
        <h2>Network Info</h2>
        <md-table>
            <md-table-row>
                <md-table-head md-numeric>No</md-table-head>
                <md-table-head>Interface</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>IP</md-table-head>
            </md-table-row>
            <md-table-row>
                <md-table-cell md-numeric>1</md-table-cell>
                <md-table-cell>eth0</md-table-cell>
                <md-table-cell>Ethernet</md-table-cell>
                <md-table-cell>192.168.100.100</md-table-cell>
            </md-table-row>
            <md-table-row>
                <md-table-cell md-numeric>2</md-table-cell>
                <md-table-cell>eth1</md-table-cell>
                <md-table-cell>Ethernet</md-table-cell>
                <md-table-cell>192.168.100.101</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
export default {
    name: 'NetworkInfo'
}
</script>

<style lang="scss" scoped>
</style>
