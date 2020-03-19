import API from '../../api'

const state = {
    fsHist: []
}

const actions = {
    GET_FS_HIST ({ commit }) {
        const url = '/fsHist'
        API.get(url).then((result) => {
            commit('SET_FS_HIST', result.data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_FS_HIST (state, fsHist) {
        state.fsHist = fsHist
    }
}

const getters = {
    fsHist: state => state.fsHist,
    fsHistByUuid: state => uuid => {
        return state.fsHist.filter((item) => {
            return item.uuid === uuid
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
