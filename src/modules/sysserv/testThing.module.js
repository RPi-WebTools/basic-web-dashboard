import API from '../../api'

const state = {
    testData: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: ''
    }
}

const actions = {
    GET_TEST_DATA ({ commit }) {
        const url = '/sysserv/testData'
        API.get(url).then((result) => {
            var data = {}
            data.a = result.data.a
            data.b = result.data.b
            data.c = result.data.c
            data.d = result.data.d
            data.e = result.data.e
            data.f = result.data.f
            data.g = result.data.g
            data.h = result.data.h
            data.i = result.data.i
            data.j = result.data.j

            commit('SET_TEST_DATA', data)
        }, (err) => {
            console.error(err)
        })
    }
}

const mutations = {
    SET_TEST_DATA (state, testData) {
        state.testData = testData
    }
}

const getters = {
    testData: state => state.testData
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
