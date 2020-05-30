import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import fsIoHist from '../../src/modules/sysmon/fsIoHist.module'

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
                    data: [1, 2, 3]
                })
            })
        }
    }
}))

describe('fsIoHist', () => {
    let store

    const defaultState = []

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(fsIoHist))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.fsIoHist).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.fsIoHist).toEqual(defaultState)
        store.commit('SET_FS_IO_HIST', [1, 2, 3])
        expect(store.state.fsIoHist).toEqual([1, 2, 3])
    })

    it('has a working getter', () => {
        expect(store.getters.fsIoHist).toEqual(defaultState)
        store.state.fsIoHist = [1, 2, 3]
        expect(store.getters.fsIoHist).toEqual([1, 2, 3])
    })

    it('has a working action', async () => {
        expect(store.state.fsIoHist).toEqual(defaultState)

        await store.dispatch('GET_FS_IO_HIST')

        expect(url).toBe('/sysmon/fsIoHist')
        expect(store.state.fsIoHist).toEqual([1, 2, 3])
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_FS_IO_HIST')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
