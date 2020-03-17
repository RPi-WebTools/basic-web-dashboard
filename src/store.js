import Vue from 'vue'
import Vuex from 'vuex'

// import sysmon from './modules/sysmon'
import API from './api'

Vue.use(Vuex)

export default new Vuex.Store({
    /* modules: {
        sysmon
    } */
    state: {
        devInfo: {
            manufacturer: '',
            model: '',
            version: '',
            cpuManufacturer: '',
            cpuCores: '',
            memory: '',
            osDistro: '',
            osCode: '',
            osHostname: '',
            uptime: ''
        },
        fsInfo: []
    },
    actions: {
        GET_DEV_INFO ({ commit }) {
            const url = '/deviceInfo'
            API.get(url).then((result) => {
                var data = {}
                data.manufacturer = result.data.manufacturer
                data.model = result.data.model
                data.version = result.data.version
                data.cpuManufacturer = result.data.cpuManufacturer
                data.cpuCores = result.data.cpuCores
                data.memory = result.data.memory
                data.osDistro = result.data.osDistro
                data.osCode = result.data.osCode
                data.osHostname = result.data.osHostname
                data.uptime = result.data.uptime

                commit('SET_DEV_INFO', data)
            }, (err) => {
                console.log(err)
            })
        },
        GET_FS_INFO ({ commit }) {
            const url = '/fsInfo'
            API.get(url).then((result) => {
                commit('SET_FS_INFO', result.data)
            }, (err) => {
                console.log(err)
            })
        }
    },
    mutations: {
        SET_DEV_INFO (state, devInfo) {
            state.devInfo = devInfo
        },
        SET_FS_INFO (state, fsInfo) {
            state.fsInfo = fsInfo
        }
    },
    getters: {
        devInfo: state => state.devInfo,
        fsInfo: state => state.fsInfo
    }
})
