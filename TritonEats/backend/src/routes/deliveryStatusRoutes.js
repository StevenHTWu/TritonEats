const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("orders");

const router = express.Router();

router.patch("/auth/deliveryStatusUpdate", async (req, res) => {
  const status = req.body.status;

  if (status == null) res.status(422).send("Order status not provided!");

  const find_order = req.body.order_id;
  console.log("Patched...");
  console.log(status);
  console.log(req._id);
  const order = await Order.findOneAndUpdate(
    { order_id: find_order },

    {
      $set: {
        status: status,
      },
    },
    
    (err, response) => {
      if (err) res.send(err);
      else {
        switch (status) {
          case "preparing":
            res.send("Your order has been accepted and is being prepared...");
            break;

          case "Picked Up":
            console.log("Patched to picked up...");
            res.send(
              "Your order has been picked up and will arrive to you shortly."
            );
            break;

          case "Delivered":
            console.log("FInished delivering!");
            res.send("Your order has been delivered. Enjoy!");
        }
      }
    }
  );
});

module.exports = router;