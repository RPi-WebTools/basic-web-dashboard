<template>
     <v-container fluid class="py-0">
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <p class="headline pl-3 pt-3">About</p>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12">
                                <p>Made by RPi-WebTools 2020, maintained by Viperinius.</p>
                                <p>
                                    This project can be found
                                    <v-btn text small color="primary" class="ma-0 pa-0" href="https://github.com/RPi-WebTools/basic-web-dashboard" target="_blank">
                                        on Github
                                    </v-btn>
                                    . Backend is handled by an Express.js server, which is also versioned
                                    <v-btn text small color="primary" class="ma-0 pa-0" href="https://github.com/RPi-WebTools/express-server" target="_blank">
                                        on Github
                                    </v-btn>
                                    .
                                </p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <p></p>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="px-2 pb-3 pt-1" tile>
                    <p class="headline pl-3 pt-3">License stuff</p>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12">
                                <p>
                                    This project uses FontAwesome icons.
                                    <v-btn text small color="primary" class="ml-1" href="https://fontawesome.com/license" target="_blank">
                                        License
                                    </v-btn>
                                </p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <p>
                                    This product uses the TMDb API but is not endorsed or certified by TMDb.
                                    <v-btn text small color="primary" class="ml-1" href="https://www.themoviedb.org/" target="_blank">
                                        Link
                                    </v-btn>
                                </p>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'About'
}
</script>
