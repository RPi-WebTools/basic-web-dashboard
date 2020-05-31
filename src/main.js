import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import API from './api'
import vuetify from './plugins/vuetify'
import moment from 'moment'

moment.locale('de')

Vue.prototype.$http = API
Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
