<template>
    <div class="tv">
        <div class="md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item">TV</h1>
            <div class="md-layout-item" style="display: flex; align-items: center;">
                <span style="flex-grow: 1;"></span>
                <span>Data obtained from: </span>
                <img id="tmdb-logo" :src="require('../assets/tmdb-logo.svg')" alt="TMDb">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TV',
    data () {
        return {
            latestTimestamp: '07.03.20 13:00'
        }
    }
}
</script>

<style lang="scss" scoped>
#tmdb-logo {
    height: 20px;
    width: auto;
    padding-left: 10px;
}
</style>
