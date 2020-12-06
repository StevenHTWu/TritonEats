const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Orders");
const 
const router = express.Router();
router.patch("/deliveryStatusUpdate/:deliverer_id", async (req, res) => {
    var order_id = await Order.find({"deliverer_id" : req.params.deliverer_id});
    const status = req.body.status;
    if (status == null)
        res.status(422).send("Order status not provided!");
    const order = await Order.findOneAndUpdate({ "order_id" : order_id }, 
        { "$set" : { 
            "status" : status 
        }}, (err, response) => {
            if (err)
                res.send(err);
            else {
                switch (status) {
                    case "preparing":
                        res.send("Your order has been accepted and is being prepared...");
                        break;
                    case "picked up":
                        res.send("Your order has been picked up and will arrive to you shortly.");
                        break;
                    case "delivered":
                        res.send("Your order has been delivered. Enjoy!");
                }
            }
    });
});
module.exports = router;