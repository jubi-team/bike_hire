<template>
    <div>
        <router-link v-bind:to="{ name: 'StaffBikesComponent'}">Bikes</router-link>
        <router-link v-bind:to="{ name: 'StaffBookingsComponent'}">Bookings</router-link>
    </div>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style scoped>

</style>
