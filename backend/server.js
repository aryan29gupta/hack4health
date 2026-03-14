const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from the root .env if running from backend folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase environment variables! Check your root .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running correctly.' });
});

// A sample API endpoint
app.get('/api/example', (req, res) => {
  res.json({ data: 'This is sample data from the basic backend architecture.' });
});

// A test endpoint to verify Supabase connection works on the backend
app.get('/api/test-db', async (req, res) => {
  try {
    // Just pulling 1 row from Doctor to test the connection
    const { data, error } = await supabase.from('Doctor').select('*').limit(1);
    
    if (error) throw error;
    
    res.json({ status: 'success', message: 'Successfully connected to Supabase from the backend!', data });
  } catch (error) {
    console.error('Database connection test failed:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Store WebRTC room information
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a room
    socket.on('join-room', (customRoomId) => {
        const roomId = customRoomId || "main-room"; 
        
        console.log(`User ${socket.id} attempting to join room ${roomId}`);
        
        // Leave any existing rooms first
        if (socket.roomId) {
            const oldRoom = rooms.get(socket.roomId);
            if (oldRoom) {
                oldRoom.users.delete(socket.id);
                socket.to(socket.roomId).emit('user-left', socket.id);
                socket.leave(socket.roomId);
                console.log(`User ${socket.id} left room ${socket.roomId}`);
            }
        }
        
        // Join the new room
        socket.join(roomId);
        socket.roomId = roomId;
        
        // Get or create room info
        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                users: new Set(),
                createdAt: new Date()
            });
        }
        
        const room = rooms.get(roomId);
        
        // Get existing users before adding current user
        const existingUsers = Array.from(room.users);
        
        // Add current user to room
        room.users.add(socket.id);
        
        console.log(`User ${socket.id} joined room ${roomId}. Room now has users:`, Array.from(room.users));
        
        // Notify others in the room that a new user joined
        socket.to(roomId).emit('user-joined', socket.id);
        
        // Send list of existing users to the new user
        if (existingUsers.length > 0) {
            socket.emit('existing-users', existingUsers);
        }
        
        console.log(`Room ${roomId} now has ${room.users.size} users`);
    });

    // Handle WebRTC signaling
    socket.on('offer', (data) => {
        console.log(`Offer from ${socket.id} to ${data.target}`);
        socket.to(data.target).emit('offer', {
            offer: data.offer,
            sender: socket.id
        });
    });

    socket.on('answer', (data) => {
        console.log(`Answer from ${socket.id} to ${data.target}`);
        socket.to(data.target).emit('answer', {
            answer: data.answer,
            sender: socket.id
        });
    });

    socket.on('ice-candidate', (data) => {
        console.log(`ICE candidate from ${socket.id} to ${data.target}`);
        socket.to(data.target).emit('ice-candidate', {
            candidate: data.candidate,
            sender: socket.id
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        if (socket.roomId) {
            const room = rooms.get(socket.roomId);
            if (room) {
                room.users.delete(socket.id);
                
                // Notify others in the room
                socket.to(socket.roomId).emit('user-left', socket.id);
                
                // Clean up empty rooms
                if (room.users.size === 0) {
                    rooms.delete(socket.roomId);
                    console.log(`Room ${socket.roomId} deleted (empty)`);
                } else {
                    console.log(`Room ${socket.roomId} now has ${room.users.size} users`);
                }
            }
        }
    });

    // Handle leave room
    socket.on('leave-room', () => {
        if (socket.roomId) {
            const room = rooms.get(socket.roomId);
            if (room) {
                room.users.delete(socket.id);
                socket.to(socket.roomId).emit('user-left', socket.id);
                socket.leave(socket.roomId);
                
                if (room.users.size === 0) {
                    rooms.delete(socket.roomId);
                }
            }
            socket.roomId = null;
        }
    });
});

// Clean up old rooms periodically (optional)
setInterval(() => {
    const now = new Date();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    for (const [roomId, room] of rooms.entries()) {
        if (now - room.createdAt > maxAge && room.users.size === 0) {
            rooms.delete(roomId);
            console.log(`Cleaned up old room: ${roomId}`);
        }
    }
}, 60 * 60 * 1000); // Run every hour

// Start Server
const PORT = process.env.PORT || 5000;

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill the process or use a different port.`);
        process.exit(1);
    } else {
        console.error('Server error:', e);
    }
});

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    // Standard practice is to exit if the error is severe
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
