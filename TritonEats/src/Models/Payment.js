const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    _id: String,
    first_name: String,
    last_name: String,
    card_number: { type: Number, required: true },
    exp_date: String,
    cvv: { type: Number, required: true },
    zipcode: { type: Number, required: true, }
},
    { collection: 'userAuths' });

mongoose.model('paymentInfo', paymentSchema);