<template>
        <!-- <md-card v-for="(item, index) in itemList" :key="index" class="item" md-with-hover>
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
        </md-card> -->
    <v-container>
        <v-row v-for="(item, index) in itemList" :key="index">
            <v-col cols="12">
                <v-card>
                    <!-- <v-img :src="item.backdrop" max-height="300"> -->
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title class="headline">{{ item.name }}</v-card-title>
                                <v-card-subtitle>{{ item.firstRelease }}</v-card-subtitle>
                            </div>
                            <v-img max-height="300" max-width="400" :src="item.backdrop" gradient="to right, rgba(33,33,33,1) 0%, transparent 100%"></v-img>
                        </div>
                    <!-- </v-img> -->
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
</style>
