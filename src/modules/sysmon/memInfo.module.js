import API from '../../api'

const state = {
    memInfo: {
        curMemUsed: 0,
        curMemBuffered: 0,
        curMemCached: 0
    }
}

const actions = {
    GET_MEM_INFO ({ commit }) {
        const url = '/sysmon/memInfo'
        API.get(url).then((result) => {
            var data = {}
            data.curMemUsed = result.data.curMemUsed
            data.curMemBuffered = result.data.curMemBuffered
            data.curMemCached = result.data.curMemCached

            commit('SET_MEM_INFO', data)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_MEM_INFO (state, memInfo) {
        state.memInfo = memInfo
    }
}

const getters = {
    memInfo: state => state.memInfo
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
