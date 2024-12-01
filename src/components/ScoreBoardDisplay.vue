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
                    <div class="difference" v-html="scoreDifference(index, sortedParticipants)">
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

            // Check if there's only one shooter left after filtering out E or ES shooters
            const remainingShooters = participants.filter(
                (p) => !(p.flags || []).includes("E") && !(p.flags || []).includes("ES")
            );

            if (remainingShooters.length === 1 && remainingShooters[0] === participant) {
                return `<span class="gold-medal">
                            <span class="medal-circle gold">1</span>
                            GOLD
                        </span>`;
            }

            // Special flag handling for E and ES
            if (flags.includes("E") || flags.includes("ES")) {
                const rank = participant.rank;
                if (rank === 2) {
                    return `<span class="silver-medal">
                                <span class="medal-circle silver">2</span>
                                SILVER
                            </span>`;
                } else if (rank === 3) {
                    return `<span class="bronze-medal">
                                <span class="medal-circle bronze">3</span>
                                BRONZE
                            </span>`;
                } else if (rank >= 4 && rank <= 8) {
                    // For ranks 4th to 8th, display the rank with "PLACE"
                    return `${rank}<sup>TH</sup> PLACE`;
                } else {
                    return ""; // No difference for other ranks
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

            // If scores are equal, do not show a difference
            if (currentScore === aboveScore) {
                return ""; // Return empty string for participants with equal scores
            }

            return `${(aboveScore - currentScore).toFixed(1)}`;
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
}

/* Medal styling */
::v-deep(.gold-medal) {
    color: #FFD700; /* Gold color */
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}

::v-deep(.silver-medal) {
    color: #C0C0C0; /* Silver color */
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}

::v-deep(.bronze-medal) {
    color: #CD7F32; /* Bronze color */
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}

/* Medal icon as circle */
::v-deep(.medal-circle) {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

::v-deep(.medal-circle.gold) {
    background-color: #FFD700;
}

::v-deep(.medal-circle.silver) {
    background-color: #C0C0C0;
}

::v-deep(.medal-circle.bronze) {
    background-color: #CD7F32;
}
/*
::v-deep(.medal-circle) {
  font-family: 'Roboto', sans-serif;
  font-size: 1.75rem;
  font-weight: 500;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 2.875rem;
  vertical-align: middle;
  position: relative;
  border-width: 0.125rem;
  border-style: solid;
  z-index: 1;
}*/

/* Gold medal circle */
::v-deep(.medal-circle.gold) {
  box-shadow: inset 0 0 0 darken(#f9ad0e, 15%), 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.08); /* 2px = 0.125rem */
  border-color: lighten(adjust-hue(#f9ad0e, 10), 10%);
  text-shadow: 0 0 0.25rem darken(#f9ad0e, 20%); /* 4px = 0.25rem */
  background: linear-gradient(to bottom right, #f9ad0e 50%, darken(#f9ad0e, 5%) 50%);
}

/* Silver medal circle */
::v-deep(.medal-circle.silver) {
  box-shadow: inset 0 0 0 darken(#d1d7da, 15%), 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.08); /* 2px = 0.125rem */
  border-color: lighten(adjust-hue(#d1d7da, 10), 10%);
  text-shadow: 0 0 0.25rem darken(#d1d7da, 20%); /* 4px = 0.25rem */
  background: linear-gradient(to bottom right, #d1d7da 50%, darken(#d1d7da, 5%) 50%);
}

/* Bronze medal circle */
::v-deep(.medal-circle.bronze) {
  box-shadow: inset 0 0 0 darken(#df7e08, 15%), 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.08); /* 2px = 0.125rem */
  border-color: lighten(adjust-hue(#df7e08, 10), 10%);
  text-shadow: 0 0 0.25rem darken(#df7e08, 20%); /* 4px = 0.25rem */
  background: linear-gradient(to bottom right, #df7e08 50%, darken(#df7e08, 5%) 50%);
}
</style>
