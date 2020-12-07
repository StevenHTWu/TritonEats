const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Orders");

const router = express.Router();

router.patch("/auth/deliveryStatusUpdate", async (req, res) => {
  const status = req.body.status;

  if (status == null) res.status(422).send("Order status not provided!");

  console.log("Patched...");
  const order = await Order.findOneAndUpdate(
    { deliverer_id: req._id },

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

          case "picked up":
            res.send(
              "Your order has been picked up and will arrive to you shortly."
            );
            break;

          case "delivered":
            res.send("Your order has been delivered. Enjoy!");
        }
      }
    }
  );
});

module.exports = router;