import { shallowMount } from '@vue/test-utils'
import BikesComponent from '../src/components/staff/BikesComponent.vue'
import bikeService from '../src/BikeService.js'


// describe('BikesComponent.vue', function() {
//     it('Checking <h2> tag text',function() {
//         const wrapper = shallowMount(BikesComponent)
//         const h2= wrapper.find('h2')
//         expect(h2.text()).toBe('Bicycles')  
//     })
// })

// describe('BikeService', function() {
//     it('fsfs',function() {
//         // const h2= wrapper.find(BikeService)
//         expect(BikeService.bikeTest).toBe('daa')  
//     })kk
// })

describe("Number", function() {
    it("Should return a string value", function() {
        expect(bikeService.bikeTest()).toBe('daa');
    })
});

// describe('BikeService', function() {
//     it('Checking <h2> tag text',function() {
//         const wrapper = shallowMount(BikeService)
//         const h2= wrapper.find('h2')
//         expect(h2.text()).toBe('Bicycles')  
//     })
// })