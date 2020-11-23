const express = require('express');
const mongoose = require('mongoose');
const userAuth = mongoose.model('userAuth');

const router = express.Router();


router.patch('/pay', async (req, res) => {
    console.log(req.body)
    // Update many to add fields
    //
    //     await userAuth.updateMany({}, [{
    //         $set: {
    //             last_name: 'lol',
    //             card_number: 1234567890123456,
    //             exp_date: "00/00",
    //             cvv: 123,
    //             zipcode: 92122
    //         }
    //     }]).then((result, err) => {
    //         return res.status(200).send({ data: result, message: "Value Updated" });
    //     });

    const { email,
        firstName,
        lastName,
        cardNumber,
        expDate,
        cvv,
        zipcode } = req.body;
    try {
        const user = await userAuth.findOne({ email: email })
        if (!user) {
            return res.status(422).send({ error: "User was not found" });
        } else {
            user.updateOne([{
                $set: {
                    first_name: firstName,
                    last_name: lastName,
                    card_number: cardNumber,
                    exp_date: expDate,
                    cvv: cvv,
                    zipcode: zipcode
                }
            }]).then((result) => {
                console.log(result)
            })
            user.save().then((result) => {
                return res.status(200).send({ data: result })
            })


        }
    }
    catch (err) {
        res.status(422).send({ error: 'Invalid Information' })
        console.log(err)
    }
});


module.exports = router;