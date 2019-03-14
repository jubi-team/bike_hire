<template>
    <div class="container">
        <Nav />
        <h2 class="text-center mt-5 mb-5">Bikes</h2>
        <input type="radio" name="show" value="all" v-model="show" v-on:click="getAllBikes" checked> Show All
        <input type="radio" name="show" value="available" v-model="show" v-on:click="getAvailableBikes"> Only Available
        <div class="row bikes">
            
            <div class="box-bikes col-12 col-lg-12 ">
                <div class="grid">
                <div>Name</div>
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
</template>

<script>
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
                show: 'all'
            }
        },
        mounted() {
            console.log(this.show)
            console.log(this.allBikes)
        },
        methods: {
            async getAllBikes() {
                console.log("getall")
                try{
                    this.allBikes = await bikeService.getAllBikes();
                    console.log(this.allBikes)
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
            }
        },
        async created(){
            this.getAllBikes()
        }
    }
</script>

<style scoped>
    div.bikes {
        height: 100%;
        width: 100%;
    }

    div.box-bikes {
        display: grid;
        /* flex-wrap: wrap;
        margin-right: -10px;
        margin-bottom: -10px; */
    }

    .grid {
        /* padding:20px; */
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>
