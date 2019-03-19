<template>
  <div id="app">
    <nav class="navbar navbar-expand bg-transparent">
      <div class="container nav-container">
        <router-link to="/staff/bikes" class="navbar-brand">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaPVcqc3HeVZnrrgZdIVqhePSFV3RH3-Jn5LNm-zftmN1r2E74" class="logo-image" alt="logo">
        </router-link>
        <div class="navbar-right">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="user">
              <router-link to="/staff/bikes" class="nav-link">Bikes</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link to="/staff/bookings" class="nav-link">Bookings</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <a v-on:click="logOut">
                <!-- <button v-on:click="signOut">Sign out</button> -->
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <transition name="router-anim" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
    <router-view/>
    </transition>
  </div>
</template>

<script>
  import Nav  from './components/staff/Nav.vue'

export default {
  name: 'App',
  data(){
    return {
      user: null
    }
  },
  methods: {
    authenticate() {
      this.user = this.$store.getters.getUser
      if(!this.user) {
        this.$router.push({ path: '/staff/login'})
      }
    },
    logOut() {
      this.$store.commit('testUser', null)
      this.$router.push({ path: '/staff/login' })
    }
  },
  created() {
    this.authenticate()
  },
  beforeUpdate() {
    this.authenticate()
  },
}
</script>

<style lang="scss">
  @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

  body {
    background-color: #F4F6FA;

     #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
      color: #2c3e50;
      display: flex;
      flex-direction: column;
      min-height: 100vh;

      nav {
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
        position: relative;

        &.bg-transparent {
          background-color:#1B8D5F !important;
        }

        .nav-container{
          padding: 15px;

           .navbar-brand{

             &:after {
              content: 'Bike Rentals';
              color: #fff;
              position: relative;
              top: 8px;
              left: 10px;
            }

             img {
                &.logo-image{
                      width:60px;
                }
              }
           }

            div.navbar-right {
              ul {
                li.nav-item {
                  display: flex;
                  align-items: center;

                  &:not(:last-child) {
                    margin-right: 20px;
                  }

                  a {
                    color: #fff;
                    font-size: 16px;
                    text-transform: uppercase;
                    padding: 7px;

                    &:after {
                      content: '';
                      display: block;
                      width: 0;
                      height: 2px;
                      background: #fff;
                      transition: width .3s;
                      
                    }

                    &:hover:after {
                      width: 100%;
                    }
                  }
                }
              }
            }
        }
      }
    }

  }
 

  // li.nav-item a:hover:after {
  //   width: 100%;
  // }

  .router-anim{
    animation: coming 1s;
    animation-delay: .5s;
    opacity: 0;
  }

  .router-anim-leave-active {
    animation: going 1s;
  }

  .router-anim-enter-active {
    animation: coming 1s;
  }

  @keyframes coming {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50px);
      opacity: 0;
    }
  }

  @keyframes going {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  
</style>
