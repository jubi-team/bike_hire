<template>
    <div class="container">
        <h2 class="text-center mt-5 mb-5">Bookings</h2>
        
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
                <div>{{booking.id}}</div>
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
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>
