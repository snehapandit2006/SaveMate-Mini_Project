const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user?.parentalLocked === true) {
    return res.status(423).json({ error: "Parental lock enabled. Access denied." });
  }

  next();
};
