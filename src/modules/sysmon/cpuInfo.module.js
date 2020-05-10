import API from '../../api'

const state = {
    cpuInfo: {
        curCpuLoad: 0,
        curCpuTemp: 0
    }
}

const actions = {
    GET_CPU_INFO ({ commit }) {
        const url = '/sysmon/cpuInfo'
        API.get(url).then((result) => {
            var data = {}
            data.curCpuLoad = result.data.curCpuLoad
            data.curCpuTemp = result.data.curCpuTemp

            commit('SET_CPU_INFO', data)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_CPU_INFO (state, cpuInfo) {
        state.cpuInfo = cpuInfo
    }
}

const getters = {
    cpuInfo: state => state.cpuInfo
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
