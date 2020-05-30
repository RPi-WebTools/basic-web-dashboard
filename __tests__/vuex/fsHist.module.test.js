import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import fsHist from '../../src/modules/sysmon/fsHist.module'

let url = ''
let mockReject = false

jest.mock('../../src/api', () => ({
    __esModule: true,
    default: {
        get: (_url) => {
            return new Promise((resolve, reject) => {
                if (mockReject) reject('no')

                url = _url
                resolve({
                    data: [1, 2, 3]
                })
            })
        }
    }
}))

describe('fsHist', () => {
    let store

    const defaultState = []

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(fsHist))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.fsHist).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.fsHist).toEqual(defaultState)
        store.commit('SET_FS_HIST', [1, 2, 3])
        expect(store.state.fsHist).toEqual([1, 2, 3])
    })

    it('has a working getter', () => {
        expect(store.getters.fsHist).toEqual(defaultState)
        store.state.fsHist = [1, 2, 3]
        expect(store.getters.fsHist).toEqual([1, 2, 3])
    })

    it('has a working getter..again', () => {
        expect(store.getters.fsHist).toEqual(defaultState)
        store.state.fsHist = [{
            uuid: '1'
        }, {
            uuid: '2'
        }]
        expect(store.getters.fsHistByUuid('2')).toEqual([{ uuid: '2' }])
    })

    it('has a working action', async () => {
        expect(store.state.fsHist).toEqual(defaultState)

        await store.dispatch('GET_FS_HIST')

        expect(url).toBe('/sysmon/fsHist')
        expect(store.state.fsHist).toEqual([1, 2, 3])
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        try {
            await store.dispatch('GET_FS_HIST')
        }
        catch (err) {
            expect(err).toBe('no')
        }

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
