const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// returns totals by category and monthly aggregates
router.get('/spending', auth, async (req, res) => {
  try {
    const ownerId = mongoose.Types.ObjectId(req.user._id);

    // category totals
    const byCategory = await Transaction.aggregate([
      { $match: { owner: ownerId, type: 'debit' } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);

    // monthly totals for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const monthly = await Transaction.aggregate([
      { $match: { owner: ownerId, type: 'debit', createdAt: { $gte: sixMonthsAgo } } },
      { $project: { amount: 1, year: { $year: '$createdAt' }, month: { $month: '$createdAt' } } },
      { $group: { _id: { year: '$year', month: '$month' }, total: { $sum: '$amount' } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // totals: income vs expense
    const totals = await Transaction.aggregate([
      { $match: { owner: ownerId } },
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

    res.json({ byCategory, monthly, totals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
