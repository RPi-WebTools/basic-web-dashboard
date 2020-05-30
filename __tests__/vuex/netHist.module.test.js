import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import netHist from '../../src/modules/sysmon/netHist.module'

let url = ''
let mockReject = false

jest.mock('../../src/api', () => ({
    __esModule: true,
    default: {
        get: (_url) => {
            return new Promise((resolve, reject) => {
                if (mockReject) reject()

                url = _url
                resolve({
                    data: {
                        timestamps: [1, 2, 3],
                        rx: [1, 2, 3],
                        tx: [1, 2, 3]
                    }
                })
            })
        }
    }
}))

describe('netHist', () => {
    let store

    const defaultState = {
        timestamps: [],
        rx: [],
        tx: []
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(netHist))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.netHist).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.netHist).toEqual(defaultState)
        store.commit('SET_NET_HIST', {
            timestamps: [1, 2, 3],
            rx: [1, 2, 3],
            tx: [1, 2, 3]
        })
        expect(store.state.netHist).toEqual({
            timestamps: [1, 2, 3],
            rx: [1, 2, 3],
            tx: [1, 2, 3]
        })
    })

    it('has a working getter', () => {
        expect(store.getters.netHist).toEqual(defaultState)
        store.state.netHist = {
            timestamps: [1, 2, 3],
            rx: [1, 2, 3],
            tx: [1, 2, 3]
        }
        expect(store.getters.netHist).toEqual({
            timestamps: [1, 2, 3],
            rx: [1, 2, 3],
            tx: [1, 2, 3]
        })
    })

    it('has a working action', async () => {
        expect(store.state.netHist).toEqual(defaultState)

        await store.dispatch('GET_NET_HIST')

        expect(url).toBe('/sysmon/netHist')
        expect(store.state.netHist).toEqual({
            timestamps: [1, 2, 3],
            rx: [1, 2, 3],
            tx: [1, 2, 3]
        })
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_NET_HIST')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
