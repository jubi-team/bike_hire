<template>
    <div>
        <router-link v-bind:to="{ name: 'UserBikeDetailsComponent', params: { id: bicycle._id }}">
            <div class="box-bike-inner">
                <img :src="bicycle.image" alt="bike image" v-bind:class="{unavailable: !this.bicycle.availability}">
                <h2>{{bicycle.name}}</h2>
            </div> 
        </router-link>
    </div>
</template>

<script>

    export default {
        name: 'BikeComponent',
        props: ['bike'],
        data() {
            return {
                bicycle: this.bike
            }
        }
    } 
</script>

<style scoped>
    
    div.box-bike-inner {
        padding:20px;
    }

    img {
        width: 300px;
    }

    h2 {
        font-size: 14px;
        padding-top: 30px;
    }

    .unavailable {
        opacity: 0.5;
    }
    
</style>
