import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

import HardDrive from '@/custom-icons/HardDrive.vue'
import UsbDrive from '@/custom-icons/UsbDrive.vue'
import TmdbLogoSquare from '@/custom-icons/TmdbLogoSquare.vue'
import TmdbLogo from '@/custom-icons/TmdbLogo.vue'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: colors.orange.base,
                secondary: colors.blueGrey.base,
                accent: colors.blue.base,
                error: colors.red.base,
                warning: colors.amber.base,
                info: colors.indigo.base,
                success: colors.green.base,
                background: colors.grey.darken3
            },
            light: {
                primary: colors.orange.base,
                secondary: colors.blueGrey.base,
                accent: colors.blue.base,
                error: colors.red.base,
                warning: colors.amber.base,
                info: colors.indigo.base,
                success: colors.green.base,
                background: colors.grey.lighten3
            }
        },
        options: {
            customProperties: true
        }
    },
    icons: {
        iconfont: 'fa',
        values: {
            hardDrive: {
                component: HardDrive
            },
            usbDrive: {
                component: UsbDrive
            },
            tmdbLogo: {
                component: TmdbLogo
            },
            tmdbLogoSquare: {
                component: TmdbLogoSquare
            }
        }
    }
})
