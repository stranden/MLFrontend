<template>
    <svg class="target" ref="targetSVG"></svg>
</template>

<script>
import { createTarget } from '@/assets/js/target.js'; 

export default {
    name: 'ShootingTarget',
    props: {
        targetName: {
            type: String,
            required: true
        },
        shotData: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.drawTarget();
    },
    watch: {
        shotData: {
            handler() {
                this.drawTarget();
            },
            deep: true
        }
    },
    methods: {
        drawTarget() {
            const targetSVG = this.$refs.targetSVG;
            const targetContainerWidth = targetSVG.clientWidth;
            createTarget(this.targetName, targetSVG, targetContainerWidth, this.shotData);
        }
    }
};
</script>

<style scoped>
/* Styles for Target.vue */
</style>