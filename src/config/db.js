const mongoose = require('mongoose');
async function connectDB(uri) {
  if (!uri) throw new Error('MONGO_URI not set.');
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}
module.exports = connectDB;