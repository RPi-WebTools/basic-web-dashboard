import { mount, createLocalVue } from '@vue/test-utils'

import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import PageNotFound from '../src/views/PageNotFound.vue'

describe('PageNotFound', () => {
    let wrapper

    const routes = [
        { path: '/home', name: 'Home' }
    ]

    const router = new VueRouter({ routes })

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueRouter)
        localVue.use(Vuetify)

        wrapper = mount(PageNotFound, {
            localVue: localVue,
            router
        })
    })

    it('has a layout of five rows', () => {
        expect(wrapper.findAll('.row').length).toEqual(5)
    })

    it('has a button with the correct routing', () => {        
        expect(wrapper.find('.v-btn').exists()).toBe(true)

        expect(wrapper.find('.v-btn').element.href).toMatch(routes[0].path)
    })

    it('has an image', () => {
        expect(wrapper.find('.v-image__image').exists()).toBe(true)
    })
})
