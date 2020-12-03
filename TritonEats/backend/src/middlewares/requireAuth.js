const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userAuth = mongoose.model("userAuth");
const orderers = mongoose.model("orderers");
const deliverers = mongoose.model("deliverers");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("-------------", authorization);

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userId } = payload;

    const user = await userAuth.findById(userId);
    const userObj = user.toObject();
    deliverer = userObj.is_deliverer;
    _id = "";
    if (deliverer) {
      profile = await (
        await deliverers.findOne({ email: user.email })
      ).toObject();
      _id = profile.deliverer_id;
    } else {
      profile = await (
        await orderers.findOne({ email: user.email })
      ).toObject();
      _id = profile.orderer_id;
    }

    req._id = _id;
    console.log(_id);
    next();
  });
};
