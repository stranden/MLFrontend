<!-- ShooterDisplay.vue -->
<template>
    <div v-for="(data, index) in pushedData" :key="index" class="shootingDispay">
        <!-- Display other content here -->
        <p>{{ data.name }}</p>
        <p>{{ data.club }}</p>
        <p>{{ data.seriesScore }}</p>
    </div>
</template>
  
<script>
//import Targets from '@/components/Targets.vue';

export default {
    name: 'ShooterDisplay',
    props: {
        pushedData: {
            type: Array,
            required: true
        }
    }
};
</script>
  
<style scoped>
/* Styles for ShooterDisplay.vue */
</style>
  