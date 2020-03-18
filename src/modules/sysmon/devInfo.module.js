import API from '../../api'

const state = {
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
    }
}

const actions = {
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
    }
}

const mutations = {
    SET_DEV_INFO (state, devInfo) {
        state.devInfo = devInfo
    }
}

const getters = {
    devInfo: state => state.devInfo
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
