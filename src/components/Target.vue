<template>
    <svg class="target" ref="targetSVG"></svg>
</template>

<script>
import { /*createTarget,*/ drawShots } from '@/assets/js/target.js'; 

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
        //this.drawTarget();
        this.drawShots();
    },
    watch: {
        shotData: {
            handler() {
                this.drawShots();
            },
            deep: true
        }
    },
    methods: {
        /*drawTarget() {
            const targetSVG = this.$refs.targetSVG;
            const targetContainerWidth = targetSVG.clientWidth;
            createTarget(this.targetName, targetSVG, targetContainerWidth, this.shotData);
        },*/
        drawShots() {
            //if (this.shotData.length > 0) {
                const targetSVG = this.$refs.targetSVG;
                const targetContainerWidth = targetSVG.clientWidth;
                drawShots(this.targetName, targetSVG, targetContainerWidth, this.shotData);
            //}
        }
    }
};
</script>

<style scoped>
/* Styles for Target.vue */
</style>