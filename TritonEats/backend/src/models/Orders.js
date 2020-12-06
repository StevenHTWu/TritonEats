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

<<<<<<< HEAD
mongoose.model("orders", ordersSchema);
=======
mongoose.model("orders", ordersSchema);
>>>>>>> af35a8b48a0c84a2f54a9121bd67fbcd95547017
