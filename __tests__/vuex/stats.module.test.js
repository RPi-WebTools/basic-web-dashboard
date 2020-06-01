import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import stats from '../../src/modules/gitea/stats.module'

let url = ''
let mockReject = false

jest.mock('../../src/gitea-api', () => ({
    __esModule: true,
    default: {
        get: (_url) => {
            return new Promise((resolve, reject) => {
                if (mockReject) reject()

                url = _url
                resolve({
                    data: {
                        version: 'v1'
                    }
                })
            })
        }
    }
}))

describe('Gitea stats', () => {
    let store

    const defaultState = ''

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(stats))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.version).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.version).toEqual(defaultState)
        store.commit('SET_VERSION', 'v1')
        expect(store.state.version).toEqual('v1')
    })

    it('has a working getter', () => {
        expect(store.getters.version).toEqual(defaultState)
        store.state.version = 'v1'
        expect(store.getters.version).toEqual('v1')
    })

    it('has a working action', async () => {
        expect(store.state.version).toEqual(defaultState)

        await store.dispatch('GET_VERSION')

        expect(url).toBe('/version')
        expect(store.state.version).toEqual('v1')
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_VERSION')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
