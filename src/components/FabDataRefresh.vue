<template>
    <v-tooltip left v-model="showFabTooltip" color="accent" :key="this.$vuetify.breakpoint.name">
        <v-btn fixed fab bottom right color="accent" slot="activator" @click="onClick">
            <v-icon>fas fa-sync-alt</v-icon>
        </v-btn>
        <span>Data from: {{ latestTimestamp }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'FabDataRefresh',
    props: {
        latestTimestamp: String
    },
    data: () => {
        return {
            showFabTooltip: true
        }
    },
    methods: {
        onClick (e) {
            this.$emit('click', e)
        }
    }
}
</script>
