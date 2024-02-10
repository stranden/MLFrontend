<template>
    <div v-for="(data, index) in shots" :key="index" class="shootingDisplay">
        <p>{{ data.x }}</p>
        <p>{{ data.y }}</p>
        <p>{{ data.nr }}</p>
    </div>
    <!--<svg class="target" ref="targetSVG"></svg>-->
</template>

<script>
//import { drawTargetWithShots } from '@/assets/js/target.js'; // Import the drawTargetWithShots function

export default {
    name: 'ShootingTarget',
    props: {
        targetName: {
            type: String, // Change type to String
            required: true
        },
        shots: {
            type: Array,
            required: true
        }
    },
    /*mounted() {
        drawTargetWithShots(this.targetName, this.$refs.targetSVG, this.shots);
    }*/
};
</script>

<style scoped>
/* Styles for Target.vue */
</style>
