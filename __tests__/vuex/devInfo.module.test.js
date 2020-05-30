import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import devInfo from '../../src/modules/sysmon/devInfo.module'

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
                        manufacturer: '1',
                        model: '2',
                        version: '3',
                        cpuManufacturer: '4',
                        cpuCores: '5',
                        memory: '6',
                        osDistro: '7',
                        osCode: '8',
                        osHostname: '9',
                        uptime: '10'
                    }
                })
            })
        }
    }
}))

describe('devInfo', () => {
    let store

    const defaultState = {
        manufacturer: '',
        model: '',
        version: '',
        cpuManufacturer: '',
        cpuCores: '',
        memory: '',
        osDistro: '',
        osCode: '',
        osHostname: '',
        uptime: ''
    }

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store(cloneDeep(devInfo))

        url = ''
        mockReject = false
    })

    it('has a default state', () => {
        expect(store.state.devInfo).toEqual(defaultState)
    })

    it('has a working mutation', () => {
        expect(store.state.devInfo).toEqual(defaultState)
        store.commit('SET_DEV_INFO', {
            manufacturer: '1',
            model: '2',
            version: '3',
            cpuManufacturer: '4',
            cpuCores: '5',
            memory: '6',
            osDistro: '7',
            osCode: '8',
            osHostname: '9',
            uptime: '10'
        })
        expect(store.state.devInfo).toEqual({
            manufacturer: '1',
            model: '2',
            version: '3',
            cpuManufacturer: '4',
            cpuCores: '5',
            memory: '6',
            osDistro: '7',
            osCode: '8',
            osHostname: '9',
            uptime: '10'
        })
    })

    it('has a working getter', () => {
        expect(store.getters.devInfo).toEqual(defaultState)
        store.state.devInfo = {
            manufacturer: '1',
            model: '2',
            version: '3',
            cpuManufacturer: '4',
            cpuCores: '5',
            memory: '6',
            osDistro: '7',
            osCode: '8',
            osHostname: '9',
            uptime: '10'
        }
        expect(store.getters.devInfo).toEqual({
            manufacturer: '1',
            model: '2',
            version: '3',
            cpuManufacturer: '4',
            cpuCores: '5',
            memory: '6',
            osDistro: '7',
            osCode: '8',
            osHostname: '9',
            uptime: '10'
        })
    })

    it('has a working action', async () => {
        expect(store.state.devInfo).toEqual(defaultState)

        await store.dispatch('GET_DEV_INFO')

        expect(url).toBe('/sysmon/devInfo')
        expect(store.state.devInfo).toEqual({
            manufacturer: '1',
            model: '2',
            version: '3',
            cpuManufacturer: '4',
            cpuCores: '5',
            memory: '6',
            osDistro: '7',
            osCode: '8',
            osHostname: '9',
            uptime: '10'
        })
    })

    it('catches an API error', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation()

        mockReject = true
        await store.dispatch('GET_DEV_INFO')

        expect(console.error).toHaveBeenCalledTimes(1)

        spy.mockRestore()
    })
})
