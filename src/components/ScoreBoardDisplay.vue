<template>
  <div class="scoreboard-container">
    <div class="scoreboard">
      <h1>Final Stage Overview</h1>
      <div class="participant-list">
        <div class="participant" v-for="(participant, index) in sortedParticipants" :key="participant.name">
          <div class="rank">{{ index + 1 }}</div>
          <div class="name-nation">
            <span class="name">{{ participant.name }}</span>
            <span class="nation">({{ participant.nation }})</span>
          </div>
          <div class="score">{{ participant.score }}</div>
          <div class="difference">{{ scoreDifference(participant.score) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreBoardDisplay",
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sortedParticipants() {
      return [...this.participants].sort((a, b) => b.score - a.score);
    },
  },
  methods: {
    scoreDifference(score) {
      const topScore = this.sortedParticipants[0].score;
      return topScore - score;
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
  background-color: transparent; /* Camera feed visible */
}

/* Smaller, cleaner scoreboard with rounded corners */
.scoreboard {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7); /* Darker background */
  padding: 2vh 2vw; /* Reduced padding */
  border-radius: 2vmax; /* Rounded corners */
  color: white;
  width: 40vw; /* Reduced width to fit better */
  max-width: 800px; /* Set a max width for larger screens */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.6); /* Subtle shadow */
}

.scoreboard h1 {
  margin-bottom: 1.5vh; /* Reduced margin */
  font-size: 2.5vmax; /* Smaller header font size */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Participant list with rounded design and no table look */
.participant-list {
  width: 100%;
}

.participant {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1vh 0; /* Space between participants */
  padding: 1vh 1vw; /* Reduced padding */
  background-color: rgba(0, 0, 0, 0.4); /* Subtle background */
  border-radius: 1vmax; /* Rounded corners for each row */
}

.rank {
  width: 4vmax; /* Smaller width for rank */
  height: 4vmax; /* Smaller height for rank */
  background-color: rgba(255, 255, 255, 0.2); /* Circle background */
  border-radius: 50%; /* Round circle */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8vmax; /* Smaller font size for rank */
  font-weight: bold;
  color: white;
}

.name-nation {
  flex-grow: 1; /* Take available space */
  text-align: left;
  margin-left: 1vw; /* Reduced margin */
}

.name {
  font-size: 1.8vmax; /* Smaller font size */
  font-weight: bold;
}

.nation {
  font-size: 1.3vmax; /* Smaller font size */
  color: rgba(255, 255, 255, 0.8); /* Lighter text for nation */
}

.score {
  font-size: 1.8vmax; /* Smaller font size */
  font-weight: bold;
  color: #ffdc00; /* Bright color for score */
  margin-right: 1vw; /* Reduced margin */
}

.difference {
  font-size: 1.3vmax; /* Smaller font size */
  color: rgba(255, 255, 255, 0.7); /* Subtle color for difference */
}
</style>
