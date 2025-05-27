<template>
    <div v-if="stageInfo.stage === 'series' || stageInfo.stage === 'presentation'">        
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
            
            // Determine the stage based on the number of shots
            const fiveShotsSeries = Math.max(...this.fetchedData.map(p => p.matchShotCount)) <= 10;
            
            // Check the number of eliminations
            const firstElimination = active === 7;
            const secondElimination = active === 6;
            const thirdElimination = active === 5;
            const fourthElimination = active === 4;
            const fifthElimination = active === 3;
            const sixthElimination = active === 2;
            const finalElimination = active === 1;

            // Return the stage information
            return {
                fiveShotsSeries,
                firstElimination,
                secondElimination,
                thirdElimination,
                fourthElimination,
                fifthElimination,
                sixthElimination,
                finalElimination,
                hasShootOff,
                hasPendingElimination,
                stage: fiveShotsSeries ? 'series'
                    : firstElimination ? 'first-elimination'
                    : secondElimination ? 'second-elimination'
                    : thirdElimination ? 'third-elimination'
                    : fourthElimination ? 'fourth-elimination'
                    : fifthElimination ? 'fifth-elimination'
                    : sixthElimination ? 'sixth-elimination'
                    : finalElimination ? 'final-elimination'
                    : hasShootOff ? 'shootoff'
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