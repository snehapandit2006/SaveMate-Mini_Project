const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number },
  at: { type: Date, default: Date.now }
}, { _id: false });

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  contributions: [ContributionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);
