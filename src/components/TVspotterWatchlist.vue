<template>
    <div class="wrapper">
        <md-card v-for="(item, index) in itemList" :key="index" class="item" md-with-hover>
            <md-card-media-cover md-solid>
                <md-card-media>
                    <img v-if="!item.backdrop.endsWith('.svg')" :src="item.backdrop" alt="Backdrop" class="card-image">
                    <img v-else :src="require('@/assets/no-poster.png')" alt="Backdrop missing" class="card-image">
                </md-card-media>

                <md-card-area>
                    <md-card-header>
                        <span class="md-title">{{ item.name }}</span>
                        <span class="md-subhead">{{ item.firstRelease }}</span>
                    </md-card-header>

                    <md-card-actions>
                        <md-button :id="'movie' + item.id">Add to watchlist</md-button>
                    </md-card-actions>
                </md-card-area>
            </md-card-media-cover>
        </md-card>
    </div>
</template>

<script>
export default {
    name: 'TVspotterWatchlist',
    props: {
        itemList: Array
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
}

.item {
    margin: 5px;
    max-height: 300px;
}

.card-image {
    max-width: 100%;
    height: 300px;
    opacity: 0.5;
}
</style>
