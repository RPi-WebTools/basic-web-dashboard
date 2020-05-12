<template>
    <v-container>
        <v-row justify="center" align="center" align-content="center">
            <v-img class="my-12" contain max-width="100" max-height="100" src="@/assets/rpi-webtools-border.png"/>
        </v-row>
        <v-row justify="center" align="center" align-content="center">
            <v-col>
                <p class="display-4 font-weight-thin text-center">404</p>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" align-content="center">
            <p class="display-1 text-center">You found a path that does not exist. Congratulations!</p>
        </v-row>
        <v-row justify="center" align="center" align-content="center">
            <v-col>
                <p class="title font-weight-medium text-center">You deserve a reward...here, have a cookie! <v-icon class="justify-center">fas fa-cookie-bite</v-icon></p>
            </v-col>
        </v-row>
        <v-spacer />
        <v-row justify="center" align="center" align-content="center" class="mt-10">
            <v-btn color="accent" :to="{ name: 'Home' }">Back to Home</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PageNotFound'
}
</script>
