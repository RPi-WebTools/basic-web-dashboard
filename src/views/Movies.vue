<template>
    <div class="movies">
        <div class="md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item">Movies</h1>
            <div class="md-layout-item" style="display: flex; align-items: center;">
                <span style="flex-grow: 1;"></span>
                <span>Data obtained from: </span>
                <img id="tmdb-logo" :src="require('../assets/tmdb-logo.svg')" alt="TMDb">
            </div>
        </div>

        <md-toolbar class="md-primary">
            <md-icon :md-src="require('@/assets/search-solid.svg')"></md-icon>
            <h3 class="md-title" style="flex: 1;">Search for movies to add</h3>
        </md-toolbar>
        <br>

        <div class="bordered">
            <form novalidate @submit.prevent="validateSearch">
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
                <div class="flex-container">
                    <div style="flex-grow: 1">
                    <md-field :class="getValidationClass('search')">
                        <label for="search">Enter search term</label>
                        <md-input name="search" id="search" v-model="form.search" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.search.required">Please enter a search term</span>
                    </md-field>
                    </div>
                    <div>
                    <md-button type="submit" class="md-primary" :disabled="sending">Search</md-button>
                    </div>
                </div>
            </form>

            <TVspotterCarousel :searchList="moviesSearched" @selected="updateLastSelectedMovie"></TVspotterCarousel>
            <br>
            <span v-if="moviesPages > 0">*Displaying only result page 1 of {{ moviesPages }}</span>
        </div>
        <br>

        <md-toolbar class="md-primary">
            <md-icon :md-src="require('@/assets/eye-regular.svg')"></md-icon>
            <h3 class="md-title" style="flex: 1;">Watchlist</h3>
        </md-toolbar>
        <br>

        <div class="bordered">
            <p>{{ lastSelectedMovie }}</p>
            <p>{{ moviesSearched }}</p>
            <TVspotterWatchlist :itemList="moviesSearched"></TVspotterWatchlist>
        </div>
    </div>
</template>

<script>
import TVspotterCarousel from '@/components/TVspotterCarousel.vue'
import TVspotterWatchlist from '@/components/TVspotterWatchlist.vue'

import { validationMixin } from 'vuelidate'
import {
    required
} from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
    name: 'Movies',
    mixins: [validationMixin],
    components: {
        TVspotterCarousel,
        TVspotterWatchlist
    },
    data () {
        return {
            form: {
                search: null
            },
            sending: false,
            lastSelectedMovie: null
        }
    },
    validations: {
        form: {
            search: {
                required
            }
        }
    },
    methods: {
        getValidationClass (fieldName) {
            const field = this.$v.form[fieldName]
            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        send () {
            this.sending = true
            console.log(this.form.search)
            this.$store.dispatch('TVSPOTTER/MOVIESSEARCHED/GET_MOVIES_SEARCHED', { search: this.form.search })
                .then(() => {
                    this.sending = false
                })
        },
        validateSearch () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.send()
            }
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

.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}

.bordered {
    border: 1px solid #ff9800;
    padding: 10px;
}

.flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
</style>
