const mongoose = require("mongoose");

const orderersSchema = new mongoose.Schema(
  {
    _id: String,
    orderer_id: String,
    name: String,
    email: String,
    residence: String,
    address: String,
    phone_num: String,
    registration_date: String,
    email_confirmed: Boolean,
    payment_methods: Array,
  },
  { collection: "Orderers" }
);

mongoose.model("orderers", orderersSchema);
