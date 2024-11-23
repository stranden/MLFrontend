<template>
    <div class="scoreboard-container">
        <div class="scoreboard">
            <div class="header">
                <img class="logo" src="@/assets/img/dif.png" alt="Logo" />
                <h1>Final Stage Overview</h1>
            </div>
            <div class="participant-list">
                <div class="participant" v-for="(participant, index) in sortedParticipants" :key="participant.name">
                    <div class="rank">{{ index + 1 }}</div>
                    <div class="name-nation">
                        <span class="nation" :class="countryFlag(participant.club)"></span>
                        <span class="name">{{ participant.name }}</span>
                    </div>
                    <div class="total-score-container">
                        <div class="total-score">{{ participant.totalScore }}</div>
                    </div>
                    <div class="difference">
                        <span v-html="scoreDifference(index, sortedParticipants)"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/css/flag-icons.css';
import { convertIocToAlpha2 } from '@/assets/js/country.js';

export default {
    name: "ScoreBoardDisplay",
    props: {
        pushedData: {
            type: Array,
            required: true,
        },
    },
    computed: {
        sortedParticipants() {
            // Sort participants based on their total score, descending
            return [...this.pushedData].sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));
        },
    },
    methods: {
        scoreDifference(index, participants) {
            const participant = participants[index];
            const flags = participant.flags || []; // Default to empty array if no flags

            // Special flag handling for E and ES
            if (flags.includes("E") || flags.includes("ES")) {
                const rank = participant.rank;
                if (rank === 3) {
                    return "BRONZE";
                } else if (rank === 2) {
                    return "SILVER";
                } else if (rank === 1) {
                    return "GOLD";
                } else if (rank >= 4 && rank <= 8) {
                    return `${rank}<sup>TH</sup> PLACE` // Add "TH" for 4th to 8th place
                } else {
                    return `Final Position: ${rank}`; // Default message for other ranks
                }
            }
            
            // Special flag handling
            if (flags.includes("T")) {
                return "In Shoot-Off";
            } 

            // Default case: calculate score difference
            if (index === 0) {
                return ""; // No difference for the top participant
            }
            const currentScore = parseFloat(participant.totalScore);
            const aboveScore = parseFloat(participants[index - 1].totalScore);
            return `-${(aboveScore - currentScore).toFixed(1)}`;
        },
        countryFlag(country) {
            return `fi fi-${convertIocToAlpha2(country).toLowerCase()} fi-rounded`;
        }
    },
};
</script>

<style scoped>
/* Centered container */
.scoreboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: transparent; /* Transparent to allow background visuals */
}

/* Scoreboard styling */
.scoreboard {
    text-align: center;
    background-color: rgba(255, 255, 255, 0.85); /* White background to match the uploaded example */
    padding: 2vh 2vw;
    border-radius: 1rem; /* Rounded edges for modern style */
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15); /* Light shadow for subtle depth */
    width: 35vw; /* Adjust size to fit content */
    position: relative; /* Allows for absolute positioning of the title */
}

/* Header grid layout */
.header {
    display: grid;
    grid-template-columns: auto 1fr; /* First column for logo, second column for title */
    align-items: center;
    margin-bottom: 1.5rem;
    width: 100%;
}

/* Logo styling */
.header .logo {
    height: 10rem; /* Height of logo matches the height of four rows */
    width: auto;
    margin-right: 1rem; /* Space between logo and title */
}

/* Header title horizontally centered */
.header h1 {
    font-size: 1.8rem;
    color: #4a4a4a;
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* Center horizontally */
    top: 6rem; /* Adjust top to position vertically, so it's not over the logo */
}

/* Participant list container */
.participant-list {
    width: 100%;
}

/* Each participant row */
.participant {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 1fr; /* Adjusted grid to remove the last-series column */
    align-items: center; /* Center-align items vertically */
    padding: 1rem;
    margin: 0.2rem 0; /* Space between rows */
    border-bottom: 1px solid #ddd; /* Subtle row separator */
}

.participant:last-child {
    border-bottom: none; /* Remove the last row border */
}

/* Rank circle styling */
.rank {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background-color: #1c9c4a; /* Green background for rank */
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%; /* Makes it circular */
}

/* Name and nation flags */
.name-nation {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nation {
    height: 2.5rem; /* Adjust size to match the rank circle */
    width: 2.5rem; /* Adjust size to match the rank circle */
    border-top-left-radius: 25%; /* Slightly rounded corners */
    border-top-right-radius: 25%; /* Slightly rounded corners */
    border-bottom-left-radius: 25%; /* Slightly rounded corners */
    border-bottom-right-radius: 25%; /* Slightly rounded corners */
}

.name {
    font-size: 1.3rem; /* Slightly larger font for the name */
    font-weight: bold;
    color: #333; /* Neutral dark color */
}

/* Total score */
.total-score-container {
    font-size: 1.2rem; /* Increased font size to match rank and name */
    font-weight: bold;
    /* color: #333; /* Neutral dark color */
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Total score */
.total-score {
    background-color: #1c9c4a; /* Green background for rank */
    height: 2.5rem;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 0.5rem; /* Slightly rounded corners */
    border-top-right-radius: 0.5rem; /* Slightly rounded corners */
    border-bottom-left-radius: 0.5rem; /* Slightly rounded corners */
    border-bottom-right-radius: 0.5rem; /* Slightly rounded corners */
}

/* Difference */
.difference {
    font-size: 1.1rem; /* Increased font size for better visibility */
    font-weight: bold;
    color: #888; /* Subtle gray for differences */
    text-align: center;
}
</style>
