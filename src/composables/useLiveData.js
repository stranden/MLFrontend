import { ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';
import SocketService from '@/services/SocketService';

// Utility to parse URL parameters
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Function to get a cookie value
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export function useLiveData() {
    const fetchedData = ref([]);

    // Check if test mode is enabled via cookies
    const isTestMode = getCookie('MLRangeTest') === 'true';
    const testFile = getCookie('MLRangeTestData');

    // Get lanes from URL parameters
    const lanesParam = getQueryParam('lanes');
    const lanes = lanesParam ? lanesParam.split(',') : ["A","B","C","D","E","F","G","H"];

    // Get MLRangeIP from cookies
    const mlrangeIP = getCookie('MLRangeIP') || process.env.VUE_APP_MLRANGE || 'localhost';

    // Function to load test data from local JSON file
    const loadTestData = async () => {
        if (!testFile) {
            console.warn('Test mode enabled, but no testdata file specified.');
            return;
        }
        try {
            const data = await import(`@/testdata/${testFile}.json`);
            // Filter data based on lanes if lanes are specified
            if (lanes.length > 0) {
                fetchedData.value = data.result.filter(participant => lanes.includes(participant.fp));
            } else {
                fetchedData.value = data.result;
            }
            console.log('Loaded test data:', fetchedData.value);
        } catch (error) {
            console.error('Error loading test data:', error);
        }
    };

    // Function to fetch data from the API
    const fetchData = async () => {
        if (isTestMode) {
            await loadTestData();
            return;
        }
        try {
            // Pass mlrangeIP and lanes to the API
            const response = await ApiService.fetchData(mlrangeIP, lanes.join(','));
            fetchedData.value = response.result;
            console.log('Fetched data:', fetchedData.value);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to handle WebSocket updates
    const handleUpdate = () => {
        console.log('WebSocket update received');
        fetchData();
    };

    // Connect to the WebSocket if not in test mode
    const connectWebSocket = () => {
        if (!isTestMode) {
            SocketService.connect(mlrangeIP); // Pass mlrangeIP to the SocketService
            SocketService.listen('update', handleUpdate);
        }
    };

    // Lifecycle hooks
    onMounted(async () => {
        await fetchData();
        connectWebSocket();
    });

    return {
        fetchedData,
        fetchData
    };
}