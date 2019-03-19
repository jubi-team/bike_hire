<template>
    <div class="container">
        <h2 class="text-center mt-5 mb-5">Bookings</h2>
        <div class="grid t-header">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Phone</div>
            <div>Date</div>
            <div>Booking Id</div>
            <div>Empoyee</div>
        </div>

        <div
            v-bind:booking="booking"
            v-for="(booking, index) in bookings"
            v-bind:item="booking"
            v-bind:index="index"
            v-bind:key="booking._id">

            <div class="grid">
                <div>{{booking.firstName}}</div>
                <div>{{booking.lastName}}</div>
                <div>{{booking.phone}}</div>
                <div>{{booking.date}}</div>
                <div>{{booking._id}}</div>
                <div>{{booking.user}}</div>
            </div>
        </div>
    </div>  
</template>

<script>
    import Nav  from './Nav.vue'
    import bikeService from '../../bikeService.js'

    export default {
        name: 'StaffBookingsComponent',
        components: {
            Nav
        },
        data(){
            return {
                bookings: []
            }
        },

        methods: {
            async getBookings() {
                try{
                    this.bookings = await bikeService.getBookings();
                    this.bookings.map(booking => {
                        // console.log(booking)
                        booking.date = new Date(booking.date).toLocaleDateString("en-GB")
                    })
                }catch(err){
                    this.error= err.message;
                    console.log(this.error)
                }finally{
                    console.log(this.bookings)
                }
            }, 
        },
        async created(){
            this.getBookings()
        }
    }
</script>

<style scoped>

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 2fr 1fr;
    }

    .t-header {
        font-weight: 600;
    }
</style>
