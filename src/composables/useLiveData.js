import { ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';
import SocketService from '@/services/SocketService';

// Utility to parse URL parameters
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

export function useLiveData() {
    const fetchedData = ref([]);
    const isTestMode = getQueryParam('test') === 'true' || getQueryParam('test') === 'True';
    const testFile = getQueryParam('testdata');

    // Function to load test data from local JSON file
    const loadTestData = async () => {
        if (!testFile) {
            console.warn('Test mode enabled, but no testdata file specified.');
            return;
        }
        try {
            const data = await import(`@/testdata/${testFile}.json`);
            fetchedData.value = data.result;
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
            const response = await ApiService.fetchData();
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
