const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/Goal');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const ws = require('../ws');


// create goal
router.post('/', auth, async (req, res) => {
  try {
    const { title, targetAmount } = req.body;
    if (!title || !targetAmount) return res.status(400).json({ error: 'title and targetAmount required' });

    const goal = new Goal({ title, owner: req.user._id, targetAmount });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// get user's goals
router.get('/', auth, async (req, res) => {
  const goals = await Goal.find({ owner: req.user._id }).sort({ updatedAt: -1 });
  res.json(goals);
});

// manual deposit to goal from user balance
router.post('/:id/deposit', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'amount must be > 0' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.emergencyMode) return res.status(403).json({ error: 'Cannot deposit while emergency mode is ON' });
    if (user.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

    const goal = await Goal.findOne({ _id: req.params.id, owner: req.user._id });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    user.balance -= amount;
    goal.currentAmount += Number(amount);

    await user.save();
    await goal.save();

    const tx = new Transaction({ owner: user._id, amount, type: 'debit', category: 'goal', relatedGoal: goal._id });
    await tx.save();

    res.json({ user, goal, tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// set auto-save for a goal
router.post('/:id/auto-save', auth, async (req, res) => {
  try {
    const { enabled, amount, period } = req.body; // amount per run
    const goal = await Goal.findOne({ _id: req.params.id, owner: req.user._id });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    goal.autoSave.enabled = enabled === true || enabled === 'true';
    goal.autoSave.amount = Number(amount) || 0;
    goal.autoSave.period = period || 'daily';
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;

await user.save();
await goal.save();
const tx = new Transaction({ owner: user._id, amount, type: 'debit', category: 'goal', relatedGoal: goal._id });
await tx.save();

// emit notification to owner (they are the depositor)
ws.emitToUser(user._id, 'goal:update', {
  goalId: goal._id, title: goal.title, currentAmount: goal.currentAmount, targetAmount: goal.targetAmount
});
res.json({ user, goal, tx });
