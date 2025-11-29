const mongoose = require('mongoose');

const AutoSaveSettingSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  amount: { type: Number, default: 0 }, // amount to transfer at each period
  period: { type: String, enum: ['daily','weekly','monthly'], default: 'daily' }, // for future extensibility
  lastRun: { type: Date, default: null }
}, { _id: false });

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  autoSave: { type: AutoSaveSettingSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

GoalSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  if (this.currentAmount >= this.targetAmount) this.isCompleted = true;
  next();
});

module.exports = mongoose.model('Goal', GoalSchema);
