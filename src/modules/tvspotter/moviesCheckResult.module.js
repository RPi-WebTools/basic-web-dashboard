import API from '../../api'

const state = {
    moviesCheckResult: {
        tmdbId: '',
        name: '',
        originalName: '',
        firstRelease: '',
        theatricalRelease: '',
        digitalPhysicalRelease: '',
        poster: '',
        backdrop: '',
        status: -1
    }
}

const actions = {
    GET_MOVIES_CHECK_RESULT ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            const url = '/tvspotter/check/movie'
            API.post(url, payload).then((result) => {
                commit('SET_MOVIES_CHECK_RESULT', result.data)
                resolve(result.data)
            }, (err) => {
                reject(err)
            })
        })
    }
}

const mutations = {
    SET_MOVIES_CHECK_RESULT (state, moviesCheckResult) {
        state.moviesCheckResult = moviesCheckResult
    }
}

const getters = {
    moviesCheckResult: state => state.moviesCheckResult
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
