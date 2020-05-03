<template>
    <div>
        <p class="headline pl-3 pt-3">Filesystem Info</p>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <v-data-table :headers="headers" :items="fsInfo" :items-per-page="-1" class="elevation-0" single-select>
                        <template v-slot:body="{ items }">
                            <tbody>
                                <tr
                                    v-for="(item, index) in items"
                                    :key="index"
                                    @click="onSelect(item)"
                                    :class="{ 'selectedRow': item === selectedItem }"
                                    style="cursor: pointer;"
                                >
                                    <td>{{ item.num }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.label }}</td>
                                    <td>{{ item.fsType }}</td>
                                    <td>{{ item.mount }}</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="width: 30px; border: 0;">
                                                    <v-icon>fas fa-hdd</v-icon>
                                                </td>
                                                <td style="border: 0; padding-left: 5px;">
                                                    <v-tooltip bottom color="primary">
                                                        <template v-slot:activator="{ on }">
                                                            <v-progress-linear :value="item.usedPercentage" height="10" v-on="on"></v-progress-linear>
                                                        </template>
                                                        <span>{{ (+item.usedPercentage.toFixed(2) + ' % used') }}</span>
                                                    </v-tooltip>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>{{ item.uuid }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'FsInfo',
    data () {
        return {
            headers: [
                { text: 'No.', value: 'num' },
                { text: 'Name', value: 'name' },
                { text: 'Label', value: 'label' },
                { text: 'FS Type', value: 'fsType' },
                { text: 'Mounted at', value: 'mount' },
                { text: 'Usage', value: 'usedPercentage' },
                { text: 'UUID', value: 'uuid' }
            ],
            selectedItem: null
        }
    },
    methods: {
        onSelect (item) {
            if (this.selectedItem === item) {
                this.selectedItem = null
                this.$emit('selected', null)
            } else {
                this.selectedItem = item
                this.$emit('selected', item)
            }
        }
    },
    mounted () {
        this.$store.dispatch('SYSMON/FSINFO/GET_FS_INFO')
        this.$store.dispatch('SYSMON/FSHIST/GET_FS_HIST')
    },
    computed: {
        ...mapState('SYSMON/FSINFO', ['fsInfo'])
    }
}
</script>

<style scoped>
.selectedRow {
    background-color: var(--v-background-base);
}
</style>
