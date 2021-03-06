const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    _id: String,
    order_id: String,
    orderer_id: String,
    restaurant_name: String,
    order_items: Array,
    order_placement_time: String,
    order_pickup_time: String,
    deliverer_id: String,
    status: String,
    total_price: String,
  },
  { collection: "Orders" }
);

mongoose.model("orders", ordersSchema);
