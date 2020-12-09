const express = require("express");
const mongoose = require("mongoose");
const orderer = mongoose.model("orderers");
const deliverer = mongoose.model("delivererInfo");

const router = express.Router();

router.get("/auth/orderer/userInfo", async (req, res) => {
  const ordererObj = await orderer.findOne({ orderer_id: req._id });
  console.log(ordererObj);

  res.json(ordererObj);

});

router.get("/orderer/userInfoAsDeliverer/:orderer_id", async (req, res) => {
  console.log("ORDERER ID");
  console.log(req.params.orderer_id);
  const ordererObj = await orderer.findOne({
    orderer_id: req.params.orderer_id,
  });
  res.json(ordererObj);
});

router.patch("/auth/orderer/userAddressUpdate", async (req, res) => {
  var parameters = req.body;

  var address = parameters.address;
  var apartment = "" + parameters.apartment;
  var residence = parameters.residence;
  console.log(apartment);
  console.log(address);
  console.log(residence);
  const my_orderer = await orderer.findOneAndUpdate(
    { orderer_id: req._id },

    {$set:
      {
        apartment: apartment,
        residence: residence,
        address: address



      },
      
  }, {new: true},
    (err, response) => {

      if (err) res.send(err);
      else {
        response.save();
        res.send("Update complete");
      }
    })
      
});

router.patch("/auth/orderer/userProfileUpdate", async (req, res) => {
  const ordererObj = await orderer.findOne({ orderer_id: req._id });
  var parameters = req.body;

  var name = parameters.name;

  let user_id = ordererObj.orderer_id;
  const my_orderer = await orderer.findOneAndUpdate(
    { orderer_id: user_id },

    {
      $set: {
        name: name,
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
