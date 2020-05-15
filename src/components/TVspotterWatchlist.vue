<template>
    <v-container fluid class="py-0">
        <v-row v-for="(item, index) in itemList" :key="index">
            <v-col cols="12">
                <v-card width="100%" @mouseover="startHover(item.tmdbId)" @mouseleave="endHover()">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title class="headline">
                                {{ item.name }}
                                <v-spacer/>
                                <v-btn
                                    fab
                                    x-small
                                    color="error"
                                    v-show="item.tmdbId === idHovered"
                                    elevation="1"
                                    @click="removeItem(item.tmdbId)"
                                    :loading="removing"
                                >
                                    <v-icon>fas fa-times</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-subtitle>Original name: {{ item.originalName }}</v-card-subtitle>

                            <v-card-text>
                                <span class="title font-italic">Releases:</span>
                                <div v-if="mode === 'movie'" class="mt-2 d-flex justify-space-between">
                                    <div style="width: 110px;">Theatrical:</div>
                                    <v-chip>{{ item.theatricalRelease }}</v-chip>
                                </div>
                                <div v-if="mode === 'movie'" class="mt-2 d-flex justify-space-between">
                                    <div style="width: 110px;">Digital / Physical:</div>
                                    <v-chip v-if="item.digitalPhysicalRelease !== ''">{{ item.digitalPhysicalRelease }}</v-chip>
                                    <v-chip v-else>Unknown</v-chip>
                                </div>
                                <div v-if="mode === 'tv'" class="mt-2 d-flex justify-space-between">
                                    <div style="width: 110px;">Next Release:</div>
                                    <v-chip v-if="item.nextRelease !== ''">{{ item.nextRelease }}</v-chip>
                                    <v-chip v-else>Unknown</v-chip>
                                </div>
                                <div v-if="mode === 'tv'" class="mt-2 d-flex justify-space-between">
                                    <div style="width: 110px;">Next Episode:</div>
                                    <v-chip v-if="item.nextEpisode !== ''">{{ item.nextEpisode }}</v-chip>
                                    <v-chip v-else>Unknown</v-chip>
                                </div>
                                <v-alert
                                    dense
                                    text
                                    :color="getStatusColor(item.status)"
                                    class="mt-2 mb-0 py-0"
                                >
                                    <v-row align="center">
                                        <v-col class="grow">
                                            {{ decodeStatus(item.status) }}
                                        </v-col>
                                        <v-col class="shrink">
                                            <v-btn
                                                outlined
                                                small
                                                :color="getStatusColor(item.status)"
                                                :id="'check' + item.tmdbId"
                                                :loading="sendingId === item.tmdbId"
                                                :disabled="sending"
                                                @click="checkAgain"
                                            >
                                                Check again
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-alert>
                            </v-card-text>
                        </div>
                        <v-img v-if="breakPointMinSm" max-height="300" max-width="400" :src="item.backdrop" gradient="to right, rgba(33,33,33,1) 0%, transparent 100%"></v-img>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'TVspotterWatchlist',
    props: {
        mode: String,
        itemList: Array,
        sending: Boolean,
        sendingId: Number,
        removing: Boolean
    },
    data () {
        return {
            idHovered: null
        }
    },
    computed: {
        breakPointMinSm () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xl':
                case 'lg':
                case 'md':
                case 'sm':
                    return true
                case 'xs':
                default:
                    return false
            }
        },
        getCardTextWidth () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xl':
                case 'lg':
                    return '780px'
                case 'md':
                case 'sm':
                case 'xs':
                default:
                    return '320px'
            }
        }
    },
    methods: {
        decodeStatus (status) {
            let decoded = 'None found.'
            const statusLen = status.toString().length
            switch (true) {
                case status === -1:
                    break
                case status === 0:
                    decoded = 'This show has ended.'
                    break
                case status === 10:
                    decoded = 'An episode has been released!'
                    break
                case /^20([0-9]+)/.test(status):
                    // 20x (x=difference)
                    decoded = 'An episode is coming in the next ' + (status - 20 * 10 ** (statusLen - 2)) + ' days!'
                    break
                case /^30([0-9]+)/.test(status):
                    // 30x (x=difference)
                    decoded = 'Nothing within the next ' + (status - 30 * 10 ** (statusLen - 2)) + ' days.'
                    break
                case status === 11:
                    decoded = 'Theatrical has been released!'
                    break
                case status === 12:
                    decoded = 'Digital or Physical has been released!'
                    break
                case /^21([0-9]+)/.test(status):
                    // 21x (x=difference)
                    decoded = 'Theatrical is coming in the next ' + (status - 21 * 10 ** (statusLen - 2)) + ' days!'
                    break
                case /^22([0-9]+)/.test(status):
                    // 22x (x=difference)
                    decoded = 'Digital or Physical is coming in the next ' + (status - 22 * 10 ** (statusLen - 2)) + ' days!'
                    break
                case /^31([0-9]+)/.test(status):
                    // 31x (x=difference)
                    decoded = 'Theatrical not within the next ' + (status - 31 * 10 ** (statusLen - 2)) + ' days.'
                    break
                case /^32([0-9]+)/.test(status):
                    // 32x (x=difference)
                    decoded = 'Digital or Physical not within the next ' + (status - 32 * 10 ** (statusLen - 2)) + ' days!'
                    break
                default:
                    break
            }
            return decoded
        },
        getStatusColor (status) {
            switch (true) {
                case status === -1:
                case status === 0:
                    return 'accent'
                case status === 10:
                case status === 11:
                case status === 12:
                    return 'success'
                case /^20([0-9]+)/.test(status):
                case /^21([0-9]+)/.test(status):
                case /^22([0-9]+)/.test(status):
                    return 'warning'
                case /^30([0-9]+)/.test(status):
                case /^31([0-9]+)/.test(status):
                case /^32([0-9]+)/.test(status):
                    return 'error'
                default:
                    return 'accent'
            }
        },
        checkAgain (event) {
            this.$emit('checkClicked', event.currentTarget.id)
        },
        startHover (id) {
            this.idHovered = id
        },
        endHover () {
            this.idHovered = null
        },
        removeItem (id) {
            this.$emit('removeClicked', id)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
