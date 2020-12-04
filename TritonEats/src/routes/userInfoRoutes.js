const express = require("express");
const mongoose = require("mongoose");
const Auth = mongoose.model("Auth");

// update password through settings.
router.patch('/Password/:user_id/:password', async (req, res) => {
    let user_id = req.params.user_id;
    let password = req.params.password;

    Auth.find({ user_id: user_id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            try{
                await result.updatePassword(password);
                console.log(result);
                res.json(result);
            }
            catch(err) {
                res.send(err);
            }
        }
    });
});