const express = require("express");
const mongoose = require("mongoose");
const orderer = mongoose.model("orderers");
const deliverer = mongoose.model("deliverers");

const router = express.Router();

router.get("/userInfo/:user_id/:isDeliverer", async (req, res) => {
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

router.get("/orderer/userInfoAsDeliverer:orderer_id", async (req, res) => {
  const ordererObj = await orderer.findOne({ orderer_id: req.params.orderer_id });
  res.json(orderObj);
});



router.get("/auth/orderer/userInfo", async (req, res) => {
  const ordererObj = await orderer.findOne({ orderer_id: req._id });

  let user_id = ordererObj.orderer_id;
  const info = await orderer.find({ orderer_id: user_id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.patch("/auth/orderer/userAddressUpdate", async (req, res) => {
  const ordererObj = await orderer.findOne({ orderer_id: req._id });
  var parameters = req.body;

  var address = parameters.address;
  var apartment = parameters.apartment;
  var residence = parameters.residence;

  let user_id = ordererObj.orderer_id;
  const my_orderer = await orderer.findOneAndUpdate(
    { orderer_id: user_id },

    {
      $set: {
        address: address,
        apartment: apartment,
        residence: residence,
      },
    },
    (err, response) => {
      if (err) res.send(err);
      else {
        res.send("Updated successfully!");
      }
    }
  );
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
