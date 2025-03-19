const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins in development
    methods: ["GET", "POST"]
  }
});

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Store connected players and their data
const players = new Map();

// Store chat message history
const chatHistory = [];
const MAX_CHAT_HISTORY = 50;

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  
  // Add player to the connected players list
  players.set(socket.id, {
    id: socket.id,
    name: 'Anonymous',
    location: 'Local Pond',
    level: 1,
    fishDiscovered: 0,
    totalFish: 0,
    lastActive: Date.now()
  });
  
  // Send existing chat history to newly connected player
  socket.emit('chat:history', chatHistory);
  
  // Handle player login
  socket.on('player:login', (data) => {
    const player = players.get(socket.id);
    if (player) {
      player.name = data.name;
      player.location = data.location;
      player.level = data.level;
      player.fishDiscovered = data.fishDiscovered;
      player.lastActive = Date.now();
      
      console.log(`Player logged in: ${data.name} (${socket.id})`);
      
      // Broadcast updated player list to all clients
      io.emit('players:update', Array.from(players.values()));
    }
  });
  
  // Handle player updates
  socket.on('player:update', (data) => {
    const player = players.get(socket.id);
    if (player) {
      player.location = data.location;
      player.level = data.level;
      player.fishDiscovered = data.fishDiscovered;
      player.totalFish = data.totalFish;
      player.lastActive = Date.now();
      
      // Broadcast updated player list to all clients
      io.emit('players:update', Array.from(players.values()));
    }
  });
  
  // Handle chat messages
  socket.on('chat:message', (data) => {
    if (!data.text || !data.player) return;
    
    // Create message object
    const message = {
      player: data.player,
      text: data.text,
      timestamp: Date.now()
    };
    
    // Add to history and trim if needed
    chatHistory.push(message);
    if (chatHistory.length > MAX_CHAT_HISTORY) {
      chatHistory.shift();
    }
    
    // Broadcast to all clients
    io.emit('chat:message', message);
    console.log(`Chat: ${data.player}: ${data.text}`);
  });
  
  // Handle fish catches (for notifications)
  socket.on('fish:caught', (data) => {
    const player = players.get(socket.id);
    if (player && data.fish && data.rarity) {
      // Add player name to the notification
      data.player = player.name;
      
      // Broadcast to all other clients
      socket.broadcast.emit('fish:caught', data);
      console.log(`${player.name} caught a ${data.rarity} ${data.fish} at ${data.location}!`);
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    players.delete(socket.id);
    
    // Broadcast updated player list to all clients
    io.emit('players:update', Array.from(players.values()));
  });
});

// Clean inactive players every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, player] of players.entries()) {
    // If player has been inactive for more than 10 minutes
    if (now - player.lastActive > 10 * 60 * 1000) {
      console.log(`Removing inactive player: ${player.name} (${id})`);
      players.delete(id);
    }
  }
  
  // Broadcast updated player list
  io.emit('players:update', Array.from(players.values()));
}, 5 * 60 * 1000);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Fishing Tycoon server running on port ${PORT}`);
  console.log(`Game available at http://localhost:${PORT}`);
});