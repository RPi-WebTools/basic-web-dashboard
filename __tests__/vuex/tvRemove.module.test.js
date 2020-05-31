import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import tvRemove from '../../src/modules/tvspotter/tvRemove.module'

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

describe('tvRemove', () => {
    let store

    const defaultState = false

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(tvRemove))

        url = ''
        payload = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.tvRemove).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.tvRemove).toEqual(defaultState)
        store.commit('SET_TV_REMOVE', true)
        expect(store.state.tvRemove).toBe(true)
    })

    it('has a working getter', () => {
        expect(store.getters.tvRemove).toEqual(defaultState)
        store.state.tvRemove = true
        expect(store.getters.tvRemove).toBe(true)
    })

    it('has a working action', async () => {
        expect(store.state.tvRemove).toEqual(defaultState)

        await store.dispatch('GET_TV_REMOVE', '1')

        expect(url).toBe('/tvspotter/delete/tv')
        expect(payload).toBe('1')
        expect(store.state.tvRemove).toBe(true)
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_TV_REMOVE', '1')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
