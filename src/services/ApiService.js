// src/services/ApiService.js
import axios from 'axios';

// Base URL of your API
const baseURL = 'http://' + process.env.VUE_APP_MLRANGE + ':8088/tv';

const ApiService = {
    // Method to fetch data from the API
    fetchData() {
        return axios.get(`${baseURL}/get?method=fp&params=["A","B","C","D","E","F","G","H"]&id=1`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    }
};

export default ApiService;