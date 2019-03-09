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
                    <div class="availability">
                        <p>Availability: {{bikeDetails.availability}}</p>
                    </div>
                </div>    
            </div>
        </div>
    </div> 
</template>

<script>
    import bikeService from '../bikeService.js'

    export default {
        name: 'BikeDetails',
        data(){
            return {
                bikeDetails: '',
                bikeID: this.$route.params.id
            }
        },
        async created(){
            try{
                this.bikeDetails = await bikeService.viewBikeDetails(this.bikeID);
            }catch(err){
                this.error= err.message;
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
</style>


