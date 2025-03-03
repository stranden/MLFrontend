// src/services/SocketService.js
const baseURL = 'ws://' + process.env.VUE_APP_MLRANGE + ':8088/tv/ws';

const SocketService = {
    socket: null, // WebSocket instance

    // Initialize WebSocket connection
    connect() {
        this.socket = new WebSocket(baseURL);

        this.socket.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });

        this.socket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });
    },

    // Method to listen for events from the WebSocket server
    listen(eventName, callback) {
        if (!this.socket) {
            console.error('WebSocket is not connected');
            return;
        }

        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log("Notify from range:", data);
            if (typeof callback === 'function') {
                callback(data);
            }
        });
    },

    // Method to stop listening for events
    off(eventName, callback) {
        if (!this.socket) {
            console.error('WebSocket is not connected');
            return;
        }

        this.socket.removeEventListener('message', callback);
    },

    // Method to disconnect from the WebSocket
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
};

export default SocketService;