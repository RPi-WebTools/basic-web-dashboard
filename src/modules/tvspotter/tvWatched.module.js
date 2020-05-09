import API from '../../api'

const state = {
    tvWatched: []
}

const actions = {
    GET_TV_WATCHED ({ commit }) {
        return new Promise((resolve, reject) => {
            const url = '/tvspotter/load/watched/tv'
            API.get(url).then((result) => {
                commit('SET_TV_WATCHED', result.data)
                resolve(result.data)
            }, (err) => {
                reject(err)
            })
        })
    }
}

const mutations = {
    SET_TV_WATCHED (state, tvWatched) {
        state.tvWatched = tvWatched
    }
}

const getters = {
    tvWatched: state => state.tvWatched
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
