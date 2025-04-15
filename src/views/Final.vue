<template>
    <div id="shootingDisplayContainer">
        <div v-for="(data, index) in allShooters" :key="index" :class="getShooterClass(data.flags)">
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
</template>

<script>
import { useLiveData } from '@/composables/useLiveData.js';
import { formatName, svgSource } from '@/assets/js/util.js';
import Target from '@/components/Target.vue';

export default {
    name: 'IndividualFinal',
    components: {
        Target
    },
    setup() {
        const { fetchedData } = useLiveData('fp');
        return { fetchedData, formatName, svgSource };
    },
    computed: {
        // Number of shooters based on flags
        numberOfShooters() {
            return this.countNumberOfShooters(this.fetchedData, 'flags');
        },
        // Active shooters excluding those with the 'E' flag
        activeShooters() {
            return this.removeShootersWithFlags(this.fetchedData, 'flags', "E");
        },
        // Including all shooters (no filtering)
        allShooters() {
            return this.includeAllShooters(this.fetchedData);
        },
        // Eliminated shooters with the 'P' flag
        eliminatedShooters() {
            return this.includeShootersWithFlags(this.fetchedData, 'flags', "P");
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
        // Count number of shooters based on a specific flag
        countNumberOfShooters(shooters, flagKey) {
            return shooters.filter(shooter => shooter[flagKey]).length;
        },
        // Remove shooters with a specific flag
        removeShootersWithFlags(shooters, flagKey, flagValue) {
            return shooters.filter(shooter => shooter[flagKey] !== flagValue);
        },
        // Include all shooters (no filtering)
        includeAllShooters(shooters) {
            return shooters;
        },
        // Include shooters with a specific flag
        includeShootersWithFlags(shooters, flagKey, flagValue) {
            return shooters.filter(shooter => shooter[flagKey] === flagValue);
        },
        parseClubData(clubString) {
            if (!clubString)
                return { nation: '', club: '' };

            const parts = clubString.split(',').map(part => part.trim());

            if (parts.length >= 2) {
                const nation = parts[0];
                const clubFull = parts.slice(1).join(', ');
                const clubShort = clubFull.split(' ')[0];
                return {
                    nation,
                    club: clubShort
                };
            } else {
                const firstWord = clubString.split(' ')[0];
                return {
                    nation: clubString,
                    club: firstWord
                };
            }
        }
    }
};
</script>

<style scoped>
/* Add styles for IndividualFinal */
</style>