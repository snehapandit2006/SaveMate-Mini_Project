const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// create group
router.post('/', auth, async (req, res) => {
  try {
    const { name, targetAmount, members } = req.body;
    if (!name || !targetAmount) return res.status(400).json({ error: 'name and targetAmount required' });

    const group = new Group({
      name,
      owner: req.user._id,
      members: Array.isArray(members) ? members : [req.user._id],
      targetAmount
    });
    if (!group.members.includes(req.user._id)) group.members.push(req.user._id);
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// join group
router.post('/:id/join', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    if (!group.members.some(m => m.toString() === req.user._id.toString())) {
      group.members.push(req.user._id);
      await group.save();
    }
    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// contribute to group (debit user's balance)
router.post('/:id/contribute', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'amount required' });

    const user = await User.findById(req.user._id);
    if (user.emergencyMode) return res.status(403).json({ error: 'Cannot contribute while emergency mode is ON' });
    if (user.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    user.balance -= amount;
    group.currentAmount += Number(amount);
    group.contributions.push({ by: user._id, amount: Number(amount) });

    await user.save();
    await group.save();

    const tx = new Transaction({ owner: user._id, amount, type: 'debit', category: 'group', note: `contrib to group ${group._id}` });
    await tx.save();

    res.json({ user, group, tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
