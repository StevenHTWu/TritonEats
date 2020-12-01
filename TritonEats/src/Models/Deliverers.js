const mongoose = require('mongoose')

const delivSchema = new mongoose.Schema({

    deliverer_id: String,
    email: String,
    name: String,
    phone_num: String,
    resgistration_date: String,
    email_confirmed: Boolean,
    active: Boolean,
    balance: Number,

},
    { collection: 'Deliverers' });

mongoose.model('deliverers', delivSchema);