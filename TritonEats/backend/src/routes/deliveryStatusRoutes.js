const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Orders");

const router = express.Router();

router.patch("/auth/deliveryStatusUpdate", async (req, res) => {
  const status = req.body.status;

  if (status == null) res.status(422).send("Order status not provided!");

<<<<<<< HEAD
  console.log("Patched...");
=======
>>>>>>> 33e37896116ea5a952b4f70bc580aa392c925535
  const order = await Order.findOneAndUpdate(
    { deliverer_id: req._id },

    {
      $set: {
        status: status,
      },
    },
<<<<<<< HEAD
    
=======
>>>>>>> 33e37896116ea5a952b4f70bc580aa392c925535
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