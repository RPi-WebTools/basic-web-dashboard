import API from '../../api'

const state = {
    tvRemove: false
}

const actions = {
    GET_TV_REMOVE ({ commit }, payload) {
        const url = '/tvspotter/delete/tv'
        API.post(url, payload).then((result) => {
            commit('SET_TV_REMOVE', result.data)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_TV_REMOVE (state, tvRemove) {
        state.tvRemove = tvRemove
    }
}

const getters = {
    tvRemove: state => state.tvRemove
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
