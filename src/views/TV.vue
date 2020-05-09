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
                    <v-toolbar-title>Search for TV shows to add</v-toolbar-title>
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

                    <TVspotterCarousel
                        class="pt-2"
                        :searchList="tvSearched"
                        :watchlist="tvWatched"
                        @selected="addShowToWatchlist"
                    ></TVspotterCarousel>
                    <span v-if="tvPages > 1">*Displaying only result page 1 of {{ tvPages }}</span>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-toolbar color="primary" light>
                    <v-btn icon class="non-clickable"><v-icon>far fa-eye</v-icon></v-btn>
                    <v-toolbar-title>Watchlist ({{ tvWatched.length }} Items)</v-toolbar-title>
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="bordered">
                    <TVspotterWatchlist
                        mode="tv"
                        :itemList="tvWatched"
                        :sending="watchlistChecking"
                        :sendingId="watchlistCheckingTmdbId"
                        @checkClicked="checkShowAgain"
                    ></TVspotterWatchlist>
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
    name: 'TV',
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
            watchlistChecking: false,
            watchlistCheckingTmdbId: -1
        }
    },
    methods: {
        sleep (ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },
        send () {
            this.sending = true
            this.$store.dispatch('TVSPOTTER/TVSEARCHED/GET_TV_SEARCHED', { search: this.formSearch.search })
                .then(() => {
                    this.sending = false
                })
        },
        addShowToWatchlist (data) {
            if (data.startsWith('tmdb')) {
                const tmdbId = data.split('tmdb')[1]
                this.$store.dispatch(
                    'TVSPOTTER/TVCHECKRESULT/GET_TV_CHECK_RESULT',
                    {
                        tmdb_id: parseInt(tmdbId),
                        days_range: 10 // TODO: make range editable by user
                    }
                ).then(() => {
                    this.sleep(1000).then(() => { this.$store.dispatch('TVSPOTTER/TVWATCHED/GET_TV_WATCHED') })
                })
            }
        },
        checkShowAgain (data) {
            if (data.startsWith('check')) {
                const tmdbId = data.split('check')[1]
                this.watchlistChecking = true
                this.watchlistCheckingTmdbId = parseInt(tmdbId)
                this.$store.dispatch(
                    'TVSPOTTER/TVCHECKRESULT/GET_TV_CHECK_RESULT',
                    {
                        tmdb_id: parseInt(tmdbId),
                        days_range: 10 // TODO: make range editable by user
                    }
                ).then(() => {
                    this.sleep(1000).then(() => {
                        this.$store.dispatch('TVSPOTTER/TVWATCHED/GET_TV_WATCHED')
                        this.watchlistChecking = false
                        this.watchlistCheckingTmdbId = -1
                    })
                })
            }
        }
    },
    computed: {
        ...mapState('TVSPOTTER/TVSEARCHED', ['tvSearched', 'tvPages']),
        ...mapState('TVSPOTTER/TVCHECKRESULT', ['tvCheckResult']),
        ...mapState('TVSPOTTER/TVWATCHED', ['tvWatched'])
    },
    mounted () {
        this.$store.dispatch('TVSPOTTER/TVWATCHED/GET_TV_WATCHED')
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
