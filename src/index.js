// src/index.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const passport = require('passport');
require('./passport');

const authRoutes = require('./routes/auth');
const workflowRoutes = require('./routes/workflows');
const transactionRoutes = require('./routes/transactions');
const goalsRoutes = require('./routes/goals');
const groupRoutes = require('./routes/groups');
const streakRoutes = require('./routes/streak');
const parentalRoutes = require('./routes/parental');
const statsRoutes = require('./routes/stats');

const startAutoSaveJob = require('./scheduler/autoSave');
const ws = require('./ws');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/streak', streakRoutes);
app.use('/api/parental', parentalRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => res.json({ message: 'SaveMate backend (extended features + sockets) running' }));

// create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true, credentials: true }
});

// initialize ws manager
ws.init(io);

// connect DB then start scheduler
connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connected, starting scheduler...');
    startAutoSaveJob();
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });

// start server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
