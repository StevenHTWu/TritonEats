const express = require("express");
const mongoose = require("mongoose");
const orderers = mongoose.model("orderers");
const history = mongoose.model("history");

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

router.route("/history/:orderer_id").get(function (req, res) {
  orderer_id = req.params.orderer_id;
  history.find({ orderer_id: orderer_id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
