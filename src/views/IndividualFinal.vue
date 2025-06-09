<template>
    <div v-if="stageInfo.fiveShotsSeries">        
        <div id="shootingDisplayContainer">
            <div v-for="(data, index) in activeShooters" :key="index" :class="getShooterClass(data.flags)">
                <Target :targetName="data.targetId" :shotData="extractShotsForShooter(data)" :flags="data.flags" />
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
                    <div class="nameText">{{ formatName(data.name) }}</div>
                </div>
                <div class="clubTextContainer">
                    <div class="clubText">
                        <img :src="svgSource(parseClubData(data.club).nation)" alt="nation" />
                        <span>{{ parseClubData(data.club).club }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="stageInfo.firstSingleShotSeries">        
        <div id="shootingDisplayContainer">
            <div v-for="(data, index) in activeShooters" :key="index" :class="getShooterClass(data.flags)">
                <Target :targetName="data.targetId" :shotData="extractShotsForShooter(data)" :flags="data.flags" />
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
                    <div class="nameText">{{ formatName(data.name) }}</div>
                </div>
                <div class="clubTextContainer">
                    <div class="clubText">
                        <img :src="svgSource(parseClubData(data.club).nation)" alt="nation" />
                        <span>{{ parseClubData(data.club).club }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="stageInfo.shootOffSeries">        
        <div id="shootingDisplayContainer">
            <div v-for="(data, index) in activeShooters" :key="index" :class="getShooterClass(data.flags)">
                <Target :targetName="data.targetId" :shotData="extractShotsForShooter(data)" :flags="data.flags" />
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
                    <div class="nameText">{{ formatName(data.name) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useLiveData } from '@/composables/useLiveData.js';
import { formatName, svgSource, parseClubData } from '@/assets/js/util.js';
import Target from '@/components/Target.vue';

export default {
    name: 'IndividualFinal',
    components: {
        Target
    },
    setup() {
        const { fetchedData } = useLiveData('fp');
        return { fetchedData, formatName, svgSource, parseClubData };
    },
    computed: {
        // Including all shooters (no filtering)
        allShooters() {
            return this.includeAllShooters(this.fetchedData);
        },
        // Active shooters excluding those with the 'E' flag
        activeShooters() {
            return this.removeShootersWithFlags(this.fetchedData, 'flags', ["E", "ES"]);
        },
        // Eliminated shooters with the 'P' flag
        eliminatedShooters() {
            return this.includeShootersWithFlags(this.fetchedData, 'flags', ["P", "SP"]);
        },
        stageInfo() {
            // Calculate the number of active shooters
            const active = this.activeShooters.length;

            // Check for specific flags in the fetched data
            const hasShootOff = this.fetchedData.some(s => s.flags === 'T');
            const hasPendingElimination = this.fetchedData.some(s => ['P', 'SP'].includes(s.flags));
            const seriesTypeShootoff = this.fetchedData.some(s => s.seriesType === 'shootoff');

            // Determine the stage based on the number of shots
            const fiveShotsSeries = Math.max(...this.fetchedData.map(p => p.matchShotCount)) <= 10;
            
            // Check the number of eliminations
            const firstSingleShotSeries = active === 8 && !fiveShotsSeries;
            const secondSingleShotSeries = active === 7 && !seriesTypeShootoff;
            const thirdSingleShotSeries = active === 6 && !seriesTypeShootoff;
            const fourthSingleShotSeries = active === 5 && !seriesTypeShootoff;
            const fifthSingleShotSeries = active === 4 && !seriesTypeShootoff;
            const sixthSingleShotSeries = active === 3 && !seriesTypeShootoff;
            const seventhSingleShotSeries = active === 2 && !seriesTypeShootoff;

            const shootOffSeries = seriesTypeShootoff && hasShootOff;

            // Return the stage information
            return {
                fiveShotsSeries,
                firstSingleShotSeries,
                secondSingleShotSeries,
                thirdSingleShotSeries,
                fourthSingleShotSeries,
                fifthSingleShotSeries,
                sixthSingleShotSeries,
                seventhSingleShotSeries,
                hasShootOff,
                shootOffSeries,
                hasPendingElimination,
                stage: fiveShotsSeries ? 'series'
                    : firstSingleShotSeries ? 'first-single-shot-series'
                    : secondSingleShotSeries ? 'second-single-shot-series'
                    : thirdSingleShotSeries ? 'third-single-shot-series'
                    : fourthSingleShotSeries ? 'fourth-single-shot-series'
                    : fifthSingleShotSeries ? 'fifth-single-shot-series'
                    : sixthSingleShotSeries ? 'sixth-single-shot-series'
                    : seventhSingleShotSeries ? 'final-single-shot-series'
                    : hasShootOff ? 'shootoff'
                    : shootOffSeries ? 'series-shootoff'
                    : hasPendingElimination ? 'presentation'
                    : 'regular'
            };
        }
    },
    methods: {
        extractShotsForShooter(shooter) {
            return shooter?.shots?.map(({ x, y }) => ({ x, y })) || [];
        },
        getShooterClass(flags) {
            return {
                'shootingDisplayE': flags === 'E',
                'shootingDisplayES': flags === 'ES',
                'shootingDisplayT': flags === 'T',
                'shootingDisplayP': flags === 'P',
                'shootingDisplaySP': flags === 'SP',
                'shootingDisplay': true
            };
        },
        // Include all shooters (no filtering)
        includeAllShooters(shooters) {
            return shooters;
        },
        // Remove shooters with a specific flag
        removeShootersWithFlags(shooters, flagKey, flagValues) {
            const values = Array.isArray(flagValues) ? flagValues : [flagValues];
            return shooters.filter(shooter => !values.includes(shooter[flagKey]));
        },
        // Include shooters with a specific flag
        includeShootersWithFlags(shooters, flagKey, flagValues) {
            const values = Array.isArray(flagValues) ? flagValues : [flagValues];
            return shooters.filter(shooter => values.includes(shooter[flagKey]));
        }
    }
};
</script>

<style scoped>
#shootingDisplayContainer {
    position: absolute;
    left: 5vmax;
    bottom: 5vmax;
    width: calc(100vw - 2 * 5vmax);
    display: flex;
    justify-content: center;
    gap: 2%;
}

.shootingDisplay {
    position: relative;
    flex: 1;
    column-gap: 0%;
}

/* Shooters which is eliminated normal */
.shootingDisplayE::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.75); /* Grey with 75% opacity */
    z-index: 2; /* Ensure it overlays the nested elements */
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

/* Shooters which is eliminated after shoot off */
.shootingDisplayES::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.75); /* Grey with 75% opacity */
    z-index: 2; /* Ensure it overlays the nested elements */
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

