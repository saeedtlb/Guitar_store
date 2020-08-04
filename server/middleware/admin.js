const admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(401).send('You are not Allowed');
  }
  next();
};

module.exports = admin;
