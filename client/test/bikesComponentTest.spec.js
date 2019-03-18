import { shallowMount } from '@vue/test-utils'
import BikesComponent from '../src/components/BikesComponent.vue'
// import bikeService from '../src/bikeService.js'

describe('BikesComponent.vue', function() {
    it('Checking <h2> tag text',function() {
        const wrapper = shallowMount(BikesComponent)
        const h2= wrapper.find('h2')
        expect(h2.text()).toBe('Bikes')  
    })
})


const bikeService = require('../src/bikeService.js');
const bikes = bikeService.blaTest()

describe('GET /bikes', function() {
    it('returns a list of bikes', function() {
        expect(bikes).toBe('shit')
        // return bikes
        // .then(response => {
        //         expect(typeof response).to.equal('object')
        //         .end(function(err, res) {
        //             expect(res.body).to.have.lengthOf(2);
        //             done(err);
        //         });
        //     })
        // const bikes = bikeService.getBikes()
        // expect(typeof bikes).to.equal('object')
        // return bikeService.getBikes()
        // .then(response => {
        //     expect(typeof response).to.equal('object')
        //     // .end(function(err, res) {
        //     //     expect(res.body).to.have.lengthOf(2);
        //     //     done(err);
        //     // });
        // })
        // request.get('/bikes')
        //     .expect(200)
        //     .end(function(err, res) {
        //         expect(res.body).to.have.lengthOf(2);
        //         done(err);
        //     });
    });
});