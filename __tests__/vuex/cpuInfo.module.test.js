import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import cpuInfo from '../../src/modules/sysmon/cpuInfo.module'

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
                        curCpuLoad: 10,
                        curCpuTemp: 20
                    }
                })
            })
        }
    }
}))

describe('cpuInfo', () => {
    let store

    const defaultState = {
        curCpuLoad: 0,
        curCpuTemp: 0
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(cpuInfo))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.cpuInfo).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.cpuInfo).toEqual(defaultState)
        store.commit('SET_CPU_INFO', {
            curCpuLoad: 1,
            curCpuTemp: 2
        })
        expect(store.state.cpuInfo).toEqual({
            curCpuLoad: 1,
            curCpuTemp: 2
        })
    })

    it('has a working getter', () => {
        expect(store.getters.cpuInfo).toEqual(defaultState)
        store.state.cpuInfo = {
            curCpuLoad: 1,
            curCpuTemp: 2
        }
        expect(store.getters.cpuInfo).toEqual({
            curCpuLoad: 1,
            curCpuTemp: 2
        })
    })

    it('has a working action', async () => {
        expect(store.state.cpuInfo).toEqual(defaultState)

        await store.dispatch('GET_CPU_INFO')

        expect(url).toBe('/sysmon/cpuInfo')
        expect(store.state.cpuInfo).toEqual({
            curCpuLoad: 10,
            curCpuTemp: 20
        })
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_CPU_INFO')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
