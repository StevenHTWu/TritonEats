const express = require("express");
const mongoose = require("mongoose");
const userAuth = mongoose.model("userAuth");
const orderers = mongoose.model("orderers");
const deliverers = mongoose.model("deliverers");

ObjectID = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, is_deliverer } = req.body;
  try {
    console.log(is_deliverer);
    const user = new userAuth({ email, password, is_deliverer });
    await user.save();

    var profile = null;
    x = req.body.is_deliverer;
    if (x) {
      const _id = new ObjectID();
      const deliverer_id = new ObjectID();
      const name = "";
      const email = req.body.email;
      const phone_num = "";
      const registration_date = new Date();
      const email_confirmed = true;
      const active = true;
      const balance = 0.0;

      profile = new deliverers({
        _id,
        deliverer_id,
        name,
        email,
        phone_num,
        registration_date,
        email_confirmed,
        active,
        balance,
      });
    }
    if (!x) {
      const _id = new ObjectID();
      const orderer_id = new ObjectID();
      const name = "";
      const email = req.body.email;
      const residence = "";
      const address = "";
      const phone_num = "";
      const registration_date = new Date();
      const email_confirmed = true;
      const payment_methods = [];

      profile = new orderers({
        _id,
        orderer_id,
        name,
        email,
        residence,
        address,
        phone_num,
        registration_date,
        email_confirmed,
        payment_methods,
      });
    }
    await profile.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
/*
router.post("/addcard", async (req, res) => {
  const { cardNum, cvv, expDate, token } = req.body;
  console.log(cardNum);
  console.log(token);
  try {
    console.log(cvv);

    jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in." });
      }
  
      const { userId } = payload;
      console.log(payload);

    });
    
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
*/
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await userAuth.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    console.log(user);
    const isDeliverer = user.is_deliverer;
    res.send({ token, isDeliverer });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
