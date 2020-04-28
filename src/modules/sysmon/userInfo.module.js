import API from '../../api'

const state = {
    userInfo: [{
        num: 0,
        user: '',
        terminal: '',
        loginDate: '',
        loginTime: '',
        ip: '',
        lastCmd: ''
    }]
}

const actions = {
    GET_USER_INFO ({ commit }) {
        const url = '/sysmon/userInfo'
        API.get(url).then((result) => {
            commit('SET_USER_INFO', result.data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_USER_INFO (state, userInfo) {
        state.userInfo = userInfo
    }
}

const getters = {
    userInfo: state => state.userInfo
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
