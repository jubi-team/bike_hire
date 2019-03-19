<template>
    <div class="bikes-view-ctn container">
        <div id="app">
    
</div>
        <div class="container">
            <div class="update-bike-details">
              
                <v-layout row justify-center class="btn-position">
                    <v-dialog v-model="dialog" data-app persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :hover="hover" :transition="transition" relative="">
      <v-btn slot="activator" class="blue darken-2" dark="" fab="" hover="" v-on="on" v-model="fab" v-tooltip:left="{ html: 'Delete, open or add a new dashboard layout or module' }">
        <v-icon>+</v-icon>
      </v-btn>
    </v-speed-dial>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-container grid-list-md>
                                <v-layout wrap>
                                     <v-flex xs12>
                                        <v-text-field v-model="bikeDetails.name" label="Bicycle Name*" required></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					                    <img :src="imageUrl" height="150" v-if="imageUrl"/>
					                    <v-text-field label="Select Image" @click='pickFile' v-model='imageName'></v-text-field>
                                        <input
                                            type="file"
                                            style="display: none"
                                            ref="image"
                                            accept="image/*"
                                            @change="onFilePicked"
                                        >
                                    </v-flex>

                                     <v-flex xs12>
                                        <v-text-field v-model="bikeDetails.description" label="Description*" required></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="bikeDetails.price" label="Daily Rate*" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="bikeDetails.type" label="Type*" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="bikeDetails.availability" label="Availability*" required ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="dialog = false" v-on:click="AddBike()">Add</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </div>
            <h2 class="text-center mt-5 mb-5">Bicycles</h2>
            <div class="bike-filters">
            <div>        <input type="radio" name="show" value="all" v-model="show" v-on:click="getAllBikes" checked> Show All
            </div>
            <div>        <input type="radio" name="show" value="available" v-model="show" v-on:click="getAvailableBikes"> Only Available
            </div>
        </div>
        </div>
            
         <div class="bikes-ctn container">
         
        <div class="row bikes">
            
            <div class="box-bikes col-12 col-lg-12 ">
                <div class="bike-header">
                <div>Bike Name</div>
                <div>Price</div>
                <div>Type</div>
                <div>Available</div>
            </div>
                <SingleBike class="box-bike"
                    v-bind:bike="bike"
                    v-for="(bike, index) in allBikes"
                    v-bind:item="bike"
                    v-bind:index="index"
                    v-bind:key="bike._id"
                />
            </div>
        </div>
    </div> 
    </div>
    
</template>

<script>
    import axios from 'axios';
    import SingleBike  from './SingleBike.vue'
    import Nav  from './Nav.vue'
    import BikeDetailsComponent  from './BikeDetails.vue' 
    import bikeService from '../../bikeService.js'

    export default {
        name: 'BikesComponent',
        components: {
            SingleBike,
            BikeDetailsComponent,
            Nav
        },
        data(){
            return {
                allBikes: [],
                show: 'all',
                dialog: false,
                image: '',
                imageName: '',
                imageUrl: '',
                bikeDetails: {
                    name:'',
                    description: '',
                    price: '',
                    type: '',
                    availability: ''
                },
                direction: "top",
                fab: false,
                fling: false,
                hover: false,
                tabs: null,
                top: true,
                right: true,
                bottom: true,
                left: false,
                transition: 'slide-y-reverse-transition'
            }
        },
        
        methods: {
            async getAllBikes() {
                try{
                    this.allBikes = await bikeService.getAllBikes();
                }catch(err){
                    this.error= err.message;
                }
            },
            async getAvailableBikes() {
                try{
                    this.allBikes = await bikeService.getAvailableBikes();
                }catch(err){
                    this.error= err.message;
                }
            },
            change() {
                console.log("change", this.show)
            },

            onFilePicked () {
                this.bikeDetails.image = this.$refs.image.files[0];
                this.image = this.$refs.image.files[0];
            },
            async AddBike() {
                const formData = new FormData();
                for ( let key in this.bikeDetails ) {
                    formData.append(key, this.bikeDetails[key]);
                }
                this.allBikes = await bikeService.getAllBikes();

                try{
                    await axios.post('http://localhost:3000/apis/bikes/upload', formData);
                }catch(error){
                    console.log(error)
                }
            },

            pickFile () {
                this.$refs.image.click ()
            }
        },
        async created(){
            this.getAllBikes()
        },
        
    }
</script>

<style scoped>


    div.bikes-ctn {
        background-color: #fff;
        padding: 0px;
        clear: both;
    }
    div.update-bike-details {
            
    }

    h2 {
        text-transform: uppercase;
    }

    div.box-bikes {
        padding:0px;
    }

    div.bikes {
        margin:0px;
        height: 100%;
        width: 100%;
    }

    .bike-header {
        background-color:#cdd0d5;
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 600;
        padding:18px;
        display: grid;
        grid-template-columns: 1.3fr 1fr 1fr 0.8fr;
    }

    div.btn-position {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    div.bike-filters {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: flex-end;
        width: 28%;
        float: right;
    }

    .blue.darken-2 {
        background-color:#1B8D5F !important;
        outline:none;
    }

    i {
        font-style: normal;
    }

    .v-speed-dial--top.v-speed-dial--absolute {
        top: 0;
    }

    .v-speed-dial--right {
        right: 0;
    }
</style>
