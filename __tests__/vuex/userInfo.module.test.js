import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import userInfo from '../../src/modules/sysmon/userInfo.module'

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
                    data: [{
                        num: 10,
                        user: '20',
                        terminal: '30',
                        loginDate: '40',
                        loginTime: '50',
                        ip: '60',
                        lastCmd: '70'
                    }]
                })
            })
        }
    }
}))

describe('userInfo', () => {
    let store

    const defaultState = [{
        num: 0,
        user: '',
        terminal: '',
        loginDate: '',
        loginTime: '',
        ip: '',
        lastCmd: ''
    }]

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(userInfo))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.userInfo).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.userInfo).toEqual(defaultState)
        store.commit('SET_USER_INFO', [{
            num: 1,
            user: '2',
            terminal: '3',
            loginDate: '4',
            loginTime: '5',
            ip: '6',
            lastCmd: '7'
        }])
        expect(store.state.userInfo).toEqual([{
            num: 1,
            user: '2',
            terminal: '3',
            loginDate: '4',
            loginTime: '5',
            ip: '6',
            lastCmd: '7'
        }])
    })

    it('has a working getter', () => {
        expect(store.getters.userInfo).toEqual(defaultState)
        store.state.userInfo = [{
            num: 1,
            user: '2',
            terminal: '3',
            loginDate: '4',
            loginTime: '5',
            ip: '6',
            lastCmd: '7'
        }]
        expect(store.getters.userInfo).toEqual([{
            num: 1,
            user: '2',
            terminal: '3',
            loginDate: '4',
            loginTime: '5',
            ip: '6',
            lastCmd: '7'
        }])
    })

    it('has a working action', async () => {
        expect(store.state.userInfo).toEqual(defaultState)

        await store.dispatch('GET_USER_INFO')

        expect(url).toBe('/sysmon/userInfo')
        expect(store.state.userInfo).toEqual([{
            num: 10,
            user: '20',
            terminal: '30',
            loginDate: '40',
            loginTime: '50',
            ip: '60',
            lastCmd: '70'
        }])
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_USER_INFO')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
