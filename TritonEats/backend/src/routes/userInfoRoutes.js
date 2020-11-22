const express = require("express");
const mongoose = require("mongoose");
const orderer = mongoose.model("ordererInfo");
const deliverer = mongoose.model("delivererInfo");

const router = express.Router();

router.get('/userInfo/:deliverer_id/:isDeliverer', async (req, res) => {
    let user_id = req.params.deliverer_id;
    let isDeliverer = req.params.isDeliverer;


    if (isDeliverer === "true") {
            info = await deliverer.find({ deliverer_id: user_id }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    } else {
            info = await orderer.find({ orderer_id: user_id }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

module.exports = router;
