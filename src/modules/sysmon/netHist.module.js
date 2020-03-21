import API from '../../api'

const state = {
    netHist: {
        timestamps: [],
        rx: [],
        tx: []
    }
}

const actions = {
    GET_NET_HIST ({ commit }) {
        const url = '/sysmon/netHist'
        API.get(url).then((result) => {
            var data = {}
            data.timestamps = result.data.timestamps
            data.rx = result.data.rx
            data.tx = result.data.tx

            commit('SET_NET_HIST', data)
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_NET_HIST (state, netHist) {
        state.netHist = netHist
    }
}

const getters = {
    netHist: state => state.netHist
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
