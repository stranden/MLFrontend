<template>        
    <div v-if="stageInfo.stage != 'unknown'" id="shootingDisplayContainer" :class="'stage-' + stageInfo.stage">
        <div v-for="(data, index) in activeShooters" :key="index" class="shootingDisplay" :class="getShooterClass(data.flags)">
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
                shootOffSeries,
                hasPendingElimination,
                stage: fiveShotsSeries ? 'series'
                    : firstSingleShotSeries ? 'first-single-shot-series'
                    : secondSingleShotSeries ? 'second-single-shot-series'
                    : thirdSingleShotSeries ? 'third-single-shot-series'
                    : fourthSingleShotSeries ? 'fourth-single-shot-series'
                    : fifthSingleShotSeries ? 'fifth-single-shot-series'
                    : sixthSingleShotSeries ? 'sixth-single-shot-series'
                    : seventhSingleShotSeries ? 'seventh-single-shot-series'
                    : shootOffSeries ? 'series-shootoff'
                    : hasPendingElimination ? 'presentation'
                    : 'unknown'
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
                'shootingDisplaySP': flags === 'SP'
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
/* Base container styling */
#shootingDisplayContainer {
    position: absolute;
    left: 5vmax;
    right: 5vmax;
    bottom: 5vmax;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    transition: all 0.5s ease;
    top: auto;
    height: auto;
}

/* Responsive shooter display styling */
.shootingDisplay {
    position: relative;
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    margin-bottom: 0;
}

/* Stage-based width and gap adjustments */
#shootingDisplayContainer.stage-series {
    gap: 1.75vmax;
}
#shootingDisplayContainer.stage-series .shootingDisplay {
    width: 20vmax;
}
#shootingDisplayContainer.stage-first-single-shot-series {
    gap: 1.75vmax;
}
/*#shootingDisplayContainer.stage-first-single-shot-series .shootingDisplay {
    width: 20vmax;
}*/
#shootingDisplayContainer.stage-second-single-shot-series {
    gap: 2.75vmax;
}
/*#shootingDisplayContainer.stage-second-single-shot-series .shootingDisplay {
    width: 20vmax;
}*/
#shootingDisplayContainer.stage-third-single-shot-series {
    gap: 3.75vmax;
}
/*#shootingDisplayContainer.stage-third-single-shot-series .shootingDisplay {
    width: 20vmax;
}*/
#shootingDisplayContainer.stage-fourth-single-shot-series {
    gap: 4.75vmax;
}
/*#shootingDisplayContainer.stage-fourth-single-shot-series .shootingDisplay {
    width: 20vmax;
}*/
#shootingDisplayContainer.stage-fifth-single-shot-series {
    gap: 5.75vmax;
}
/*#shootingDisplayContainer.stage-fifth-single-shot-series .shootingDisplay {
    width: 20vmax;
}*/
#shootingDisplayContainer.stage-sixth-single-shot-series {
    gap: 6.75vmax;
}
/*#shootingDisplayContainer.stage-sixth-single-shot-series .shootingDisplay {
    width: 20vmax;
}*/
#shootingDisplayContainer.stage-seventh-single-shot-series {
    gap: 7.75vmax;
}
/*#shootingDisplayContainer.stage-seventh-single-shot-series .shootingDisplay {
    width: 20vmax;
}*/
#shootingDisplayContainer.stage-series-shootoff {
    gap: 7.75vmax;
}
/*#shootingDisplayContainer.stage-series-shootoff .shootingDisplay {
    width: 20vmax;
}*/

/* Status overlays */
.shootingDisplayE::before,
.shootingDisplayES::before,
.shootingDisplayT::before,
.shootingDisplayP::before,
.shootingDisplaySP::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 10px;
}

.shootingDisplayE::before,
.shootingDisplayES::before {
    background-color: rgba(128, 128, 128, 0.75);
}

.shootingDisplayP::before,
.shootingDisplaySP::before {
    background-color: rgba(190, 28, 28, 0.5);
}

.shootingDisplayT::before {
    background-color: rgba(0, 143, 0, 0.5);
}

/* Inner element styles */
.scoreTextTopRightContainer,
.scoreShotValueContainer,
.scoreTotalContainer,
.scoreTotalTextContainer {
    position: relative;
    top: 0;
}

.scoreTextTopRightContainer .scoreTextTopRight,
.scoreShotValueContainer .scoreShotValue,
.scoreTotalContainer .scoreTotal,
.scoreTotalTextContainer .scoreTotalText {
    position: relative;
    left: 4.25vmax;
    width: calc(100% - 4.25vmax);
    display: flex;
    justify-content: center;
    align-items: center;
}

.scoreTextTopRightContainer {
    background-color: #cecece;
    border-top-right-radius: 10px;
    opacity: 0.5;
}

.scoreTextTopRightContainer .scoreTextTopRight {
    height: 1.5vh;
    font-style: italic;
    font-weight: bolder;
    font-size: 0.8rem;
}

.scoreShotValueContainer {
    background-color: #37a746;
}

.scoreShotValueContainer .scoreShotValue {
    height: 2.5vh;
    font-weight: bold;
    font-size: 1.5rem;
}

.scoreTotalContainer,
.scoreTotalTextContainer {
    width: 100%;
}

.scoreTotalContainer {
    background-color: #004e0a;
}

.scoreTotalContainer .scoreTotal {
    height: 2.5vh;
    font-weight: bold;
    font-size: 1.5rem;
    color: #eeeeee;
}

.scoreTotalTextContainer {
    background-color: #cecece;
}

.scoreTotalTextContainer .scoreTotalText {
    height: 2vh;
    font-style: italic;
    font-weight: bolder;
    font-size: 0.8rem;
}

.nameTextContainer,
.clubTextContainer {
    width: 100%;
}

.nameTextContainer .nameText,
.clubTextContainer .clubText {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 0.25vw;
}

.nameTextContainer {
    background-color: #3b3b3b;
    opacity: 1;
}

.nameTextContainer .nameText {
    height: 2.5vh;
    font-weight: bold;
    font-size: 1.25rem;
    color: #eeeeee;
}

.clubTextContainer {
    background-color: #cecece;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.clubTextContainer .clubText {
    height: 2vh;
}

.clubTextContainer .clubText img {
    height: 1vh;
    border-radius: 25%;
}

.clubTextContainer .clubText span {
    font-weight: bolder;
    font-size: 1rem;
    padding-left: 0.25vw;
}
</style>