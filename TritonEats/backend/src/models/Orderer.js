const mongoose = require("mongoose");

const ordererSchema = new mongoose.Schema({
    orderer_id : String,
    name : String,
    email : String,
    apartment : String,
    residence : String,
    address : String,
    phone_num : String
}, { collection : "Orderers" });

mongoose.model("Orderer", ordererSchema);