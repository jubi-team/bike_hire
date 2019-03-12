<template>
    <div class="grid">
        <div>{{history.firstName}}</div>
        <div>{{history.lastName}}</div>
        <div>{{history.phone}}</div>
        <div>{{history.date}}</div>
    </div>
</template>

<script>
export default {
    name: 'History',
    props: ['history'],
}
</script>

<style scoped>
    
</style>
