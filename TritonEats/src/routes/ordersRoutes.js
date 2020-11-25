const express = require("express");
const mongoose = require("mongoose");
const orders = mongoose.model("orders");
ObjectID = require("mongodb").ObjectID;

const router = express.Router();

router.route("/makeOrder").post(async function (req, res) {
  var parameters = req.body;
  var orderer_id = parameters.orderer_id;
  var restaurant_name = parameters.restaurant_name;
  var order_items = parameters.order_items;
  var total_price = parameters.total_price;

  console.log(orderer_id);
  console.log(restaurant_name);
  console.log(order_items);

  if (orderer_id == null) {
    res.status(400).send("Missing orderer_id");
  } else if (restaurant_name == null) {
    res.status(400).send("Missing restaurant name");
  } else if (order_items == null) {
    res.status(400).send("Missing order items.");
  } else if (total_price == null) {
    res.status(400).send("Missing total price.");
  } else {
    var order_placement_time = new Date();

    //object_id required for mongodb purposes
    var _id = new ObjectID();
    //the actual order_id
    var order_id = new ObjectID();

    var order_pickup_time = null;
    var deliverer_id = null;
    var status = null;

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
