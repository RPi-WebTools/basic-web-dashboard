import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import tvCheckResult from '../../src/modules/tvspotter/tvCheckResult.module'

let url = ''
let payload = ''
let mockReject = false

jest.mock('../../src/api', () => ({
    __esModule: true,
    default: {
        post: (_url, _payload) => {
            return new Promise((resolve, reject) => {
                if (mockReject) reject('no')

                url = _url
                payload = _payload
                resolve({
                    data: {
                        tmdbId: '1',
                        name: '2',
                        originalName: '3',
                        firstRelease: '4',
                        nextRelease: '5',
                        nextEpisode: '6',
                        poster: '7',
                        backdrop: '8',
                        status: 0
                    }
                })
            })
        }
    }
}))

describe('tvCheckResult', () => {
    let store

    const defaultState = {
        tmdbId: '',
        name: '',
        originalName: '',
        firstRelease: '',
        nextRelease: '',
        nextEpisode: '',
        poster: '',
        backdrop: '',
        status: -1
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(tvCheckResult))

        url = ''
        payload = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.tvCheckResult).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.tvCheckResult).toEqual(defaultState)
        store.commit('SET_TV_CHECK_RESULT', {
            tmdbId: '1',
            name: '2',
            originalName: '3',
            firstRelease: '4',
            nextRelease: '5',
            nextEpisode: '6',
            poster: '7',
            backdrop: '8',
            status: 0
        })
        expect(store.state.tvCheckResult).toEqual({
            tmdbId: '1',
            name: '2',
            originalName: '3',
            firstRelease: '4',
            nextRelease: '5',
            nextEpisode: '6',
            poster: '7',
            backdrop: '8',
            status: 0
        })
    })

    it('has a working getter', () => {
        expect(store.getters.tvCheckResult).toEqual(defaultState)
        store.state.tvCheckResult = {
            tmdbId: '1',
            name: '2',
            originalName: '3',
            firstRelease: '4',
            nextRelease: '5',
            nextEpisode: '6',
            poster: '7',
            backdrop: '8',
            status: 0
        }
        expect(store.getters.tvCheckResult).toEqual({
            tmdbId: '1',
            name: '2',
            originalName: '3',
            firstRelease: '4',
            nextRelease: '5',
            nextEpisode: '6',
            poster: '7',
            backdrop: '8',
            status: 0
        })
    })

    it('has a working action', async () => {
        expect(store.state.tvCheckResult).toEqual(defaultState)

        await store.dispatch('GET_TV_CHECK_RESULT', '1')

        expect(url).toBe('/tvspotter/check/tv')
        expect(payload).toBe('1')
        expect(store.state.tvCheckResult).toEqual({
            tmdbId: '1',
            name: '2',
            originalName: '3',
            firstRelease: '4',
            nextRelease: '5',
            nextEpisode: '6',
            poster: '7',
            backdrop: '8',
            status: 0
        })
    })

    it('catches an API error', async () => {
        mockReject = true
        try {
            await store.dispatch('GET_TV_CHECK_RESULT', '1')
        }
        catch (err) {
            expect(err).toBe('no')
        }
    })
})
