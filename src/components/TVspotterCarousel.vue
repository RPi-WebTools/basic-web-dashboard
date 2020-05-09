<template>
    <carousel
        :per-page="itemsPerPage"
        :navigation-enabled="true"
        :paginationActiveColor="$vuetify.theme.themes[theme].primary"
        :paginationColor="$vuetify.theme.themes[theme].secondary"
        navigationNextLabel="<div class='navvy rightnav'>▶︎</div>"
        navigationPrevLabel="<div class='navvy leftnav'>◀︎</div>"
        class="carousel"
    >
        <slide v-for="(item, index) in searchList" :key="index">
            <v-hover v-slot:default="{ hover }">
                <v-card max-width="200">
                    <v-img height="300px" :src="item.poster">
                        <v-expand-transition>
                            <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out primary v-card--reveal black--text text-center"
                                style="height: 100%;"
                            >
                                {{ item.name }}
                            </div>
                        </v-expand-transition>
                    </v-img>
                    <v-card-subtitle class="pb-0">{{ item.firstRelease }}</v-card-subtitle>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <TextToIconButton :item="item" :watchlist="watchlist" @clicked="onSelect"></TextToIconButton>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import TextToIconButton from '@/components/TextToIconButton.vue'

export default {
    name: 'TVspotterCarousel',
    props: {
        searchList: Array,
        watchlist: Array
    },
    components: {
        Carousel,
        Slide,
        TextToIconButton
    },
    methods: {
        onSelect (event) {
            this.$emit('selected', event.currentTarget.id)
        }
    },
    computed: {
        theme () {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        },
        itemsPerPage () {
            const curBp = this.$vuetify.breakpoint.name
            let items = 0
            switch (curBp) {
                case 'xl':
                    items = 6
                    break
                case 'lg':
                    items = 4
                    break
                case 'md':
                    items = 3
                    break
                case 'sm':
                    items = 2
                    break
                case 'xs':
                    items = 1
                    break
                default:
                    items = 1
                    break
            }
            return items
        }
    }
}
</script>

<style lang="scss">
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .75;
    position: absolute;
    width: 100%;
}

.text-shadow {
    text-shadow: -2px -2px black,
                -2px -1.5px black,
                -2px -1px black,
                -2px -0.5px black,
                -2px 0px black,
                -2px 0.5px black,
                -2px 1px black,
                -2px 1.5px black,
                -2px 2px black,
                -1.5px 2px black,
                -1px 2px black,
                -0.5px 2px black,
                0px 2px black,
                0.5px 2px black,
                1px 2px black,
                1.5px 2px black,
                2px 2px black,
                2px 1.5px black,
                2px 1px black,
                2px 0.5px black,
                2px 0px black,
                2px -0.5px black,
                2px -1px black,
                2px -1.5px black,
                2px -2px black,
                1.5px -2px black,
                1px -2px black,
                0.5px -2px black,
                0px -2px black,
                -0.5px -2px black,
                -1px -2px black,
                -1.5px -2px black;
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
        color: var(--v-primary-base);
        &:hover {
            color: var(--v-primary-lighten1);
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
