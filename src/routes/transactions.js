const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middleware/auth');
const checkParentalLock = require('../middleware/checkParentalLock');
const emergencyBlock = require('../middleware/emergencyBlock');

// Models
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// AES encryption imports
const { encrypt, decrypt } = require('../services/aes');

/* ===========================================================
   CREATE TRANSACTION  (credit / debit)
   =========================================================== */
router.post('/', auth, checkParentalLock, emergencyBlock, async (req, res) => {
  try {
    const { amount, type, category, note, relatedGoal } = req.body;

    if (!amount || !type)
      return res.status(400).json({ error: 'amount and type required' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // debit logic
    if (type === 'debit') {
      if (user.balance < amount)
        return res.status(400).json({ error: 'Insufficient balance' });

      user.balance -= amount;
    } 
    // credit logic
    else {
      user.balance += Number(amount);
    }

    await user.save();

    // AES ENCRYPT the note
    const encryptedNote = note ? encrypt(note) : "";

    const tx = new Transaction({
      owner: user._id,
      amount,
      type,
      category: category || 'general',
      note: encryptedNote,
      relatedGoal: relatedGoal || null
    });

    await tx.save();
    res.json(tx);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

/* ===========================================================
   LIST TRANSACTIONS (pagination + filters)
   =========================================================== */
router.get('/', auth, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || 1), 1);
    const limit = Math.min(parseInt(req.query.limit || 20), 200);
    const skip = (page - 1) * limit;

    const filter = { owner: req.user._id };

    if (req.query.category) filter.category = req.query.category;
    if (req.query.type) filter.type = req.query.type;

    // date filters
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.createdAt.$lte = new Date(req.query.to);
    }

    const [items, total] = await Promise.all([
      Transaction.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Transaction.countDocuments(filter)
    ]);

    // AES DECRYPT notes before returning
    const decryptedItems = items.map(tx => ({
      ...tx,
      note: tx.note ? decrypt(tx.note) : ""
    }));

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items: decryptedItems
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
