import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import memHist from '../../src/modules/sysmon/memHist.module'

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
                        used: [1, 2, 3],
                        buffered: [1, 2, 3],
                        cached: [1, 2, 3],
                        swap: [1, 2, 3],
                        swapTotal: 2
                    }
                })
            })
        }
    }
}))

describe('memHist', () => {
    let store

    const defaultState = {
        timestamps: [],
        used: [],
        buffered: [],
        cached: [],
        swap: [],
        swapTotal: 1
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(memHist))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.memHist).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.memHist).toEqual(defaultState)
        store.commit('SET_MEM_HIST', {
            timestamps: [1, 2, 3],
            used: [1, 2, 3],
            buffered: [1, 2, 3],
            cached: [1, 2, 3],
            swap: [1, 2, 3],
            swapTotal: 2
        })
        expect(store.state.memHist).toEqual({
            timestamps: [1, 2, 3],
            used: [1, 2, 3],
            buffered: [1, 2, 3],
            cached: [1, 2, 3],
            swap: [1, 2, 3],
            swapTotal: 2
        })
    })

    it('has a working getter', () => {
        expect(store.getters.memHist).toEqual(defaultState)
        store.state.memHist = {
            timestamps: [1, 2, 3],
            used: [1, 2, 3],
            buffered: [1, 2, 3],
            cached: [1, 2, 3],
            swap: [1, 2, 3],
            swapTotal: 2
        }
        expect(store.getters.memHist).toEqual({
            timestamps: [1, 2, 3],
            used: [1, 2, 3],
            buffered: [1, 2, 3],
            cached: [1, 2, 3],
            swap: [1, 2, 3],
            swapTotal: 2
        })
    })

    it('has a working action', async () => {
        expect(store.state.memHist).toEqual(defaultState)

        await store.dispatch('GET_MEM_HIST')

        expect(url).toBe('/sysmon/memHist')
        expect(store.state.memHist).toEqual({
            timestamps: [1, 2, 3],
            used: [1, 2, 3],
            buffered: [1, 2, 3],
            cached: [1, 2, 3],
            swap: [1, 2, 3],
            swapTotal: 2
        })
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_MEM_HIST')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
