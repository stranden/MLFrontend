<!-- Target.vue -->
<template>
  <div>
    <h2>Shooting Targets</h2>
    <svg class="targets-container" width="600" height="400">
      <!-- Render target here -->
      <g v-for="(target, index) in targetWithShots" :key="index">
        <circle v-for="(shot, index) in target.shots" :key="index"
          :cx="shot.x + offsetX" :cy="shot.y + offsetY" r="5" fill="red" />
        <circle :cx="offsetX" :cy="offsetY" :r="target.radius" :fill="target.color" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ShootingTargets',
  props: {
    shootingData: {
      type: Object,
      required: true
    }
  },
  /*computed: {
    targetsWithShots() {
      // Logic to group shots by targetId and calculate target positions
      // ...
    }
  },*/
  data() {
    return {
      offsetX: 300, // Adjust as needed
      offsetY: 200, // Adjust as needed
    };
  }
};
</script>

<style>
/* Styles for Targets.vue */
</style>
