<template>
    <div class="home">
        <h1>Home</h1>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <network-usage/>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <network-info/>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import NetworkUsage from '@/components/NetworkUsage.vue'
import NetworkInfo from '@/components/NetworkInfo.vue'

export default {
    name: 'Home',
    components: {
        NetworkUsage,
        NetworkInfo
    }
}
</script>
