<template>
    <div class="main">
        <div class="login">
            <h1>login</h1>
            <input v-model="name" placeholder="name">
            <input v-model="password" placeholder="password">
            <button v-on:click="login">login</button>
        </div>
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
                        this.$router.push({ path: '/staff/bikes' })
    
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
                this.$router.push({ path: '/staff/bikes'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        flex-grow: 1;
    }

    .login {
        width: 50%;
        margin-left: 25%;
        margin-top: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            background: #fff;
            height: 40px;
            width: 300px;
            padding: 10px;
            outline: none;
            margin-bottom: 10px;
            border: 1px solid #fff;
            transition: all 0.1s ease-in;

            &:focus {
                border: 1px solid #ddd;
            }
        }

        button {
            padding: 10px;
            background: #1B8D5F;
            color: #fff;
            font-weight: 600;
            width: 300px;
            text-transform: uppercase;
            transition: all 0.1s ease-in;

            &:hover {
                background: #15704C;
            }
        }
    }


</style>
