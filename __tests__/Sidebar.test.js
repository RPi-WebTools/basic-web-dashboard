import { mount, createLocalVue } from '@vue/test-utils'

import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import Sidebar from '../src/components/Sidebar.vue'

describe('Sidebar', () => {
    let wrapper

    const routes = [
        { path: '/home', name: 'Home' },
        { path: '/dashboard/cpumem', name: 'CPU & Memory' },
        { path: '/dashboard/network', name: 'Network' },
        { path: '/dashboard/storage', name: 'Storage' },
        { path: '/docker/manage', name: 'Manage Docker' },
        { path: '/docker/baikal', name: 'Baïkal' },
        { path: '/gitea/statistics', name: 'Gitea Statistics' },
        { path: '/gitea/configuration', name: 'Gitea Config' },
        { path: '/sysserv', name: 'System Services' },
        { path: '/tvspotter/movies', name: 'Movies' },
        { path: '/tvspotter/tv', name: 'TV' },
        { path: '/about', name: 'About' }
    ]

    const router = new VueRouter({ routes })

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueRouter)
        localVue.use(Vuetify)

        wrapper = mount(Sidebar, {
            localVue: localVue,
            router
        })
    })

    it('has list groups and items', () => {
        expect(wrapper.find('.v-list-group').exists()).toBe(true)
        expect(wrapper.find('.v-list-item').exists()).toBe(true)
    })

    it('has the wanted amount of base list items', () => {
        expect(wrapper.findAll('.v-list-item').length).toEqual(wrapper.vm.$data.links.length)
    })

    it('has all wanted route links', () => {
        const items = wrapper.findAll('.v-list-item').wrappers

        items.forEach(item => {
            if (typeof item.element.href !== 'undefined') {
                expect(routes.some(route => item.element.href.endsWith(route.path))).toBe(true)
            }
            else {
                expect(item.classes('v-list-group__header')).toBe(true)

                // TODO: find the group items and check their routes
            }
        })
    })
})
