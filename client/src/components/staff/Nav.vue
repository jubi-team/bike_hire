<template>
    <div>
        <router-link v-bind:to="{ name: 'StaffBikesComponent'}">Bikes</router-link>
        <router-link v-bind:to="{ name: 'StaffBookingsComponent'}">Bookings</router-link>
        <router-link v-on:click="signOut">Sign out</router-link>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    methods: {
        logOut() {
            this.$store.commit('testUser', null)
            this.$router.push({ path: '/staff/login' })
        }
    }
}
</script>

<style scoped>

</style>
