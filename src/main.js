import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import axios from 'axios'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.material.locale.firstDayOfAWeek = 1

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
