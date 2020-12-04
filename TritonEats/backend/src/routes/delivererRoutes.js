const express = require("express");
const mongoose = require("mongoose");
const deliverers = mongoose.model("deliverers");
const orders = mongoose.model("orders");
const orderers = mongoose.model("orderers");

const router = express.Router();

router.route("/delivererPay/:deliverrer_id").patch(async function (req, res) {
  console.log(req.deliverer_id);

  var _id = req.params.deliverrer_id;
  try {
    const user = await deliverers.findOne({ deliverer_id: _id });
    if (!user) {
      return res.status(422).send({ error: "User was not found" });
    } else {
      const balance = user.balance;
      user
        .updateOne([
          {
            $set: {
              balance: 0.0,
            },
          },
        ])
        .then((result) => {
          console.log(result);
        });
      user.save().then((result) => {
        return res.status(200).send("Balance Succesfully Transfered");
      });
    }
  } catch (err) {
    res.status(422).send({ error: "Invalid Information" });
    console.log(err);
  }
});

// show user balance before transfer
router.route("/auth/delivererPay").get(async function (req, res) {
  var _id = req._id;
  const user = await deliverers.findOne({ deliverer_id: _id });
  if (!user) {
    return res.status(422).send({ error: "User was not found" });
  } else {
    return res.status(200).send({ balance: user.balance });
  }
});

router.route("/auth/directions").get(async function (req, res) {
  const order = await orders.findOne({ deliverer_id: _id });
  if (!order) {
    res.status(404).send({ error: "Deliverer has no orders." });
  } else {
    orderer_id = order.toObject().orderer_id;
    const orderer = await orderers.findOne({ orderer_id: orderer_id });
    const ordererObj = orderer.toObject();
    res
      .status(200)
      .send({ location: ordererObj.address, apartment: ordererObj.residence });
  }
});

router.route("/auth/jobAccept/:order_id").post(async function (req, res) {
  order_id = req.params.order_id;
  orders.findOne({ order_id: order_id }, async function (err, ord) {
    if (err) {
      res.status(404).send(err);
    } else {
      ord.status = "picked up";
      ord.deliverer_id = req._id;
      console.log(ord);
      await ord.save();
      res.status(200).send("Job was successfully accepted.");
    }
  });
});

module.exports = router;
