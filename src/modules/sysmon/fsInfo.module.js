import API from '../../api'

const state = {
    fsInfo: []
}

const actions = {
    GET_FS_INFO ({ commit }) {
        const url = '/fsInfo'
        API.get(url).then((result) => {
            commit('SET_FS_INFO', result.data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_FS_INFO (state, fsInfo) {
        state.fsInfo = fsInfo
    }
}

const getters = {
    fsInfo: state => state.fsInfo
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
