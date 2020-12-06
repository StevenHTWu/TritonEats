<<<<<<< HEAD
const mongoose = require('mongoose');

const resMenuSchema = new mongoose.Schema({ _id: String, restaurant_name: String, address: String, hours: [{day: String, opening_hour: String, closing_hour: String}], breakfast_menu: [{name: String, price: String}], lunch_menu: {name: String, price: String}, dinner: {name: String, price: String}}, { collection : 'Restaurants' });
=======
const mongoose = require("mongoose");

const resMenuSchema = new mongoose.Schema(
  {
    _id: String,
    restaurant_name: String,
    address: String,
    hours: [{ day: String, opening_hour: String, closing_hour: String }],
    breakfast_menu: [{ name: String, price: String }],
    lunch_menu: { name: String, price: String },
    dinner: { name: String, price: String },
  },
  { collection: "Restaurants" }
);
>>>>>>> af35a8b48a0c84a2f54a9121bd67fbcd95547017
/*
const resMenuSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    residence: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_num: {
        type: String,
        required: true
    },
    registration_date : { 
        type : Date, 
        default: Date.now 
    }
});
*/
<<<<<<< HEAD
mongoose.model('resMenu', resMenuSchema);
=======
mongoose.model("resMenu", resMenuSchema);
>>>>>>> af35a8b48a0c84a2f54a9121bd67fbcd95547017
