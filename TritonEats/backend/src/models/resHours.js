const mongoose = require("mongoose");

const resHoursSchema = new mongoose.Schema(
  {
    restaurant_name: String /*{
        type : String,
        unique : true,
        required : true,
    }*/,
    address: String /*{
        type : String,
        required : true,
    }*/,
    hours: [
      {
        day: String,
        session: String,
        opening_hour: String,
        closing_hour: String,
      },
    ],
    /*breakfast_menu : [{
        name : String,
        price : String,
    }],
    lunch_menu : [{
        name : String,
        price : String, 
    }],
    dinner_menu : [{
        name : String,
        price : String, 
    }],*/
  },
  { collection: "Restaurants" }
);

mongoose.model("resHours", resHoursSchema);
