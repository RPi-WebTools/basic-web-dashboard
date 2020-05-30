import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import movieRemove from '../../src/modules/tvspotter/movieRemove.module'

let url = ''
let payload = ''
let mockReject = false

jest.mock('../../src/api', () => ({
    __esModule: true,
    default: {
        post: (_url, _payload) => {
            return new Promise((resolve, reject) => {
                if (mockReject) reject()

                url = _url
                payload = _payload
                resolve({
                    data: true
                })
            })
        }
    }
}))

describe('movieRemove', () => {
    let store

    const defaultState = false

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(movieRemove))

        url = ''
        payload = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.movieRemove).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.movieRemove).toEqual(defaultState)
        store.commit('SET_MOVIE_REMOVE', true)
        expect(store.state.movieRemove).toBe(true)
    })

    it('has a working getter', () => {
        expect(store.getters.movieRemove).toEqual(defaultState)
        store.state.movieRemove = true
        expect(store.getters.movieRemove).toBe(true)
    })

    it('has a working action', async () => {
        expect(store.state.movieRemove).toEqual(defaultState)

        await store.dispatch('GET_MOVIE_REMOVE', '1')

        expect(url).toBe('/tvspotter/delete/movie')
        expect(payload).toBe('1')
        expect(store.state.movieRemove).toBe(true)
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_MOVIE_REMOVE', '1')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
