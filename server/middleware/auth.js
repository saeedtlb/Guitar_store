const User = require('../models/user');

const auth = async (req, res, next) => {
  const token = req.cookies.x_auth;

  try {
    const user = token ? await User.findByToken(token) : false;
    if (!user) return res.json({ isAuth: false });

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.json({ isAuth: false, error: true });
  }
};

module.exports = auth;
