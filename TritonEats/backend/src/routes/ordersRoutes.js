const express = require("express");
const mongoose = require("mongoose");
const orders = mongoose.model("orders");
const deliverers = mongoose.model("deliverers");

ObjectID = require("mongodb").ObjectID;

const router = express.Router();

router.route("/auth/orderStatus").get(async function (req, res) {
  const order = await orders.findOne({ orderer_id: _id });
  if (!order) {
    res.status(400).send("User has no active orders.");
  } else {
    const orderObj = order.toObject();
    const status = orderObj.status;
    console.log(orderObj);
    console.log(status);
    if (status == "Order Pending") {
      res.status(200).send({
        status: status,
      });
    } else {
      console.log(orderObj.deliverer_id);
      const deliverer = await deliverers.findOne({
        deliverer_id: orderObj.deliverer_id,
      });

      const delivererObj = deliverer.toObject();
      console.log(delivererObj);
      res.status(200).send({
        status: orderObj.status,
        name: delivererObj.name,
        num: delivererObj.phone_num,
      });
    }
  }
});

router.route("/auth/makeOrder").post(async function (req, res) {
  var parameters = req.body;
  var orderer_id = req._id;
  var restaurant_name = parameters.restaurant_name;
  var order_items = parameters.order_items;
  var total_price = parameters.total_price;

  console.log(orderer_id);
  console.log(restaurant_name);
  console.log(order_items);

  if (orderer_id == null) {
    res.status(422).send("Missing orderer_id");
  } else if (restaurant_name == null) {
    res.status(422).send("Missing restaurant name");
  } else if (order_items == null) {
    res.status(422).send("Missing order items.");
  } else if (total_price == null) {
    res.status(422).send("Missing total price.");
  } else {
    var order_placement_time = new Date();

    //object_id required for mongodb purposes
    var _id = new ObjectID();
    //the actual order_id
    var order_id = new ObjectID();

    var order_pickup_time = null;
    var deliverer_id = null;
    var status = "Order Pending";

    try {
      const order = new orders({
        _id,
        order_id,
        orderer_id,
        restaurant_name,
        order_items,
        order_placement_time,
        order_pickup_time,
        deliverer_id,
        status,
        total_price,
      });
      await order.save();

      res.status(200).send("Order was placed successfully.");
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
});

module.exports = router;
