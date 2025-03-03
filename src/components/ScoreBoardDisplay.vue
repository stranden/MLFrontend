<template>
    <div class="scoreboard-container">
        <div class="scoreboard">
            <div class="header">
                <div v-if="logos && logos.length">
                    <img class="logo" v-for="(logo, index) in logos" :key="index" :src="require(`@/assets/img/${logo}`)" :alt="`${logo.split('.')[0]}-Logo`" />
                </div>
                <div class="header-text">
                    <span class="title">{{ title }}</span>
                    <span class="discipline">{{ discipline }}</span>
                    <span class="status">{{ status }}</span>
                </div>
            </div>
            <div class="participant-list">
                <div class="participant" v-for="(participant, index) in sortedParticipants" :key="participant.name">
                    <div class="rank">{{ participant.rank }}</div>
                    <div class="name-nation">
                        <span class="nation" :class="countryFlag(participant.club)"></span>
                        <span class="name">{{ participant.name }}</span>
                    </div>
                    <div class="total-score-container">
                        <div class="total-score">{{ participant.totalScore }}</div>
                    </div>
                    <div class="info-container" v-html="notesContent(index, sortedParticipants)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/css/flag-icons.css';
import { convertIocToAlpha2 } from '@/assets/js/util/country.js';

export default {
    name: "ScoreBoardDisplay",
    props: {
        pushedData: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            logos: [], // Array to store logos
            title: "TITLE", // Default value if not provided in URL
            discipline: "DISCIPLINE", // Default value if not provided in URL
        };
    },
    created() {
        this.extractLogosFromUrl();
    },
    computed: {
        sortedParticipants() {
            // Sort participants based on their total score, descending
            // return [...this.pushedData].sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));
            let participants = [...this.pushedData].sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));

            // Assign ranks properly considering ties
            let rank = 1;
            for (let i = 0; i < participants.length; i++) {
                if (i > 0 && participants[i].totalScore === participants[i - 1].totalScore) {
                    participants[i].rank = participants[i - 1].rank; // Same rank as previous
                } else {
                    participants[i].rank = rank;
                }
                rank++;
            }
            return participants;
        },
        highestMatchShotCount() {
            if (!this.pushedData.length) return 0;
            return Math.max(...this.pushedData.map(pushedData => pushedData.matchShotCount));
        },
        status() {
            if (this.highestMatchShotCount === Math.max(...this.pushedData.map(pushedData => pushedData.matchSize))) {
                return `Final Standings after ${this.highestMatchShotCount} shots`;
            }
            return `Standing${this.highestMatchShotCount > 1 ? "s" : ""} after ${this.highestMatchShotCount} shot${this.highestMatchShotCount > 1 ? "s" : ""}`;
        }
    },
    methods: {
        notesContent(index, participants) {
            const participant = participants[index];
            const flags = participant.flags || [];
            const remainingShooters = participants.filter(
                (p) => !(p.flags || []).includes("E") && !(p.flags || []).includes("ES") && !(p.flags || []).includes("P")
            );

            if (remainingShooters.length === 1 && remainingShooters[0] === participant) {
                return `<div class="info">
                            <div class="rank-info">
                                <span class="medal-circle gold">1</span>
                            </div>
                            <div class="other-info">
                                <span class="final-text gold">GOLD</span>
                            </div>
                        </div>`;
            }

            if (flags.includes("E") || flags.includes("ES") || flags.includes("P")) {
                if (participant.rank === 2) {
                    return `<div class="info">
                                <div class="rank-info">
                                    <span class="medal-circle silver">2</span>
                                </div>
                                <div class="other-info">
                                    <span class="final-text silver">SILVER</span>
                                </div>
                            </div>`;
                } else if (participant.rank === 3) {
                    return `<div class="info">
                                <div class="rank-info">
                                    <span class="medal-circle bronze">3</span>
                                </div>
                                <div class="other-info">
                                    <span class="final-text bronze">BRONZE</span>
                                </div>
                            </div>`;
                }
                return `<div class="info">
                            <div class="rank-info">
                                <span class="medal-circle place">${participant.rank}</span>
                            </div>
                            <div class="other-info">
                                <span class="final-text place">PLACE</span>
                            </div>
                        </div>`;
            }

            if (flags.includes("T")) {
                return `<div class="info">
                            <div class="other-info">
                                <span class="difference-text">SHOOT OFF</span>
                            </div>
                        </div>`;
            }

            if (index === 0) {
                return `<div class="hidden"></div>`;
            }

            const currentScore = parseFloat(participant.totalScore);
            const aboveScore = parseFloat(participants[index - 1].totalScore);

            if (currentScore === aboveScore) {
                return "";
            }

            return `<div class="info">
                        <div class="other-info">
                            <span class="difference-text">${(aboveScore - currentScore).toFixed(1)}</span>
                        </div>
                    </div>`;
        },
        countryFlag(country) {
            return `fi fi-${convertIocToAlpha2(country).toLowerCase()} fi-rounded`;
        },
        extractLogosFromUrl() {
            // Use URLSearchParams to get the query string parameters
            const queryParams = new URLSearchParams(window.location.search);

            // Parse the logos from the parameter if available
            const logosParam = queryParams.get('logos'); // e.g., "dif.png,dsu.png"
            if (logosParam) {
                this.logos = logosParam.split(','); // Create an array of logo names
            }

            // Extract title
            const titleParam = queryParams.get("title");
            if (titleParam) {
                this.title = decodeURIComponent(titleParam); // Handle spaces and special characters
            }

            // Extract discipline
            const disciplineParam = queryParams.get("discipline");
            if (disciplineParam) {
                this.discipline = decodeURIComponent(disciplineParam);
            }
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
    align-items: center; /* Center-align items vertically */
    margin-bottom: 1.5rem;
    width: 100%;
}

/* Logo styling */
.header .logo {
    height: 10rem; /* Height of logo matches the height of four rows */
    width: auto;
    margin-right: 2.5rem; /* Space between logo and title */
}

.header-text {
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    text-align: left; /* Left-align text */
}

.header-text .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem; /* Add spacing between lines */
}

