import API from '../../api'

const state = {
    moviesSearched: [],
    moviesPages: 0
}

const actions = {
    GET_MOVIES_SEARCHED ({ commit }, payload) {
        const url = '/tvspotter/search/movie'
        API.post(url, payload).then((result) => {
            commit('SET_MOVIES_SEARCHED', result.data.items)
            commit('SET_MOVIES_PAGES', result.data.pages)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_MOVIES_SEARCHED (state, moviesSearched) {
        state.moviesSearched = moviesSearched
    },
    SET_MOVIES_PAGES (state, moviesPages) {
        state.moviesPages = moviesPages
    }
}

const getters = {
    moviesSearched: state => state.moviesSearched,
    moviesPages: state => state.moviesPages
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
