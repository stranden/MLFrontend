import axios from 'axios';

const ApiService = {
    fetchData(mlrangeIP, lanes = '') {
        const baseURL = `http://${mlrangeIP}:8088/tv`;
        // Use lanes from the parameter if provided, otherwise default to ["A","B","C","D","E","F","G","H"]
        const params = lanes ? `method=fp&params=${JSON.stringify(lanes.split(','))}&id=1` : 'method=fp&params=["A","B","C","D","E","F","G","H"]&id=1';
        return axios.get(`${baseURL}/get?${params}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    }
};

export default ApiService;