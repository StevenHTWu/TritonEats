const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    _id: String,
    order_id: String,
    orderer_id: String,
    restaurant_name: String,
    order_items: Array,
    order_placement_time: String,
    order_pickup_time: String,
    order_completion_time: String,
    deliverer_id: String,
    total_price: String,
  },
  { collection: "History" }
);

mongoose.model("history", historySchema);