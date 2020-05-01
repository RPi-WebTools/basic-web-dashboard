import API from '../../api'

const state = {
    netInfo: [{
        num: 0,
        iface: '',
        ip: '',
        mac: '',
        type: '',
        speed: '',
        dhcp: '',
        rx: 0,
        tx: 0
    }]
}

const actions = {
    GET_NET_INFO ({ commit }) {
        const url = '/sysmon/netInfo'
        API.get(url).then((result) => {
            commit('SET_NET_INFO', result.data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_NET_INFO (state, netInfo) {
        state.netInfo = netInfo
    }
}

const getters = {
    netInfo: state => state.netInfo
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
