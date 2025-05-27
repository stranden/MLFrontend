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
                    <div class="clubText"><img :src="svgSource(parseClubData(data.club).nation)" alt="nation" /><span>{{ parseClubData(data.club).club }}</span></div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="stageInfo.seriesTypeShootoff">        
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
                seriesTypeShootoff,
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
                    : seriesTypeShootoff ? 'series-type-shootoff'
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
/* Add styles for IndividualFinal */
</style>