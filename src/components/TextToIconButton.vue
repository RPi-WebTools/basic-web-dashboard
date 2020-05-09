<template>
    <v-btn :color="btnColor" text :id="'tmdb' + item.id" @click="onClick">
        <span v-show="!beenClicked">Add to watchlist</span>
        <v-icon v-show="beenClicked" class="animated" :id="'tmdb' + item.id + 'check'">fas fa-check</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'TextToIconButton',
    props: {
        item: Object,
        watchlist: Array
    },
    data () {
        return {
            btnColor: this.initialVals().btnColor,
            beenClicked: this.initialVals().beenClicked
        }
    },
    methods: {
        onClick (event) {
            if (this.beenClicked) {
                return
            }
            this.btnColor = 'success'
            this.beenClicked = true
            const elem = document.querySelector('#tmdb' + this.item.id + 'check')
            elem.classList.add('bounce')
            this.$emit('clicked', event)
        },
        initialVals () {
            const result = {
                btnColor: 'primary',
                beenClicked: false
            }
            if (this.watchlist.filter(obj => obj.tmdbId === this.item.id).length > 0) {
                result.btnColor = 'success'
                result.beenClicked = true
            }
            return result
        }
    },
    watch: {
        item (newVal, oldVal) {
            this.btnColor = 'primary'
            this.beenClicked = false
            if (this.watchlist.filter(obj => obj.tmdbId === newVal.id).length > 0) {
                this.btnColor = 'success'
                this.beenClicked = true
            }
        }
    }
}
</script>
