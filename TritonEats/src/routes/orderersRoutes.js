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

router.route("/customerPayment/:orderer_id").post(function (req, res) {
  var _id = req.params.orderer_id;
  console.log(_id);
  console.log(req.body);

  card_number = req.body.card_number;
  cvv = req.body.cvv;
  expiration_date = req.body.expiration_date;

  if (card_number == null) {
    res.status(422).send("Missing card number.");
  } else if (cvv == null) {
    res.status(422).send("Missing cvv.");
  } else if (expiration_date == null) {
    res.status(422).send("Missing expiration date.");
  } else {
    new_card = {
      card_number: card_number,
      cvv: cvv,
      expiration_date: expiration_date,
    };
    orderers.findOneAndUpdate(
      { orderer_id: _id },
      { $push: { payment_methods: new_card } },
      function (error, success) {
        if (error) {
          res.send(error);
        } else {
          res.send("Successfully added payment method.");
        }
      }
    );
  }
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
          deliverer_info.push([result[0].name, result[0].phone_num]);
          index = index + 1;
          helper(deliverer_ids, deliverer_info, index, response);
        }
      }
    );
  }
}


module.exports = router;