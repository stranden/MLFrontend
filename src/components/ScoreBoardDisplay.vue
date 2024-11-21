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
            <span class="nation"><img :src="svgSource(participant.club)" alt="nation" /></span>
            <span class="name">{{ participant.name }}</span>
          </div>
          <!--<div class="last-series">
            {{ participant.lastSeries ? participant.lastSeries : '' }}
          </div>-->
          <div class="total-score">{{ participant.totalScore }}</div>
          <div class="difference">
            {{ scoreDifference(index, sortedParticipants) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      // Hide difference for the top-ranked participant
      if (index === 0) {
        return ""; // No difference for the top participant
      }
      const currentScore = parseFloat(participants[index].totalScore);
      const aboveScore = parseFloat(participants[index - 1].totalScore);
      return `-${(aboveScore - currentScore).toFixed(1)}`;
    },
    svgSource(country) {
        if (country) {
            return require(`@/assets/img/flags/${country}.svg`);
        }
    },
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
  background-color: white; /* White background to match the uploaded example */
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
.logo {
  height: 10rem; /* Height of logo matches the height of four rows */
  width: auto;
  margin-right: 1rem; /* Space between logo and title */
}

/* Header title horizontally centered */
h1 {
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
  /* grid-template-columns: 1fr 3fr 1fr 1fr 1fr; /* Adjusted grid to remove the last-series column */
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

.nation img {
  height: 2rem; /* Resize nation flag for better visibility */
  border-radius: 0.2rem; /* Slight rounding for flag visuals */
}

.name {
  font-size: 1.2rem; /* Slightly larger font for the name */
  font-weight: bold;
  color: #333; /* Neutral dark color */
}

/* Total score */
.total-score {
  font-size: 1.2rem; /* Increased font size to match rank and name */
  font-weight: bold;
  color: #333; /* Neutral dark color */
  text-align: center;
}

/* Difference */
.difference {
  font-size: 1.1rem; /* Increased font size for better visibility */
  font-weight: bold;
  color: #888; /* Subtle gray for differences */
  text-align: center;
}
</style>
