<template>
    <div class="styled-timer">
      <span class="timer-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.75vw" height="1.75vw" fill="white" viewBox="0 0 24 24">
          <path d="M15 1H9v2h6V1zM12 7a1 1 0 0 0-1 1v4.59l3.3 3.3 1.4-1.42-2.7-2.7V8a1 1 0 0 0-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </span>
      <span class="timer-text">
        {{ formatTimeDisplay(unifiedTimer) }}
      </span>
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

    const formatTimeDisplay = (timer) => {
      if (timer.mode === 'STOP') return '00:00';
      return formatTime(timer.currentTime);
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const unifiedTimer = computed(() => {
      return timerData.value[0] || {};
    });

    const initializeTimers = (data) => {
      serverTimeReference = Date.now();
      return data.map(shooter => ({
        ...shooter,
        serverSinceStart: shooter.sinceStart,
        currentTime: calculateCurrentTime(shooter),
      }));
    };

    const calculateCurrentTime = (shooter) => {
      if (shooter.mode === 'STOP') return 0;
      if (shooter.mode === 'DOWN') {
        return Math.max(0, shooter.shootTimer - shooter.sinceStart);
      } else {
        return Math.min(shooter.shootTimer, shooter.sinceStart);
      }
    };

    const updateTimers = () => {
      const now = Date.now();
      const elapsedSinceUpdate = (now - serverTimeReference) / 1000;

      timerData.value = timerData.value.map(shooter => {
        if (shooter.mode === 'STOP') {
          return {
            ...shooter,
            currentTime: 0,
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
        };
      });
    };

    watch(fetchedData, (newData) => {
      if (newData?.length) {
        timerData.value = initializeTimers(newData);

        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(updateTimers, 100);
      }
    }, { immediate: true });

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId);
    });

    return {
      timerData,
      formatTimeDisplay,
      unifiedTimer
    };
  }
};
</script>

<style scoped>
.styled-timer {
  display: flex;
  align-items: center;
  /*background-color: #1c9c4a; /* Green background matching the scoreboard rank circles */
  background-color: #00004b;
  padding: 0.25vh 0.5vw; /* Use vh and vw to scale padding */
  border-radius: 1rem; /* Scalable rounded corners */
  color: white;
  font-size: 1vw; /* Scalable font size relative to the viewport width */
  font-weight: bold;
  width: fit-content;
  margin: 0 auto;
  gap: 0.25vw; /* Use vw for gap between timer icon and text */
  box-shadow: 0 0.5vh 2vh rgba(0,0,0,0.2); /* Scalable shadow */
  position: fixed;
  bottom: 2.25vh; /* Position at 5% from the bottom of the viewport */
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  z-index: 10; /* Ensure the timer stays on top */
}

.timer-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-text {
  font-family: 'Courier New', monospace;
}
</style>
