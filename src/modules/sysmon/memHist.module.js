import API from '../../api'

const state = {
    memHist: {
        timestamps: [],
        used: [],
        buffered: [],
        cached: [],
        swap: [],
        swapTotal: 1
    }
}

const actions = {
    GET_MEM_HIST ({ commit }) {
        const url = '/sysmon/memHist'
        API.get(url).then((result) => {
            var data = {}
            data.timestamps = result.data.timestamps
            data.used = result.data.used
            data.buffered = result.data.buffered
            data.cached = result.data.cached
            data.swap = result.data.swap
            data.swapTotal = result.data.swapTotal

            commit('SET_MEM_HIST', data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_MEM_HIST (state, memHist) {
        state.memHist = memHist
    }
}

const getters = {
    memHist: state => state.memHist
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
