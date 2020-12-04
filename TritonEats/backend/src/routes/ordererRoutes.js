const express = require("express");
const mongoose = require("mongoose");
const Orderer = mongoose.model("Orderer");

const router = express.Router();

router.patch("/customerAddress/:id/", async (req, res) => {
        
    const address = req.body.address;
    const residence = req.body.residence;
    const apartment = req.body.apartment;
    const phone_num = req.body.phone_num;

    if (address == null)
        res.status(422).send("Missing address info!");

    if (residence == null)
        res.status(422).send("Missing residence info!");

    if (apartment == null)
        res.status(422).send("Missing apartment info!");

    if (phone_num == null)
        res.status(422).send("Missing phone number info!");
    
    const orderer = await Orderer.findOneAndUpdate({ "orderer_id" : req.params.id }, 

        { "$set" : {

            "address" : address,
            "residence" : residence,
            "apartment" : apartment,
            "phone_num" : phone_num

        }}, (err, response) => {

            if (err)
                res.send(err);
            else 
                res.send("Address has been updated");
    });
});

module.exports = router;