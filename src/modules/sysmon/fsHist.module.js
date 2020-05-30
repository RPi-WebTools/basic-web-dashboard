import API from '../../api'

const state = {
    fsHist: []
}

const actions = {
    GET_FS_HIST ({ commit }) {
        return new Promise((resolve, reject) => {
            const url = '/sysmon/fsHist'
            API.get(url).then((result) => {
                commit('SET_FS_HIST', result.data)
                resolve(result.data)
            }, (err) => {
                console.error(err)
                reject(err)
            })
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
