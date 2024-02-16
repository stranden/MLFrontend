<!-- ShooterDisplay.vue -->
<template>
    <!--<h1>Number of shoorters {{ numberOfShooters }}</h1>-->
    <!--<div v-if="numberOfShooters >= 5" id="shootingDisplayContainer">-->
    <div id="shootingDisplayContainer">
        <div v-for="(data, index) in activeShooters" :key="index" class="shootingDisplay">
            <Target :targetName="data.targetId" :shotData="extractShotsForShooter(data)" />
            <div class="scoreTextTopRightContainer">
                <div class="scoreTextTopRight">SCORE</div>
            </div>
            <div class="scoreShotValueContainer">
                <div class="scoreShotValue">{{ data.shots.length > 0 ? data.shots[data.shots.length - 1].vd : '0.0' }}</div>
            </div>
            <div class="scoreTotalContainer">
                <div class="scoreTotal">{{ data.totalScore }}</div>
            </div>
            <div class="scoreTotalTextContainer">
                <div class="scoreTotalText">Total</div>
            </div>
            <div class="nameTextContainer">
                <div class="nameText">{{ data.name }}</div>
            </div>
            <div class="clubTextContainer">
                <div class="clubText"><img :src="svgSource(data.club)" alt="nation" /><span>{{ data.club }}</span></div>
            </div>
        </div>
    </div>
    <!--<div v-else-if="numberOfShooters > 2 && numberOfShooters <= 4" id="shootingDisplayContainer">
        <div v-for="(data, index) in activeShooters" :key="index" class="shootingDisplay">
            <Target :targetName="data.targetId" :shotData="extractShotsForShooter(data)" />
            <div class="scoreTextTopRightContainer">
                <div class="scoreTextTopRight">SCORE</div>
            </div>
            <div class="scoreShotValueContainer">
                <div class="scoreShotValue">{{ data.shots.length > 0 ? data.shots[data.shots.length - 1].vd : '0.0' }}</div>
            </div>
            <div class="scoreTotalContainer">
                <div class="scoreTotal">{{ data.totalScore }}</div>
            </div>
            <div class="scoreTotalTextContainer">
                <div class="scoreTotalText">Total</div>
            </div>
            <div class="nameTextContainer">
                <div class="nameText">{{ data.name }}</div>
            </div>
            <div class="clubTextContainer">
                <div class="clubText"><img :src="svgSource(data.club)" alt="nation" /><span>{{ data.club }}</span></div>
            </div>
        </div>
    </div>
    <div v-else-if="numberOfShooters > 1 && numberOfShooters <= 2" id="shootingDisplayContainer">
        <div v-for="(data, index) in activeShooters" :key="index" class="shootingDisplay">
            <Target :targetName="data.targetId" :shotData="extractShotsForShooter(data)" />
            <div class="scoreTextTopRightContainer">
                <div class="scoreTextTopRight">SCORE</div>
            </div>
            <div class="scoreShotValueContainer">
                <div class="scoreShotValue">{{ data.shots.length > 0 ? data.shots[data.shots.length - 1].vd : '0.0' }}</div>
            </div>
            <div class="scoreTotalContainer">
                <div class="scoreTotal">{{ data.totalScore }}</div>
            </div>
            <div class="scoreTotalTextContainer">
                <div class="scoreTotalText">Total</div>
            </div>
            <div class="nameTextContainer">
                <div class="nameText">{{ data.name }}</div>
            </div>
            <div class="clubTextContainer">
                <div class="clubText"><img :src="svgSource(data.club)" alt="nation" /><span>{{ data.club }}</span></div>
            </div>
        </div>
    </div>-->
</template>

<script>
import Target from '@/components/Target.vue';

export default {
    name: 'ShooterDisplay',
    components: {
        Target
    },
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
        allShooters() {
            return this.includeAllShooters(this.pushedData)
        },
        elimatedShooter() {
            return this.includeShootersWithFlags(this.pushedData, 'flags', "P")
        }
    },
    methods: {
        countNumberOfShooters(array, key) {
            let count = 0;
            for (let i = 0; i < array.length; i++) {
                if (array[i][key] === "" || array[i][key] === "P") {
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
        },
        includeAllShooters(array) {
            return array.filter(item => item['flags'] === '' && item['flags'] === 'E' && item['flags'] === 'P');
        },
        svgSource(country) {
            if (country) {
                return require(`@/assets/img/flags/${country}.svg`);
            }
        },
        extractShotsForShooter(array) {
            this.shotsData = [];
            if (array) {
                array.shots.forEach(shot => {
                    this.shotsData.push({
                        x: shot.x,
                        y: shot.y
                    });
                });
            }
            console.log('Extracted shots for a lane ', array.fp,' :', this.shotsData);
            return this.shotsData
        }
    }
};
</script>
  
<style scoped>
/* Styles for ShooterDisplay.vue */
</style>
  