import API from '../../api'

const state = {
    fsIoHist: []
}

const actions = {
    GET_FS_IO_HIST ({ commit }) {
        const url = '/sysmon/fsIoHist'
        API.get(url).then((result) => {
            commit('SET_FS_IO_HIST', result.data)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_FS_IO_HIST (state, fsIoHist) {
        state.fsIoHist = fsIoHist
    }
}

const getters = {
    fsIoHist: state => state.fsIoHist
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
