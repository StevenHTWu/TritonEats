const express = require("express");
const mongoose = require("mongoose");
const orderer = mongoose.model("ordererInfo");
const deliverer = mongoose.model("delivererInfo");

const router = express.Router();

router.get('/userInfo/:user_id/:isDeliverer', async (req, res) => {
    let user_id = req.params.user_id;
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

router.patch('/userInfo/:user_id/:isDeliverer', async (req, res) => {
    let user_id = req.params.user_id;
    let isDeliverer = req.params.isDeliverer;

    if (isDeliverer === "true") {
        deliverer.find({ deliverer_id: user_id }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                try{
                    for(let b in req.body){
                        if (!req.body[b])
                            res.send("Error! Please fil all fields.")
                        result[0][b] = req.body[b];
                    }
                    console.log(result);
                    result[0].save();
                    res.json(result);
                }
                catch(err) {
                    res.send(err);
                }
            }
        });
    } else {
        orderer.find({ orderer_id: user_id }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                try{
                    for(let b in req.body){
                        if (!req.body[b])
                            res.send("Error! Please fil all fields.")
                        result[0][b] = req.body[b];
                    }
                    console.log(result);
                    result[0].save();
                    res.json(result);
                }
                catch(err) {
                    res.send(err);
                }
            }
        });
    }
})

module.exports = router;
