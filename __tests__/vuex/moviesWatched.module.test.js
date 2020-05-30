import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import moviesWatched from '../../src/modules/tvspotter/moviesWatched.module'

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

describe('moviesWatched', () => {
    let store

    const defaultState = []

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(moviesWatched))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.moviesWatched).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.moviesWatched).toEqual(defaultState)
        store.commit('SET_MOVIES_WATCHED', [1, 2, 3])
        expect(store.state.moviesWatched).toEqual([1, 2, 3])
    })

    it('has a working getter', () => {
        expect(store.getters.moviesWatched).toEqual(defaultState)
        store.state.moviesWatched = [1, 2, 3]
        expect(store.getters.moviesWatched).toEqual([1, 2, 3])
    })

    it('has a working action', async () => {
        expect(store.state.moviesWatched).toEqual(defaultState)

        await store.dispatch('GET_MOVIES_WATCHED')

        expect(url).toBe('/tvspotter/load/watched/movie')
        expect(store.state.moviesWatched).toEqual([1, 2, 3])
    })

    it('catches an API error', async () => {
        mockReject = true
        try {
            await store.dispatch('GET_MOVIES_WATCHED')
        }
        catch (err) {
            expect(err).toBe('no')
        }
    })
})
