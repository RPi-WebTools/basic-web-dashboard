<template>
    <carousel
        :per-page="6"
        :navigation-enabled="true"
        :paginationActiveColor="'#ff9800'"
        navigationNextLabel="<div class='navvy rightnav'>▶︎</div>"
        navigationPrevLabel="<div class='navvy leftnav'>◀︎</div>"
        class="carousel"
    >
        <slide v-for="(item, index) in searchList" :key="index">
            <md-card class="slide-card">
                <md-card-media-cover md-solid>
                    <md-card-media>
                        <img v-if="!item.poster.endsWith('.svg')" :src="item.poster" alt="Poster" class="slide-image">
                        <img v-else :src="require('@/assets/no-poster.png')" alt="Poster missing" class="slide-image">
                    </md-card-media>

                    <md-card-area>
                        <md-card-header>
                            <span class="md-title">{{ item.name }}</span>
                            <span class="md-subhead">{{ item.firstRelease }}</span>
                        </md-card-header>

                        <md-card-actions>
                            <md-button :id="'movie' + item.id" @click="onSelect">Add to watchlist</md-button>
                        </md-card-actions>
                    </md-card-area>
                </md-card-media-cover>
            </md-card>
        </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
    name: 'TVspotterCarousel',
    props: {
        searchList: Array
    },
    components: {
        Carousel,
        Slide
    },
    methods: {
        onSelect (event) {
            this.$emit('selected', event.currentTarget.id)
        }
    }
}
</script>

<style lang="scss">
.slide-card {
    max-width: 200px;
    max-height: 300px;
}

.slide-image {
    max-width: 200px;
    max-height: 300px;
    opacity: 0.5;
}

.carousel {
    padding-left: 30px;
    padding-right: 30px;
}

.VueCarousel-navigation button.VueCarousel-navigation-button.VueCarousel-navigation-next,
.VueCarousel-navigation button.VueCarousel-navigation-button.VueCarousel-navigation-prev {
    &:focus {
        outline: none;
    }
    .navvy {
        font-size: 1.75em;
        cursor: pointer;
        color: white;
        &:hover {
            color: #ff9800;
        }
        &.leftnav {
            transform: translateY(0%) translateX(130%);
        }
        &.rightnav {
            transform: translateY(0%) translateX(-130%);
        }
    }
}

.VueCarousel-pagination .VueCarousel-dot-container button.VueCarousel-dot {
    &:focus {
        outline: none;
    }
}
</style>
