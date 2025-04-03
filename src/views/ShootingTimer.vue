<template>
    <div class="timer-container">
        <!-- Unified Timer Display -->
        <div v-if="showSingleTimer" class="unified-timer">
            <div class="mode-indicator" :class="unifiedTimer.mode.toLowerCase()">
                {{ unifiedTimer.mode }}
            </div>
            <div class="timer-display" :class="{ 'warning': isWarning(unifiedTimer) }">
                {{ formatTimeDisplay(unifiedTimer) }}
            </div>
            <div class="progress-bar">
                <div class="progress" :style="progressStyle(unifiedTimer)"></div>
            </div>
            <div class="lane-info">All {{ timerData.length }} Lanes Synchronized</div>
        </div>

        <!-- Individual Lane Timers -->
        <template v-else>
            <div v-for="(shooter, index) in timerData" :key="index" class="shooter-timer">
                <div class="lane-info">Lane {{ shooter.lane }} ({{ shooter.fp }})</div>
                <div class="mode-indicator" :class="shooter.mode.toLowerCase()">
                    {{ shooter.mode }}
                </div>
                <div class="timer-display" :class="{ 'warning': isWarning(shooter) }">
                    {{ formatTimeDisplay(shooter) }}
                </div>
                <div class="progress-bar">
                    <div class="progress" :style="progressStyle(shooter)"></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { useLiveData } from '@/composables/useLiveData.js';
import { ref, watch, onUnmounted, computed } from 'vue';

export default {
    name: 'ShootingTimer',
    setup() {
        const { fetchedData } = useLiveData('timer');
        const timerData = ref([]);
        let intervalId = null;
        let serverTimeReference = 0;

        // Format time display with STOP mode handling
        const formatTimeDisplay = (timer) => {
            if (timer.mode === 'STOP') return '00:00';
            return formatTime(timer.currentTime);
        };

        // Basic time formatting (MM:SS)
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        // Check if all timers are synchronized
        const showSingleTimer = computed(() => {
            if (timerData.value.length < 2) return false;

            const firstTimer = timerData.value[0];
            return timerData.value.every(timer =>
                Math.abs(timer.currentTime - firstTimer.currentTime) < 0.1 &&
                timer.mode === firstTimer.mode
            );
        });

        // Unified timer data
        const unifiedTimer = computed(() => {
            return timerData.value[0] || {};
        });

        // Initialize timer data
        const initializeTimers = (data) => {
            serverTimeReference = Date.now();
            return data.map(shooter => ({
                ...shooter,
                serverSinceStart: shooter.sinceStart,
                currentTime: calculateCurrentTime(shooter),
                progress: calculateProgress(shooter)
            }));
        };

        // Calculate current time based on mode
        const calculateCurrentTime = (shooter) => {
            if (shooter.mode === 'STOP') return 0;
            if (shooter.mode === 'DOWN') {
                return Math.max(0, shooter.shootTimer - shooter.sinceStart);
            } else {
                return Math.min(shooter.shootTimer, shooter.sinceStart);
            }
        };

        // Calculate progress percentage
        const calculateProgress = (shooter) => {
            if (shooter.mode === 'STOP') return 0;
            if (shooter.mode === 'DOWN') {
                return (shooter.sinceStart / shooter.shootTimer) * 100;
            } else {
                return (calculateCurrentTime(shooter) / shooter.shootTimer) * 100;
            }
        };

        // Update all timers
        const updateTimers = () => {
            const now = Date.now();
            const elapsedSinceUpdate = (now - serverTimeReference) / 1000;

            timerData.value = timerData.value.map(shooter => {
                if (shooter.mode === 'STOP') {
                    return {
                        ...shooter,
                        currentTime: 0,
                        progress: 0
                    };
                }

                const effectiveTime = shooter.serverSinceStart + elapsedSinceUpdate;
                let currentTime;

                if (shooter.mode === 'DOWN') {
                    currentTime = Math.max(0, shooter.shootTimer - effectiveTime);
                } else {
                    currentTime = Math.min(shooter.shootTimer, effectiveTime);
                }

                return {
                    ...shooter,
                    currentTime,
                    progress: calculateProgress({
                        ...shooter,
                        sinceStart: effectiveTime
                    })
                };
            });
        };

        // Check if timer should show warning state
        const isWarning = (shooter) => {
            return shooter.mode === 'DOWN' &&
                shooter.currentTime < (shooter.shootTimer * 0.1) &&
                shooter.currentTime > 0;
        };

        // Calculate progress bar style
        const progressStyle = (shooter) => {
            if (shooter.mode === 'STOP') {
                return {
                    width: '0%',
                    'background-color': '#cccccc',
                    'transition': 'none'
                };
            }

            const width = Math.min(100, shooter.progress);
            let backgroundColor = '#4CAF50'; // Green

            if (shooter.mode === 'DOWN') {
                if (shooter.currentTime < (shooter.shootTimer * 0.1)) {
                    backgroundColor = '#f44336'; // Red
                } else if (shooter.currentTime < (shooter.shootTimer * 0.3)) {
                    backgroundColor = '#FFC107'; // Yellow
                }
            }

            return {
                width: `${width}%`,
                'background-color': backgroundColor,
                'transition': 'width 0.1s linear'
            };
        };

        // Watch for data changes
        watch(fetchedData, (newData) => {
            if (newData?.length) {
                timerData.value = initializeTimers(newData);

                if (intervalId) clearInterval(intervalId);
                intervalId = setInterval(updateTimers, 100);
            }
        }, { immediate: true });

        // Clean up interval on unmount
        onUnmounted(() => {
            if (intervalId) clearInterval(intervalId);
        });

        return {
            timerData,
            formatTimeDisplay,
            isWarning,
            progressStyle,
            showSingleTimer,
            unifiedTimer
        };
    }
};
</script>

