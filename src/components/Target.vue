<template>
    <svg ref="targetSVG" :class="{ 'targetE': this.flags === 'E', 'targetES': this.flags === 'ES', 'targetT': this.flags === 'T', 'targetP': this.flags === 'P', 'targetSP': this.flags === 'SP', 'target': true }"></svg>
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
        },
        flags: {
            type: String,
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

            // Clear previous contents
            while (targetSVG.firstChild) {
                targetSVG.removeChild(targetSVG.firstChild);
            }

            // Draw target content using your createTarget function
            createTarget(this.targetName, targetSVG, targetContainerWidth, this.shotData);

            if (this.flags === 'E' || this.flags === 'P' || this.flags === 'ES' || this.flags === 'T' || this.flags === 'SP'){
                // Create circle element for overlay
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", "50%");
                circle.setAttribute("cy", "50%");
                circle.setAttribute("r", "50%"); // Circle radius as 50% of container size
                if (this.flags === 'E' || this.flags === 'ES') {
                    circle.setAttribute("fill", "rgba(128, 128, 128, 0.75)"); // Grey with 50% opacity for E and ES
                }
                if (this.flags === 'P') {
                    circle.setAttribute("fill", "rgba(190, 28, 28, 0.5)"); // Red with 50% opacity for P
                }
                if (this.flags === 'SP') {
                    circle.setAttribute("fill", "rgba(190, 28, 28, 0.5)"); // Red with 50% opacity for SP
                }
                if (this.flags === 'T') {
                    circle.setAttribute("fill", "rgba(0, 143, 0, 0.5)"); // Green with 50% opacity for T
                }
                // Append circle to SVG
                targetSVG.appendChild(circle);
            }
        }
    }
};
</script>

<style scoped>
/* Styles for Target.vue */
</style>