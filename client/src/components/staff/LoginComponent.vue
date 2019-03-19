<template>
    <div>
        <!-- <Nav /> -->
        <h1>login</h1>
        <input v-model="name" placeholder="name">
        <input v-model="password" placeholder="password">
        <button v-on:click="login">login</button>

    </div>
</template>

<script>
    // import axios from 'axios';
    // import SingleBike  from './SingleBike.vue'
    // import Nav from './Nav.vue'
    // import BikeDetailsComponent  from './BikeDetails.vue' 
    import bikeService from '../../bikeService.js'
    

    export default {
        name: 'LoginComponent',
        components: {
            // SingleBike,
            // BikeDetailsComponent,
            // Nav
        },
        data(){
            return {
                users: [],
                name: 'AA',
                password: '123'
            }
        },
        
        methods: {
            async login() {
                try{
                    this.users = await bikeService.login(this.name, this.password);
                    if(this.users.length > 0) {

                        this.$store.commit('testUser', this.name)
                        this.$router.push({ path: '/staff' })
    
                    }else{
                        this.$store.commit('testUser', null)
                    }
                }catch(err){
                    this.error= err.message;
                    console.log(this.error)
                }
               
            }
        },
        created(){
            const loggedIn = this.$store.getters.getUser
            if(loggedIn) {
                this.$router.push({ path: '/staff'})
            }
        }
    }
</script>

<style scoped>

</style>
