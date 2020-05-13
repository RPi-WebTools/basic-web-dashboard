import API from '../../api'

const state = {
    movieRemove: false
}

const actions = {
    GET_MOVIE_REMOVE ({ commit }, payload) {
        const url = '/tvspotter/delete/movie'
        API.post(url, payload).then((result) => {
            commit('SET_MOVIE_REMOVE', result.data)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_MOVIE_REMOVE (state, movieRemove) {
        state.movieRemove = movieRemove
    }
}

const getters = {
    movieRemove: state => state.movieRemove
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
