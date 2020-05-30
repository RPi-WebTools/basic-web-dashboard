import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import memInfo from '../../src/modules/sysmon/memInfo.module'

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
                        curMemUsed: 10,
                        curMemBuffered: 20,
                        curMemCached: 30
                    }
                })
            })
        }
    }
}))

describe('memInfo', () => {
    let store

    const defaultState = {
        curMemUsed: 0,
        curMemBuffered: 0,
        curMemCached: 0
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(memInfo))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.memInfo).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.memInfo).toEqual(defaultState)
        store.commit('SET_MEM_INFO', {
            curMemUsed: 1,
            curMemBuffered: 2,
            curMemCached: 3
        })
        expect(store.state.memInfo).toEqual({
            curMemUsed: 1,
            curMemBuffered: 2,
            curMemCached: 3
        })
    })

    it('has a working getter', () => {
        expect(store.getters.memInfo).toEqual(defaultState)
        store.state.memInfo = {
            curMemUsed: 1,
            curMemBuffered: 2,
            curMemCached: 3
        }
        expect(store.getters.memInfo).toEqual({
            curMemUsed: 1,
            curMemBuffered: 2,
            curMemCached: 3
        })
    })

    it('has a working action', async () => {
        expect(store.state.memInfo).toEqual(defaultState)

        await store.dispatch('GET_MEM_INFO')

        expect(url).toBe('/sysmon/memInfo')
        expect(store.state.memInfo).toEqual({
            curMemUsed: 10,
            curMemBuffered: 20,
            curMemCached: 30
        })
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_MEM_INFO')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
