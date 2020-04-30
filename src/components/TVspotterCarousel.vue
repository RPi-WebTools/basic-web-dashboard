<template>
    <carousel
        :per-page="itemsPerPage"
        :navigation-enabled="true"
        :paginationActiveColor="'#ff9800'"
        navigationNextLabel="<div class='navvy rightnav'>▶︎</div>"
        navigationPrevLabel="<div class='navvy leftnav'>◀︎</div>"
        class="carousel"
    >
        <slide v-for="(item, index) in searchList" :key="index">
            <v-card max-width="200">
                <v-img class="primary--text align-end" height="300px" :src="item.poster">
                    <v-card-title class="text-shadow">{{ item.name }}</v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">{{ item.firstRelease }}</v-card-subtitle>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <TextToIconButton :item="item" @clicked="onSelect"></TextToIconButton>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import TextToIconButton from '@/components/TextToIconButton.vue'

export default {
    name: 'TVspotterCarousel',
    props: {
        searchList: Array
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
