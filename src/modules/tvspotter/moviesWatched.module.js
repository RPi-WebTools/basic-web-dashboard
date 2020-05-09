import API from '../../api'

const state = {
    moviesWatched: []
}

const actions = {
    GET_MOVIES_WATCHED ({ commit }) {
        return new Promise((resolve, reject) => {
            const url = '/tvspotter/load/watched/movie'
            API.get(url).then((result) => {
                commit('SET_MOVIES_WATCHED', result.data)
                resolve(result.data)
            }, (err) => {
                reject(err)
            })
        })
    }
}

const mutations = {
    SET_MOVIES_WATCHED (state, moviesWatched) {
        state.moviesWatched = moviesWatched
    }
}

const getters = {
    moviesWatched: state => state.moviesWatched
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
