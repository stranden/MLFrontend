const SocketService = {
    socket: null,

    connect(mlrangeIP) {
        const baseURL = `ws://${mlrangeIP}:8088/tv/ws`;
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

    off(eventName, callback) {
        if (!this.socket) {
            console.error('WebSocket is not connected');
            return;
        }

        this.socket.removeEventListener('message', callback);
    },

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
};

export default SocketService;