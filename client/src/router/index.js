import Vue from 'vue'
import Router from 'vue-router'
import BikesComponent from '@/components/BikesComponent'
import BikeDetailsComponent from '@/components/BikeDetails'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'BikesComponent',
      component: BikesComponent
    },
    // {
    //   path: '/bike-info',
    //   props: true,
    //   name: 'BikeDetailsComponent',
    //   component: BikeDetailsComponent
    // },
    {
      path: '/bike-info/:id',
      props: true,
      name: 'BikeDetailsComponent',
      component: BikeDetailsComponent
    }
  ],
  mode: 'history'
})
