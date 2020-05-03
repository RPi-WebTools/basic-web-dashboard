<template>
    <v-btn :color="btnColor" text :id="'movie' + item.id" @click="onClick">
        <span v-show="!beenClicked">Add to watchlist</span>
        <v-icon v-show="beenClicked" class="animated" :id="'movie' + item.id + 'check'">fas fa-check</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'TextToIconButton',
    props: {
        item: Object
        // TODO: get list of items in watchlist to set beenClicked of btn to true if id already in watchlist
    },
    data () {
        return {
            btnColor: 'primary',
            beenClicked: false,
            disabled: false
        }
    },
    methods: {
        onClick (event) {
            if (this.beenClicked) {
                return
            }
            this.btnColor = 'success'
            this.beenClicked = true
            const elem = document.querySelector('#movie' + this.item.id + 'check')
            elem.classList.add('bounce')
            this.$emit('clicked', event)
        }
    },
    watch: {
        item (newVal, oldVal) {
            this.btnColor = 'primary'
            this.beenClicked = false
        }
    }
}
</script>
