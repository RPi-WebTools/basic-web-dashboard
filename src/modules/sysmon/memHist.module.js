import API from '../../api'

const state = {
    memHist: {
        timestamps: [],
        used: [],
        buffered: [],
        cached: [],
        free: [],
        swap: []
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
            data.free = []
            data.swap = result.data.swap

            let curUsage = 0
            for (const [i, val] of data.used.entries()) {
                curUsage = val + data.buffered[i] + data.cached[i]
                data.free.push(100 - curUsage)
            }

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
