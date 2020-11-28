const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userAuth = mongoose.model('userAuth');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    const user = await userAuth.findById(userId);
    req.user = user;
    next();
  });
};
