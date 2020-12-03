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
    balance: Number,
  },
  { collection: "Deliverers" }
);

mongoose.model("deliverers", deliverersSchema);