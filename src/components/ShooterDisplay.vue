<!-- ShooterDisplay.vue -->
<template>
    <h1>Number of shoorters {{ numberOfShooters }}</h1>
    <div v-if="numberOfShooters >= 5" id="shootingDisplayContainer">
        <div v-for="(data, index) in activeShooters" :key="index" class="shootingDisplay">
            <!-- Display content for more than 4 shooters -->
            <svg class="target"></svg>
            <div class="scoreTextTopRight">SCORE:</div>
            <div class="">{{ data.shots[data.shots.length - 1].v }}</div>
            <div class="nameText">{{ data.name }}</div>
            <div class="clubText">{{ data.club }}</div>
            <p>{{ data.totalScore }}</p>
        </div>
    </div>
    <div v-else-if="numberOfShooters > 2 && numberOfShooters <= 4" id="shootingDisplayContainer">
        <div v-for="(data, index) in activeShooters" :key="index" class="shootingDisplay">
            <!-- Display content for more than 2 or equal to 4 shooters -->
            <svg class="target"></svg>
            <div class="scoreTextTopRight">SCORE:</div>
            <div class="">{{ data.shots[data.shots.length - 1].v }}</div>
            <div class="nameText">{{ data.name }}</div>
            <div class="clubText">{{ data.club }}</div>
            <p>{{ data.totalScore }}</p>
        </div>
    </div>
    <div v-else-if="numberOfShooters > 1 && numberOfShooters <= 2" id="shootingDisplayContainer">
        <div v-for="(data, index) in activeShooters" :key="index" class="shootingDisplay">
            <!-- Display content for more than 1 or equal to 2 shooters -->
            <svg class="target"></svg>
            <div class="scoreTextTopRight">SCORE:</div>
            <div class="">{{ data.shots[data.shots.length - 1].v }}</div>
            <div class="nameText">{{ data.name }}</div>
            <div class="clubText">{{ data.club }}</div>
            <p>{{ data.totalScore }}</p>
        </div>
    </div>
</template>

<script>
//import Targets from '@/components/Targets.vue';

export default {
    name: 'ShooterDisplay',
    props: {
        pushedData: {
            type: Array,
            required: true
        }
    },
    computed: {
        numberOfShooters() {
            return this.countNumberOfShooters(this.pushedData, 'flags');
        },
        activeShooters() {
            return this.removeShootersWithFlags(this.pushedData, 'flags', "E")
        },
        elimatedShooter() {
            return this.includeShootersWithFlags(this.pushedData, 'flags', "P")
        }
    },
    methods: {
        countNumberOfShooters(array, key) {
            let count = 0;
            for (let i = 0; i < array.length; i++) {
                if (array[i][key] === "" || array[i][key] === "P" ) {
                    count++;
                }
            }
            return count;
        },
        removeShootersWithFlags(array, key, value) {
            return array.filter(item => item[key] !== value);
        },
        includeShootersWithFlags(array, key, value) {
            return array.filter(item => item[key] === value);
        }
    }
};
</script>
  
<style scoped>
/* Styles for ShooterDisplay.vue */
</style>
  