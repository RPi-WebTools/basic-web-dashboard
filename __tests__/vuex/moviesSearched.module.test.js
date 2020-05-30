import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import moviesSearched from '../../src/modules/tvspotter/moviesSearched.module'

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
                    data: {
                        items: [1, 2],
                        pages: 2
                    }
                })
            })
        }
    }
}))

describe('moviesSearched', () => {
    let store

    const defaultStates = {
        moviesSearched: [],
        moviesPages: 0
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(moviesSearched))

        url = ''
        payload = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.moviesSearched).toEqual(defaultStates.moviesSearched)
        expect(store.state.moviesPages).toEqual(defaultStates.moviesPages)
    })

    it('has a working mutation', () => {
        expect(store.state.moviesSearched).toEqual(defaultStates.moviesSearched)
        expect(store.state.moviesPages).toEqual(defaultStates.moviesPages)
        store.commit('SET_MOVIES_SEARCHED', [1, 2])
        store.commit('SET_MOVIES_PAGES', 2)
        expect(store.state.moviesSearched).toEqual([1, 2])
        expect(store.state.moviesPages).toBe(2)
    })

    it('has a working getter', () => {
        expect(store.getters.moviesSearched).toEqual(defaultStates.moviesSearched)
        expect(store.getters.moviesPages).toEqual(defaultStates.moviesPages)
        store.state.moviesSearched = [1, 2]
        store.state.moviesPages = 2
        expect(store.getters.moviesSearched).toEqual([1, 2])
        expect(store.getters.moviesPages).toBe(2)
    })

    it('has a working action', async () => {
        expect(store.state.moviesSearched).toEqual(defaultStates.moviesSearched)
        expect(store.state.moviesPages).toEqual(defaultStates.moviesPages)

        await store.dispatch('GET_MOVIES_SEARCHED', '1')

        expect(url).toBe('/tvspotter/search/movie')
        expect(payload).toBe('1')
        expect(store.state.moviesSearched).toEqual([1, 2])
        expect(store.state.moviesPages).toBe(2)
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        try {
            await store.dispatch('GET_MOVIES_SEARCHED', '1')
        }
        catch (err) {
            expect(err).toBe('no')
        }

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
