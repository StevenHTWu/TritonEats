const express = require("express");
const mongoose = require("mongoose");
const history = mongoose.model("history");
const orders = mongoose.model("orders");

const router = express.Router();

router.route("/auth/history").get(function (req, res) {
  orderer_id = req._id;
  history.find({ orderer_id: orderer_id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/auth/complete").post(function (req, res) {
  orderer_id = req._id;
  console.log(orderer_id);
  orders.find({ orderer_id: orderer_id }, async function (err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (result.length == 0) {
        res
          .status(400)
          .send("No order exists for orderer " + orderer_id + " .");
      } else {
        console.log("Creating history document.");
        obj = result.entries().next().value[1];

        try {
          var _id = obj._id;
          var order_id = obj.order_id;
          var orderer_id = obj.orderer_id;
          var restaurant_name = obj.restaurant_name;
          var order_items = obj.order_items;
          var order_placement_time = obj.order_placement_time;
          var order_pickup_time = obj.order_pickup_time;
          var order_completion_time = new Date();
          var deliverer_id = obj.deliverer_id;
          var total_price = obj.total_price;

          const completed_order = new history({
            _id,
            order_id,
            orderer_id,
            restaurant_name,
            order_items,
            order_placement_time,
            order_pickup_time,
            order_completion_time,
            deliverer_id,
            total_price,
          });
          await completed_order.save();
          await orders.deleteOne({ order_id: order_id });

          res.status(200).send("Order was completed successfully.");
        } catch (err) {
          console.log(err);
          return res.status(422).send(err.message);
        }
      }
    }
  });
});

// router.route("/history/:orderer_id").get(function (req, res) {
//   orderer_id = req.params.orderer_id;
//   history.find({ orderer_id: orderer_id }, function (err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

module.exports = router;
