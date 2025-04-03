import axios from 'axios';

const ApiService = {
    async fetchData(mlrangeIP, method='', lanes='') {
        const baseURL = `http://${mlrangeIP}:8088/tv`;
        // Use method from the parameter if provided, otherwise default to 'fp'
        const methodParam = method ? `method=${method}` : 'method=fp';
        // Use lanes from the parameter if provided, otherwise default to ["A","B","C","D","E","F","G","H"]
        const lanesParam = lanes ? `params=${JSON.stringify(lanes.split(','))}` : 'params=["A","B","C","D","E","F","G","H"]';
        // Construct the full URL with parameters
        const url = `${baseURL}/get?${methodParam}&${lanesParam}&id=1`;
        console.log('Fetching data from URL:', url);
        // Use axios to make the GET request
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
};

export default ApiService;