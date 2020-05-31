import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import tvSearched from '../../src/modules/tvspotter/tvSearched.module'

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

describe('tvSearched', () => {
    let store

    const defaultStates = {
        tvSearched: [],
        tvPages: 0
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(tvSearched))

        url = ''
        payload = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.tvSearched).toEqual(defaultStates.tvSearched)
        expect(store.state.tvPages).toEqual(defaultStates.tvPages)
    })

    it('has a working mutation', () => {
        expect(store.state.tvSearched).toEqual(defaultStates.tvSearched)
        expect(store.state.tvPages).toEqual(defaultStates.tvPages)
        store.commit('SET_TV_SEARCHED', [1, 2])
        store.commit('SET_TV_PAGES', 2)
        expect(store.state.tvSearched).toEqual([1, 2])
        expect(store.state.tvPages).toBe(2)
    })

    it('has a working getter', () => {
        expect(store.getters.tvSearched).toEqual(defaultStates.tvSearched)
        expect(store.getters.tvPages).toEqual(defaultStates.tvPages)
        store.state.tvSearched = [1, 2]
        store.state.tvPages = 2
        expect(store.getters.tvSearched).toEqual([1, 2])
        expect(store.getters.tvPages).toBe(2)
    })

    it('has a working action', async () => {
        expect(store.state.tvSearched).toEqual(defaultStates.tvSearched)
        expect(store.state.tvPages).toEqual(defaultStates.tvPages)

        await store.dispatch('GET_TV_SEARCHED', '1')

        expect(url).toBe('/tvspotter/search/tv')
        expect(payload).toBe('1')
        expect(store.state.tvSearched).toEqual([1, 2])
        expect(store.state.tvPages).toBe(2)
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        try {
            await store.dispatch('GET_TV_SEARCHED', '1')
        }
        catch (err) {
            expect(err).toBe('no')
        }

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
