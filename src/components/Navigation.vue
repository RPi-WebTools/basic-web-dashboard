<template>
    <div :class="[{'collapsed' : collapsed}]">
        <h2>Nav Bar</h2>
        <nav>
            <router-link class="spacing" v-for="routes in links" v-bind:key="routes.id" :to="`${routes.page}`">{{routes.text}}</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
    data() {
        return {
            links: [
                {
                    id: 0,
                    text: 'Home',
                    page: '/'
                },
                {
                    id: 1,
                    text: 'About',
                    page: '/about'
                },
                {
                    id: 2,
                    text: 'Contact',
                    page: '/contact'
                }
            ]
        }
    }
}
</script>

<style>
    .spacing {
        margin-right: 5px;
        margin-left: 5px;
    }
</style>
