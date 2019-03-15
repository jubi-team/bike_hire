import Vue from 'vue'
import Router from 'vue-router'
import StaffBikesComponent from '@/components/staff/BikesComponent'
import StaffBikeDetailsComponent from '@/components/staff/BikeDetails'
import StaffBookingsComponent from '@/components/staff/BookingsComponent'
import UserBikesComponent from '@/components/user/BikesComponent'
import UserBikeDetailsComponent from '@/components/user/BikeDetails'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/staff',
      name: 'StaffBikesComponent',
      component: StaffBikesComponent
    },
    {
      path: '/staff/bike-info/:id',
      props: true,
      name: 'StaffBikeDetailsComponent',
      component: StaffBikeDetailsComponent
    },
    {
      path: '/staff/bookings',
      name: 'StaffBookingsComponent',
      component: StaffBookingsComponent
    },
    {
      path: '/user',
      name: 'UserBikesComponent',
      component: UserBikesComponent
    },
    {
      path: '/user/bike-info/bike-id/:id',
      props: true,
      name: 'UserBikeDetailsComponent',
      component: UserBikeDetailsComponent
    },
  ],
  mode: 'history'
})
