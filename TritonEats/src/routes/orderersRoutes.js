const express = require("express");
const mongoose = require("mongoose");
const orders = mongoose.model("orders");
const orderers = mongoose.model("orderers");
const deliverers = mongoose.model("deliverers");

const router = express.Router();

router.route("/orderers").get(function (req, res) {
  orderers.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/delivererInfo/:orderer_id").get(function (req, res) {
  var _id = req.params.orderer_id;
  console.log(_id);
  orders.find({ orderer_id: _id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //console.log(result);
      var i;
      deliverer_ids = [];
      for (i = 0; i < result.length; i++) {
        deliverer_ids.push(result[i].deliverer_id);
      }

      helper(deliverer_ids, [], 0, res);
    }
  });
});

function helper(deliverer_ids, deliverer_info, index, response) {
  console.log("index = " + index);
  console.log("length = " + deliverer_ids.length);

  if (index == deliverer_ids.length) {
    console.log("Sending response");
    response.send(deliverer_info);
  } else {
    deliverers.find(
      { deliverer_id: deliverer_ids[index] },
      function (err, result) {
        if (err) {
          //res.send(err);
        } else {
          console.log(result);
          console.log(deliverer_ids[index]);
          deliverer_info.push([result[0].name, result[0].phone_num]);
          console.log("Recursing");
          index = index + 1;
          helper(deliverer_ids, deliverer_info, index, response);
        }
      }
    );
  }
}

module.exports = router;
