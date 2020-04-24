<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p>There should be data coming your way...watch out!</p>
        <p>{{ testData }}</p>

        <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'About',
    mounted () {
        this.$store.dispatch('SYSSERV/TESTTHING/GET_TEST_DATA')
    },
    computed: {
        ...mapState('SYSSERV/TESTTHING', ['testData'])
    }
}
</script>
