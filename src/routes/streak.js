const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const ws = require('../ws');

// Check-in endpoint: increments streak if consecutive, otherwise resets
router.post('/checkin', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const now = new Date();
    const last = user.streak.lastCheckIn ? new Date(user.streak.lastCheckIn) : null;

    function isYesterday(d1, d2) {
      const yesterday = new Date(d2);
      yesterday.setDate(yesterday.getDate() - 1);
      return d1.getFullYear() === yesterday.getFullYear() &&
             d1.getMonth() === yesterday.getMonth() &&
             d1.getDate() === yesterday.getDate();
    }

    if (!last) {
      user.streak.current = 1;
    } else {
      // if already checked in today, no-op
      const sameDay = last.getFullYear() === now.getFullYear() && last.getMonth() === now.getMonth() && last.getDate() === now.getDate();
      if (sameDay) return res.json({ streak: user.streak.current });
      if (isYesterday(last, now)) user.streak.current += 1;
      else user.streak.current = 1;
    }
    user.streak.lastCheckIn = now;
    await user.save();
    res.json({ streak: user.streak.current, lastCheckIn: user.streak.lastCheckIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
await user.save();
ws.emitToUser(user._id, 'streak:update', { streak: user.streak.current, lastCheckIn: user.streak.lastCheckIn });
res.json({ streak: user.streak.current, lastCheckIn: user.streak.lastCheckIn });
