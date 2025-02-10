const socket = new WebSocket('ws://localhost:8080');

// Get references to the DOM elements
const statusDiv = document.getElementById('status');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');

// Add status indicator
statusDiv.textContent = 'Connecting...';
statusDiv.style.textAlign = 'center';
statusDiv.style.marginBottom = '10px';

// Update status on connection open
socket.onopen = () => {
    console.log('Connected to WebSocket server.');
    statusDiv.textContent = 'Connected';
    statusDiv.style.color = 'green';
    messageInput.disabled = false; // Enable the input when connected
    socket.send('Hello Server!'); // Initial message to server
};

// Update status on connection close
socket.onclose = () => {
    console.log('Disconnected from WebSocket server.');
    statusDiv.textContent = 'Disconnected';
    statusDiv.style.color = 'red';
    messageInput.disabled = true; // Disable input when disconnected
};

// Handle incoming messages
socket.onmessage = (event) => {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const message = document.createElement('p');
    message.textContent = `[${timestamp}] ${event.data}`; // Add timestamp
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
};

// Handle WebSocket errors
socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'An error occurred with the WebSocket connection.';
    errorMessage.style.color = 'red';
    messagesDiv.appendChild(errorMessage);
};

// Listen for Enter key to send messages
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const message = messageInput.value;
        if (message) {
            const userMessage = document.createElement('p');
            userMessage.textContent = `You: ${message}`;
            userMessage.style.backgroundColor = '#d1c4e9'; // Light purple for user messages
            userMessage.style.padding = '5px 10px';
            userMessage.style.margin = '5px 0';
            userMessage.style.borderRadius = '5px';
            userMessage.style.textAlign = 'right'; // Align user messages to the right
            messagesDiv.appendChild(userMessage);

            socket.send(message); // Send message via WebSocket

            // Clear input field and reset placeholder
            messageInput.value = '';
            messageInput.placeholder = 'Type a message...'; // Reset placeholder
        }
    }
});
