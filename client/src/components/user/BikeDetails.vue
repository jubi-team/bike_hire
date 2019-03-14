<template>
    <div class="container">
        <div  class="row">
            <div class="bike-details">
                <div class="bike-image">
                    <img :src="bikeDetails.image" alt="bike image">
                </div>
                <div class="bike-info">
                    <div class="bike-name">
                        <h1>{{bikeDetails.name}}</h1>
                    </div>
                    <div class="booking-price">
                        <p>Daily rate: {{bikeDetails.price}}</p>
                    </div>
                    <div class="bike-description">
                        <p>{{bikeDetails.description}}</p>
                    </div>
                    <div class="bike-type">
                        <p>Type: {{bikeDetails.type}}</p>
                    </div>
                    <div class="">
                        <p>Availability: {{bikeDetails.availability ? 'Available' : 'Unavailable'}}</p>
                    </div>
                    <div class="" v-if="bikeDetails.availability">
                        <button v-on:click="showForm = true" v-if="!showForm">Rent now</button>
                        <form v-if="showForm" id="booking-form">
                            <div>
                                <input v-model="form.firstName" name="firstName" type="text" placeholder="First name">
                            </div>
                            <div>
                                <input v-model="form.lastName" name="lastName" type="text" placeholder="Last name">
                            </div>
                            <div>
                                <input v-model="form.phone" name="phone" type="text" placeholder="Phone">
                            </div>
                            <button type="button" v-on:click="bookBike">Save</button>
                            <button type="button" v-on:click="showForm = false">Cancel</button>
                        </form>
                    </div>
                    <!-- <div class="availability" v-if="!bikeDetails.availability">
                        <button type="button" v-on:click="returnBike">Return</button>
                    </div> -->
                </div>
            </div>
            <!-- <div v-if="this.bikeDetails.booking_history && this.bikeDetails.booking_history.length > 0">
                <h2>History</h2>
                <div class="grid">
                    <div class="t-head">First Name</div>
                    <div class="t-head">Last Name</div>
                    <div class="t-head">Phone</div>
                    <div class="t-head">Date Booked</div>
                    <div class="t-head">Date Returned</div>
                </div>
                <History v-bind:key="index" v-bind:index="index" v-bind:history="history" v-bind:item="history" v-for="(history, index) in bikeDetails.booking_history" />
            </div> -->
            <!-- <div v-if="this.bikeDetails.customer">
                <h2>Rented by</h2>
                <div>{{bikeDetails.customer.firstName}}</div>
                <div>{{bikeDetails.customer.lastName}}</div>
                <div>{{bikeDetails.customer.phone}}</div>
                <div>{{bikeDetails.customer.date}}</div>
            </div> -->
        </div>
    </div> 
</template>

<script>
    import bikeService from '../../bikeService.js'
    import History from './History.vue'

    export default {
        name: 'BikeDetails',
        components: {
            History
        },
        data(){
            return {
                bikeDetails: '',
                bikeID: this.$route.params.id,
                showForm: false,
                form: {
                    firstName: '',
                    lastName: '',
                    phone: ''
                }
                
            }
        },
        async created() {
            try{
                this.bikeDetails = await bikeService.viewBikeDetails(this.bikeID);
                console.log(this.bikeDetails.booking_history)
            }catch(err){
                this.error= err.message;
            }
        },
        methods: {
            async bookBike() {
                try{
                    console.log(await bikeService.bookBike(this.bikeID,this.form))
                    this.bikeDetails.availability = false
                }catch(err){
                    this.error= err.message;
                }
            },
            async returnBike() {
                try{
                    await bikeService.returnBike(this.bikeID);
                    this.bikeDetails.availability = false
                }catch(err){
                    this.error= err.message;
                }
            }
        }
    }
</script>

<style scoped>
    div.bike-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 100px;
        padding-top: 100px;
        text-align: left;
    }

    img {
        padding-top:30px;
        max-width: 530px;
        width: 100%;
    }

    .t-head {
        font-weight: 600;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
</style>