.header-text .discipline {
    font-size: 1.5rem;
    font-weight: medium;
    margin-bottom: 0.5rem;
}

.header-text .status {
    font-size: 1.2rem;
    font-weight: normal;
}

.header h1.title {
    color: #4a4a4a;
    text-align: left;
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
    border-top-left-radius: 1rem; /* Slightly rounded corners */
    border-top-right-radius: 1rem; /* Slightly rounded corners */
    border-bottom-left-radius: 1rem; /* Slightly rounded corners */
    border-bottom-right-radius: 1rem; /* Slightly rounded corners */
}

/* Difference between ranks */
::v-deep(.info) {
    display: inline-flex;
    align-items: center;
    background-color: #f5f5f5; /* Light gray background */
    height: 2.5rem;
    border-top-left-radius: 1rem; /* Slightly rounded corners */
    border-top-right-radius: 1rem; /* Slightly rounded corners */
    border-bottom-left-radius: 1rem; /* Slightly rounded corners */
    border-bottom-right-radius: 1rem; /* Slightly rounded corners */
    width: 100%;
}

::v-deep(.hidden) {
    background-color: none;
}

::v-deep(.rank-info) {
    font-weight: bold;
    color: #888;
}

::v-deep(.other-info) {
    font-size: 1.1rem;
    font-weight: bold;
    color: #888;
    width: 100%;
    text-align: center;
}

::v-deep(.difference-text) {
    font-size: 1.1rem;
    font-weight: bold;
    color: #888;
}

/* Final text styling */
::v-deep(.final-text) {
    display: inline-flex;
    align-items: center;
}
::v-deep(.final-text.gold) {
    color: #FFD700; /* Gold color */
    margin-left: -1rem;
}

::v-deep(.final-text.silver) {
    color: #C0C0C0; /* Silver color */
    margin-left: -1rem;
}

::v-deep(.final-text.bronze) {
    color: #CD7F32; /* Bronze color */
    margin-left: -1rem;
}

::v-deep(.final-text.place) {
    color: #888; /* Neutral dark color */
    margin-left: -1rem;
}

/* Medal icon as circle */
::v-deep(.medal-circle) {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    display: inline-flex;
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

::v-deep(.medal-circle.place) {
    background-color: #888;
}

/*
/* Gold medal circle 
::v-deep(.medal-circle.gold) {
  box-shadow: inset 0 0 0 darken(#f9ad0e, 15%), 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.08); /* 2px = 0.125rem
  border-color: lighten(adjust-hue(#f9ad0e, 10), 10%);
  text-shadow: 0 0 0.25rem darken(#f9ad0e, 20%); /* 4px = 0.25rem
  background: linear-gradient(to bottom right, #f9ad0e 50%, darken(#f9ad0e, 5%) 50%);
}

/* Silver medal circle
::v-deep(.medal-circle.silver) {
  box-shadow: inset 0 0 0 darken(#d1d7da, 15%), 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.08); /* 2px = 0.125rem 
  border-color: lighten(adjust-hue(#d1d7da, 10), 10%);
  text-shadow: 0 0 0.25rem darken(#d1d7da, 20%); /* 4px = 0.25rem 
  background: linear-gradient(to bottom right, #d1d7da 50%, darken(#d1d7da, 5%) 50%);
}

/* Bronze medal circle
::v-deep(.medal-circle.bronze) {
  box-shadow: inset 0 0 0 darken(#df7e08, 15%), 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.08); /* 2px = 0.125rem
  border-color: lighten(adjust-hue(#df7e08, 10), 10%);
  text-shadow: 0 0 0.25rem darken(#df7e08, 20%); /* 4px = 0.25rem
  background: linear-gradient(to bottom right, #df7e08 50%, darken(#df7e08, 5%) 50%);
}*/
</style>
