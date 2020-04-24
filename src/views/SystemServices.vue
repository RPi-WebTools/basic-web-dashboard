<template>
    <div class="sysServ">
        <div class="md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item">System services</h1>
            <div class="md-layout-item" style="display: flex; align-items: center;">
                <span style="flex-grow: 1;"></span>
                <md-button class="md-icon-button md-primary">
                    <md-icon :md-src="require('../assets/sync-solid.svg')"></md-icon>
                    <md-tooltip md-direction="bottom">Request new data</md-tooltip>
                </md-button>
                <md-chip class="md-primary">Data from: {{ latestTimestamp }}</md-chip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SysServ',
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
