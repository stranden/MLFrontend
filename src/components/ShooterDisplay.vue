<!-- ShooterDisplay.vue -->
<template>
    <!--<h1>Number of shoorters {{ numberOfShooters }}</h1>-->
    <!--<div v-if="numberOfShooters >= 5" id="shootingDisplayContainer">-->
    <div id="shootingDisplayContainer">
        <div v-for="(data, index) in allShooters" :key="index" :class="getShooterClass(data.flags)">
            <Target :targetName="data.targetId" :shotData="extractShotsForShooter(data)" :flags="data.flags"/>
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
            return this.removeShootersWithFlags(this.pushedData, 'flags', "E");
        },
        allShooters() {
            return this.includeAllShooters(this.pushedData);
        },
        elimatedShooter() {
            return this.includeShootersWithFlags(this.pushedData, 'flags', "P");
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
            return array.filter(item => ['','E','P','W','T','ES','SP'].includes(item.flags));
        },
        svgSource(country) {
            try {
                if (country) {
                    return require(`@/assets/img/flags/${country}.svg`);
                }
            } catch (error) {
                console.error(`SVG for ${country} not found`, country)
                return null;
            }
        },
        extractShotsForShooter(array) {
            let shotsData = [];
            if (array) {
                array.shots.forEach(shot => {
                    shotsData.push({
                        x: shot.x,
                        y: shot.y
                    });
                });
            }
            console.log('Extracted shots for a lane ', array.fp,' :', shotsData);
            return shotsData;
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
        formatName(name) {
            const nameParts = name.split(' ');
            const lastName = nameParts[0] || '';
            const firstName = nameParts[1] || '';
            const middleNames = nameParts.slice(2);

            // Function to truncate middle names with special handling for Danish letters
            const truncateMiddleName = (name) => {
                if (name.startsWith('Aa') || name.startsWith('Ae') || name.startsWith('Oe')) {
                    return name.substring(0, 2) + '.';
                } else if (name.length > 0) {
                    return name[0] + '.';
                } else {
                    return '';
                }
            };

            // Create truncated first name and middle names initials
            const truncatedFirstName = firstName.length > 1 ? `${firstName[0]}.` : firstName;
            const truncatedMiddleNames = middleNames.map(truncateMiddleName).join(' ');

            // Combine the parts
            const truncatedFullName = `${lastName} ${truncatedFirstName} ${truncatedMiddleNames}`.trim();
            const fullNameWithTruncatedMiddleNames = `${lastName} ${firstName} ${truncatedMiddleNames}`.trim();
            const fullName = `${lastName} ${firstName} ${middleNames.join(' ')}`.trim();

            // Check the lengths and return appropriately
            if (lastName.length >= 18) {
                return lastName; // Only display last name if it equals or exceeds 18 characters
            }

            if (fullName.length >= 19 && fullNameWithTruncatedMiddleNames.length <= 19) {
                return fullNameWithTruncatedMiddleNames;
            }

            if (fullNameWithTruncatedMiddleNames.length >= 19) {
                return truncatedFullName;
            }

            return fullName;
        }
    }
};
</script>

<style scoped>
/* Styles for ShooterDisplay.vue */
</style>
