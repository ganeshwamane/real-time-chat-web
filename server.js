const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A new client connected.');

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message); // Send the message to all clients except the sender
            }
        });
    });

    // Handle when a client disconnects
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});
