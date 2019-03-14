<template>
    <div>
        <router-link v-bind:to="{ name: 'StaffBikeDetailsComponent', params: { id: bicycle._id }}">
            <div class="grid">
                <!-- <img :src="bicycle.image" alt="bike image" v-bind:class="{unavailable: !this.bicycle.availability}"> -->
                <div>{{bicycle.name}}</div>
                <div>{{bicycle.price}}</div>
                <div>{{bicycle.type}}</div>
                <div>{{bicycle.availability ? "Yes" : "No"}}</div>
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
    .grid {
        /* padding:20px; */
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
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
