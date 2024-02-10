// SocketService.js

const baseURL = 'ws://' + process.env.VUE_APP_MLRANGE + ':8088/tv/ws';

const SocketService = {
    // Initialize WebSocket connection
    socket: new WebSocket(baseURL),

    // Method to listen for events from the WebSocket server
    listen(eventName, callback) {
        this.socket.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log("Notify from range", data);
            if (typeof callback === 'function') {
                callback(data);
            }
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });

        this.socket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });
    }
};

export default SocketService;
