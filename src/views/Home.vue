<template>
    <div class="home-container">
        <header class="header">
            <h1>Welcome to the MLFrontend</h1>
            <p>Your one-stop solution for managing TV graphics for finals</p>
        </header>

        <div class="links-container">
            <h2>Quick Links</h2>
            <div class="links-grid">
                <router-link v-for="link in links" :key="link.id" :to="link.page" class="link-card">
                    <span class="link-text">{{ link.text }}</span>
                </router-link>
            </div>
        </div>

        <div class="url-builder">
            <h2>Customize and Generate URL</h2>
            <form @submit.prevent="generateUrl" class="url-form">
                <div class="form-group">
                    <label for="logos">Select Logos:</label>
                    <select id="logos" v-model="selectedLogos" multiple class="form-select">
                        <option v-for="logo in availableLogos" :key="logo" :value="logo">
                            {{ logo }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input id="title" v-model="title" type="text" placeholder="Enter title" class="form-input" />
                </div>
                <div class="form-group">
                    <label for="discipline">Discipline:</label>
                    <input id="discipline" v-model="discipline" type="text" placeholder="Enter discipline" class="form-input" />
                </div>
                <button type="submit" class="generate-button">Generate URL</button>
            </form>

            <div v-if="generatedUrl" class="generated-url">
                <p>Your custom URL:</p>
                <a :href="generatedUrl" target="_blank" class="generated-link">{{ generatedUrl }}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            links: [
                { id: 1, text: 'Final', page: '/final' },
                { id: 2, text: 'Mixed', page: '/mixed' },
                { id: 3, text: 'Scoreboard', page: '/scoreboard' },
                { id: 4, text: 'Leaderboard', page: '/leaderboard' },
                { id: 5, text: 'ShootingTimer', page: '/shootingtimer' },
                { id: 6, text: 'FinalTest', page: '/finaltest/?test=true&testdata=AR10WJ-SO-GOLD' },
                { id: 7, text: 'ScoreboardTest', page: '/scoreboardtest?test=true&testdata=AR10WJ-SO-GOLD' }
            ],
            availableLogos: [],
            selectedLogos: [],
            title: '',
            discipline: '',
            generatedUrl: ''
        };
    },
    methods: {
        fetchLogos() {
            const context = require.context('@/assets/img/logos/', false, /\.png$/);
            this.availableLogos = context.keys().map(key => key.replace('./', ''));
        },
        generateUrl() {
            const baseUrl = window.location.origin;
            const logosParam = this.selectedLogos.join(',');
            const queryParams = new URLSearchParams({
                logos: logosParam,
                title: this.title,
                discipline: this.discipline
            }).toString();

            this.generatedUrl = `${baseUrl}/scoreboard?${queryParams}`;
        }
    },
    mounted() {
        this.fetchLogos();
    }
};
</script>

<style scoped>
/* General Styles */
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #4a4a4a; /* Adjusted to match the scoreboard color scheme */
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.header h1 {
    font-size: 2.5rem;
    color: #2c3e50; /* Dark blue for headers */
    margin-bottom: 10px;
}

.header p {
    font-size: 1.2rem;
    color: #7f8c8d; /* Grey for subtext */
}

/* Links Section */
.links-container {
    margin-bottom: 40px;
}

.links-container h2 {
    font-size: 1.8rem;
    color: #2c3e50; /* Dark blue for headers */
    margin-bottom: 20px;
}

.links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.link-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #1c9c4a; /* Green background for links */
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.link-card:hover {
    background-color: #168f3f; /* Darker green on hover */
    transform: translateY(-5px);
}

.link-text {
    font-size: 1.2rem;
    font-weight: bold;
}

/* URL Builder Section */
.url-builder {
    background-color: #f9f9f9; /* Light grey background */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.url-builder h2 {
    font-size: 1.8rem;
    color: #2c3e50; /* Dark blue for headers */
    margin-bottom: 20px;
}

.url-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-group label {
    font-size: 1rem;
    color: #2c3e50; /* Dark blue for labels */
}

.form-select,
.form-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
}

.form-select:focus,
.form-input:focus {
    border-color: #1c9c4a; /* Green border on focus */
}

.generate-button {
    padding: 10px 20px;
    background-color: #1c9c4a; /* Green background for button */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.generate-button:hover {
    background-color: #168f3f; /* Darker green on hover */
}

/* Generated URL Section */
.generated-url {
    margin-top: 20px;
    text-align: center;
}

.generated-url p {
    font-size: 1.2rem;
    color: #2c3e50; /* Dark blue for text */
    margin-bottom: 10px;
}

.generated-link {
    font-size: 1rem;
    color: #1c9c4a; /* Green for links */
    text-decoration: none;
    word-break: break-all;
}

.generated-link:hover {
    text-decoration: underline;
}
</style>