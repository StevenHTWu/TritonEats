const mongoose = require("mongoose");

const deliverersSchema = new mongoose.Schema(
  {
    _id: String,
    deliverer_id: String,
    name: String,
    email: String,
    phone_num: String,
    registration_date: String,
    email_confirmed: Boolean,
    active: Boolean,
<<<<<<< HEAD
    balance: Number,
=======
>>>>>>> Deliverer-Home-Screen
  },
  { collection: "Deliverers" }
);

<<<<<<< HEAD

=======
>>>>>>> Deliverer-Home-Screen
mongoose.model("deliverers", deliverersSchema);
