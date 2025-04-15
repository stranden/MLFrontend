<template>
    <div class="home-container">
        <header class="header">
            <h1>Welcome to the MLFrontend</h1>
            <p>Your one-stop solution for managing TV graphics for finals</p>
        </header>

        <!-- Configuration Section -->
        <div class="config-section">
            <h2>Configuration</h2>
            <form @submit.prevent="saveConfig" class="config-form">
                <!-- Test Mode Toggle -->
                <div class="form-group">
                    <label for="test-mode">Test Mode:</label>
                    <input id="test-mode" v-model="isTestMode" type="checkbox" class="form-checkbox" @change="toggleTestMode" />
                </div>

                <!-- MLRange Configuration (hidden in Test Mode) -->
                <div v-if="!isTestMode" class="mlrange-config">
                    <div class="form-group">
                        <label for="mlrange-ip">MLRange IP:</label>
                        <input id="mlrange-ip" v-model="mlrangeConfig.ip" type="text" placeholder="Enter MLRange IP" class="form-input" />
                    </div>
                </div>

                <!-- Test Data Selection (visible in Test Mode) -->
                <div v-if="isTestMode" class="test-config">
                    <div class="form-group">
                        <label for="test-file">Test Data File:</label>
                        <select id="test-file" v-model="selectedTestFile" class="form-select">
                            <option v-for="file in testFiles" :key="file" :value="file">
                                {{ file }}
                            </option>
                        </select>
                    </div>
                </div>

                <button type="submit" class="save-button">Save Configuration</button>
            </form>
        </div>

        <!-- Modules Section -->
        <div class="modules-container">
            <h2>Modules</h2>
            <div class="modules-grid">
                <div
                    v-for="module in modules"
                    :key="module.id"
                    class="module-card"
                    :class="{ 'module-card-selected': selectedModule?.id === module.id }"
                    @click="selectModule(module)"
                >
                    <span class="module-text">{{ module.name }}</span>
                </div>
            </div>

            <!-- Module Configuration Form -->
            <div v-if="selectedModule" class="module-form">
                <h3>Configure {{ selectedModule.name }}</h3>
                <form @submit.prevent="generateModuleUrl">
                    <!-- Lanes Field -->
                    <div v-if="selectedModule.fields.includes('lanes')" class="form-group">
                        <label for="lanes">Lanes:</label>
                        <select id="lanes" v-model="moduleConfig.lanes" multiple class="form-select">
                            <option v-for="lane in lanes" :key="lane" :value="lane">
                                {{ lane }}
                            </option>
                        </select>
                    </div>

                    <!-- Logos Field -->
                    <div v-if="selectedModule.fields.includes('logos')" class="form-group">
                        <label for="logos">Logos:</label>
                        <select id="logos" v-model="moduleConfig.logos" multiple class="form-select">
                            <option v-for="logo in availableLogos" :key="logo" :value="logo">
                                {{ logo }}
                            </option>
                        </select>
                    </div>

                    <!-- Title Field -->
                    <div v-if="selectedModule.fields.includes('title')" class="form-group">
                        <label for="title">Title:</label>
                        <input id="title" v-model="moduleConfig.title" type="text" placeholder="Enter title" class="form-input" />
                    </div>

                    <!-- Discipline Field -->
                    <div v-if="selectedModule.fields.includes('discipline')" class="form-group">
                        <label for="discipline">Discipline:</label>
                        <input id="discipline" v-model="moduleConfig.discipline" type="text" placeholder="Enter discipline" class="form-input" />
                    </div>

                    <button type="submit" class="generate-button">Generate URL</button>
                </form>

                <div v-if="generatedModuleUrl" class="generated-url">
                    <p>Your custom URL:</p>
                    <a :href="generatedModuleUrl" target="_blank" class="generated-link">{{ generatedModuleUrl }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            isTestMode: false,
            mlrangeConfig: {
                ip: ''
            },
            testFiles: [],
            selectedTestFile: '',
            lanes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], // Local lanes array
            modules: [
                {
                    id: 1,
                    name: 'Final',
                    route: '/finaltest',
                    fields: ['lanes']
                },
                {
                    id: 2,
                    name: 'Head-to-Head',
                    route: '/finalheadtohead',
                    fields: ['lanes']
                },
                {
                    id: 3,
                    name: 'Scoreboard',
                    route: '/scoreboardtest',
                    fields: ['lanes', 'logos', 'title', 'discipline']
                },
                {
                    id: 4,
                    name: 'ShootingTimer',
                    route: '/shootingtimer',
                    fields: []
                }
                //{
                //    id: 5,
                //    name: 'Mixed',
                //    route: '/mixed',
                //    fields: ['lanes']
                //},
                //{
                //    id: 6,
                //    name: 'Leaderboard',
                //    route: '/leaderboard',
                //    fields: []
                //},
                
            ],
            selectedModule: null,
            moduleConfig: {},
            generatedModuleUrl: '',
            availableLogos: []
        };
    },
    methods: {
        toggleTestMode() {
            if (this.isTestMode) {
                this.mlrangeConfig = { ip: '' };
            }
        },
        saveConfig() {
            if (this.isTestMode) {
                document.cookie = `MLRangeTest=true; path=/`;
                document.cookie = `MLRangeTestData=${this.selectedTestFile}; path=/`;
            } else {
                document.cookie = `MLRangeIP=${this.mlrangeConfig.ip}; path=/`;
                document.cookie = 'MLRangeTest=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                document.cookie = 'MLRangeTestData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
            alert('Configuration saved successfully!');
        },
        fetchTestFiles() {
            const context = require.context('@/testdata/', false, /\.json$/);
            this.testFiles = context.keys().map(key => key.replace('./', '').replace('.json', ''));
        },
        fetchLogos() {
            const context = require.context('@/assets/img/logos/', false, /\.png$/);
            this.availableLogos = context.keys().map(key => key.replace('./', ''));
        },
        selectModule(module) {
            this.selectedModule = module;
            this.moduleConfig = {};
            this.generatedModuleUrl = '';
        },
        generateModuleUrl() {
            const baseUrl = window.location.origin;
            const queryParams = new URLSearchParams();

            // Add lanes to the query parameters
            if (this.selectedModule.fields.includes('lanes') && this.moduleConfig.lanes) {
                queryParams.set('lanes', this.moduleConfig.lanes.join(','));
            }

            // Add logos to the query parameters
            if (this.selectedModule.fields.includes('logos') && this.moduleConfig.logos) {
                queryParams.set('logos', this.moduleConfig.logos.join(','));
            }

            // Add title to the query parameters
            if (this.selectedModule.fields.includes('title') && this.moduleConfig.title) {
                queryParams.set('title', this.moduleConfig.title);
            }

            // Add discipline to the query parameters
            if (this.selectedModule.fields.includes('discipline') && this.moduleConfig.discipline) {
                queryParams.set('discipline', this.moduleConfig.discipline);
            }

            this.generatedModuleUrl = `${baseUrl}${this.selectedModule.route}?${queryParams.toString()}`;
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    },
    mounted() {
        this.isTestMode = this.getCookie('MLRangeTest') === 'true';
        this.mlrangeConfig.ip = this.getCookie('MLRangeIP') || '';
        this.selectedTestFile = this.getCookie('MLRangeTestData') || '';

        this.fetchTestFiles();
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
    color: #4a4a4a;
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

.header p {
    font-size: 1.2rem;
    color: #7f8c8d;
}

/* Configuration Section */
.config-section {
    margin-bottom: 40px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.config-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px; /* Added spacing between form groups */
}

.form-group label {
    font-size: 1rem;
    color: #2c3e50;
}

.form-input,
.form-select,
.form-checkbox {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-checkbox:focus {
    border-color: #1c9c4a;
}

.save-button,
.generate-button {
    padding: 10px 20px;
    background-color: #1c9c4a;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%; /* Span the entire width */
}

.save-button:hover,
.generate-button:hover {
    background-color: #168f3f;
}

/* Modules Section */
.modules-container {
    margin-bottom: 40px;
}

.modules-container h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 20px;
}

.modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.module-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #1c9c4a;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
}

.module-card:hover {
    background-color: #168f3f;
    transform: translateY(-5px);
}

.module-card-selected {
    background-color: #168f3f;
    border: 2px solid #0f6b2f;
}

.module-text {
    font-size: 1.2rem;
    font-weight: bold;
}

/* Module Configuration Form */
.module-form {
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.module-form h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
}

/* Generated URL Section */
.generated-url {
    margin-top: 20px;
    text-align: center;
}

.generated-url p {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

.generated-link {
    font-size: 1rem;
    color: #1c9c4a;
    text-decoration: none;
    word-break: break-all;
}

.generated-link:hover {
    text-decoration: underline;
}
</style>