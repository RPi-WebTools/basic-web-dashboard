import API from '../../api'

const state = {
    cpuHist: {
        timestamps: [],
        usage: [],
        temperature: []
    }
}

const actions = {
    GET_CPU_HIST ({ commit }) {
        const url = '/cpuHist'
        API.get(url).then((result) => {
            var data = {}
            data.timestamps = result.data.timestamps
            data.usage = result.data.usage
            data.temperature = result.data.temperature

            commit('SET_CPU_HIST', data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_CPU_HIST (state, cpuHist) {
        state.cpuHist = cpuHist
    }
}

const getters = {
    cpuHist: state => state.cpuHist
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
