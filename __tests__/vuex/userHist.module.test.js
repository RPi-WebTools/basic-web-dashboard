import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import userHist from '../../src/modules/sysmon/userHist.module'

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
                    data: {
                        timestamps: [1, 2, 3],
                        users: { 1: '1', 2: '2', 3: '3' }
                    }
                })
            })
        }
    }
}))

describe('userHist', () => {
    let store

    const defaultState = {
        timestamps: [],
        users: {}
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(userHist))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.userHist).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.userHist).toEqual(defaultState)
        store.commit('SET_USER_HIST', {
            timestamps: [1, 2, 3],
            users: { 1: '1', 2: '2', 3: '3' }
        })
        expect(store.state.userHist).toEqual({
            timestamps: [1, 2, 3],
            users: { 1: '1', 2: '2', 3: '3' }
        })
    })

    it('has a working getter', () => {
        expect(store.getters.userHist).toEqual(defaultState)
        store.state.userHist = {
            timestamps: [1, 2, 3],
            users: { 1: '1', 2: '2', 3: '3' }
        }
        expect(store.getters.userHist).toEqual({
            timestamps: [1, 2, 3],
            users: { 1: '1', 2: '2', 3: '3' }
        })
    })

    it('has a working action', async () => {
        expect(store.state.userHist).toEqual(defaultState)

        await store.dispatch('GET_USER_HIST')

        expect(url).toBe('/sysmon/userHist')
        expect(store.state.userHist).toEqual({
            timestamps: [1, 2, 3],
            users: { 1: '1', 2: '2', 3: '3' }
        })
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_USER_HIST')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
