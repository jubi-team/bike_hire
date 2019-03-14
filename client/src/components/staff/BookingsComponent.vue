<template>
    <div class="container">
        <Nav />
        <h2 class="text-center mt-5 mb-5">Bookings</h2>
        
        <div
        v-bind:booking="booking"
        v-for="(booking, index) in bookings"
        v-bind:item="booking"
        v-bind:index="index"
        v-bind:key="booking._id">

            <h1>hæ</h1>

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
                bookings: [],
            }
        },
        mounted() {
            // console.log(this.show)
            console.log('mount')
            console.log(this.bookings)
        },
        methods: {
            async getBookings() {
                console.log("book")
                try{
                    // console.log("huhihi")
                    // this.bookings = await bikeService.getBookings();
                    // console.log('bookings',this.bookings)
                    console.log("BOOOOKKINGS::")
                    console.log(await bikeService.getBookings())
                }catch(err){
                    // console.log("hæ")
                    // console.log(err)
                    this.error= err.message;
                    console.log(this.error)
                }
            },
            
        },
        async created(){
            console.log('cr')
            this.getBookings()
        }
    }
</script>

<style scoped>

    .grid {
        /* padding:20px; */
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>
