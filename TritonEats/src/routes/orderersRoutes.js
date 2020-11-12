const express = require('express');
const mongoose = require('mongoose');
const orderers = mongoose.model('orderers');

const router = express.Router();

router.route("/orderers").get(function(req, res) {
    orderers.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  });

module.exports = router;