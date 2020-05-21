<template>
    <div>
        <p class="headline pl-3 pt-3">Filesystem IO History</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="6" class="pl-0 ml-0">
                    <v-card tile elevation="0" height="100%">
                        <v-card-title class="primary--text">Read operations since startup</v-card-title>
                        <v-card-text>
                            <FsReadHist />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" class="pr-0 mr-0">
                    <v-card tile elevation="0" height="100%">
                        <v-card-title class="primary--text">Write operations since startup</v-card-title>
                        <v-card-text>
                            <FsWriteHist />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import FsReadHist from '@/components/FsReadHist.vue'
import FsWriteHist from '@/components/FsWriteHist.vue'

export default {
    name: 'FsIoHist',
    components: {
        FsReadHist,
        FsWriteHist
    }
}
</script>
