const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ParentalLock = require('../models/ParentalLock');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// nodemailer transporter - uses SMTP from env if provided, otherwise logs OTP
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

// helper to hash OTP
function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

// request OTP (sends to user's email if available)
router.post('/request', auth, async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let pl = await ParentalLock.findOne({ user: req.user._id });
    if (!pl) pl = new ParentalLock({ user: req.user._id });
    pl.otpHash = otpHash;
    pl.otpExpiresAt = expiresAt;
    await pl.save();

    const mailText = `Your parental lock OTP: ${otp}. It expires in 10 minutes.`;
    if (transporter) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'no-reply@savemate.app',
        to: req.user.email,
        subject: 'Parental Lock OTP',
        text: mailText
      });
    } else {
      // dev fallback: log OTP - this is helpful for local dev
      console.log('Parental OTP (dev mode):', otp);
    }

    res.json({ ok: true, message: 'OTP sent (or logged in dev)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// verify OTP to unlock or authorize sensitive actions
router.post('/verify', auth, async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ error: 'otp required' });

    const pl = await ParentalLock.findOne({ user: req.user._id });
    if (!pl || !pl.otpHash) return res.status(400).json({ error: 'no otp requested' });

    if (pl.otpExpiresAt < new Date()) return res.status(400).json({ error: 'otp expired' });

    if (pl.otpHash !== hashOtp(otp)) return res.status(400).json({ error: 'invalid otp' });

    // success; clear OTP and optionally set a short-term unlocked window (e.g., 30 minutes)
    pl.otpHash = null;
    pl.otpExpiresAt = null;
    pl.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // unlocked for 30 min
    await pl.save();

    res.json({ ok: true, unlockedUntil: pl.lockedUntil });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// helper to check parental lock in other routes: call this middleware or check in controllers
module.exports = router;
