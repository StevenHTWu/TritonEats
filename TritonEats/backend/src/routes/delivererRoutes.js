const express = require("express");
const mongoose = require("mongoose");
const deliverers = mongoose.model("deliverers");
const orders = mongoose.model("orders");
const orderers = mongoose.model("orderers");

const router = express.Router();

router.route("/delivererPay/:deliverrer_id").patch(async function (req, res) {
  console.log(req.deliverer_id);
  // // Update many to add fields
  // //
  // await deliverers.updateMany({}, [{
  //     $set: {
  //         balance: 30.900,
  //     }
  // }]).then((result, err) => {
  //     return res.status(200).send({ data: result, message: "Value Updated" });
  // });
  var _id = req.params.deliverrer_id;
  try {
    const user = await deliverers.findOne({ deliverer_id: _id });
    if (!user) {
      return res.status(422).send({ error: "User was not found" });
    } else {
      const balance = user.balance;
      user
        .updateOne([
          {
            $set: {
              balance: 0.0,
            },
          },
        ])
        .then((result) => {
          console.log(result);
        });
      user.save().then((result) => {
        return res.status(200).send("Balance Succesfully Transfered");
      });
    }
  } catch (err) {
    res.status(422).send({ error: "Invalid Information" });
    console.log(err);
  }
});

//Send a list of unaccepted jobs
router.route("/jobqueue").post(async function (req, res) { 
  const order = await orders.find({ deliverer_id: null });
  return res.status(200).json(order);
});

//Send a google maps link
router.route("/mapDirection").post(async function (req, res) { 

  var _id = req.deliverer_id;
  const order_id = await orders.find({ deliverer_id: _id });
  var link = "";
  if( order_id.status == "pending" ) {
    var restaraunt = order_id.restaraunt_name;
    var destination = restaraunt.replace(" ", "+");
    destination = destination.replace(",", "%2C");
    destination = destination + "%2C+UCSD";
    link = "https://www.google.com/maps/dir/?api=1&destination=" + destination + "&travelmode=walking&dir_action=navigate";
  } 
  else {  

    const orderer_id = order_id.orderer_id;
    const obj = await orderers.find({orderer_id: orderer_id});
    var address = obj.address;
    var destination = address.replace(" ", "+");
    destination = destination.replace(",", "%2C");
    destination = destination + "2C+UCSD";
    link = "https://www.google.com/maps/dir/?api=1&destination=" + destination + "&travelmode=walking&dir_action=navigate";
  }
  res.send(link);
});

// show user balance before transfer
router.route("/auth/delivererPay").get(async function (req, res) {
  var _id = req._id;
  const user = await deliverers.findOne({ deliverer_id: _id });
  if (!user) {
    return res.status(422).send({ error: "User was not found" });
  } else {
    return res.status(200).send({ balance: user.balance });
  }
});

module.exports = router;
