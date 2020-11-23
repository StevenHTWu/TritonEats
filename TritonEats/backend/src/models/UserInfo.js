const mongoose = require("mongoose");

const delivererInfoSchema = new mongoose.Schema({
    //_id: String,
    deliverer_id: String,
    "name": String,
    email: String,
    phone_num: String,
    registration_date: String,
    email_confirmed: Boolean,
    active: Boolean
}, {collection: 'Deliverers'});

const ordererInfoSchema = new mongoose.Schema({
    //_id: String,
    orderer_id: String,
    name: String,
    email: String,
    phone_num: String,
    //apartment: String,
    residence: String,
    address: String,
    //card_number: String,
    //expiry_date: String,
    //cvv_number: String,
    registration_date: String,
    email_confirmed: Boolean,
}, {collection: 'Orderers'});


mongoose.model("ordererInfo", ordererInfoSchema);
mongoose.model("delivererInfo", delivererInfoSchema);