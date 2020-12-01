const express = require('express');
const mongoose = require('mongoose');
const deliverers = mongoose.model('deliverers');

const router = express.Router();


router.route('/delivererPay/:deliverrer_id').patch(async function (req, res) {
    console.log(req.deliverer_id)
    // // Update many to add fields
    // //
    // await deliverers.updateMany({}, [{
    //     $set: {
    //         balance: 30.900,
    //     }
    // }]).then((result, err) => {
    //     return res.status(200).send({ data: result, message: "Value Updated" });
    // });
    var _id = req.params.deliverrer_id
    try {
        const user = await deliverers.findOne({ deliverer_id: _id })
        if (!user) {
            return res.status(422).send({ error: "User was not found" });
        } else {
            const balance = user.balance;
            user.updateOne([{
                $set: {
                    balance: 0.0
                }
            }])
                .then((result) => {
                    console.log(result)
                })
            user.save().then((result) => {
                return res.status(200).send("Balance Succesfully Transfered")
            })


        }
    }
    catch (err) {
        res.status(422).send({ error: 'Invalid Information' })
        console.log(err)
    }
});

// show user balance before transfer
router.route('/delivererPay/:deliverrer_id').get(async function (req, res) {
    var _id = req.params.deliverrer_id
    const user = await deliverers.findOne({ deliverer_id: _id })
    if (!user) {
        return res.status(422).send({ error: "User was not found" });
    } else {
        return res.status(200).send({ balance: user.balance })
    }
});

module.exports = router;