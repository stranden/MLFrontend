<template>
    <div>
        <h2>MLFrontend</h2>
        <nav>
            <router-link class="spacing" v-for="routes in links" v-bind:key="routes.id"
                :to="`${routes.page}`">{{ routes.text }}</router-link>
        </nav>
    </div>
</template>
  
<script>
export default {
    name: 'HomePage',
    data() {
        return {
            links: [
                {
                    id: 0,
                    text: 'Home',
                    page: '/'
                },
                {
                    id: 1,
                    text: 'Final',
                    page: '/final'
                },
                {
                    id: 2,
                    text: 'Mixed',
                    page: '/mixed'
                },
                {
                    id: 3,
                    text: 'Scoreboard',
                    page: '/scoreboard'
                },
                {
                    id: 4,
                    text: 'Leaderboard',
                    page: '/leaderboard'
                }
            ]
        }
    }
}
</script>

<style>
.spacing {
    margin-right: 10px;
}
</style>