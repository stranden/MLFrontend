<template>
  <div>
    <h1>Shooting Range Results</h1>
    <Targets :shootingData="shootingData" />
  </div>
</template>

<script>
import Targets from '@/components/Targets.vue';
import axios from 'axios';

export default {
  name: 'IndividualFinal',
  components: {
    Targets
  },
  data() {
    return {
      shootingData: null
    };
  },
  created() {
    // Fetch shooting data from the API
    axios.get('http://your-api-url/shooting-data-endpoint')
      .then(response => {
        this.shootingData = response.data;
      })
      .catch(error => {
        console.error('Error fetching shooting data:', error);
      });
  }
};
</script>