<template>
    <div>
        <router-link v-bind:to="{ name: 'StaffBikeDetailsComponent', params: { id: bicycle._id }}">
            
            <div class="bike-grid">
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
    .bike-grid {
        display: grid;
        grid-template-columns: 1.3fr 1fr 1fr 0.8fr;
        /* background-color:#e8eaed; */
        text-transform: capitalize;
        font-size: 16px;
        font-weight: 600;
        padding:18px;
    }

    .box-bike:nth-child(odd) {
        background-color:#edeff1;
    }
    .box-bike a {
        color: #1B8D5F;
    }
    .box-bike a:hover {
        text-decoration: none;
    }

    .box-bike a:visited {
        color: #1B8D5F;
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