/* Shooters to be elminated */
.shootingDisplayP::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(190, 28, 28, 0.5); /* Red with 50% opacity */
    z-index: 2; /* Ensure it overlays the nested elements */
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

/* Shooters in a shoot off */
.shootingDisplayT::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 143, 0, 0.5); /* Green with 50% opacity */
    z-index: 2; /* Ensure it overlays the nested elements */
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

/* Shooters to be elminated in a shoot off*/
.shootingDisplaySP::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(190, 28, 28, 0.5); /* Red with 50% opacity */
    z-index: 2; /* Ensure it overlays the nested elements */
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.shootingDisplay .scoreTextTopRightContainer,
.shootingDisplay .scoreShotValueContainer,
.shootingDisplay .scoreTotalContainer,
.shootingDisplay .scoreTotalTextContainer {
    position: relative;
    top: 0;
}

.shootingDisplay .scoreTextTopRightContainer .scoreTextTopRight,
.shootingDisplay .scoreShotValueContainer .scoreShotValue,
.shootingDisplay .scoreTotalContainer .scoreTotal,
.shootingDisplay .scoreTotalTextContainer .scoreTotalText {
    position: relative;
    left: 4.25vmax; /* Adjust according to target size */
    width: calc(100% - 4.25vmax); /* Adjust width accordingly */
    display: flex;
    justify-content: center;
    align-items: center;
}

.shootingDisplay .scoreTextTopRightContainer {
    background-color: #cecece;
    border-top-right-radius: 10px;
    opacity: 0.5; /* 50% opacity */
}

.shootingDisplay .scoreTextTopRightContainer .scoreTextTopRight {
    height: 1.5vh;
    font-style: italic;
    font-weight: bolder;
    font-size: 0.8rem;
}

.shootingDisplay .scoreShotValueContainer {
    background-color: #37a746;
}

.shootingDisplay .scoreShotValueContainer .scoreShotValue {
    height: 2.5vh;
    font-weight: bold;
    font-size: 1.5rem;
}

.shootingDisplay .scoreTotalContainer,
.shootingDisplay .scoreTotalTextContainer {
    width: 100%; /* Adjust width accordingly */
}

.shootingDisplay .scoreTotalContainer {
    background-color: #004e0a;
}

.shootingDisplay .scoreTotalContainer .scoreTotal {
    height: 2.5vh;
    font-weight: bold;
    font-size: 1.5rem;
    color: #eeeeee;
}

.shootingDisplay .scoreTotalTextContainer {
    background-color: #cecece;
}

.shootingDisplay .scoreTotalTextContainer .scoreTotalText {
    height: 2vh;
    font-style: italic;
    font-weight: bolder;
    font-size: 0.8rem;
}

.shootingDisplay .nameTextContainer,
.shootingDisplay .clubTextContainer {
    width: 100%;
}

.shootingDisplay .nameTextContainer .nameText,
.shootingDisplay .clubTextContainer .clubText {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 0.25vw;
}

.shootingDisplay .nameTextContainer {
    background-color: #3b3b3b;
    opacity: 1; /* 50% opacity */
}

.shootingDisplay .nameTextContainer .nameText {
    height: 2.5vh;
    font-weight: bold;
    font-size: 1.25rem;
    color: #eeeeee;
}

.shootingDisplay .clubTextContainer {
    background-color: #cecece;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.shootingDisplay .clubTextContainer .clubText {
    height: 2vh;
}

.shootingDisplay .clubTextContainer .clubText img {
    height: 1vh;
    border-radius: 25%;
}

.shootingDisplay .clubTextContainer .clubText span {
    font-weight: bolder;
    font-size: 1rem;
    padding-left: 0.25vw;
}
</style>