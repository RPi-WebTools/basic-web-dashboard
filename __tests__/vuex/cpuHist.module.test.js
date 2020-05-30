import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import cpuHist from '../../src/modules/sysmon/cpuHist.module'

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
                        usage: [1, 2, 3],
                        temperature: [1, 2, 3]
                    }
                })
            })
        }
    }
}))

describe('cpuHist', () => {
    let store

    const defaultState = {
        timestamps: [],
        usage: [],
        temperature: []
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(cpuHist))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.cpuHist).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.cpuHist).toEqual(defaultState)
        store.commit('SET_CPU_HIST', {
            timestamps: [1, 2, 3],
            usage: [1, 2, 3],
            temperature: [1, 2, 3]
        })
        expect(store.state.cpuHist).toEqual({
            timestamps: [1, 2, 3],
            usage: [1, 2, 3],
            temperature: [1, 2, 3]
        })
    })

    it('has a working getter', () => {
        expect(store.getters.cpuHist).toEqual(defaultState)
        store.state.cpuHist = {
            timestamps: [1, 2, 3],
            usage: [1, 2, 3],
            temperature: [1, 2, 3]
        }
        expect(store.getters.cpuHist).toEqual({
            timestamps: [1, 2, 3],
            usage: [1, 2, 3],
            temperature: [1, 2, 3]
        })
    })

    it('has a working action', async () => {
        expect(store.state.cpuHist).toEqual(defaultState)

        await store.dispatch('GET_CPU_HIST')

        expect(url).toBe('/sysmon/cpuHist')
        expect(store.state.cpuHist).toEqual({
            timestamps: [1, 2, 3],
            usage: [1, 2, 3],
            temperature: [1, 2, 3]
        })
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_CPU_HIST')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
