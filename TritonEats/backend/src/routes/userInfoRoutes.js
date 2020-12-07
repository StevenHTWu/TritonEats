const express = require("express");
const mongoose = require("mongoose");
const orderer = mongoose.model("ordererInfo");
const deliverer = mongoose.model("delivererInfo");

const router = express.Router();

router.get("/auth/orderer/userInfo", async (req, res) => {
  const ordererObj = await orderer.findOne({ orderer_id: req._id });

  let user_id = ordererObj.orderer_id;
  console.log(user_id + "123");
  const info = await orderer.find({ orderer_id: user_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({
        address: ordererObj.address,
      });
    }
  });
});

router.patch("/userInfo/:user_id/:isDeliverer", async (req, res) => {
  let user_id = req.params.user_id;
  let isDeliverer = req.params.isDeliverer;

  if (isDeliverer === "true") {
    deliverer.find({ deliverer_id: user_id }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        try {
          for (let b in req.body) {
            if (!req.body[b]) res.send("Error! Please fil all fields.");
            result[0][b] = req.body[b];
          }
          console.log(result);
          result[0].save();
          res.json(result);
        } catch (err) {
          res.send(err);
        }
      }
    });
  } else {
    orderer.find({ orderer_id: user_id }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        try {
          for (let b in req.body) {
            if (!req.body[b]) res.send("Error! Please fil all fields.");
            result[0][b] = req.body[b];
          }
          console.log(result);
          result[0].save();
          res.json(result);
        } catch (err) {
          res.send(err);
        }
      }
    });
  }
});

module.exports = router;
