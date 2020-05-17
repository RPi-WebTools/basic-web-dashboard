import { mount, createLocalVue } from '@vue/test-utils'

import Vuetify from 'vuetify'

import TextToIconButton from '../src/components/TextToIconButton.vue'

describe('TextToIconButton', () => {
    let localVue

    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(Vuetify)
    })

    it('has a button', () => {  
        const wrapper = mount(TextToIconButton, {
            localVue: localVue,
            propsData: {
                item: {
                    id: 123
                },
                watchlist: []
            }
        })
      
        expect(wrapper.find('.v-btn').exists()).toBe(true)
    })

    it('has correct button id', () => {
        const wrapper = mount(TextToIconButton, {
            localVue: localVue,
            propsData: {
                item: {
                    id: 123
                },
                watchlist: []
            }
        })

        expect(wrapper.find('#tmdb123').exists()).toBe(true)
    })

    it('hides icon when item not already in watchlist', () => {
        const wrapper = mount(TextToIconButton, {
            localVue: localVue,
            propsData: {
                item: {
                    id: 123
                },
                watchlist: []
            }
        })

        expect(wrapper.find('.v-btn__content > span').element).toBeVisible()
        expect(wrapper.find('#tmdb123check').element).not.toBeVisible()
        expect(wrapper.find('#tmdb123').classes('primary--text')).toBe(true)
    })

    it('shows icon when item already in watchlist', () => {
        const wrapper = mount(TextToIconButton, {
            localVue: localVue,
            propsData: {
                item: {
                    id: 123
                },
                watchlist: [
                    {
                        tmdbId: 123
                    }
                ]
            }
        })

        expect(wrapper.find('.v-btn__content > span').element).not.toBeVisible()
        expect(wrapper.find('#tmdb123check').element).toBeVisible()
        expect(wrapper.find('#tmdb123').classes('success--text')).toBe(true)
    })

    it('shows icon after button click', () => {
        const wrapper = mount(TextToIconButton, {
            localVue: localVue,
            propsData: {
                item: {
                    id: 123
                },
                watchlist: []
            }
        })

        expect(wrapper.vm.beenClicked).toBe(false)
        expect(wrapper.vm.btnColor).toBe('primary')

        // for some reason, vue throws a warning when calling this, test still able to pass
        // silencing this for now, still a
        // TODO
        jest.spyOn(console, 'error').mockImplementation(() => {});

        wrapper.find('#tmdb123').trigger('click')

        expect(wrapper.vm.beenClicked).toBe(true)
        expect(wrapper.vm.btnColor).toBe('success')
    })
})