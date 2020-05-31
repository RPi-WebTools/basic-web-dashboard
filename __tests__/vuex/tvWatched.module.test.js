import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import tvWatched from '../../src/modules/tvspotter/tvWatched.module'

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

describe('tvWatched', () => {
    let store

    const defaultState = []

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(tvWatched))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.tvWatched).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.tvWatched).toEqual(defaultState)
        store.commit('SET_TV_WATCHED', [1, 2, 3])
        expect(store.state.tvWatched).toEqual([1, 2, 3])
    })

    it('has a working getter', () => {
        expect(store.getters.tvWatched).toEqual(defaultState)
        store.state.tvWatched = [1, 2, 3]
        expect(store.getters.tvWatched).toEqual([1, 2, 3])
    })

    it('has a working action', async () => {
        expect(store.state.tvWatched).toEqual(defaultState)

        await store.dispatch('GET_TV_WATCHED')

        expect(url).toBe('/tvspotter/load/watched/tv')
        expect(store.state.tvWatched).toEqual([1, 2, 3])
    })

    it('catches an API error', async () => {
        mockReject = true
        try {
            await store.dispatch('GET_TV_WATCHED')
        }
        catch (err) {
            expect(err).toBe('no')
        }
    })
})
