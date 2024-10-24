<template>
    <div>
      <ScoreBoardDisplay :participants="finalParticipants" />
    </div>
  </template>
  
  <script>
  import ScoreBoardDisplay from '@/components/ScoreBoardDisplay.vue';
  
  export default {
    name: 'ScoreBoard',
    data() {
      return {
        finalParticipants: [
          { name: "John Doe", nation: "USA", score: 98 },
          { name: "Emily Clarke", nation: "UK", score: 96 },
          { name: "Carlos Diaz", nation: "Spain", score: 94 },
          { name: "Wei Zhang", nation: "China", score: 93 },
          { name: "Anna Ivanova", nation: "Russia", score: 92 },
          { name: "Lucia Rossi", nation: "Italy", score: 91 },
          { name: "Marta Pereira", nation: "Brazil", score: 89 },
          { name: "David Kim", nation: "South Korea", score: 88 },
        ],
      };
    },
    components: {
        ScoreBoardDisplay,
    },
  };
  </script>
  