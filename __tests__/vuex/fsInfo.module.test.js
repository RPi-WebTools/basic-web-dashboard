import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import fsInfo from '../../src/modules/sysmon/fsInfo.module'

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

describe('fsInfo', () => {
    let store

    const defaultState = []

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(fsInfo))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.fsInfo).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.fsInfo).toEqual(defaultState)
        store.commit('SET_FS_INFO', [1, 2, 3])
        expect(store.state.fsInfo).toEqual([1, 2, 3])
    })

    it('has a working getter', () => {
        expect(store.getters.fsInfo).toEqual(defaultState)
        store.state.fsInfo = [1, 2, 3]
        expect(store.getters.fsInfo).toEqual([1, 2, 3])
    })

    it('has a working getter..again', () => {
        expect(store.getters.fsInfo).toEqual(defaultState)
        store.state.fsInfo = [{
            uuid: '1'
        }, {
            uuid: '2'
        }]
        expect(store.getters.fsInfoByUuid('2')).toEqual([{ uuid: '2' }])
    })

    it('has a working action', async () => {
        expect(store.state.fsInfo).toEqual(defaultState)

        await store.dispatch('GET_FS_INFO')

        expect(url).toBe('/sysmon/fsInfo')
        expect(store.state.fsInfo).toEqual([1, 2, 3])
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        try {
            await store.dispatch('GET_FS_INFO')
        }
        catch (err) {
            expect(err).toBe('no')
        }

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
