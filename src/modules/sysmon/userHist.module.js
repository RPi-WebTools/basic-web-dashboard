import API from '../../api'

const state = {
    userHist: {
        timestamps: [],
        users: {}
    }
}

const actions = {
    GET_USER_HIST ({ commit }) {
        const url = '/userHist'
        API.get(url).then((result) => {
            var data = {}
            data.timestamps = result.data.timestamps
            data.users = result.data.users

            commit('SET_USER_HIST', data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_USER_HIST (state, userHist) {
        state.userHist = userHist
    }
}

const getters = {
    userHist: state => state.userHist
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
