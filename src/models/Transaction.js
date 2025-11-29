const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit','debit'], required: true }, // credit: to user, debit: from user
  category: { type: String, default: 'general' },
  note: { type: String, default: '' },
  relatedGoal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
