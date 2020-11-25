const express = require("express");
const mongoose = require("mongoose");
const history = mongoose.model("history");

const router = express.Router();

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
