<template>
    <ShooterDisplay :pushedData="fetchedData" />
</template>

<script>
import ShooterDisplay from '@/components/ShooterDisplay.vue';
import ApiService from '@/services/ApiService';
import SocketService from '@/services/SocketService';

export default {
    name: 'IndividualFinal',
    components: {
        ShooterDisplay
    },
    data() {
        return {
            fetchedData: []
        };
    },
    async created() {
        try {
            // Fetch initial data from the API
            const responseData = await ApiService.fetchData();
            this.fetchedData = responseData.result;
            console.log('Fetched initial data from API:', this.fetchedData);

            // Listen for WebSocket events to update data
            SocketService.listen('update', () => {
                this.fetchDataAndUpdate();
            });
        } catch (error) {
            console.error('Error fetching initial data from API:', error);
        }
    },
    methods: {
        // Fetch data from API and update component data
        async fetchDataAndUpdate() {
            try {
                const responseData = await ApiService.fetchData();
                this.fetchedData = responseData.result;
                console.log('Fetched update data from API:', this.fetchedData);
            } catch (error) {
                console.error('Error fetching update data from API:', error);
            }
        }
    }
};
</script>

<style scoped>
/* Styles for ShooterDisplay.vue */
</style>