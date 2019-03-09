<template>
    <div class="container">
        <h2 class="text-center mt-5 mb-5">Bikes</h2>
        <div class="row bikes">
            <div class="box-bikes col-12 col-lg-12 ">
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
    import BikeDetailsComponent  from './BikeDetails.vue' 
    import bikeService from '../bikeService.js'

    export default {
        name: 'BikesComponent',
        components: {
            SingleBike,
            BikeDetailsComponent
        },
        data(){
            return {
                allBikes: [],
            }
        },
        mounted() {

        },
        async created(){
            try{
                this.allBikes = await bikeService.getBikes();
            }catch(err){
                this.error= err.message;
            }
        }
    }
</script>

<style scoped>
    div.bikes {
        height: 100%;
        width: 100%;
    }

    div.box-bikes {
        display: flex;
        flex-wrap: wrap;
        margin-right: -10px;
        margin-bottom: -10px;
    }

    .box-bike {
        height: auto;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: calc(25% - 10px);
        margin-bottom: 40px;
    }

    .box-bike:nth-child(even) {
	    margin: 0 10px 10px 10px;
    }
</style>
