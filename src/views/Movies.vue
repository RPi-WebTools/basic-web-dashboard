<template>
    <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-sheet class="px-2 text-right" color="background" elevation="0">
                    <span>Data obtained from:</span>
                    <v-icon v-text="logo" id="tmdb-logo"></v-icon>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-toolbar color="primary" light>
                    <v-btn icon class="non-clickable"><v-icon>fas fa-search</v-icon></v-btn>
                    <v-toolbar-title>Search for movies to add</v-toolbar-title>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="bordered pa-4">
                    <v-form v-model="validSearch" @submit.prevent="send">
                        <div class="flex-container">
                            <v-text-field
                                v-model="formSearch.search"
                                :rules="searchRules"
                                label="Search"
                                required
                                class="pr-4"
                                style="flex-grow: 1"
                            ></v-text-field>
                            <v-btn outlined color="primary" :disabled="!validSearch || sending" type="submit">
                                Search
                            </v-btn>
                        </div>
                    </v-form>

                    <TVspotterCarousel class="pt-2" :searchList="moviesSearched" @selected="updateLastSelectedMovie"></TVspotterCarousel>
                    <span v-if="moviesPages > 1">*Displaying only result page 1 of {{ moviesPages }}</span>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-toolbar color="primary" light>
                    <v-btn icon class="non-clickable"><v-icon>far fa-eye</v-icon></v-btn>
                    <v-toolbar-title>Watchlist</v-toolbar-title>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="bordered">
                    <p>{{ lastSelectedMovie }}</p>
                    <TVspotterWatchlist :itemList="moviesSearched"></TVspotterWatchlist>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TVspotterCarousel from '@/components/TVspotterCarousel.vue'
import TVspotterWatchlist from '@/components/TVspotterWatchlist.vue'

import { mapState } from 'vuex'

export default {
    name: 'Movies',
    components: {
        TVspotterCarousel,
        TVspotterWatchlist
    },
    data () {
        return {
            logo: '$vuetify.icons.tmdbLogo',
            validSearch: false,
            searchRules: [
                (v) => !!v || 'Please enter a search term'
            ],
            formSearch: {
                search: null
            },
            sending: false,
            lastSelectedMovie: null
        }
    },
    methods: {
        send () {
            this.sending = true
            console.log(this.formSearch.search)
            this.$store.dispatch('TVSPOTTER/MOVIESSEARCHED/GET_MOVIES_SEARCHED', { search: this.formSearch.search })
                .then(() => {
                    this.sending = false
                })
        },
        updateLastSelectedMovie (data) {
            if (data.startsWith('movie')) {
                this.lastSelectedMovie = data.split('movie')[1]
                // TODO: trigger checkMovie?
            }
        }
    },
    computed: {
        ...mapState('TVSPOTTER/MOVIESSEARCHED', ['moviesSearched', 'moviesPages'])
    }
}
</script>

<style lang="scss" scoped>
#tmdb-logo {
    height: 20px;
    width: auto;
    padding-left: 10px;
}

.non-clickable {
    pointer-events: none;
}

.bordered {
    border: 1px solid #ff9800;
}

.flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
</style>
