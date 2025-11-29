// src/ws.js
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// will hold the Socket.IO server instance
let io = null;

function init(ioServer) {
  io = ioServer;

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    // client can authenticate by sending token in auth handshake or by emitting 'authenticate'
    // prefer token in handshake: socket.handshake.auth.token
    const handshakeToken = socket.handshake && socket.handshake.auth && socket.handshake.auth.token;
    if (handshakeToken) {
      try {
        const payload = jwt.verify(handshakeToken, jwtSecret);
        const userId = payload.id;
        socket.join(userId.toString());
        socket.userId = userId;
        console.log('socket', socket.id, 'authed via handshake as', userId);
        socket.emit('connected', { ok: true });
        return;
      } catch (err) {
        // invalid token — allow client to try 'authenticate' event
      }
    }

    // fallback: wait for explicit authenticate event
    socket.on('authenticate', (data) => {
      try {
        const token = (data && data.token) || null;
        if (!token) {
          socket.emit('unauthenticated', { error: 'no token' });
          return;
        }
        const payload = jwt.verify(token, jwtSecret);
        const userId = payload.id;
        socket.join(userId.toString());
        socket.userId = userId;
        socket.emit('authenticated', { ok: true, userId });
        console.log('socket', socket.id, 'authenticated as', userId);
      } catch (err) {
        socket.emit('unauthenticated', { error: 'invalid token' });
      }
    });

    // client may request to join other rooms (not recommended) — blocked by default
    socket.on('disconnect', (reason) => {
      console.log('socket disconnected', socket.id, reason);
    });
  });
}

function emitToUser(userId, event, payload) {
  if (!io) {
    console.warn('emitToUser: io not initialized');
    return;
  }
  if (!userId) return;
  io.to(userId.toString()).emit(event, payload);
}

function getIo() {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
}

module.exports = { init, emitToUser, getIo };
