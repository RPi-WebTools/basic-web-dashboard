import API from '../../gitea-api'

const state = {
    version: ''
}

const actions = {
    GET_VERSION ({ commit }) {
        const url = '/version'
        API.get(url).then((result) => {
            commit('SET_VERSION', result.data.version)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_VERSION (state, version) {
        state.version = version
    }
}

const getters = {
    version: state => state.version
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
