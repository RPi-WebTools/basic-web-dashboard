import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import netInfo from '../../src/modules/sysmon/netInfo.module'

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
                        iface: '20',
                        ip: '30',
                        mac: '40',
                        type: '50',
                        speed: '60',
                        dhcp: '70',
                        rx: 80,
                        tx: 90
                    }]
                })
            })
        }
    }
}))

describe('netInfo', () => {
    let store

    const defaultState = [{
        num: 0,
        iface: '',
        ip: '',
        mac: '',
        type: '',
        speed: '',
        dhcp: '',
        rx: 0,
        tx: 0
    }]

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(netInfo))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.netInfo).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.netInfo).toEqual(defaultState)
        store.commit('SET_NET_INFO', [{
            num: 1,
            iface: '2',
            ip: '3',
            mac: '4',
            type: '5',
            speed: '6',
            dhcp: '7',
            rx: 8,
            tx: 9
        }])
        expect(store.state.netInfo).toEqual([{
            num: 1,
            iface: '2',
            ip: '3',
            mac: '4',
            type: '5',
            speed: '6',
            dhcp: '7',
            rx: 8,
            tx: 9
        }])
    })

    it('has a working getter', () => {
        expect(store.getters.netInfo).toEqual(defaultState)
        store.state.netInfo = [{
            num: 1,
            iface: '2',
            ip: '3',
            mac: '4',
            type: '5',
            speed: '6',
            dhcp: '7',
            rx: 8,
            tx: 9
        }]
        expect(store.getters.netInfo).toEqual([{
            num: 1,
            iface: '2',
            ip: '3',
            mac: '4',
            type: '5',
            speed: '6',
            dhcp: '7',
            rx: 8,
            tx: 9
        }])
    })

    it('has a working action', async () => {
        expect(store.state.netInfo).toEqual(defaultState)

        await store.dispatch('GET_NET_INFO')

        expect(url).toBe('/sysmon/netInfo')
        expect(store.state.netInfo).toEqual([{
            num: 10,
            iface: '20',
            ip: '30',
            mac: '40',
            type: '50',
            speed: '60',
            dhcp: '70',
            rx: 80,
            tx: 90
        }])
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_NET_INFO')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
