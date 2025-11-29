const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user?.emergencyMode === true) {
    return res.status(403).json({ error: "Action blocked during emergency mode" });
  }

  next();
};
