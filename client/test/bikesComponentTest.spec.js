import { shallowMount } from '@vue/test-utils'
import BikesComponent from '../src/components/BikesComponent.vue'

describe('BikesComponent.vue', function() {
    it('Checking <h2> tag text',function() {
        const wrapper = shallowMount(BikesComponent)
        const h2= wrapper.find('h2')
        expect(h2.text()).toBe('Bike')  
    })
})