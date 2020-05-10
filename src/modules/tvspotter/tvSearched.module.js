import API from '../../api'

const state = {
    tvSearched: [],
    tvPages: 0
}

const actions = {
    GET_TV_SEARCHED ({ commit }, payload) {
        const url = '/tvspotter/search/tv'
        API.post(url, payload).then((result) => {
            commit('SET_TV_SEARCHED', result.data.items)
            commit('SET_TV_PAGES', result.data.pages)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_TV_SEARCHED (state, tvSearched) {
        state.tvSearched = tvSearched
    },
    SET_TV_PAGES (state, tvPages) {
        state.tvPages = tvPages
    }
}

const getters = {
    tvSearched: state => state.tvSearched,
    tvPages: state => state.tvPages
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
