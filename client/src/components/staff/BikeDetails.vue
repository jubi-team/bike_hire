<template>
    <div class="container">
        <div  class="row">
            <div class="edit-bike-details">
                <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="600px" data-app>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on">Edit Bike</v-btn>
                        </template>
                        <v-card>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                            </v-card-actions>
                            <v-card-text>
                                <v-container grid-list-md>
                                <v-layout wrap>
                                     <v-flex xs12>
                                        <v-text-field v-model="updateBikeInfo.name" label="Bicycle Name*" required></v-text-field>
                                    </v-flex>

                                     <v-flex xs12>
                                        <v-text-field v-model="updateBikeInfo.description" label="Description*" required></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="updateBikeInfo.price" label="Daily Rate*" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="updateBikeInfo.type" label="Type*" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="updateBikeInfo.availability" label="Availability*" required ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- <v-btn color="blue darken-1" flat @click="dialog = false" v-on:click="deleteBike(bikeDetails._id)">Delete</v-btn> -->
                            <v-btn color="blue darken-1" flat @click="dialog = false" v-on:click="updateBikeDetails">Update</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </div>

            <div class="delete-bike">
                <v-layout row justify-center>
                    <v-flex xs12 sm4 text-xs-center>
                        <div>
                            <v-btn color="primary" class="v-btn theme--dark primary" v-on:click="deleteBike(bikeDetails._id)">Delete</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </div>

            <div class="bike-details">
                <div class="bike-image">
                    <img :src="getIconPath(bikeDetails.image)" alt="bike image">
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
                    <div class="availability" v-if="!bikeDetails.availability">
                        <button type="button" v-on:click="returnBike">Return</button>
                    </div>
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
            <div v-if="this.bikeDetails.customer">
                <h2>Rented by</h2>
                <div>{{bikeDetails.customer.firstName}}</div>
                <div>{{bikeDetails.customer.lastName}}</div>
                <div>{{bikeDetails.customer.phone}}</div>
                <div>{{bikeDetails.customer.date}}</div>
            </div>
        </div>
    </div> 
</template>

<script>
    import bikeService from '../../bikeService.js'
    import router from '../../router/index.js'
    import History from './History.vue'
    import Nav from './Nav.vue'

    export default {
        name: 'BikeDetails',
        components: {
            History,
            Nav
        },
        data(){
            return {
                bikeDetails: '',
                bikeID: this.$route.params.id,
                showForm: false,
                dialog: false,
                form: {
                    firstName: '',
                    lastName: '',
                    phone: ''
                },
                updateBikeInfo: {
                    name:'',
                    description: '',
                    price: '',
                    type: '',
                    availability: ''
                }
            }
        },
        async created() {
            try{
                this.bikeDetails = await bikeService.viewBikeDetails(this.bikeID);
            }catch(err){
                this.error= err.message;
            }
        },
        methods: {
            async bookBike() {
                try{
                    console.log(await bikeService.bookBike(this.bikeID,this.form, this.$store.getters.getUser))
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
            },
             async updateBikeDetails() {
                try{
                    await bikeService.updateBikeDetails(this.bikeID, this.updateBikeInfo);
                    this.bikeDetails = await bikeService.viewBikeDetails(this.bikeID);
                }catch(err){
                    this.error= err.message;
                }
            },
            async deleteBike(bikeID){
                await bikeService.deleteBike(bikeID)
                this.$router.push({ name: 'StaffBikesComponent' })
            },

            getIconPath (iconName) {
                return iconName ? require(`../../uploads/${iconName}`) : ''
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


