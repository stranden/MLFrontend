<template>
    <div id="leaderboardContainer" v-if="sortedShooters.length > 0">
        <table class="leaderboardTable">
            <tr v-for="(shooter, index) in sortedShooters" :key="shooter.startNr">
                <td class="leaderboardRankTextContainer">
                    <div v-if="shouldShowRank(index)" class="leaderboardRankText">{{ shooter.rank }}</div>
                </td>
                <td class="leaderboardShooterContainer">
                    <span class="leaderboardShooterFlag" :class="countryFlag(shooter.club)"></span>
                    <div class="nameTextContainer">
                        <div class="nameText">{{ formatName(shooter.name) }}</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import SocketService from '@/services/SocketService';

import '@/assets/css/flag-icons.css';
import { convertIocToAlpha2 } from '@/assets/js/country.js';

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
        countryFlag(country) {
            return `fi fi-${convertIocToAlpha2(country).toLowerCase()} fis`;
        },
        formatName(name) {
            const nameParts = name.split(' ');
            const lastName = nameParts[0] || '';
            const firstName = nameParts[1] || '';
            const middleNames = nameParts.slice(2);

            // Function to truncate middle names with special handling for Danish letters
            const truncateMiddleName = (name) => {
                if (name.startsWith('Aa') || name.startsWith('Ae') || name.startsWith('Oe')) {
                    return name.substring(0, 2) + '.';
                } else if (name.length > 0) {
                    return name[0] + '.';
                } else {
                    return '';
                }
            };

            // Create truncated first name and middle names initials
            const truncatedFirstName = firstName.length > 1 ? `${firstName[0]}.` : firstName;
            const truncatedMiddleNames = middleNames.map(truncateMiddleName).join(' ');

            // Combine the parts
            const truncatedFullName = `${lastName} ${truncatedFirstName} ${truncatedMiddleNames}`.trim();
            const fullNameWithTruncatedMiddleNames = `${lastName} ${firstName} ${truncatedMiddleNames}`.trim();
            const fullName = `${lastName} ${firstName} ${middleNames.join(' ')}`.trim();

            // Check the lengths and return appropriately
            if (lastName.length >= 18) {
                return lastName; // Only display last name if it equals or exceeds 18 characters
            }

            if (fullName.length >= 19 && fullNameWithTruncatedMiddleNames.length <= 19) {
                return fullNameWithTruncatedMiddleNames;
            }

            if (fullNameWithTruncatedMiddleNames.length >= 19) {
                return truncatedFullName;
            }

            return fullName;
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
    #leaderboardContainer {
        position: absolute;
        top: 5vmax;
        left: 2vmax;
        width: 10vmax; /* Adjusted width to keep it on the left side */
        height: auto; /* Adjust height to fit content */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .leaderboardTable {
        width: 100%;
        border-collapse: separate; /* Use separate borders */
        border-spacing: 0.4vmax 0; /* Add spacing between rows */
    }

    .leaderboardTable tr {
        display: flex;
        align-items: center;
        height: 1.5vmax; /* Adjust row height */
        padding: 0.2vmax 0; /* Add padding for space between rows */
    }

    .leaderboardTable td {
        padding: 0; /* Remove padding */
        text-align: left;
    }

    .leaderboardRankTextContainer {
        background-color: rgba(55, 167, 70, 0.75);
        border-top-left-radius: 0.4vmax; /* Rounded left end */
        border-bottom-left-radius: 0.4vmax; /* Rounded left end */
        text-align: center;
        width: 2vmax; /* Adjust width to fit the design */
        height: 1.5vmax; /* Set height to match the row height */
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0; /* Remove margin between rank and shooter container */
    }

    .leaderboardRankText {
        font-weight: bold;
        color: white;
        font-size: 0.8vmax; /* Increased font size slightly */
        line-height: 1.5vmax; /* Ensures the text is centered vertically */
    }

    .leaderboardShooterContainer {
        display: flex;
        align-items: center;
        gap: 0.2vmax; /* Adjust gap to make it smaller */
        background-color: rgba(55, 167, 70, 0.75); /* Green background */
        border-top-right-radius: 0.4vmax; /* Rounded right end */
        border-bottom-right-radius: 0.4vmax; /* Rounded right end */
        height: 1.5vmax; /* Set height to match the row height */
        padding: 0 0.4vmax; /* Horizontal padding inside the container */
        flex-grow: 1; /* Make it expand to fill available space */
    }

    .leaderboardShooterFlag {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.0vmax; /* Set container height to match row height */
        width: 1.0vmax; /* Set container width to match row height */
        border-top-left-radius: 0.25vmax; /* Remove top-left border radius */
        border-bottom-left-radius: 0.25vmax; /* Remove bottom-left border radius */
        border-top-right-radius: 0.25vmax; /* Rounded top-right corner */
        border-bottom-right-radius: 0.25vmax; /* Rounded bottom-right corner */
        border-radius: 1vmax; /* Make the container a circle */
        overflow: hidden; /* Ensure the image doesn't overflow */
    }

    .leaderboardShooterFlag img {
        height: 100%; /* Zoom out the flag image */
        width: 100%; /* Zoom out the flag image */
        object-fit: cover; /* Ensure the image covers the container */
        object-position: center; /* Center the image in the container */
    }

    .nameTextContainer {
        display: flex;
        align-items: center;
        max-width: 7.5vmax; /* Shorten the length of the name column */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; /* Add ellipsis if the name is too long */
    }

    .nameText {
        font-size: 0.7vmax; /* Adjust font size */
        color: white; /* Changed text color to white for better contrast */
    }

    .new-rank {
        animation: highlight 1s ease-in-out;
    }

    @keyframes highlight {
        0% { background-color: yellow; }
        100% { background-color: transparent; }
    }
</style>
