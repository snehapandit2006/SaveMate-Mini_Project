const rateLimit = {};

module.exports = (req, res, next) => {
  const userId = req.user?._id || req.ip;
  const now = Date.now();

  if (!rateLimit[userId]) {
    rateLimit[userId] = { count: 1, time: now };
    return next();
  }

  const diff = now - rateLimit[userId].time;

  if (diff > 60 * 1000) { 
    rateLimit[userId] = { count: 1, time: now };
    return next();
  }

  if (rateLimit[userId].count > 60) {
    return res.status(429).json({ error: "Too many requests. Try later." });
  }

  rateLimit[userId].count++;
  next();
};
