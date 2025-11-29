const mongoose = require('mongoose');

const ParentalLockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  otpHash: { type: String },
  otpExpiresAt: { type: Date },
  lockedUntil: { type: Date, default: null } // optional: lock expiry
});

module.exports = mongoose.model('ParentalLock', ParentalLockSchema);
