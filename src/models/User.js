const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, unique: true, index: true },
  password: { type: String, required: false },
  balance: { type: Number, default: 0 }, // user's wallet/balance
  emergencyMode: { type: Boolean, default: false },
  // streak system
  streak: {
    current: { type: Number, default: 0 },
    lastCheckIn: { type: Date, default: null }
  },
  createdAt: { type: Date, default: Date.now }
});

// hash password before save (only if present and modified)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidate) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);
