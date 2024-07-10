<template>
    <div id="leaderboardContainer" v-if="sortedShooters.length > 0">
        <div v-for="(shooter, index) in sortedShooters" :key="shooter.startNr">
            <div class="leaderboardRow">
                <div class="leaderboardRankTextContainerUnique" v-if="shouldShowRank(index)">
                    <div class="leaderboardRankText">{{ shooter.rank }}</div>
                </div>
                <div class="leaderboardRankTextContainerTie" v-else></div>
                <div class="leaderboardShooterContainer">
                    <div class="leaderboardShooterFlag">
                        <img :src="svgSource(shooter.club)" alt="nation" />
                    </div>
                    <div class="leaderboardShooterName">{{ shooter.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import SocketService from '@/services/SocketService';

export default {
    name: 'LeaderBoard',
    data() {
        return {
            fetchedData: []
        };
    },
    computed: {
        sortedShooters() {
            // Filter out shooters with rank 0 and sort by rank
            return this.fetchedData
                .filter(shooter => shooter.rank > 0)
                .sort((a, b) => a.rank - b.rank);
        }
    },
    methods: {
        shouldShowRank(index) {
            // Show the rank only if it is the first occurrence in the sortedShooters array
            if (index === 0) return true;
            return this.sortedShooters[index].rank !== this.sortedShooters[index - 1].rank;
        },
        handleWebSocketData(data) {
            if (data.params && data.params.type === 'SHOT') {
                this.fetchDataAndUpdate();
            }
        },
        async fetchDataAndUpdate() {
            try {
                const responseData = await ApiService.fetchData();
                this.fetchedData = responseData.result;
                console.log('Fetched update data from API:', this.fetchedData);
            } catch (error) {
                console.error('Error fetching update data from API:', error);
            }
        },
        svgSource(country) {
            if (country) {
                return require(`@/assets/img/flags/${country}.svg`);
            }
        }
    },
    async created() {
        try {
            const responseData = await ApiService.fetchData();
            this.fetchedData = responseData.result;
            console.log('Fetched initial data from API:', this.fetchedData);

            SocketService.listen('update', (data) => {
                this.handleWebSocketData(data);
            });
        } catch (error) {
            console.error('Error fetching initial data from API:', error);
        }
    }
};
</script>

<style scoped>
    /* Styles for Leaderboard.vue */
    #leaderboardContainer {
        position: absolute;
        top: 5vmax; /* Adjusted to be at the top with 5vmax spacing */
        left: 2vmax; /* Adjusted to stick to the left side */
        width: calc(100vw - 4vmax); /* Adjust width dynamically */
        height: calc(100vh - 2 * 5vmax); /* Adjust height dynamically */
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2%;
    }
    
    .leaderboardRow {
        /* Your styles for each leaderboard row */
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .leaderboardRankTextContainerUnique {
        /* Your styles for the container of unique rank text */
        width: 30px; /* Example width */
    }
    
    .leaderboardRankTextContainerTie {
        /* Your styles for the container of tie rank text */
        width: 30px; /* Example width */
    }
    
    .leaderboardRankText {
        /* Your styles for the rank text */
        font-weight: bold;
        text-align: center;
    }
    
    .leaderboardShooterContainer {
        /* Your styles for the shooter container */
        flex: 1;
        display: flex;
        align-items: center;
    }
    
    .leaderboardShooterFlag img {
        height: 1vh;
        border-radius: 25%;
    }
    
    .leaderboardShooterName {
        /* Your styles for the shooter name */
    }
</style>
