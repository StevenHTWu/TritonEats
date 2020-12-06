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
=======
    balance: Number,
>>>>>>> af35a8b48a0c84a2f54a9121bd67fbcd95547017
  },
  { collection: "Deliverers" }
);

<<<<<<< HEAD
mongoose.model("deliverers", deliverersSchema);
=======
mongoose.model("deliverers", deliverersSchema);
>>>>>>> af35a8b48a0c84a2f54a9121bd67fbcd95547017