<style scoped>
.timer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
}

.unified-timer {
    width: 100%;
    max-width: 500px;
    border: 2px solid #4CAF50;
    border-radius: 12px;
    padding: 25px;
    background-color: #f9f9f9;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.unified-timer .mode-indicator {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 16px;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 15px;
}

.unified-timer .mode-indicator.stop {
    background-color: #cccccc;
    color: #333;
}

.unified-timer .mode-indicator.down {
    background-color: #FFEB3B;
    color: #333;
}

.unified-timer .mode-indicator.up {
    background-color: #4CAF50;
    color: white;
}

.unified-timer .timer-display {
    font-size: 3.5rem;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    margin: 20px 0;
    color: #333;
}

.unified-timer .progress-bar {
    height: 16px;
    background-color: #f0f0f0;
    border-radius: 8px;
    margin: 20px 0;
    overflow: hidden;
}

.unified-timer .lane-info {
    font-size: 1.3rem;
    font-weight: bold;
    color: #4CAF50;
    margin-top: 15px;
}

.shooter-timer {
    width: 100%;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f9f9f9;
}

.shooter-timer .lane-info {
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
}

.shooter-timer .mode-indicator {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 10px;
}

.shooter-timer .mode-indicator.stop {
    background-color: #cccccc;
    color: #333;
}

.shooter-timer .mode-indicator.down {
    background-color: #FFEB3B;
    color: #333;
}

.shooter-timer .mode-indicator.up {
    background-color: #4CAF50;
    color: white;
}

.shooter-timer .timer-display {
    font-size: 2.2rem;
    font-family: 'Courier New', monospace;
    text-align: center;
    margin: 15px 0;
    font-weight: bold;
    color: #333;
}

.shooter-timer .timer-display.warning {
    color: #f44336;
    animation: pulse 1s infinite;
}

.shooter-timer .progress-bar {
    height: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
}

.progress {
    height: 100%;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.6;
    }

    100% {
        opacity: 1;
    }
}
</style>