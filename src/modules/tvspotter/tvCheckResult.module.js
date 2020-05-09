import API from '../../api'

const state = {
    tvCheckResult: {
        tmdbId: '',
        name: '',
        originalName: '',
        firstRelease: '',
        nextRelease: '',
        nextEpisode: '',
        poster: '',
        backdrop: '',
        status: -1
    }
}

const actions = {
    GET_TV_CHECK_RESULT ({ commit }, payload) {
        return new Promise((resolve, reject) => {
            const url = '/tvspotter/check/tv'
            API.post(url, payload).then((result) => {
                commit('SET_TV_CHECK_RESULT', result.data)
                resolve(result.data)
            }, (err) => {
                reject(err)
            })
        })
    }
}

const mutations = {
    SET_TV_CHECK_RESULT (state, tvCheckResult) {
        state.tvCheckResult = tvCheckResult
    }
}

const getters = {
    tvCheckResult: state => state.tvCheckResult
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
